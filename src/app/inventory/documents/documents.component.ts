import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onBack(): void {
    this.router.navigate(['inventario']);
  }
}
