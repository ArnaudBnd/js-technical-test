import { Request, Response } from 'express';
import ImageRepository from '../repositories/ImageRepository';

const ImageController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await ImageRepository.getAll();
      res.status(200).json(images);
    } catch (error) {
      console.error('Error getting all images:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const image = await ImageRepository.getById(Number(id));
      if (image) {
        res.status(200).json(image);
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error getting image:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { name, path } = req.body;
    try {
      const id = await ImageRepository.create(name, path);
      res.status(201).json({ id, name, path });
    } catch (error) {
      console.error('Error creating image:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, path } = req.body;
    try {
      const success = await ImageRepository.update(Number(id), name, path);
      if (success) {
        res.status(200).json({ message: 'Image updated successfully' });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const success = await ImageRepository.delete(Number(id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },
};

export default ImageController;
