import knex from '../db';
import Planet from '../entities/Planet';

class PlanetRepository {
  async getAll(filterName?: string): Promise<Planet[]> {
    const query = knex('planets')
      .leftJoin('images', 'planets.imageId', 'images.id')
      .select(
        'planets.id',
        'planets.name',
        'planets.description',
        'planets.isHabitable',
        'images.id as imageId',
        'images.path as imagePath',
        'images.name as imageName'
      );

    if (filterName) {
      query.where('planets.name', 'like', `%${filterName}%`);
    }

    const results = await query;

    return results.map((planet) => ({
      id: planet.id,
      name: planet.name,
      description: planet.description,
      isHabitable: planet.isHabitable,
      image: {
        id: planet.imageId,
        path: planet.imagePath,
        name: planet.imageName,
      },
    }));
  }

  async getById(id: number): Promise<Planet | null> {
    const planet = await knex('planets')
      .leftJoin('images', 'planets.imageId', 'images.id')
      .select(
        'planets.id',
        'planets.name',
        'planets.description',
        'planets.isHabitable',
        'images.id as imageId',
        'images.path as imagePath',
        'images.name as imageName'
      )
      .where('planets.id', id)
      .first();

    if (!planet) {
      return null;
    }

    return {
      id: planet.id,
      name: planet.name,
      description: planet.description,
      isHabitable: planet.isHabitable,
      image: {
        id: planet.imageId,
        path: planet.imagePath,
        name: planet.imageName,
      },
    };
  }

  async create(name: string, isHabitable: boolean, imageId?: number): Promise<number> {
    const [id] = await knex('planets')
      .insert({ name, isHabitable, imageId })
      .returning('id');
    return id;
  }

  async update(id: number, name: string, isHabitable: boolean, imageId?: number): Promise<boolean> {
    const updatedRows = await knex('planets')
      .where('id', id)
      .update({ name, isHabitable, imageId });
    return updatedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await knex('planets')
      .where('id', id)
      .del();
    return deletedRows > 0;
  }
}

export default new PlanetRepository();
