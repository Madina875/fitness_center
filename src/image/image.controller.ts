import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('🖼️ Images')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new image' })
  @ApiBody({ type: CreateImageDto })
  @ApiCreatedResponse({ description: 'Image uploaded successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid image data.' })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all images' })
  @ApiOkResponse({ description: 'Images retrieved successfully.' })
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an image by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Image ID' })
  @ApiOkResponse({ description: 'Image retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an image by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Image ID' })
  @ApiBody({ type: UpdateImageDto })
  @ApiOkResponse({ description: 'Image updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an image by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Image ID' })
  @ApiOkResponse({ description: 'Image deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
