import { Component, OnInit } from '@angular/core';
import { vendorsDB } from '../../../shared/tables/vendor-list';

@Component({
  selector: 'app-list-vendors',
  templateUrl: './list-vendors.component.html',
  styleUrls: ['./list-vendors.component.scss']
})
export class ListVendorsComponent implements OnInit {
  public vendors = [];

  constructor() {
    this.vendors = vendorsDB.data;
  }

  public settings = {
    actions: {
      position: 'right',
      title: 'Opciones'
    },
    columns: {
      vendor: {
        title: 'Nombres',
        type: 'html',
      },
      products: {
        title: 'Telefono'
      },
      store_name: {
        title: 'Empresa'
      },
      // date: {
      //   title: ' fecha de registro'
      // },
      balance: {
        title: 'Ultima Compra (S/.)',
      },
      // revenue: {
      //   title: 'Ingresos',
      // }
    },
  };

  ngOnInit() {
  }

}
