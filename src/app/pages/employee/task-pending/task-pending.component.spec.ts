import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPendingComponent } from './task-pending.component';

describe('TaskPendingComponent', () => {
  let component: TaskPendingComponent;
  let fixture: ComponentFixture<TaskPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
