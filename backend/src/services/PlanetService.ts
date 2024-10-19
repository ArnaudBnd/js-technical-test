import PlanetRepository from '../repositories/PlanetRepository';
import Planet from '../entities/Planet';

class PlanetService {
  async getAllPlanets(filterName?: string): Promise<Planet[]> {
    return await PlanetRepository.getAll(filterName);
  }

  async getPlanetById(id: number): Promise<Planet | null> {
    return await PlanetRepository.getById(id);
  }

  async createPlanet(name: string, isHabitable: boolean, imageId?: number): Promise<number> {
    return await PlanetRepository.create(name, isHabitable, imageId);
  }

  async updatePlanet(id: number, name: string, isHabitable: boolean, imageId?: number): Promise<boolean> {
    return await PlanetRepository.update(id, name, isHabitable, imageId);
  }

  async deletePlanet(id: number): Promise<boolean> {
    return await PlanetRepository.delete(id);
  }
}

export default new PlanetService();
