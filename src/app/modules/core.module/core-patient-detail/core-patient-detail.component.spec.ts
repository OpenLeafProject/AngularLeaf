import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePatientDetailComponent } from './core-patient-detail.component';

describe('CorePatientDetailComponent', () => {
  let component: CorePatientDetailComponent;
  let fixture: ComponentFixture<CorePatientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorePatientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorePatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
