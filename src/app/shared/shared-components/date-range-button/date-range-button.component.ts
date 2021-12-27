import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range-button',
  templateUrl: './date-range-button.component.html',
  styleUrls: ['./date-range-button.component.css']
})
export class DateRangeButtonComponent implements OnInit {

  today; 
  markDisabled;
  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any;
  @Output() onSelectDate = new EventEmitter<{}>();
  constructor(private el:ElementRef, private calendar:NgbCalendar) { }

  ngOnInit(): void {
    this.today = this.calendar.getToday(); //date in object formate
    this.markDisabled = (date: NgbDate, current: { month: number }) =>
    (date.day>this.today.day && date.month === this.today.month);
  }


  showDatePick(id){
    let element:HTMLElement = this.el.nativeElement.querySelector('#datepicker1');
    element.classList.toggle('d-none');
  }  
  // range selection start
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      let element:HTMLElement = this.el.nativeElement.querySelector('#datepicker1');
      element.classList.toggle('d-none');
      this.fromDate = new Date(this.fromDate.year+'-'+this.fromDate.month+
      '-'+this.fromDate.day);
      this.fromDate.setDate(this.fromDate.getDate()+1);
      this.toDate = new Date(this.toDate.year+'-'+this.toDate.month+
      '-'+this.toDate.day);
      this.toDate.setDate(this.toDate.getDate()+1);
      this.onSelectDate.next({
        fromDate:this.fromDate.toISOString(),
        toDate:this.toDate.toISOString()
      })
    } else {
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
