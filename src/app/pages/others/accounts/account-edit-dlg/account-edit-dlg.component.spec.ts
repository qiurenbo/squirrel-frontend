import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditDlgComponent } from './account-edit-dlg.component';

describe('AccountEditDlgComponent', () => {
  let component: AccountEditDlgComponent;
  let fixture: ComponentFixture<AccountEditDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEditDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
