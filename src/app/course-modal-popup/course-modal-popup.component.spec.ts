import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModalPopupComponent } from './course-modal-popup.component';

describe('CourseModalPopupComponent', () => {
  let component: CourseModalPopupComponent;
  let fixture: ComponentFixture<CourseModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseModalPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
