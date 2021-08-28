import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePendingComponent } from './maintenance-pending.component';

describe('MaintenancePendingComponent', () => {
  let component: MaintenancePendingComponent;
  let fixture: ComponentFixture<MaintenancePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenancePendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
