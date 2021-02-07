import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName,
  }: Request): Promise<User | string> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      try {
        const userAvatarFilePath = path.join(
          uploadConfig.directory,
          user.avatar
        );
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }

        user.avatar = avatarFileName;

        await usersRepository.save(user);
      } catch (err) {
        throw new AppError('The avatar image was not found on the server');
      }
    }

    return user;
  }
}

export default UpdateUserAvatarService;
