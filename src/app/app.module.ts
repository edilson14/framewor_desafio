import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from './components/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    ComponentsModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [
    InterceptorService, {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: InterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
