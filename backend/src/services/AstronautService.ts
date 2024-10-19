import AstronautRepository from '../repositories/AstronautRepository';
import Astronaut from '../entities/Astronaut';

class AstronautService {
  async getAllAstronauts(): Promise<Astronaut[]> {
    return await AstronautRepository.getAll();
  }

  async getAstronautById(id: number): Promise<Astronaut | null> {
    return await AstronautRepository.getById(id);
  }

  async createAstronaut(firstname: string, lastname: string, originPlanetId: number): Promise<number> {
    return await AstronautRepository.create(firstname, lastname, originPlanetId);
  }

  async updateAstronaut(id: number, firstname: string, lastname: string, originPlanetId: number): Promise<boolean> {
    return await AstronautRepository.update(id, firstname, lastname, originPlanetId);
  }

  async deleteAstronaut(id: number): Promise<boolean> {
    return await AstronautRepository.delete(id);
  }
}

export default new AstronautService();
