import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule

  ],
  exports: [
    CreateComponent
  ],
  declarations: [
    CreateComponent
  ],
  providers: [
  ],
})
export class CreateModule { }
