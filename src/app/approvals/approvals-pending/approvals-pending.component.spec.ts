import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsPendingComponent } from './approvals-pending.component';

describe('ApprovalsPendingComponent', () => {
  let component: ApprovalsPendingComponent;
  let fixture: ComponentFixture<ApprovalsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
