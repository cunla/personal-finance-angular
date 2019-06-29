import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {OptionInterface, ValidationMessageInterface} from "../validation-messages.interface";

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.css']
})
export class IconPickerComponent implements OnInit {
  @Input('name') name: string;
  @Input('formGroup') group: FormGroup;
  @Input('validationMessages') validationMessages: ValidationMessageInterface[];
  @Input('controlName') controlName: string;
  @Input('options') options: OptionInterface[];

  constructor() {
  }

  ngOnInit() {

  }

}
