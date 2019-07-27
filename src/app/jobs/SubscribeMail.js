// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SubscribeMail {
  get key() {
    return 'SubscribeMail';
  }

  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Inscrição confirmada',
      text: 'Estamos esperando por voce!',
    });
  }
}

export default new SubscribeMail();
