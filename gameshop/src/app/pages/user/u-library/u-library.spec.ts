import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ULibrary } from './u-library';

describe('ULibrary', () => {
  let component: ULibrary;
  let fixture: ComponentFixture<ULibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ULibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ULibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
