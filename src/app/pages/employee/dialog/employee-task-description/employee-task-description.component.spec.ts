import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskDescriptionComponent } from './employee-task-description.component';

describe('EmployeeTaskDescriptionComponent', () => {
  let component: EmployeeTaskDescriptionComponent;
  let fixture: ComponentFixture<EmployeeTaskDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeTaskDescriptionComponent]
    });
    fixture = TestBed.createComponent(EmployeeTaskDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
