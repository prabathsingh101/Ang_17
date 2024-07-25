import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeestypesComponent } from './feestypes.component';

describe('FeestypesComponent', () => {
  let component: FeestypesComponent;
  let fixture: ComponentFixture<FeestypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeestypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeestypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
