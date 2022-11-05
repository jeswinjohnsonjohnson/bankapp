import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteconfirmComponent } from '../deleteconfirm/deleteconfirm.component'; 
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  sDetails: any

  acnum: any



  user = ''

  acno = ""
  pswd = ""
  amt = ""

  acno1 = ""
  pswd1 = ""
  amt1 = ""

  //model to registration form
  depositForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern("[0-9]*")]],
    pswd: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]],
    amt: ["", [Validators.required, Validators.pattern("[0-9]*")]]
  })


  withdrawForm = this.fb.group({
    acno1: ["", [Validators.required, Validators.pattern("[0-9]*")]],
    pswd1: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]],
    amt1: ["", [Validators.required, Validators.pattern("[0-9]*")]]
  })





  constructor(private ds: DataService, private router: Router, private fb: FormBuilder)
   {
    if(localStorage.getItem('currentUser')){
    this.user = JSON.parse(localStorage.getItem('currentUser') || '')
    }
    this.sDetails = new Date()
  }




  ngOnInit(): void {

    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }

  }






  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amt = this.depositForm.value.amt
    if (this.depositForm.valid) {

      this.ds.deposit(acno, pswd, amt).subscribe((result: any) => {
        alert(result.message)
      },
        result => {
          alert(result.error.message)
        }
      )
    }
    else {
      alert('invalid form')
    }

  }






  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amt = this.withdrawForm.value.amt1
    if (this.withdrawForm.valid) {

      this.ds.withdraw(acno, pswd, amt).subscribe((result: any) => {
        alert(result.message)
      },
        result => {
          alert(result.error.message)
        }
      )
    }
    else {
      alert('invalid form')
    }

  }




  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    this.router.navigateByUrl('')

  }




  deleteconfirm() {
    this.acnum = JSON.parse(localStorage.getItem('currentAcno') || '')

  }





  oncancelNew() {
    this.acnum = ""
  }





  onDelete(event:any){
    //alert(event)
    this.ds.deleteAcc(event).subscribe((result: any) => {
      alert(result.message)
      this.router.navigateByUrl('')
    },
      result => {
        alert(result.error.message)
      })
  }

}


