export interface Payment {

  id?: number;

  isselected?: boolean;

  classid?: number;

  studentid?: number;

  feestype?: string;

  duration?: string;

  collectiondate?: Date;

  paymenttype?: string;

  invoiceno?: string;

  status?: string;

  feeamount?: any;

  feename?: any;

  totalamount?: number;

  discount?: number;

  finalamount?: number;
}
