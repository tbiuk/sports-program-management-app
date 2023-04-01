import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async checkEmailUsed(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (user) {
      throw new BadRequestException('Email already registered');
    }
  }

  async createUser(email: string, password: string, ageGroupId: number) {
    await this.checkEmailUsed(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    await this.usersRepository.addUser(
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
    const user = await this.usersRepository.getUserByVerificationToken(token);

    if (user) {
      await this.usersRepository.verifyUser(user.userId);
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getAllUsers() {
    return this.usersRepository.getAllUsers();
  }

  async getUserById(userId: number) {
    return this.usersRepository.getUserById(userId);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  async getUserForValidationByEmail(email: string) {
    return this.usersRepository.getUserForValidationByEmail(email);
  }

  private async checkCanSetAdmin(userId: number) {
    const user = await this.usersRepository.getUserById(userId);

    if (user.role === 'admin') {
      throw new BadRequestException('User is already an admin');
    }
  }

  private async checkCanUnsetAdmin(currentUserId: number, userId: number) {
    const user = await this.usersRepository.getUserById(userId);

    if (user.role !== 'admin') {
      throw new BadRequestException('User is already not an admin');
    }

    if (user.userId === currentUserId) {
      throw new BadRequestException('User cannot perform action on themselves');
    }
  }

  private async checkCanDeleteUser(currentUserId: number, userId: number) {
    const user = await this.usersRepository.getUserById(userId);

    if (user.role === 'admin') {
      throw new BadRequestException('Admin user cannot be deleted');
    }

    if (user.userId === currentUserId) {
      throw new BadRequestException('User cannot perform action on themselves');
    }
  }

  async deleteUser(currentUserId: number, userId: number) {
    await this.checkCanDeleteUser(currentUserId, userId);
    return this.usersRepository.deleteUser(userId);
  }

  async setUserAdmin(userId: number) {
    await this.checkCanSetAdmin(userId);
    return this.usersRepository.setUserAdmin(userId);
  }

  async setUserNotAdmin(currentUserId: number, userId: number) {
    await this.checkCanUnsetAdmin(currentUserId, userId);
    return this.usersRepository.setUserNotAdmin(userId);
  }
}
