import { Request, Response } from 'express';
import AstronautRepository from '../repositories/AstronautRepository';

const AstronautController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const astronauts = await AstronautRepository.getAll();
      res.status(200).json(astronauts);
    } catch (error) {
      console.error('Error fetching astronauts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const astronaut = await AstronautRepository.getById(Number(id));
      if (astronaut) {
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
      const id = await AstronautRepository.create(firstname, lastname, originPlanetId);
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
      const success = await AstronautRepository.update(Number(id), firstname, lastname, originPlanetId);
      if (success) {
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
      const success = await AstronautRepository.delete(Number(id));
      if (success) {
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
