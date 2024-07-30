import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../../classes/services/class.service';
import { FeesheadService } from '../services/feeshead.service';
import { Feeshead } from '../models/feeshead';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feeshead-modal-popup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './feeshead-modal-popup.component.html',
  styleUrl: './feeshead-modal-popup.component.scss'
})
export default class FeesheadModalPopupComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public classSvc: ClassService,
    public feesheadSvc: FeesheadService,
    public toast: ToastrService,
    private ref: MatDialogRef<FeesheadModalPopupComponent>,
  ) {}

  feesHeadForms: any = FormGroup;

  loading = false;

  className: any = [];

  feesHead!: Feeshead;

  feesheadList: Feeshead[] = [];

  closemessage: any = 'close message using directive';

  data: any = inject(MAT_DIALOG_DATA);

  inputdata: any;

  editdata: any;

  get getclass() {
    return this.feesHeadForms.controls['classid'];
  }
  get getfeename() {
    return this.feesHeadForms.controls['feename'];
  }
  get getfeeamount() {
    return this.feesHeadForms.controls['feeamount'];
  }
  get getfeedescription() {
    return this.feesHeadForms.controls['shortdescription'];
  }

  ngOnInit(): void {
    this.getClassName();
    this.createForm();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }
  getClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }
  createForm() {
    this.feesHeadForms = this.fb.group({
      classid: ['', [Validators.required]],
      feename: ['', [Validators.required, Validators.maxLength(100)]],
      feeamount: ['', [Validators.required, Validators.maxLength(10)]],
      shortdescription: ['', [Validators.maxLength(100)]]
    });
  }

  setPopupData(id: number) {
    this.feesheadSvc.getFeesHeadById(id).subscribe((res: any) => {
      this.editdata = res;
      this.feesHeadForms.setValue({
        classid: this.editdata.classid,
        feename: this.editdata.feename,
        feeamount: this.editdata.feeamount,
        shortdescription: this.editdata.shortdescription,
      });
    });
  }

  closepopup() {
    this.ref.close('closed using function');
  }

  onSubmit() {
    this.loading = true;
    if (this.feesHeadForms.valid) {
      this.feesHead = {
        classid: this.feesHeadForms.value.classid,
        feename: this.feesHeadForms.value.feename,
        feeamount: this.feesHeadForms.value.feeamount,
        shortdescription: this.feesHeadForms.value.shortdescription
      };
      this.feesheadSvc.PUT(this.inputdata.id, this.feesHead).subscribe(
        (res: any) => {
          this.closepopup();
        },
        (error) => {
          this.loading = false;
          this.toast.success(error, 'Error.', { timeOut: 3000 });
        }
      );
    }
  }
}
