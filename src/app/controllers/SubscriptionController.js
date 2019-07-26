import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });
    /**
     * Verify if user is trying to subcribe to your own meetup
     */

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "You can't subscribe to your own MeetUp" });
    }
    if (meetup.past) {
      return res.status(400).json({ error: "You can't subcribe past Meetups" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: 'You can subscribe one meetup at the same time' });
    }
    /**
     * Create new subscription
     */
    const subscriptions = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(subscriptions);
  }
}

export default new SubscriptionController();
