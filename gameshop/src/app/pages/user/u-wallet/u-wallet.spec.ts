import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UWallet } from './u-wallet';

describe('UWallet', () => {
  let component: UWallet;
  let fixture: ComponentFixture<UWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
