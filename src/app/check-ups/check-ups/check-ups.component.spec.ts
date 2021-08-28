import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpsComponent } from './check-ups.component';

describe('CheckUpsComponent', () => {
  let component: CheckUpsComponent;
  let fixture: ComponentFixture<CheckUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
