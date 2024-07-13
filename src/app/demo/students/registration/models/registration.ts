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
  classname?: string;
}
