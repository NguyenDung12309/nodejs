import { reqRegisterDto } from '@/dto/request/auth';
import { emailRequired, joi, stringMinMaxRequired, stringRequired } from '@/helper/validate';
import { authService } from '@/services/authService';

export const registerSchema = joi.object<reqRegisterDto>({
  name: stringRequired(),
  email: emailRequired().external(authService.checkEmailExists),
  password: stringMinMaxRequired({ min: 6, max: 50 }),
  confirmPassword: joi.valid(joi.ref('password')).messages({
    'any.only': '{#key} must match password',
  }),
});
