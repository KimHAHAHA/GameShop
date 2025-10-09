import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACode } from './a-code';

describe('ACode', () => {
  let component: ACode;
  let fixture: ComponentFixture<ACode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ACode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ACode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
