import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AHistory } from './a-history';

describe('AHistory', () => {
  let component: AHistory;
  let fixture: ComponentFixture<AHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
