import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDlgComponent } from './edit-dlg.component';

describe('EditDlgComponent', () => {
  let component: EditDlgComponent;
  let fixture: ComponentFixture<EditDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
