import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from './order.service';
import { AccountService } from './accounts.service';
import { AddrService } from './addr.service';
import { OperatorService } from './operator.service';
import { AuthGuardService } from './auth-guard.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonRequestInterceptor } from './interceptors/json-request.interceptor';
@NgModule({
  declarations: [],
  imports: [SharedModule],
  exports: [],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        OrderService,
        AccountService,
        AddrService,
        OperatorService,
        AuthGuardService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JsonRequestInterceptor,
          multi: true,
        },
      ],
    };
  }
}
