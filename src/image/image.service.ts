import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createImageDto: CreateImageDto) {
    return this.prismaService.image.create({
      data: createImageDto,
    });
  }

  findAll() {
    return this.prismaService.image.findMany({ include: { center: true } });
  }

  findOne(id: number) {
    return this.prismaService.image.findUnique({ where: { id } });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const existing = await this.prismaService.image.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.prismaService.image.update({
      where: { id },
      data: updateImageDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.image.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.prismaService.image.delete({
      where: { id },
    });
  }
}
