import { Request, Response } from 'express';
import PlanetService from '../services/PlanetService';

const PlanetController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const { filterName } = req.query;
      const planets = await PlanetService.getAllPlanets(filterName as string);
      res.status(200).json(planets);
    } catch (error) {
      console.error('Error fetching planets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const planet = await PlanetService.getPlanetById(Number(id));
      if (planet) {
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
      const id = await PlanetService.createPlanet(name, isHabitable, imageId);
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
      const success = await PlanetService.updatePlanet(Number(id), name, isHabitable, imageId);
      if (success) {
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
      const success = await PlanetService.deletePlanet(Number(id));
      if (success) {
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
