import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { title, description, location, date, file_id } = req.body;

    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      location,
      date,
      file_id,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
