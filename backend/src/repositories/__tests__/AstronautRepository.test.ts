import knex from '../../db';
import AstronautRepository from '../AstronautRepository';
import Astronaut from '../../entities/Astronaut';

jest.mock('../../db'); 

describe('AstronautRepository', () => {
  describe('getAll', () => {
    it('should retrieve all astronauts and map to the correct format', async () => {
      const mockAstronautsData = [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          planetId: 2,
          planetName: 'Mars',
          planetDescription: 'Red planet',
          planetIsHabitable: true,
          imageId: 3,
          imagePath: '/images/mars.jpg',
          imageName: 'Mars Image'
        }
      ];

      const mockJoin = jest.fn().mockReturnThis();
      const mockLeftJoin = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockResolvedValue(mockAstronautsData);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        join: mockJoin,
        leftJoin: mockLeftJoin,
        select: mockSelect
      }));

      const result = await AstronautRepository.getAll();

      expect(result).toEqual([
        {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          originPlanet: {
            id: 2,
            name: 'Mars',
            isHabitable: true,
            description: 'Red planet',
            image: {
              id: 3,
              path: '/images/mars.jpg',
              name: 'Mars Image'
            }
          }
        }
      ]);

      expect(knex).toHaveBeenCalledWith('astronauts');
      expect(knex().join).toHaveBeenCalledWith('planets', 'astronauts.originPlanetId', 'planets.id');
      expect(knex().leftJoin).toHaveBeenCalledWith('images', 'planets.imageId', 'images.id');
    });
  });

  describe('getById', () => {
    it('should retrieve an astronaut by ID and map to the correct format', async () => {
      const mockAstronautData = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        planetId: 2,
        planetName: 'Mars',
        planetDescription: 'Red planet',
        planetIsHabitable: true,
        imageId: 3,
        imagePath: '/images/mars.jpg',
        imageName: 'Mars Image'
      };

      const mockJoin = jest.fn().mockReturnThis();
      const mockLeftJoin = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockResolvedValue(mockAstronautData);

      (knex as unknown as jest.Mock).mockImplementation(() => ({
        join: mockJoin,
        leftJoin: mockLeftJoin,
        select: mockSelect,
        where: mockWhere,
        first: mockFirst
      }));

      const result = await AstronautRepository.getById(1);

      expect(result).toEqual({
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        originPlanet: {
          id: 2,
          name: 'Mars',
          isHabitable: true,
          description: 'Red planet',
          image: {
            id: 3,
            path: '/images/mars.jpg',
            name: 'Mars Image'
          }
        }
      });

      expect(knex).toHaveBeenCalledWith('astronauts');
      expect(mockJoin).toHaveBeenCalledWith('planets', 'astronauts.originPlanetId', 'planets.id');
      expect(mockLeftJoin).toHaveBeenCalledWith('images', 'planets.imageId', 'images.id');
      expect(mockSelect).toHaveBeenCalledWith(
        'astronauts.id',
        'astronauts.firstname',
        'astronauts.lastname',
        'planets.id as planetId',
        'planets.name as planetName',
        'planets.description as planetDescription',
        'planets.isHabitable as planetIsHabitable',
        'images.id as imageId',
        'images.path as imagePath',
        'images.name as imageName'
      );
      expect(knex().where).toHaveBeenCalledWith('astronauts.id', 1);
      expect(knex().first).toHaveBeenCalled();
    });

    it('should return null if the astronaut is not found', async () => {
      (knex as unknown as jest.Mock).mockReturnValue({
        join: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(null),
      });

      const result = await AstronautRepository.getById(1);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create an astronaut and return the new ID', async () => {
      const firstname = 'John';
      const lastname = 'Doe';
      const originPlanetId = 2;

      (knex as unknown as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValue([1]),
      });

      const result = await AstronautRepository.create('John', 'Doe', 2);

      expect(result).toBe(1);
      expect(knex).toHaveBeenCalledWith('astronauts');
      expect(knex().insert).toHaveBeenCalledWith({ firstname, lastname, originPlanetId });
    });
  });

  describe('update', () => {
    it('should update an astronaut and return true if successful', async () => {
      (knex as unknown as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        update: jest.fn().mockResolvedValue(1),
      });

      const result = await AstronautRepository.update(1, 'John', 'Doe', 2);

      expect(result).toBe(true);
      expect(knex).toHaveBeenCalledWith('astronauts');
      expect(knex().where).toHaveBeenCalledWith('id', 1);
      expect(knex().update).toHaveBeenCalledWith({ firstname: 'John', lastname: 'Doe', originPlanetId: 2 });
    });

    it('should return false if no rows are updated', async () => {
      (knex as unknown as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        update: jest.fn().mockResolvedValue(0),
      });

      const result = await AstronautRepository.update(1, 'John', 'Doe', 2);

      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete an astronaut and return true if successful', async () => {
      (knex as unknown as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        del: jest.fn().mockResolvedValue(1),
      });

      const result = await AstronautRepository.delete(1);

      expect(result).toBe(true);
      expect(knex).toHaveBeenCalledWith('astronauts');
      expect(knex().where).toHaveBeenCalledWith('id', 1);
      expect(knex().del).toHaveBeenCalled();
    });

    it('should return false if no rows are deleted', async () => {
      (knex as unknown as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        del: jest.fn().mockResolvedValue(0),
      });

      const result = await AstronautRepository.delete(1);

      expect(result).toBe(false);
    });
  });
});
