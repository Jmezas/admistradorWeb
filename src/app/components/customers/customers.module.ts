import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListCustomersComponent } from './list-customers/list-customers.component'; 

import { CustomersRoutingModule } from './customers-routing.module'


@NgModule({
  declarations: [ListCustomersComponent],
  imports: [
    CustomersRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SmartTableModule,
    NgxDatatableModule
  ]
})
export class CustomersModule { }
