import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendNotificationEmailService from '@modules/subscribers/services/SendNotificationEmailService';

export default class NotificationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { distribution_id } = request.body;

    const sendNotificationEmailService = container.resolve(
      SendNotificationEmailService,
    );

    await sendNotificationEmailService.execute({ distribution_id });

    return response.status(204).json();
  }
}
