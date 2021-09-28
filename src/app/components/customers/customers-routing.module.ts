import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCustomersComponent } from './list-customers/list-customers.component'

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-customers',
          component: ListCustomersComponent,
          data: {
            title: "customer Listx",
            breadcrumb: "customer List"
          }
        }
    
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
export class CustomersRoutingModule { }