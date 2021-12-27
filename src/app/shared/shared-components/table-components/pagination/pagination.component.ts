import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pager:any = {};
  @Output() page = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(){
  }

  setPage(page){
    this.page.next(page);
  }

}