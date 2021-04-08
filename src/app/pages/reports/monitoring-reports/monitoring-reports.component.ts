import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-monitoring-reports',
  templateUrl: './monitoring-reports.component.html',
  styleUrls: ['./monitoring-reports.component.scss']
})
export class MonitoringReportsComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  display:boolean = false;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(calendar: NgbCalendar) {
    console.log(this.toDate, 'todate')
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  ngOnInit(){}
  onDateSelection(date: NgbDate) {
    alert('ájsdk')
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      console.log('not selected')
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.display = false;
    } else {
      console.log('from date')
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
