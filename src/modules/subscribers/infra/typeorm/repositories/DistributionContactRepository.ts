import ICreateSubscriberDTO from '@modules/subscribers/dtos/ICreateDistributionContactDTO';
import { getRepository, Repository } from 'typeorm';
import IDistributionContactRepository from '../../../repositories/IDistributionContactRepository';
import DistributionContact from '../entities/DistributionContact';

class DistributionContactRepository implements IDistributionContactRepository {
  private ormRepository: Repository<DistributionContact>;

  constructor() {
    this.ormRepository = getRepository(DistributionContact);
  }

  public async findByEmailAndDistribution(
    email: string,
    distribution_id: string,
  ): Promise<DistributionContact | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
        distribution_id,
      },
    });
  }

  public async findBySubscriberAndDistribution(
    subscriber_id: string,
    distribution_id: string,
  ): Promise<DistributionContact | undefined> {
    return this.ormRepository.findOne({
      where: {
        subscriber_id,
        distribution_id,
      },
    });
  }

  public async create(
    distribution_id: string,
    subscribers: ICreateSubscriberDTO[],
  ): Promise<DistributionContact[]> {
    const distributionContacts = subscribers.map(subscriber => {
      const distribution = this.ormRepository.create({
        distribution_id,
        subscriber_id: subscriber.subscriber_id,
        group_id: subscriber.group_id,
        delivery_status: false,
        unsubscription: false,
        delivery_failure: false,
      });
      return distribution;
    });
    return this.ormRepository.save(distributionContacts);
  }

  save(distributionContact: DistributionContact): Promise<DistributionContact> {
    return this.ormRepository.save(distributionContact);
  }

  public async findNoNotificatedContactsByDistribution(
    distribution_id: string,
  ): Promise<DistributionContact[]> {
    const distributionContacts = await this.ormRepository.find({
      where: {
        distribution_id,
        delivery_status: false,
        delivery_failure: false,
        unsubscription: false,
      },
      relations: ['subscriber'],
    });
    return distributionContacts;
  }

  public async findNoNotificatedSubscribersByDistribution(
    distribution_id: string,
  ): Promise<DistributionContact[]> {
    const distributionContacts = await this.ormRepository
      .createQueryBuilder('distribution_contacts')
      .where(distribution_id)
      .leftJoinAndSelect('distribution_contacts.subscriber', 'subscriber')
      .leftJoinAndSelect('subscriber.subscribersGroup', 'subscribersGroup')
      .getMany();

    return distributionContacts;
  }
}

export default DistributionContactRepository;
