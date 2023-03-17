import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {
  @Input() books: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
