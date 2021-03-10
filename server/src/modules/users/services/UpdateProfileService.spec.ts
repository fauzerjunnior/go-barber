import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfile: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be abe to update profile of the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'João Dom',
      email: 'joaodom@example.com',
    });

    expect(updatedUser.name).toBe('João Dom');
    expect(updatedUser.email).toBe('joaodom@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'João Dom',
      email: 'joaodom@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João Dom',
      email: 'joaodom@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'João Dom',
      email: 'joaodom@example.com',
      old_password: '123123',
      password: 'batata-123',
    });

    expect(updatedUser.password).toBe('batata-123');
  });

  it('should not be able to update the password without inform the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João Dom',
      email: 'joaodom@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'João Dom',
        email: 'joaodom@example.com',
        password: 'batata-123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João Dom',
      email: 'joaodom@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'João Dom',
        email: 'joaodom@example.com',
        old_password: '321321',
        password: 'batata-123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-exisitng user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'João Dom',
        email: 'joaodom@example.com',
        old_password: '123123',
        password: 'batata-123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
