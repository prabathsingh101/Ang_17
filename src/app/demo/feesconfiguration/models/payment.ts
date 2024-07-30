export interface Payment {
  id?: number;

  classid?: number;
  studentid?: number;

  feestype?: string;

  duration?: string;

  collectiondate?: Date;

  paymenttype?: string;

  invoiceno?: string;

  status?: string;

  amount?: number;

  admissionfees?: number;

  discount?: number;

  discountamount?: number;

  finalamount?: number;
}
