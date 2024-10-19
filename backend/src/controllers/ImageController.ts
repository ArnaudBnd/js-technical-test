import { Request, Response } from 'express';
import ImageService from '../services/ImageService';

const ImageController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await ImageService.getAllImages();
      res.status(200).json(images);
    } catch (error) {
      console.error('Error getting all images:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const image = await ImageService.getImageById(Number(id));
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
      const id = await ImageService.createImage(name, path);
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
      const success = await ImageService.updateImage(Number(id), name, path);
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
      const success = await ImageService.deleteImage(Number(id));
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
