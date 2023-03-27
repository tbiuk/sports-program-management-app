import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ClassesService } from '../classes.service';

@Injectable()
export class ClassExistsPipe implements PipeTransform {
  constructor(private readonly classService: ClassesService) {}

  async transform(value: number) {
    const _class = await this.classService.getClassById(value);
    if (!_class) {
      throw new BadRequestException(`Class with id ${value} does not exist`);
    }
    return value;
  }
}
