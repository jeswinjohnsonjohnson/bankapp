import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pp-logina',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "your perfect banking parter"
  acnt = "Enter your aco no"
  acno = ""
  psw = ""

  loginForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern("[0-9]+")]],
    psw: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]]
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }




  login() {
    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

    if (this.loginForm.valid) {
      this.ds.login(acno, psw).subscribe((result: any) => {

        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))

        alert(result.message)
        this.router.navigateByUrl('dashboard')
      },
        result => {
          alert(result.error.message)
        }
      )
    }
    else {
      alert("invalid form")
    }

  }




  // login(a:any,b:any){
  //   console.log(a.value);
  //   console.log(b.value);


  //   var acno=a.value
  //   var psw=b.value
  //   let userDetails=this.userDetails
  //   if(acno in userDetails){
  //     if(psw==userDetails[acno]["password"]){
  //       alert("login sucess")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("user not exist")

  //   }
  // }





}
