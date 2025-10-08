import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UDetails } from './u-details';

describe('UDetails', () => {
  let component: UDetails;
  let fixture: ComponentFixture<UDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
