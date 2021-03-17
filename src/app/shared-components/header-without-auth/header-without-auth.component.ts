import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-without-auth',
  template: `
    <header class="baseline-section text-center">
        <h1 class="app-title no-margin pt-20">IMAGEN</h1>
    </header>
  `,
  styles: []
})
export class HeaderWithoutAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
