import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit, OnChanges {
  @Input() pager;
  @Output() pagerObservable = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

  sendPage(page){
    this.pagerObservable.next(page);
  }

}
