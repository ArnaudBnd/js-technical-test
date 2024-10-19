import PlanetService from '../PlanetService';
import PlanetRepository from '../../repositories/PlanetRepository';

jest.mock('../../repositories/PlanetRepository'); 

describe('PlanetService', () => {
  it('should call PlanetRepository.getAll with the correct filter', async () => {
    const filterName = 'Mars';
    await PlanetService.getAllPlanets(filterName);
    expect(PlanetRepository.getAll).toHaveBeenCalledWith(filterName);
  });

  it('should call PlanetRepository.getById with the correct ID', async () => {
    const id = 1;
    await PlanetService.getPlanetById(id);
    expect(PlanetRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should call PlanetRepository.create with the correct parameters', async () => {
    const name = 'Mars';
    const isHabitable = true;
    const imageId = 5;
    await PlanetService.createPlanet(name, isHabitable, imageId);
    expect(PlanetRepository.create).toHaveBeenCalledWith(name, isHabitable, imageId);
  });

  it('should call PlanetRepository.update with the correct parameters', async () => {
    const id = 1;
    const name = 'Mars';
    const isHabitable = true;
    const imageId = 5;
    await PlanetService.updatePlanet(id, name, isHabitable, imageId);
    expect(PlanetRepository.update).toHaveBeenCalledWith(id, name, isHabitable, imageId);
  });

  it('should call PlanetRepository.delete with the correct ID', async () => {
    const id = 1;
    await PlanetService.deletePlanet(id);
    expect(PlanetRepository.delete).toHaveBeenCalledWith(id);
  });
});
