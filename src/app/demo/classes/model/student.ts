export interface Student {
  id?: number;
  isSelected?:boolean;
  registrationno?: number;

  fname?: string;

  lname?: string;

  fullname?: string;

  registrationdate?: Date;

  admissiondate?: Date;

  registrationfees?: number;

  mobileno?: string;

  address?: string;

  fathersname?: string;

  isDeleted?: boolean;

  isStatus?: boolean;

  createddate?: Date;

  updateddate?: Date;

  classid?: number;
}
