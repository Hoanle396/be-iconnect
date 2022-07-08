import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { image } from './upload.util';
export function ApiFileImages(name: string) {
   return applyDecorators(
      UseInterceptors(FileInterceptor(name, {storage: image })),
     ApiConsumes('multipart/form-data'),
   );
 }