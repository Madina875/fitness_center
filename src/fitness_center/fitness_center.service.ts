import { Injectable } from '@nestjs/common';
import { CreateFitnessCenterDto } from './dto/create-fitness_center.dto';
import { UpdateFitnessCenterDto } from './dto/update-fitness_center.dto';

@Injectable()
export class FitnessCenterService {
  create(createFitnessCenterDto: CreateFitnessCenterDto) {
    return 'This action adds a new fitnessCenter';
  }

  findAll() {
    return `This action returns all fitnessCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fitnessCenter`;
  }

  update(id: number, updateFitnessCenterDto: UpdateFitnessCenterDto) {
    return `This action updates a #${id} fitnessCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} fitnessCenter`;
  }
}
