import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    email: string,
    password: string,
    ageGroupID: number,
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    await this.userRepository.addUser(
      email,
      hashedPassword,
      emailVerificationToken,
      ageGroupID,
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
      text: `Please verify your email by visiting the following link: ${process.env.APP_URL}/verify-email?token=${token}`,
      html: `Please verify your email by visiting the following link: <a href="${process.env.APP_URL}/user/verify-email?token=${token}">${process.env.APP_URL}/verify-email?token=${token}</a>`,
    };

    await transporter.sendMail(mailOptions);
  }

  async verifyEmailToken(token: string): Promise<any> {
    const user = await this.userRepository.findByVerificationToken(token);

    if (user) {
      await this.userRepository.verify(user.user_id);
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
