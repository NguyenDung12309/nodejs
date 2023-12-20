import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        content: 'abc',
      },
      {
        id: 2,
        content: 'abc',
      },
    ],
  });
});
