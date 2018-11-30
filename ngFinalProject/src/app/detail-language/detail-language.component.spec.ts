import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLanguageComponent } from './detail-language.component';

describe('DetailLanguageComponent', () => {
  let component: DetailLanguageComponent;
  let fixture: ComponentFixture<DetailLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
