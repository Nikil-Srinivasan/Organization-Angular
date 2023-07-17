import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAppointComponent } from './manager-appoint.component';

describe('ManagerAppointComponent', () => {
  let component: ManagerAppointComponent;
  let fixture: ComponentFixture<ManagerAppointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerAppointComponent]
    });
    fixture = TestBed.createComponent(ManagerAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
