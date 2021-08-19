import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCommentaryModalComponent } from './component-commentary-modal.component';

describe('ComponentCommentaryModalComponent', () => {
  let component: ComponentCommentaryModalComponent;
  let fixture: ComponentFixture<ComponentCommentaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentCommentaryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCommentaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
