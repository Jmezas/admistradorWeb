import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../providers/users.service';
import { errorHandler } from '../../utils';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  usersForm: FormGroup;
  filter = { nombre: '', email: '', skip: 0, limit: 10 };
  users = [];
  loading = true;
  total;
  info;

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  selectedName: string = "";
  closeResult: string;
  public order = [];
  public temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('close', { static: true }) close: ElementRef;
  constructor(private userAPI: UsersService, private modalService: NgbModal, private fb: FormBuilder) { }
  ngOnInit() {
    this.loadList();
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


  columns = [

    { name: 'Role', prop: 'role' },
    { name: 'Nombres', prop: 'nombre' },
    { name: 'Apelldios', prop: 'apellido' },
    { name: 'Email', prop: 'email' },
    // { name: 'Tipo Doc', prop: 'typeDoc' },
  ];

  loadList() {
    this.loading = true;
    this.userAPI.getUsers(this.filter).subscribe((resp: any) => {
      console.log(resp)
      this.loading = false;
      this.users = resp.users;
      console.log(this.users)
      this.total = Math.ceil(resp.total / this.filter.limit);
      this.total = Array(this.total).fill(0).map((x, i) => i);
    }, (resp) => {
      const content = errorHandler(resp);
      this.info = { show: true, message: content.message, class: 'alert alert-danger', persist: content.persist || false };
      this.loading = false;
    });
  }
  updateFilter(event) {
    console.log(event)
    const val = event.target.value.toLowerCase();
    this.filter.nombre = val;
    this.userAPI.getUsers(this.filter).subscribe((resp: any) => {
      console.log(resp)
      // update the rows
      this.users = resp.users;
    })


    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  delete(value) {
    swal.fire({
      title: '¿estas seguro de eliminar?',

      showCancelButton: true,
      confirmButtonText: `Si`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.userAPI.deleteUser(value).subscribe(res => {

          this.loadList();
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'se ah eliminado correctamente!',
            showConfirmButton: false,
            timer: 1500
          })
        }, (rip) => {
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
  update(modal, value) {

    this.obtenerUser(value);
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  obtenerUser(value) {
    this.userAPI.getUser(value).subscribe(data => {

      this.usersForm.controls['role'].setValue(data['role'])
      this.usersForm.controls['document'].setValue(data['document'])
      this.usersForm.controls['name'].setValue(data['name'])
      this.usersForm.controls['email'].setValue(data['email'])
      this.usersForm.controls['phone'].setValue(data['phone'])
      this.usersForm.controls['user'].setValue(data['user'])
      this.usersForm.controls['address'].setValue(data['address'])
      this.usersForm.controls['id'].setValue(data['_id'])
    })
  }
  updateUser(id) {
    this.userAPI.updateUser(id.value, this.usersForm.value).subscribe(data => {


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


    this.userAPI.createUser(this.usersForm.value).subscribe(res => {

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

