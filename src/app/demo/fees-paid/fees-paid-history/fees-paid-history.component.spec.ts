import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPaidHistoryComponent } from './fees-paid-history.component';

describe('FeesPaidHistoryComponent', () => {
  let component: FeesPaidHistoryComponent;
  let fixture: ComponentFixture<FeesPaidHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesPaidHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeesPaidHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
