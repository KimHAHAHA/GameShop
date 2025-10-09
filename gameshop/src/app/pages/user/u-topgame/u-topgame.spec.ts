import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UTopgame } from './u-topgame';

describe('UTopgame', () => {
  let component: UTopgame;
  let fixture: ComponentFixture<UTopgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UTopgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UTopgame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
