import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAddgame } from './a-addgame';

describe('AAddgame', () => {
  let component: AAddgame;
  let fixture: ComponentFixture<AAddgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AAddgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AAddgame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
