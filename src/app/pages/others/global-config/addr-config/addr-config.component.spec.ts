import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrConfigComponent } from './addr-config.component';

describe('AddrConfigComponent', () => {
  let component: AddrConfigComponent;
  let fixture: ComponentFixture<AddrConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
