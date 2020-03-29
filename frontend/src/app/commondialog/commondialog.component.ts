import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-commondialog',
  templateUrl: './commondialog.component.html',
  styleUrls: ['./commondialog.component.css']
})
export class CommondialogComponent implements OnInit {
  products
  constructor(public dialogRef: MatDialogRef<CommondialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.products = this.data;
    console.log(this.products);
  }

}
