import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UProflie } from './u-proflie';

describe('UProflie', () => {
  let component: UProflie;
  let fixture: ComponentFixture<UProflie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UProflie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UProflie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
