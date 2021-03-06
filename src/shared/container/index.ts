import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ISubscribersRepository from '@modules/subscribers/repositories/ISubscriberRepository';
import SubscriberRepository from '@modules/subscribers/infra/typeorm/repositories/SubscribersRepository';

import IDistributionRepository from '@modules/subscribers/repositories/IDistributionRepository';
import DistributionRepository from '@modules/subscribers/infra/typeorm/repositories/DistributionRepository';

import IDistributionContactRepository from '@modules/subscribers/repositories/IDistributionContactRepository';
import DistributionContactRepository from '@modules/subscribers/infra/typeorm/repositories/DistributionContactRepository';

import IGroupRepository from '@modules/groups/repositories/IGroupRepository';
import GroupRepository from '@modules/groups/infra/typeorm/repositories/GroupRepository';

import ISubscribersGroupRepository from '@modules/groups/repositories/ISubscribersGroupRepository';
import SubscribersGroupRepository from '@modules/groups/infra/typeorm/repositories/SubscribersGroupRepository';

import ViewsRepository from '@modules/views/infra/typeorm/repositories/ViewsRepository';
import IViewsRepository from '@modules/views/repositories/IViewsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ISubscribersRepository>(
  'SubscriberRepository',
  SubscriberRepository,
);

container.registerSingleton<IDistributionRepository>(
  'DistributionRepository',
  DistributionRepository,
);

container.registerSingleton<IDistributionContactRepository>(
  'DistributionContactRepository',
  DistributionContactRepository,
);

container.registerSingleton<IGroupRepository>(
  'GroupRepository',
  GroupRepository,
);

container.registerSingleton<ISubscribersGroupRepository>(
  'SubscribersGroupRepository',
  SubscribersGroupRepository,
);

container.registerSingleton<IViewsRepository>(
  'ViewsRepository',
  ViewsRepository,
);
