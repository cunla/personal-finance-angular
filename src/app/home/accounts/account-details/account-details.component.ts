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
  private editMode: boolean;

  constructor(public accountsService: AccountsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      balance: [0, Validators.required],
      color: ['#000000', Validators.required],
      icon: [['fas', 'user'], Validators.required],
    });
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data.payload) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.editMode = true;
        this.accountForm.get('name').setValue(this.item.name);
        this.accountForm.get('balance').setValue(this.item.balance);
        this.accountForm.get('color').setValue(this.item.color);
        this.accountForm.get('icon').setValue(this.item.icon);
      } else {
        this.item = data;
        this.editMode = false;
      }
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

}
