import { Request, Response } from 'express';
import knex from '../db';
import Planet from '../entities/Planet';

const PlanetController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const { filterName } = req.query;
 
      const planetsQuery = knex('planets')
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

      if(filterName) planetsQuery.where('planets.name', 'like', `%${filterName}%`);

     const planets = await planetsQuery;

      const formattedPlanets: Planet[] = planets.map((planet) => ({
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

      res.status(200).json(formattedPlanets);
    } catch (error) {
      console.error('Error fetching planets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await knex('planets')
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

      if (data) {
        const planet: Planet = {
          id: data.id,
          name: data.name,
          description: data.description,
          isHabitable: data.isHabitable,
          image: {
            id: data.imageId,
            path: data.imagePath,
            name: data.imageName,
          },
        };

        res.status(200).json(planet);
      } else {
        res.status(404).json({ error: 'Planet not found' });
      }
    } catch (error) {
      console.error('Error fetching planet by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { name, isHabitable, imageId } = req.body;
    try {
      const [id] = await knex('planets').insert({ name, isHabitable, imageId });
      res.status(201).json({
        id, name, isHabitable, imageId,
      });
    } catch (error) {
      console.error('Error creating planet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, isHabitable, imageId } = req.body;
    try {
      const updatedRows = await knex('planets').where('id', id).update({ name, isHabitable, imageId });
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Planet updated successfully' });
      } else {
        res.status(404).json({ error: 'Planet not found' });
      }
    } catch (error) {
      console.error('Error updating planet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await knex('planets').where('id', id).del();
      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Planet not found' });
      }
    } catch (error) {
      console.error('Error deleting planet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default PlanetController;
