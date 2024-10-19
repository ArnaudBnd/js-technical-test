import knex from '../db';
import Astronaut from '../entities/Astronaut';

class AstronautRepository {
  async getAll(): Promise<Astronaut[]> {
    const astronauts = await knex('astronauts')
      .join('planets', 'astronauts.originPlanetId', 'planets.id')
      .leftJoin('images', 'planets.imageId', 'images.id')
      .select(
        'astronauts.id',
        'astronauts.firstname',
        'astronauts.lastname',
        'planets.id as planetId',
        'planets.name as planetName',
        'planets.description as planetDescription',
        'planets.isHabitable as planetIsHabitable',
        'images.id as imageId',
        'images.path as imagePath',
        'images.name as imageName'
      );

    return astronauts.map((astronaut) => ({
      id: astronaut.id,
      firstname: astronaut.firstname,
      lastname: astronaut.lastname,
      originPlanet: {
        id: astronaut.planetId,
        name: astronaut.planetName,
        isHabitable: astronaut.planetIsHabitable,
        description: astronaut.planetDescription,
        image: {
          id: astronaut.imageId,
          path: astronaut.imagePath,
          name: astronaut.imageName,
        },
      },
    }));
  }

  async getById(id: number): Promise<Astronaut | null> {
    const data = await knex('astronauts')
      .join('planets', 'astronauts.originPlanetId', 'planets.id')
      .leftJoin('images', 'planets.imageId', 'images.id')
      .select(
        'astronauts.id',
        'astronauts.firstname',
        'astronauts.lastname',
        'planets.id as planetId',
        'planets.name as planetName',
        'planets.description as planetDescription',
        'planets.isHabitable as planetIsHabitable',
        'images.id as imageId',
        'images.path as imagePath',
        'images.name as imageName'
      )
      .where('astronauts.id', id)
      .first();

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      originPlanet: {
        id: data.planetId,
        name: data.planetName,
        isHabitable: data.planetIsHabitable,
        description: data.planetDescription,
        image: {
          id: data.imageId,
          path: data.imagePath,
          name: data.imageName,
        },
      },
    };
  }

  async create(firstname: string, lastname: string, originPlanetId: number): Promise<number> {
    const [id] = await knex('astronauts').insert({ firstname, lastname, originPlanetId }).returning('id');
    return id;
  }

  async update(id: number, firstname: string, lastname: string, originPlanetId: number): Promise<boolean> {
    const updatedRows = await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
    return updatedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await knex('astronauts').where('id', id).del();
    return deletedRows > 0;
  }
}

export default new AstronautRepository();
