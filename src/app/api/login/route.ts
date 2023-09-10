import nodemailer from 'nodemailer';

import { CONFIRMATION_CODE_LIFE_TIME } from '@/app/api/login/constants';
import prisma from '@/lib/db';

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'info@oviland.ru',
    pass: 'uVmcJLLA',
  },
});

const STATUSES = {
  CONFIRM_EMAIL: {
    status: 'CONFIRM_EMAIL',
    message: 'Код подтверждения успешно создан',
  },
  EMAIL_CONFIRMED: {
    status: 'EMAIL_CONFIRMED',
    message: 'Верный код подтверждения',
  },
  EMAIL_NOT_CONFIRMED: {
    status: 'EMAIL_NOT_CONFIRMED',
    message: 'Неверный код подтверждения',
  },
  ERROR: {
    status: 'ERROR',
    statusCode: 0,
    message: 'Ошибка',
  },
};

const generateConfirmationCode = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

const sendConfirmationCode = async (email: string, code: number) => {
  return await transporter.sendMail({
    from: '"Вжух ✨" <info@oviland.ru>', // sender address
    to: email, // list of receivers
    subject: 'Код подтверждения', // Subject line
    text: `Ваш код подтверждения: ${code}`, // plain text body
    html: `<span>Ваш код подтверждения: <b>${code}</b></span>`, // html body
  });
};

export async function POST(req: Request) {
  const { email, confirmationCode } = await req.json();

  const profile = await prisma.profile.findUnique({
    where: {
      email,
    },
  });

  //Пользователь зарегистрирован
  if (profile && !confirmationCode) {
    const newConfirmationCode = generateConfirmationCode();

    await prisma.confirmationCode.create({
      data: { code: newConfirmationCode, profileId: profile.id },
    });

    await sendConfirmationCode(profile.email, newConfirmationCode);

    return new Response(JSON.stringify(STATUSES.CONFIRM_EMAIL));
  }

  //Пользователь не зарегистрирован
  if (!profile && !confirmationCode && typeof email === 'string') {
    const profile = await prisma.profile.create({
      data: {
        email,
      },
    });

    const newConfirmationCode = generateConfirmationCode();

    await prisma.confirmationCode.create({
      data: { code: newConfirmationCode, profileId: profile.id },
    });

    await sendConfirmationCode(profile.email, newConfirmationCode);

    return new Response(JSON.stringify(STATUSES.CONFIRM_EMAIL));
  }

  //Ввод кода подтверждения
  if (profile && confirmationCode && typeof confirmationCode === 'string') {
    const confirmationCodeValidTime = new Date(Date.now() - CONFIRMATION_CODE_LIFE_TIME).toISOString();

    const isValidCode = await prisma.confirmationCode.findFirst({
      where: {
        AND: [
          {
            code: Number(confirmationCode),
          },
          {
            profileId: profile.id,
          },
          {
            createdAt: { gte: confirmationCodeValidTime },
          },
        ],
      },
    });

    if (isValidCode) {
      return new Response(JSON.stringify(STATUSES.EMAIL_CONFIRMED));
    }

    return new Response(JSON.stringify(STATUSES.EMAIL_NOT_CONFIRMED));
  }

  return new Response(JSON.stringify({ status: STATUSES.ERROR }));
}
