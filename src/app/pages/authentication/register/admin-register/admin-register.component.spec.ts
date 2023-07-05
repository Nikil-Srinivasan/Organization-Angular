import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideAdminRegisterComponent } from './admin-register.component';

describe('AdminRegisterComponent', () => {
  let component: AppSideAdminRegisterComponent;
  let fixture: ComponentFixture<AppSideAdminRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSideAdminRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSideAdminRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
