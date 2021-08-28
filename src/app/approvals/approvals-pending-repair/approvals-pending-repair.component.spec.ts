import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsPendingRepairComponent } from './approvals-pending-repair.component';

describe('ApprovalsPendingRepairComponent', () => {
  let component: ApprovalsPendingRepairComponent;
  let fixture: ComponentFixture<ApprovalsPendingRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsPendingRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsPendingRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
