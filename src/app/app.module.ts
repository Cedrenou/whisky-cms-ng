import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogpostComponent,
    BlogpostListComponent,
    ErrorpageComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
