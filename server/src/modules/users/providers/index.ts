import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCrypHashProvider from '@modules/users/providers/HashProvider/implementations/BCrypyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCrypHashProvider);
