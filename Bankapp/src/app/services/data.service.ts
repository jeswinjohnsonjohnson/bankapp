import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//overload header
const options = {
  headers: new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})

export class DataService {



  constructor(private http: HttpClient) {
  }


  register(acno: any, username: any, password: any) {
    const data = { acno, username, password }
    return this.http.post('http://localhost:3000/register', data)
  }




  login(acno: any, psw: any) {
    const data = { acno, psw }
    return this.http.post('http://localhost:3000/login', data)
  }




  
  getToken() {
    //fetch the token from local storage
    const token = JSON.parse(localStorage.getItem('token') || '')

    //1.append token inside headers


    //1.2 create header 
    let headers = new HttpHeaders()
    //1.3 appent token to header
    if (token) {
      options.headers = headers.append('token1', token)
    }
    return options

  }




  deposit(acno: any, pswd: any, amt: any) {
    const data = { acno, pswd, amt }
    return this.http.post('http://localhost:3000/deposit', data, this.getToken())
  }



  withdraw(acno: any, pswd: any, amt: any) {
    const data = { acno, pswd, amt }
    return this.http.post('http://localhost:3000/withdraw', data, this.getToken())
  }



  getTransation(acno: any) {
    const data = { acno }
    return this.http.post('http://localhost:3000/transaction', data, this.getToken())
  }

deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteacc/'+acno)
}


}

