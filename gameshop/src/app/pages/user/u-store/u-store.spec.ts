import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UStore } from './u-store';

describe('UStore', () => {
  let component: UStore;
  let fixture: ComponentFixture<UStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
