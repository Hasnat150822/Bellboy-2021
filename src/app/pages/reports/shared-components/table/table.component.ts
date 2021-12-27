import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableHeadings;
  @Input() apiData:Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

}
