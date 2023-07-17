import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskEditComponent } from './employee-task-edit.component';

describe('EmployeeTaskEditComponent', () => {
  let component: EmployeeTaskEditComponent;
  let fixture: ComponentFixture<EmployeeTaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTaskEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
