import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-widget-without-controls',
  templateUrl: './photo-widget-without-controls.component.html',
  styles: []
})
export class PhotoWidgetWithoutControlsComponent implements OnInit {
  @Input() file: File;

  constructor() { }

  ngOnInit(): void { }

}
