import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ClassesService } from '../classes.service';

@Injectable()
export class ClassExistsOrUndefinedPipe implements PipeTransform {
  constructor(private readonly classService: ClassesService) {}

  async transform(value: number) {
    if (typeof value === 'undefined') return value;

    const _class = await this.classService.getClassById(value);
    if (!_class) {
      throw new BadRequestException(`Class with id ${value} does not exist`);
    }
    return value;
  }
}
