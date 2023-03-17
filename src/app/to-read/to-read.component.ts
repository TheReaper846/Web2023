import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-read',
  templateUrl: './to-read.component.html',
  styleUrls: ['./to-read.component.css']
})
export class ToReadComponent implements OnInit {
  @Input() books: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
