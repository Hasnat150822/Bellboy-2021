import { animate, style, transition, trigger } from '@angular/animations';
export const flyInOutAnimation = 
trigger('flyInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('200ms', style({ opacity: 0 }))
    ])
  ]);