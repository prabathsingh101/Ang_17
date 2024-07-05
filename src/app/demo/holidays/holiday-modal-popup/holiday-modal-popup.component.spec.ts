import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayModalPopupComponent } from './holiday-modal-popup.component';

describe('HolidayModalPopupComponent', () => {
  let component: HolidayModalPopupComponent;
  let fixture: ComponentFixture<HolidayModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayModalPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidayModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
