import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../../classes/services/class.service';
import { Feeshead } from '../models/feeshead';
import { forkJoin } from 'rxjs';
import { FeesheadService } from '../services/feeshead.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feehead',
  standalone: true,
  imports: [SharedModule],
  providers: [ClassService, ToastrService],
  templateUrl: './feehead.component.html',
  styleUrl: './feehead.component.scss'
})
export default class FeeheadComponent implements OnInit {
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  //fees = inject(FeesheadService);

  constructor(
    public fb: FormBuilder,
    public classSvc: ClassService,
    public feesheadSvc: FeesheadService,
    public toast: ToastrService
  ) {}

  loading = false;

  className: any = [];

  feesHead!: Feeshead;

  feesheadList: Feeshead[] = [];

  feesHeadForms: any = FormGroup;

  ngOnInit(): void {
    this.getClassName();
    this.createForm();
  }
  getClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }
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
  onSubmit() {
    this.loading = true;
    if (this.feesHeadForms.valid) {
      this.feesHead = {
        classid: this.feesHeadForms.value.classid,
        feename: this.feesHeadForms.value.feename,
        feeamount: this.feesHeadForms.value.feeamount,
        shortdescription: this.feesHeadForms.value.shortdescription
      };
      forkJoin({
        postData: this.feesheadSvc.Post(this.feesHead),
        getData: this.feesheadSvc.GetAll()
      }).subscribe(
        (results: any) => {
          if (results.postData.StatusCode === 201) {
            this.parentFunction.emit(results.getData);
            this.toast.success(results.postData.Message, 'Saved.', { timeOut: 3000 });
            this.loading = false;
          } else {
            this.toast.warning(results.postData.Message, 'Warning.', { timeOut: 3000 });
          }
        },
        (error) => {
          console.error('Error in API calls', error);
          this.loading = false;
        }
      );
    }
  }
  getfeesHead() {}
  createForm() {
    this.feesHeadForms = this.fb.group({
      classid: ['', [Validators.required]],
      feename: ['', [Validators.required, Validators.maxLength(100)]],
      feeamount: ['', [Validators.required, Validators.maxLength(10)]],
      shortdescription: ['', [Validators.maxLength(100)]]
    });
  }
}
