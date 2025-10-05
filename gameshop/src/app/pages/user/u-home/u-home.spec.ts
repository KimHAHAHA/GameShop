import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UHome } from './u-home';

describe('UHome', () => {
  let component: UHome;
  let fixture: ComponentFixture<UHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
