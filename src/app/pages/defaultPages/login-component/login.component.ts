import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup
  submitted:boolean
  inputType = "password";
  eyeToggle:boolean = true
  constructor(private router:Router, private authService:AuthGuard, private fb:FormBuilder){
      this.loginForm = this.fb.group({
        email:['', Validators.required],
        pass:['', Validators.required]
      })
  }
  subitForm(form:FormGroup){
    this.submitted = true
    let obj = form.getRawValue();  
    if(form.valid){
      this.authService.loginUser(obj).then((response:any)=>{
        if(response.isFirebaseUser)
          this.authService.firebaseLogin(obj);
        else
          this.authService.firebaseSignup(obj);
        if(response.success == true)
          this.submitted = false
      })
    }
  }
 }