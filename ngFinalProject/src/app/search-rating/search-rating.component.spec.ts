import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRatingComponent } from './search-rating.component';

describe('SearchRatingComponent', () => {
  let component: SearchRatingComponent;
  let fixture: ComponentFixture<SearchRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
