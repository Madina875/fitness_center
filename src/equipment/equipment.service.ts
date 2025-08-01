import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return this.prismaService.equipment.create({
      data: createEquipmentDto,
    });
  }

  findAll() {
    return this.prismaService.equipment.findMany({ include: { center: true } });
  }

  findOne(id: number) {
    return this.prismaService.equipment.findUnique({ where: { id } });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const existing = await this.prismaService.equipment.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }

    return this.prismaService.equipment.update({
      where: { id },
      data: updateEquipmentDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.equipment.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }

    return this.prismaService.equipment.delete({
      where: { id },
    });
  }
}
