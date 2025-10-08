import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADetails } from './a-details';

describe('ADetails', () => {
  let component: ADetails;
  let fixture: ComponentFixture<ADetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ADetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ADetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
