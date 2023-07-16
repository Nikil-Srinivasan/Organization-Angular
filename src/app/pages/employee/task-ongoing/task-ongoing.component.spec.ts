import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOngoingComponent } from './task-ongoing.component';

describe('TaskOngoingComponent', () => {
  let component: TaskOngoingComponent;
  let fixture: ComponentFixture<TaskOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOngoingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
