import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePatientSearchComponent } from './core-patient-search.component';

describe('CorePatientSearchComponent', () => {
  let component: CorePatientSearchComponent;
  let fixture: ComponentFixture<CorePatientSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorePatientSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorePatientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
