import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreAddNoteComponent } from './core-add-note.component';

describe('CoreAddNoteComponent', () => {
  let component: CoreAddNoteComponent;
  let fixture: ComponentFixture<CoreAddNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreAddNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreAddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
