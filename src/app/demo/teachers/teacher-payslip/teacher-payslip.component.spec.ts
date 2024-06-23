import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPayslipComponent } from './teacher-payslip.component';

describe('TeacherPayslipComponent', () => {
  let component: TeacherPayslipComponent;
  let fixture: ComponentFixture<TeacherPayslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherPayslipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
