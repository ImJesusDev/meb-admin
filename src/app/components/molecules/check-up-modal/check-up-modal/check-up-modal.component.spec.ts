import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpModalComponent } from './check-up-modal.component';

describe('CheckUpModalComponent', () => {
  let component: CheckUpModalComponent;
  let fixture: ComponentFixture<CheckUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
