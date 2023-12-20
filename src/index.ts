import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routers/userRouter';
import { authRouter } from './routers/authRouter';
import { port } from './constants/common';
import { databaseService } from './services/databaseService';
const app = express();

//database
databaseService.connect();

app.use(express.json());

//public route
app.use('/auth', authRouter);

//private route
// app.use(authMiddleware);
app.use('/users', userRouter);

//Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
