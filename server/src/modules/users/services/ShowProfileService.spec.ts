import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

describe('UpdateUserService', () => {
  let showProfileService: ShowProfileService;
  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be abe to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be abe to show the profile from con-existing user ', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
