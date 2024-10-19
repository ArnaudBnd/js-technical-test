import knex from '../../db';
import ImageRepository from '../ImageRepository';

jest.mock('../../db');

describe('ImageRepository', () => {
  describe('getAll', () => {
    it('should retrieve all images', async () => {
      const mockImagesData = [
        { id: 1, name: 'image1.jpg', path: '/images/image1.jpg' },
        { id: 2, name: 'image2.jpg', path: '/images/image2.jpg' },
      ];

      const mockSelect = jest.fn().mockResolvedValue(mockImagesData);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        select: mockSelect,
      }));

      const result = await ImageRepository.getAll();

      expect(result).toEqual(mockImagesData);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockSelect).toHaveBeenCalledWith('*');
    });
  });

  describe('getById', () => {
    it('should retrieve an image by ID', async () => {
      const mockImageData = { id: 1, name: 'image1.jpg', path: '/images/image1.jpg' };

      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockResolvedValue(mockImageData);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        where: mockWhere,
        first: mockFirst,
      }));

      const result = await ImageRepository.getById(1);

      expect(result).toEqual(mockImageData);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', 1);
      expect(mockFirst).toHaveBeenCalled();
    });

    it('should return null if the image is not found', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockResolvedValue(null);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        where: mockWhere,
        first: mockFirst,
      }));

      const result = await ImageRepository.getById(1);

      expect(result).toBeNull();

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', 1);
      expect(mockFirst).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create an image and return the new ID', async () => {
      const mockInsert = jest.fn().mockResolvedValue([1]);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        insert: mockInsert,
      }));

      const result = await ImageRepository.create('image1.jpg', '/images/image1.jpg');

      expect(result).toBe(1);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockInsert).toHaveBeenCalledWith({ name: 'image1.jpg', path: '/images/image1.jpg' });
    });
  });

  describe('update', () => {
    it('should update an image and return true if successful', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockUpdate = jest.fn().mockResolvedValue(1);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        where: mockWhere,
        update: mockUpdate,
      }));

      const result = await ImageRepository.update(1, 'updated_image.jpg', '/images/updated_image.jpg');

      expect(result).toBe(true);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', 1);
      expect(mockUpdate).toHaveBeenCalledWith({ name: 'updated_image.jpg', path: '/images/updated_image.jpg' });
    });

    it('should return false if no rows are updated', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockUpdate = jest.fn().mockResolvedValue(0);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        where: mockWhere,
        update: mockUpdate,
      }));

      const result = await ImageRepository.update(1, 'updated_image.jpg', '/images/updated_image.jpg');

      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete an image and return true if successful', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockDel = jest.fn().mockResolvedValue(1);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        where: mockWhere,
        del: mockDel,
      }));

      const result = await ImageRepository.delete(1);

      expect(result).toBe(true);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', 1);
      expect(mockDel).toHaveBeenCalled();
    });

    it('should return false if no rows are deleted', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockDel = jest.fn().mockResolvedValue(0);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        where: mockWhere,
        del: mockDel,
      }));

      const result = await ImageRepository.delete(1);

      expect(result).toBe(false);
    });
  });
});
