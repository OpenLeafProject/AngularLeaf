import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifyEmailComponent } from './user-verify-email.component';

describe('UserForgotVerifyEmailComponent', () => {
  let component: UserVerifyEmailComponent;
  let fixture: ComponentFixture<UserVerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVerifyEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
