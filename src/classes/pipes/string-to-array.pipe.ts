import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ClassesService } from '../classes.service';

@Injectable()
export class StringToArrayPipe implements PipeTransform {
  constructor() {}

  async transform(value: string) {
    return value ? value.split(',') : [];
  }
}
