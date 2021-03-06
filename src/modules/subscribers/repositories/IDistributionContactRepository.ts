import DistributionContact from '@modules/subscribers/infra/typeorm/entities/DistributionContact';
import ICreateSubscriberDTO from '../dtos/ICreateDistributionContactDTO';

export default interface ISubscribersRepositorory {
  findByEmailAndDistribution(
    email: string,
    distribution_id: string,
  ): Promise<DistributionContact | undefined>;
  findBySubscriberAndDistribution(
    subscriber_id: string,
    distribution_id: string,
  ): Promise<DistributionContact | undefined>;
  create(
    distribution_id: string,
    subscribers: ICreateSubscriberDTO[],
  ): Promise<DistributionContact[]>;
  save(distributionContact: DistributionContact): Promise<DistributionContact>;
  findNoNotificatedContactsByDistribution(
    distribution_id: string,
  ): Promise<DistributionContact[]>;
  findNoNotificatedSubscribersByDistribution(
    distribution_id: string,
  ): Promise<DistributionContact[]>;
}
