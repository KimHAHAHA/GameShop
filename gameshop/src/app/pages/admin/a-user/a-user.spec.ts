import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AUser } from './a-user';

describe('AUser', () => {
  let component: AUser;
  let fixture: ComponentFixture<AUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
