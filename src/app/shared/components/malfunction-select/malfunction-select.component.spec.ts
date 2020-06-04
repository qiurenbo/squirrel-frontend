import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunctionSelectComponent } from './malfunction-select.component';

describe('MalfunctionSelectComponent', () => {
  let component: MalfunctionSelectComponent;
  let fixture: ComponentFixture<MalfunctionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfunctionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
