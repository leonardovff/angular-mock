import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockInterceptor } from './mock-interceptor/mock.interceptor';
import { MockRegister } from './mock-interceptor/mock-register';

import { getSearchSaleRjMock } from './___MOCKS___/search-sale-rj.mock'
import { MockInterface } from './mock-interceptor/mock.interface';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: MockInterceptor, 
      multi: true
    },
    // one away
    // {
    //   provide: MockRegister,
    //   useValue: getSearchSaleRjMock as MockInterface,
    //   multi: true
    // },
    // another away
    {
      provide: MockRegister,
      useValue: [
        getSearchSaleRjMock
      ] as MockInterface[],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
