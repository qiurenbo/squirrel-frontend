import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrSelectComponent } from './addr-select.component';

describe('AddrSelectComponent', () => {
  let component: AddrSelectComponent;
  let fixture: ComponentFixture<AddrSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
