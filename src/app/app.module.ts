import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SideComponent } from './side/side.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxSummernoteModule } from 'ngx-summernote';
import { DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSummernoteModule
  ],
  providers: [DeviceDetectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
