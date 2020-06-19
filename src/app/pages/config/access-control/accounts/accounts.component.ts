import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { AccountService } from 'src/app/core/services/accounts.service';
import { Account } from 'src/app/models/account.model';

import { AccountEditDlgComponent } from './account-edit-dlg/account-edit-dlg.component';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  email: string;
  password: string;
  total: number;
  accounts: Account[] = null;
  selectedAccountId: string = null;

  pageSize = 6;
  pageIndex = 1;
  isLoading = false;
  editAccount: Account;

  constructor(
    private accountService: AccountService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadData() {
    this.isLoading = true;
    this.accountService
      .getAccounts({
        limit: this.pageSize,
        offset: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((a) => {
        this.total = parseInt(a.headers.get('X-Total-Count'));
        this.accounts = a.body;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  onPageIndexChange(index: number) {
    this.loadData();
  }

  add() {
    if (!this.email) {
      return;
    }

    this.accountService
      .postAccount({
        email: this.email,
        username: this.email,
        password: this.password,
      })
      .subscribe(() => {
        this.loadData();
      });
  }

  delete(account: Account) {
    this.accountService.deleteAccount(account).subscribe(() => {
      this.loadData();
    });
  }

  saveData(account: Account) {
    this.accountService.putAccount(account).subscribe(() => {});
  }

  openEditDlg(account: Account) {
    const factory = this.resolver.resolveComponentFactory(
      AccountEditDlgComponent
    );
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = account;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (account) => {
    this.accountService.putAccount(account).subscribe(() => {
      this.loadData();
    });
  };
}
