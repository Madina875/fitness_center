import { PartialType } from '@nestjs/mapped-types';
import { CreateFitnessCenterDto } from './create-fitness_center.dto';

export class UpdateFitnessCenterDto extends PartialType(CreateFitnessCenterDto) {}
