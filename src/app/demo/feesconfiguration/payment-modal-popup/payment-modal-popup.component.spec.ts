import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModalPopupComponent } from './payment-modal-popup.component';

describe('PaymentModalPopupComponent', () => {
  let component: PaymentModalPopupComponent;
  let fixture: ComponentFixture<PaymentModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentModalPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
