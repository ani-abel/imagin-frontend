import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpenOptionTab]',
  exportAs: "appOpenOptionTab"
})
export class OpenOptionTabDirective {
  isOpen: boolean = false;

  constructor(private readonly el: ElementRef) {}

  @HostListener("click", ["$event"])
  clickHandler(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  @HostListener("window:click", ["$event"])
  windowClickListener(event: MouseEvent): void {
    this.isOpen = false;
  }

}
