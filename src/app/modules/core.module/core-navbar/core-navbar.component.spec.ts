import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreNavbarComponent } from './core-navbar.component';

describe('CoreNavbarComponent', () => {
  let component: CoreNavbarComponent;
  let fixture: ComponentFixture<CoreNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
