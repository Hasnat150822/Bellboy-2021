<<<<<<< HEAD
import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'platform'
})
export class DomHandlingService {

  constructor(
    private rendrer2:Renderer2,
    private el:ElementRef
  ) { }

  changeDome(preLi, currLi, preA, currA, currCont){
    let previous_li = this.el.nativeElement.querySelector(preLi);
    let all_activeA:[] = this.el.nativeElement.querySelectorAll('a.active');
    let all_activeCont = this.el.nativeElement.querySelector('div.show');
    let all_activeLi:[] = this.el.nativeElement.querySelectorAll('li.current');
    let current_li = this.el.nativeElement.querySelector(currLi);
    let prevoius_a = this.el.nativeElement.querySelector(preA);
    let current_a = this.el.nativeElement.querySelector(currA);
    let current_content:HTMLElement = this.el.nativeElement.querySelector(currCont);
    all_activeA.forEach((el:HTMLElement)=>{
      this.rendrer2.removeClass(el, 'active');
    })
    all_activeLi.forEach((el:HTMLElement)=>{
      this.rendrer2.removeClass(el, 'active');
    })
    all_activeCont.classList.remove('show', 'active');
    this.rendrer2.addClass(current_li, 'current');
    this.rendrer2.addClass(prevoius_a, 'done');
    this.rendrer2.addClass(current_a, 'active');
    this.rendrer2.addClass(previous_li, 'done');
    current_content.classList.add('show', 'active');
  }
=======
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomHandlingService {

  constructor() { }
>>>>>>> webfix/bellboy-copy
}
