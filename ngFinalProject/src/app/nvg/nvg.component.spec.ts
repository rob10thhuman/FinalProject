import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvgComponent } from './nvg.component';

describe('NvgComponent', () => {
  let component: NvgComponent;
  let fixture: ComponentFixture<NvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
