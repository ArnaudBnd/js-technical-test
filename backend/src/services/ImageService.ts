import ImageRepository from '../repositories/ImageRepository';
import Image from '../entities/Image';

class ImageService {
  async getAllImages(): Promise<Image[]> {
    return await ImageRepository.getAll();
  }

  async getImageById(id: number): Promise<Image | null> {
    return await ImageRepository.getById(id);
  }

  async createImage(name: string, path: string): Promise<number> {
    return await ImageRepository.create(name, path);
  }

  async updateImage(id: number, name: string, path: string): Promise<boolean> {
    return await ImageRepository.update(id, name, path);
  }

  async deleteImage(id: number): Promise<boolean> {
    return await ImageRepository.delete(id);
  }
}

export default new ImageService();
