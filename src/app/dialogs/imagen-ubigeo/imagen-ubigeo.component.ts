import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-imagen-ubigeo',
  templateUrl: './imagen-ubigeo.component.html',
  styleUrls: ['./imagen-ubigeo.component.css']
})
export class ImagenUbigeoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ImagenUbigeoComponent>) { }

  ngOnInit() {
  
  }
  
  close() {
    this.dialogRef.close();
  }
}
