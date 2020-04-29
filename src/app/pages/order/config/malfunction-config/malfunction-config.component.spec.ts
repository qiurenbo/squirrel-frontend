import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunctionConfigComponent } from './malfunction-config.component';

describe('MalfunctionConfigComponent', () => {
  let component: MalfunctionConfigComponent;
  let fixture: ComponentFixture<MalfunctionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfunctionConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
