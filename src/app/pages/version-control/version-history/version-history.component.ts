import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VersionList } from '../model/version-list';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit {
  @Input() versionList:VersionList;
  @Output() id = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  sendId(id){
    this.id.emit(id);
  }
}
