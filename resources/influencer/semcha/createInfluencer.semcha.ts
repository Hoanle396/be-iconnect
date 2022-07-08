import {
   ReferenceObject,
   SchemaObject,
 } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
 
 export const createInfluencerSchema: SchemaObject | ReferenceObject = {
   type: 'object',
   properties: {
     avatar: {
       type: 'string',
       format: 'binary',
     },
     platform: {
       type: 'string',
     },
     username: {
       type: 'date',
     },
     services: {
       type: 'string',
     },
     location: {
       type: 'string',
     },
   },
 };