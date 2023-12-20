import { objectAssign } from '@/helper/util';
import { UserVerifyStatus } from '../enums/user';
import { ObjectId } from 'mongodb';

export class User {
  _id: ObjectId;
  name: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerifyToken: string;
  forgotPasswordToken: string;
  verify: UserVerifyStatus = UserVerifyStatus.Unverified;
  bio: string;
  location: string;
  website: string;
  username: string;
  avatar: string;
  coverPhoto: string;

  constructor(data: Partial<User>) {
    objectAssign(data, this);
  }
}
