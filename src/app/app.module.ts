// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Component
import {AppComponent} from './app.component';
import {BlogpostComponent} from './blogpost/blogpost.component';
import {BlogpostListComponent} from './blogpost-list/blogpost-list.component';
import {ErrorpageComponent} from './errorpage/errorpage.component';
import {BlogpostCreateComponent} from './blogpost-create/blogpost-create.component';
import {AdminComponent} from './admin/admin.component';

// Module
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    BlogpostComponent,
    BlogpostListComponent,
    ErrorpageComponent,
    AdminComponent,
    BlogpostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
