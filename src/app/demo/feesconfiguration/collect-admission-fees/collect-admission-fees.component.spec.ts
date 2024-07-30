import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectAdmissionFeesComponent } from './collect-admission-fees.component';

describe('CollectAdmissionFeesComponent', () => {
  let component: CollectAdmissionFeesComponent;
  let fixture: ComponentFixture<CollectAdmissionFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectAdmissionFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectAdmissionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
