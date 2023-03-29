import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  private readonly emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  transform(value: string) {
    if (!this.isValid(value)) {
      throw new BadRequestException('Invalid email format');
    }
    return value;
  }

  private isValid(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
