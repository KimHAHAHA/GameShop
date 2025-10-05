import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UEditProfile } from './u-edit-profile';

describe('UEditProfile', () => {
  let component: UEditProfile;
  let fixture: ComponentFixture<UEditProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UEditProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UEditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
