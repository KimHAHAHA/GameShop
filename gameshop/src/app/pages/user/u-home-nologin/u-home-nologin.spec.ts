import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UHomeNologin } from './u-home-nologin';

describe('UHomeNologin', () => {
  let component: UHomeNologin;
  let fixture: ComponentFixture<UHomeNologin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UHomeNologin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UHomeNologin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
