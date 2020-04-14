import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchVerificationComponent } from './batch-verification.component';

describe('BatchVerificationComponent', () => {
  let component: BatchVerificationComponent;
  let fixture: ComponentFixture<BatchVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
