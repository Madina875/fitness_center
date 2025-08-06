import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class ImageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}

  async create(createImageDto: CreateImageDto, url: Express.Multer.File) {
    try {
      const fileName = await this.fileService.saveFile(url);

      const image = await this.prismaService.image.create({
        data: {
          ...createImageDto,
          url: fileName,
        },
      });

      return {
        ...image,
        fullUrl: `${process.env.BASE_URL}/uploads/${fileName}`, 
      };
    } catch (error) {
      console.log(error);
      throw new Error('Image creation failed');
    }
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
