import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AccountsService} from '../accounts.service';
import {OptionInterface} from '../../components/validation-messages.interface';

export const ACCOUNT_ICON_OPTIONS: OptionInterface[] = [
  {icon: ['fas', 'credit-card'], name: 'Credit card', value: ['fas', 'credit-card']},
  {icon: ['fab', 'cc-visa'], name: 'VISA', value: ['fab', 'cc-visa']},
  {icon: ['fab', 'cc-mastercard'], name: 'MasterCard', value: ['fab', 'cc-mastercard']},
  {icon: ['fas', 'money-bill-wave-alt'], name: 'Cash', value: ['fas', 'money-bill-wave-alt']},
  {icon: ['fas', 'wallet'], name: 'Wallet', value: ['fas', 'wallet']},
  {icon: ['fas', 'piggy-bank'], name: 'Piggy bank', value: ['fas', 'piggy-bank']},
  {icon: ['fas', 'university'], name: 'Bank', value: ['fas', 'university']},
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
  };
  accountIconOptions = ACCOUNT_ICON_OPTIONS;
  color: string;

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
      icon: [['fas', 'users'], Validators.required],
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
    );
  }

}
