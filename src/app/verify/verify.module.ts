import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule

  ],
  exports: [
    VerifyComponent
  ],
  declarations: [
    VerifyComponent
  ],
  providers: [
  ],
})
export class VerifyModule { }
