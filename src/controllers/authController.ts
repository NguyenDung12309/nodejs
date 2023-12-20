import { Controller } from '@/constants/common';
import { reqRegisterDto } from '@/dto/request/auth';
import { authService } from '@/services/authService';

export const loginController: Controller<any> = (req, res) => {
  const { email } = req.body;

  res.status(200).json({
    data: {
      message: `hello ${email}`,
    },
  });
};

export const registerController: Controller<reqRegisterDto> = async (req, res, next) => {
  try {
    throw new Error('lỗi');
    const result = await authService.register(req.body);

    return res.json({
      message: 'register success',
      result,
    });
  } catch (error) {
    next(error);
    // return res.status(400).json({
    //   message: 'register failed',
    //   error,
    // });
  }
};
