import knex from '../db';
import Image from '../entities/Image';

class ImageRepository {
  async getAll(): Promise<Image[]> {
    const images = await knex('images').select('*');
    return images;
  }

  async getById(id: number): Promise<Image | null> {
    const image = await knex('images').where('id', id).first();
    return image || null;
  }

  async create(name: string, path: string): Promise<number> {
    const [id] = await knex('images').insert({ name, path });
    return id;
  }

  async update(id: number, name: string, path: string): Promise<boolean> {
    const updatedRows = await knex('images').where('id', id).update({ name, path });
    return updatedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await knex('images').where('id', id).del();
    return deletedRows > 0;
  }
}

export default new ImageRepository();
