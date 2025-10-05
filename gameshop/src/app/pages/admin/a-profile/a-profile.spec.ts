import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AProfile } from './a-profile';

describe('AProfile', () => {
  let component: AProfile;
  let fixture: ComponentFixture<AProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
