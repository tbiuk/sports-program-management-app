import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  async createUser(
    email: string,
    password: string,
    ageGroupId: number,
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    await this.UsersRepository.addUser(
      email,
      hashedPassword,
      emailVerificationToken,
      ageGroupId,
    );

    return emailVerificationToken;
  }

  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Sports Program Management" <no-reply@example.com>',
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by visiting the following link: ${process.env.APP_URL}/users/verify-email?token=${token}`,
      html: `Please verify your email by visiting the following link: <a href="${process.env.APP_URL}/users/verify-email?token=${token}">${process.env.APP_URL}/users/verify-email?token=${token}</a>`,
    };

    await transporter.sendMail(mailOptions);
  }

  async verifyEmailToken(token: string): Promise<any> {
    const user = await this.UsersRepository.findByVerificationToken(token);

    if (user) {
      await this.UsersRepository.verify(user.user_id);
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.UsersRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findByEmail(email: string) {
    return this.UsersRepository.findByEmail(email);
  }
}
