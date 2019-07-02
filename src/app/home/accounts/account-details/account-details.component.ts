import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountInterface, AccountsService} from "../accounts.service";
import {ACCOUNT_ICON_OPTIONS} from "../constants";

@Component({
  selector: 'app-edit-user',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  accountIconOptions = ACCOUNT_ICON_OPTIONS;
  accountForm: FormGroup;
  item: AccountInterface;

  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'}
    ],
    'balance': [
      {type: 'required', message: 'Starting balance is required.'}
    ]
  };

  constructor(public accountsService: AccountsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.accountForm = this.fb.group({
      name: [this.item.name, Validators.required],
      balance: [this.item.balance, Validators.required],
      color: [this.item.color, Validators.required],
      icon: [this.item.icon, Validators.required],
    });
  }

  onSubmit(value) {
    this.accountsService.updateAccount(this.item.id, value)
      .then(
        res => {
          this.navigateBack();
        }
      );
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

}
