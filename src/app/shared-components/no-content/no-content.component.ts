import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content',
  template: `
    <div [ngClass]="['no-content-area']">
      <h3 [ngClass]="['no-content-title', 'text-center']">NO CONTENT</h3>
    </div>
  `,
  styles: []
})
export class NoContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
