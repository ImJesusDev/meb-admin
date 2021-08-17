import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairPendingComponent } from './repair-pending.component';

describe('RepairPendingComponent', () => {
  let component: RepairPendingComponent;
  let fixture: ComponentFixture<RepairPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
