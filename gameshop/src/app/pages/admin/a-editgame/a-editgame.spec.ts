import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEditgame } from './a-editgame';

describe('AEditgame', () => {
  let component: AEditgame;
  let fixture: ComponentFixture<AEditgame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AEditgame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AEditgame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
