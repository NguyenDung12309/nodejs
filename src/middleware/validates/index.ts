import { reqRegisterDto } from '@/dto/request/auth';
import { registerSchema } from './authValidate';
import { ObjectSchema } from 'joi';

export interface IValidators {
  registerSchema: ObjectSchema<reqRegisterDto>;
}

export const validators: IValidators = {
  registerSchema,
};
