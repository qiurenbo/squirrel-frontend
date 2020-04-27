import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorConfigComponent } from './operator-config.component';

describe('OperatorConfigComponent', () => {
  let component: OperatorConfigComponent;
  let fixture: ComponentFixture<OperatorConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
