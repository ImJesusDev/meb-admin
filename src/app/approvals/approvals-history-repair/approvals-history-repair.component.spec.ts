import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsHistoryRepairComponent } from './approvals-history-repair.component';

describe('ApprovalsHistoryRepairComponent', () => {
  let component: ApprovalsHistoryRepairComponent;
  let fixture: ComponentFixture<ApprovalsHistoryRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsHistoryRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsHistoryRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
