import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpsHistoryComponent } from './check-ups-history.component';

describe('CheckUpsHistoryComponent', () => {
  let component: CheckUpsHistoryComponent;
  let fixture: ComponentFixture<CheckUpsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
