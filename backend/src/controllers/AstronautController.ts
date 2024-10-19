import { Request, Response } from 'express';
import Astronaut from '../entities/Astronaut';
import Planet from '../entities/Planet';
import knex from '../db';

const AstronautController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const astronauts = await knex('astronauts')
        .join('planets', 'astronauts.originPlanetId', 'planets.id')
        .leftJoin('images', 'planets.imageId', 'images.id')
        .select(
          'astronauts.id',
          'astronauts.firstname',
          'astronauts.lastname',
          'planets.name as planetName',
          'planets.description as planetDescription',
          'planets.isHabitable as planetIsHabitable',
          'images.path as imagePath',
          'images.name as imageName'
        );

      const formattedAstronauts: Astronaut[] = astronauts.map((astronaut) => ({
        id: astronaut.id,
        firstname: astronaut.firstname,
        lastname: astronaut.lastname,
        originPlanet: {
          name: astronaut.planetName,
          isHabitable: astronaut.planetIsHabitable,
          description: astronaut.planetDescription,
          image: {
            path: astronaut.imagePath,
            name: astronaut.imageName,
          },
        } as Planet,
      }));
      res.status(200).json(formattedAstronauts);
    } catch (error) {
      console.error('Error fetching astronauts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await knex('astronauts')
        .join('planets', 'astronauts.originPlanetId', 'planets.id')
        .leftJoin('images', 'planets.imageId', 'images.id')
        .select(
          'astronauts.id',
          'astronauts.firstname',
          'astronauts.lastname',
          'planets.name as planetName',
          'planets.description as planetDescription',
          'planets.isHabitable as planetIsHabitable',
          'images.path as imagePath',
          'images.name as imageName'
        )
        .where('astronauts.id', id)
        .first();

        if (data) {
          const astronaut: Astronaut = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            originPlanet: {
              name: data.planetName,
              isHabitable: data.planetIsHabitable,
              description: data.planetDescription,
              image: {
                path: data.imagePath,
                name: data.imageName,
              },
            } as Planet,
          };
          res.status(200).json(astronaut);
      } else {
        res.status(404).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      console.error('Error fetching astronaut by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const [id] = await knex.insert({ firstname, lastname, originPlanetId }).into('astronauts');
      res.status(201).json({
        id, firstname, lastname, originPlanetId,
      });
    } catch (error) {
      console.error('Error creating astronaut:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const updatedRows = await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Astronaut updated successfully' });
      } else {
        res.status(404).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      console.error('Error updating astronaut:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await knex('astronauts').where('id', id).del();
      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      console.error('Error deleting astronaut:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default AstronautController;
