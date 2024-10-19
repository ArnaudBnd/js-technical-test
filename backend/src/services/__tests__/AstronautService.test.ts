import AstronautService from '../AstronautService';
import AstronautRepository from '../../repositories/AstronautRepository';

jest.mock('../../repositories/AstronautRepository'); 

describe('AstronautService', () => {
  it('should call AstronautRepository.getAll', async () => {
    await AstronautService.getAllAstronauts();
    expect(AstronautRepository.getAll).toHaveBeenCalled();
  });

  it('should call AstronautRepository.getById with the correct ID', async () => {
    const id = 1;
    await AstronautService.getAstronautById(id);
    expect(AstronautRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should call AstronautRepository.create with the correct parameters', async () => {
    const firstname = 'John';
    const lastname = 'Doe';
    const originPlanetId = 2;
    await AstronautService.createAstronaut(firstname, lastname, originPlanetId);
    expect(AstronautRepository.create).toHaveBeenCalledWith(firstname, lastname, originPlanetId);
  });

  it('should call AstronautRepository.update with the correct parameters', async () => {
    const id = 1;
    const firstname = 'John';
    const lastname = 'Doe';
    const originPlanetId = 2;
    await AstronautService.updateAstronaut(id, firstname, lastname, originPlanetId);
    expect(AstronautRepository.update).toHaveBeenCalledWith(id, firstname, lastname, originPlanetId);
  });

  it('should call AstronautRepository.delete with the correct ID', async () => {
    const id = 1;
    await AstronautService.deleteAstronaut(id);
    expect(AstronautRepository.delete).toHaveBeenCalledWith(id);
  });
});
