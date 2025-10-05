import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AHome } from './a-home';

describe('AHome', () => {
  let component: AHome;
  let fixture: ComponentFixture<AHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
