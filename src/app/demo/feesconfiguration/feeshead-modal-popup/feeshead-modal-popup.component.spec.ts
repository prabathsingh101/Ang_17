import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesheadModalPopupComponent } from './feeshead-modal-popup.component';

describe('FeesheadModalPopupComponent', () => {
  let component: FeesheadModalPopupComponent;
  let fixture: ComponentFixture<FeesheadModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesheadModalPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeesheadModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
