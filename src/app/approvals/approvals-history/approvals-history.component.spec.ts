import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsHistoryComponent } from './approvals-history.component';

describe('ApprovalsHistoryComponent', () => {
  let component: ApprovalsHistoryComponent;
  let fixture: ComponentFixture<ApprovalsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
