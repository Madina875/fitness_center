import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File) {
    try {
      const extension = path.extname(file.originalname);
      const fileName = uuid.v4() + extension;

      const filePath = path.resolve(process.cwd(), 'uploads');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('File save error');
    }
  }
}
