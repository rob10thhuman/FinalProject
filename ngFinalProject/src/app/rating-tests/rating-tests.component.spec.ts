import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingTestsComponent } from './rating-tests.component';

describe('RatingTestsComponent', () => {
  let component: RatingTestsComponent;
  let fixture: ComponentFixture<RatingTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
