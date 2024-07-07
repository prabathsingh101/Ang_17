export class UserRegistration {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  roles?: string;
}

export interface UsersModel {
  id?: string;

  name?: string;

  username?: string;

  firstname?: string;

  lastname?: string;

  address?: string;

  mobileno?: string;

  email?: string;

  role?: string;
}

export interface Roles{
  id?: string;
  name?: string;
}
