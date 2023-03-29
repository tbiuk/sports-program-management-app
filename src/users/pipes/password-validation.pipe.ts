import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  private readonly minLength = 6;
  private readonly passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  transform(value: string) {
    if (!this.isValid(value)) {
      throw new BadRequestException(
        `Password must be at least ${this.minLength} characters long and include at least one letter and one number.`,
      );
    }
    return value;
  }

  private isValid(password: string): boolean {
    return this.passwordRegex.test(password);
  }
}
