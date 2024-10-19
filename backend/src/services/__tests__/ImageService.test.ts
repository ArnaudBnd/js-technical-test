import ImageService from '../ImageService';
import ImageRepository from '../../repositories/ImageRepository';

jest.mock('../../repositories/ImageRepository');

describe('ImageService', () => {
  it('should call ImageRepository.getAll', async () => {
    await ImageService.getAllImages();
    expect(ImageRepository.getAll).toHaveBeenCalled();
  });

  it('should call ImageRepository.getById with the correct ID', async () => {
    const id = 1;
    await ImageService.getImageById(id);
    expect(ImageRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should call ImageRepository.create with the correct parameters', async () => {
    const name = 'image.jpg';
    const path = '/images/image.jpg';
    await ImageService.createImage(name, path);
    expect(ImageRepository.create).toHaveBeenCalledWith(name, path);
  });

  it('should call ImageRepository.update with the correct parameters', async () => {
    const id = 1;
    const name = 'updated_image.jpg';
    const path = '/images/updated_image.jpg';
    await ImageService.updateImage(id, name, path);
    expect(ImageRepository.update).toHaveBeenCalledWith(id, name, path);
  });

  it('should call ImageRepository.delete with the correct ID', async () => {
    const id = 1;
    await ImageService.deleteImage(id);
    expect(ImageRepository.delete).toHaveBeenCalledWith(id);
  });
});
