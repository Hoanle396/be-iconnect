import {
   ReferenceObject,
   SchemaObject,
 } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
 
 export const createBrandSchema: SchemaObject | ReferenceObject = {
   type: 'object',
   properties: {
     image: {
       type: 'string',
       format: 'binary',
     },
     company_name: {
       type: 'string',
     },
     services: {
       type: 'date',
     },
     website: {
       type: 'string',
     },
     location: {
       type: 'string',
     },
     description: {
       type:'string'
     }
   },
 };