export class reqLoginDto {
  email: string;
  password: string;
}

export class reqRegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;

  constructor(data: reqRegisterDto) {
    Object.assign(this, data);
  }
}
