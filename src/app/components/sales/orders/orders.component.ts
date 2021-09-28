import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { orderDB } from "../../../shared/tables/order-list";
import { CustomersService } from "../../../providers/customers.service";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [DatePipe]

})
export class OrdersComponent implements OnInit {
  public order:any = [];
  public temp = [];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private api: CustomersService,private datePipe: DatePipe) {
    //this.order = orderDB.list_order;

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
    this.api.getOrders().subscribe(res => {
      console.log(res)
    

      let array = res["order"].map(item => {
        return {
          orden: item['orden'], 
          cliente: `${item["cliente"]["firstname"]}   ${item["cliente"]["lastname"]}  ${item["cliente"]["email"]}`,
          fecha:  this.datePipe.transform(item["createdOn"], 'dd/MM/yyyy'),
          Plataforma:item["title"],
          status:"<span class='badge badge-warning'>Procesando</span>",
          total:this.calcular(item['product'])
        }
      })
      this.order=array
    })
  }

  calcular(product){
    let element=0 
    for (let i = 0; i < product.length; i++) {
      element = element+product[i]["price"]* product[i]["quantity"];
      
    }
    return element;
  }


}
