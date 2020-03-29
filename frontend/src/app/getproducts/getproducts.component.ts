import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CommondialogComponent } from '../commondialog/commondialog.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-getproducts',
  templateUrl: './getproducts.component.html',
  styleUrls: ['./getproducts.component.css']
})
export class GetproductsComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,public userService:UserService, public dialog : MatDialog) { }
  categories:any
  products:any;
  ngOnInit() {
    this.spinner.show()
    this.userService.getAllProducts().subscribe(data=>{
      this.spinner.hide()
      this.categories = data
    })
  }
  getCount(data){
    this.spinner.show()
    this.userService.getProducts(data._id).subscribe(data=>{
      this.products = data;
      this.spinner.hide()
      console.log(this.products)
      let dialogRef = this.dialog.open(CommondialogComponent, {
        data: this.products,
        width:'500px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    })
  }

  logout(event) {
    event.stopPropagation();
    this.userService.logout();
  }
}
