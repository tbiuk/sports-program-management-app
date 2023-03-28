import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { EnrollmentsService } from '../enrollments.service';

@Injectable()
export class EnrollmentExistsPipe implements PipeTransform {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  async transform(value: number) {
    const enrollment = await this.enrollmentsService.getEnrollmentById(value);

    if (!enrollment) {
      throw new BadRequestException(
        `Enrollment with id ${value} does not exist`,
      );
    }

    return value;
  }
}
