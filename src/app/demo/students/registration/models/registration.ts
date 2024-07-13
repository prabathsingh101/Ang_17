export interface Registration {
  id?: number;

  registrationno?: number;

  fname?: string;

  lname?: string;

  fullname?: string;

  registrationfees?: number;

  mobileno?: string;

  address?: string;

  classid?: number;

  fathersname?: string;

  isstatus?: boolean;

  islocked?: boolean;
}

export interface SPRegistrationDetails {
  id?: number;
  registrationno?: number;
  fullname?: string;
  registrationdate?: Date;
  registrationfees?: number;
  mobileno?: string;
  address?: string;
  isdeleted: boolean;
  isstatus?: boolean;
  islocked?: boolean;
  classname?: string;
}

export interface Admission {
  id?: number;

  registrationno?: number;

  fname?: string;

  lname?: string;

  fullname?: string;

  registrationfees?: number;

  mobileno?: string;

  address?: string;

  classid?: number;

  fathersname?: string;

  registrationdate?: Date;
}
