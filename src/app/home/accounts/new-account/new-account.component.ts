import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AccountsService} from "../accounts.service";
import {OptionInterface} from "../../components/validation-messages.interface";

export const ACCOUNT_ICON_OPTIONS: OptionInterface[] = [
  {icon: 'credit-card', name: '', value: 'credit-card'},
  {icon: 'cc-visa', name: '', value: 'cc-visa'},
  {icon: 'cc-mastercard', name: '', value: 'cc-mastercard'},
  {icon: 'money-bill-wave-alt', name: '', value: 'money-bill-wave-alt'},
  {icon: 'wallet', name: '', value: 'wallet'},
];

@Component({
  selector: 'app-new-user',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
  accountForm: FormGroup;
  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'}
    ],
    'balance': [
      {type: 'required', message: 'Starting balance is required.'}
    ],
    'color': [
      {type: 'required', message: 'Picking color is required.'},
    ],
    'icon': [
      {type: 'required', message: 'Picking color is required.'},
    ]
  };
  accountIconOptions = ACCOUNT_ICON_OPTIONS;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private router: Router,
              public accountsService: AccountsService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      balance: ['', Validators.required],
      color: ['', Validators.required],
      icon: ['fas fa-user', Validators.required],
    });
  }

  resetFields() {
    this.accountForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.accountsService.createAccount(value).then(
      res => {
        this.resetFields();
        this.router.navigate(['..']).then();
      }
    )
  }

}
