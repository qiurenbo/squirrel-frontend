import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { AccountService } from 'src/app/core/accounts.service';
import { Account } from 'src/app/models/account.model';
import { v4 as uuidv4 } from 'uuid';
import { AccountEditDlgComponent } from './account-edit-dlg/account-edit-dlg.component';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  username: string;
  password: string;
  accounts: Account[] = null;
  selectedAccountId: string = null;

  isLoading = false;
  editAccount: Account;

  constructor(
    private accountService: AccountService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.accountService.getAccounts().subscribe((a) => {
      this.accounts = a;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    if (!this.username) {
      return;
    }

    this.accountService
      .postAccount({
        //id: uuidv4(),
        email: this.username,
        username: this.username,
        password: this.password,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(account: Account) {
    this.accountService.deleteAccount(account).subscribe(() => {
      this.loadingData();
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
    account.password = '******';
    dlg.instance.passValue = account;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (account) => {
    this.accountService.putAccount(account).subscribe(() => {
      this.loadingData();
    });
  };
}
