﻿import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverurl = this.frontendconfig.getserverurl();


  constructor(
    public http: HttpClient,
    public frontendconfig: FrontEndConfig,
    public router: Router,
    public toast: ToastrService
    ) { }

    public isAuthenticated() {
      const token = JSON.parse(localStorage.getItem('currentUser'));
      // Check whether the token is expired and return
      // true or false
      return token;
    }

    userLogin(loginData) { return this.http.post(this.serverurl + '/auth/local', loginData); }


    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }
    
    
    createUser(user) {
    return this.http.post(this.serverurl + '/api/users/', user);
    }


    getallusers(user) {
      return this.http.post(this.serverurl + '/api/users/paginationrcds',user)
    }
    getAllProducts(){
      return this.http.get(this.serverurl + '/api/categorys')
    }
    getProducts(id) {
      return this.http.get(this.serverurl + '/api/products/'+id)
    }
}