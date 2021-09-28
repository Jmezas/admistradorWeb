import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../../providers/customers.service'
import { errorHandler } from '../../utils/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {
  loading = false;
  filter = {name:'', skip: 0, limit: 10 };
  customer = [];
  info;
  usersForm:FormGroup
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  selectedName: string = "";
  closeResult: string;
  public order = [];
  public temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private apiCustomer: CustomersService,private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
  this. loadList();
  this.usersForm = this.fb.group({
    id: ['', [Validators.required]],
    role: ['', [Validators.required]],
    document: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })
  }
  loadList() {
    this.loading = true;

    this.apiCustomer.getCustomers(this.filter).subscribe(res => {
      this.loading = false;
      this.customer = res['customer']
    }, (resp) => {
      const content = errorHandler(resp);
      this.info = { show: true, message: content.message, class: 'alert alert-danger', persist: content.persist || false };
      this.loading = false;
    })
  }
  columns = [

    { name: 'documento', prop: 'document' },
    { name: 'Nombre', prop: 'name' },
    { name: 'Email', prop: 'email' },
    { name: 'Estado', prop: 'status' },
    { name: 'responsable', prop: 'responsable' },
  ];
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.filter.name = val;
    this.apiCustomer.getCustomers(this.filter).subscribe((resp: any) => {
      // update the rows
      this.apiCustomer = resp.customer;
    })


    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  update(modal, value) {

   
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  delete(value) {

   
    swal.fire({
      title: '¿estas seguro de eliminar?',
      
      showCancelButton: true,
      confirmButtonText: `Si`, 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      
        this.apiCustomer.deleteCustomer(value).subscribe(res => {
      
          this.loadList();
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'se ah eliminado correctamente ayaa mano!',
            showConfirmButton: false,
            timer: 1500
          })
        },(rip)=>{
          console.log(rip)
          swal.fire({
            position: 'top-end',
            icon: 'error',
            title: rip,
            showConfirmButton: false,
            timer: 1500
          })
        })
      } else if (result.isDenied) {
        swal.fire('Changes are not saved', '', 'info')
      }
    })

  
  }
  openCreate(content) {
    this.usersForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    debugger;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateUser(id) {
    this.apiCustomer.updateCustomer(id.value, this.usersForm.value).subscribe(data => {


      this.loadList();


      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'se ha actualizado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
      this.modalService.dismissAll()
      this.usersForm.reset();

    }, (resp) => {
      const content = errorHandler(resp);
      this.info = { show: true, message: content.message, class: 'alert alert-danger', persist: content.persist || false };
      this.loading = false;
    })
  }


  createUser() {


    this.apiCustomer.createCustomer(this.usersForm.value).subscribe(res => {

      this.loadList();
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'se ha registrado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })

      this.modalService.dismissAll()
      this.usersForm.reset();
    }, (resp) => {
      const content = errorHandler(resp);
      this.info = { show: true, message: content.message, class: 'alert alert-danger', persist: content.persist || false };
      this.loading = false;
    })
  }
}
