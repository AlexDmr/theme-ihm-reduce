import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  @Input() t: unknown[] = [];
  @Input() editable = false;
  @Input() highlight: number[] = [];

  constructor() { }

  ngOnInit() {
  }

}
