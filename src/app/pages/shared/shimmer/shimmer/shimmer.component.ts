import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shimmer',
  templateUrl: './shimmer.component.html',
  styleUrls: ['./shimmer.component.scss']
})
export class ShimmerComponent implements OnInit {
  @Input() spinner:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}