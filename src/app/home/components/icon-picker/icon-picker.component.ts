import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {OptionInterface} from "../validation-messages.interface";

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {
  @Input() name: string;
  @Input('formGroup') group: FormGroup;
  @Input('controlName') controlName: string;
  @Input('colorControlName') colorControlName: string;
  @Input('options') options: OptionInterface[];
  color = '#000';

  constructor() {
  }

  ngOnInit() {

  }

  updateColor(color: string) {
    this.group.get(this.colorControlName).setValue(color);
  }
}
