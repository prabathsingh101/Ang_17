import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesconfigurationComponent } from './feesconfiguration.component';

describe('FeesconfigurationComponent', () => {
  let component: FeesconfigurationComponent;
  let fixture: ComponentFixture<FeesconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesconfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeesconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
