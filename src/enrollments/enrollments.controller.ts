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
  getEnrollmentById(@Param('id', EnrollmentExistsPipe) enrollmentID: number) {
    return this.enrollmentsService.getEnrollmentById(enrollmentID);
  }

  @Post('enroll')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidBodyParamsInterceptor(['class']))
  enrollUser(@Request() req, @Body('class', ClassExistsPipe) classID: number) {
    return this.enrollmentsService.enrollUser(req.user.id, classID);
  }

  @Delete('unenroll')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor(['class']))
  unenrollUser(
    @Request() req,
    @Query('class', ClassExistsPipe) classID: number,
  ) {
    return this.enrollmentsService.unenrollUser(req.user.id, classID);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(new ValidQueryParamsInterceptor([]))
  deleteEnrollment(@Param('id', EnrollmentExistsPipe) enrollmentID: number) {
    return this.enrollmentsService.deleteEnrollment(enrollmentID);
  }
}
