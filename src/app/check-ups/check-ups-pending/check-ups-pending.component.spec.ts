import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpsPendingComponent } from './check-ups-pending.component';

describe('CheckUpsPendingComponent', () => {
  let component: CheckUpsPendingComponent;
  let fixture: ComponentFixture<CheckUpsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpsPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
