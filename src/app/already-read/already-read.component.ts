import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-already-read',
  templateUrl: './already-read.component.html',
  styleUrls: ['./already-read.component.css']
})
export class AlreadyReadComponent implements OnInit {
  @Input() books: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
