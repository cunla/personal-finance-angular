import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountInterface, AccountsService} from "../accounts.service";
import {ACCOUNT_ICON_OPTIONS, CURRENCY_OPTIONS} from "../constants";
import {MatSelectChange} from "@angular/material";

@Component({
  selector: 'app-edit-user',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  accountIconOptions = ACCOUNT_ICON_OPTIONS;
  currnecyOptions = CURRENCY_OPTIONS;
  accountForm: FormGroup;
  item: AccountInterface;

  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'}
    ],
    'starting_balance': [
      {type: 'required', message: 'Starting balance is required.'}
    ]
  };
  private editMode: boolean;


  constructor(public accountsService: AccountsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {

    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data.payload) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.editMode = true;
      } else {
        this.item = data;
        this.editMode = false;
      }
      this.createForm();
    });
  }

  ngOnInit() {

  }


  onSubmit(value) {
    if (this.editMode) {
      this.accountsService.updateAccount(this.item.id, value).then(
        res => {
          this.navigateBack();
        }
      );
    } else {
      this.accountsService.createAccount(value).then(
        res => {
          this.navigateBack();
        }
      );
    }
  }

  delete() {
    this.accountsService.deleteAccount(this.item.id).then(
      res => {
        this.navigateBack();
      }, err => {
        console.log(err);
      });
  }

  navigateBack() {
    this.router.navigate(['/home']).then();
  }

  private createForm() {
    this.accountForm = this.fb.group({
      name: [this.item.name, Validators.required],
      starting_balance: [this.item.starting_balance, Validators.required],
      color: [this.item.color, Validators.required],
      icon: [this.item.icon, Validators.required],
      currency_icon: [this.item.currency_icon, Validators.required],
      currency: [this.item.currency, Validators.required],
    });
  }

  currencySelect(event: MatSelectChange) {
    console.log(event);
    this.accountForm.get('currency').setValue(event.value.name);
    this.accountForm.get('currency_icon').setValue(event.value.icon);
  }
}
