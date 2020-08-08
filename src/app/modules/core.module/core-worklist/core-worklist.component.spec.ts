import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreWorklistComponent } from './core-worklist.component';

describe('CoreWorklistComponent', () => {
  let component: CoreWorklistComponent;
  let fixture: ComponentFixture<CoreWorklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreWorklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
