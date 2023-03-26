import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  getAllEnrollments() {
    return this.enrollmentsService.getAllEnrollments();
  }

  @Get(':id')
  getEnrollmentById(@Param('id') id: number) {
    return this.enrollmentsService.getEnrollmentById(id);
  }

  @Post()
  createEnrollment(
    @Body('userID') userID: number,
    @Body('classID') classID: number,
  ) {
    return this.enrollmentsService.createEnrollment(userID, classID);
  }

  @Put(':id')
  updateEnrollment(
    @Param('id') id: number,
    @Body('userID') userID: number,
    @Body('classID') classID: number,
  ) {
    return this.enrollmentsService.updateEnrollment(id, userID, classID);
  }

  @Delete(':id')
  deleteEnrollment(@Param('id') id: number) {
    return this.enrollmentsService.deleteEnrollment(id);
  }
}
