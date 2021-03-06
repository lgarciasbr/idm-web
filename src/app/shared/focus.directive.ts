import { Directive, OnInit, Input, EventEmitter, ElementRef, Inject } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnInit{
  @Input('focus') focusEvent: EventEmitter<boolean>;

  constructor(@Inject(ElementRef)
              private element: ElementRef){
  }

  ngOnInit(){
    // Work at first click, after that only works if I hide the view
    this.focusEvent.subscribe(event => {
      this.element.nativeElement.focus();
    });

    // I don' know why, works at the second click ...
    this.element.nativeElement.focus();
  }

}
