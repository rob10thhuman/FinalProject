import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLangugageComponent } from './list-langugage.component';

describe('ListLangugageComponent', () => {
  let component: ListLangugageComponent;
  let fixture: ComponentFixture<ListLangugageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLangugageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLangugageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
