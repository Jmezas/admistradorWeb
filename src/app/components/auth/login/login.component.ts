import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';  
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { errorHandler } from 'src/app/components/utils/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  info;
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private auth: AuthService, private router: Router) {
    this.createLoginForm(); 
  }
 

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      user: [''],
      password: [''],
    })
  }
  
  ngOnInit() {
  }

  onSubmit() {
    
  }


  login() {
    this.loading = true;
  
 
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(data => {
      this.router.navigateByUrl('/users/list-user');
      this.loading = false;
    }, (resp) => {
      const content = errorHandler(resp);
      this.info = { show: true, message: content.message, class: 'alert alert-danger', persist: content.persist || false };
      console.log( this.info)
      this.loading = false;
    });
  }


}
