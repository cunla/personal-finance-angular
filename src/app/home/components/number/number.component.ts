import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-number',
  template: `<span [outerHTML]="html"></span>`,
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  @Input('value') value: number;
  html: string;

  constructor() {
  }


  ngOnInit() {
    const val = this.value || 0;
    const splitted = val.toFixed(1).split('.');
    this.html = `${splitted[0]}<small>.${splitted[1]}</small>`;
  }
}
