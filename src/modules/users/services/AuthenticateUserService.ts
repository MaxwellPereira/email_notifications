import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRespository from '@modules/users/repositories/IUsersRepository';
import IGroupRepository from '@modules/groups/repositories/IGroupRepository';
import Group from '@modules/groups/infra/typeorm/entities/Group';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IRespose {
  user: User;
  token: string;
  groups: Group[];
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRespository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IRespose> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const groups = await this.groupRepository.findByOwnerId(user.id);

    return {
      user,
      token,
      groups,
    };
  }
}
