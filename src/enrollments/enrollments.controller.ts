import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClassExistsPipe } from 'src/classes/pipes/class-exists.pipe';
import { ValidBodyParamsInterceptor } from 'src/common/interceptors/valid-body-params.interceptor';
import { ValidQueryParamsInterceptor } from 'src/common/interceptors/valid-query-params.interceptor';
import { NotUndefinedPipe } from 'src/common/pipes/not-undefined.pipe';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentExistsPipe } from './pipes/enrollment-exists.pipe';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getAllEnrollments() {
    return this.enrollmentsService.getAllEnrollments();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  getEnrollmentById(@Param('id', EnrollmentExistsPipe) enrollmentId: number) {
    return this.enrollmentsService.getEnrollmentById(enrollmentId);
  }

  @Post('enroll')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['class']))
  async enrollUser(
    @Request() req,
    @Body('class', NotUndefinedPipe, ClassExistsPipe) classId: number,
  ) {
    await this.enrollmentsService.enrollUser(req.user.id, classId);
    return { message: 'User enrolled successfully' };
  }

  @Delete('unenroll')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor(['class']))
  async unenrollUser(
    @Request() req,
    @Query('class', NotUndefinedPipe, ClassExistsPipe) classId: number,
  ) {
    await this.enrollmentsService.unenrollUser(req.user.id, classId);
    return { message: 'User unenrolled successfully' };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  async deleteEnrollment(
    @Param('id', EnrollmentExistsPipe) enrollmentId: number,
  ) {
    await this.enrollmentsService.deleteEnrollment(enrollmentId);
    return { message: 'Enrollment deleted successfully' };
  }
}
