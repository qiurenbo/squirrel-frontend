import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorEditDlgComponent } from './operator-edit-dlg.component';

describe('OperatorEditDlgComponent', () => {
  let component: OperatorEditDlgComponent;
  let fixture: ComponentFixture<OperatorEditDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorEditDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorEditDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
