import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AccountsService} from "../accounts.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'}
    ],
    'balance': [
      {type: 'required', message: 'Starting balance is required.'}
    ],
    'color': [
      {type: 'required', message: 'Picking color is required.'},
    ]
  };

  constructor(public accountsService: AccountsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      balance: [this.item.balance, Validators.required],
      color: [this.item.color, Validators.required]
    });
  }

  onSubmit(value) {
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.accountsService.updateAccount(this.item.id, value)
      .then(
        res => {
          this.navigateBack();
        }
      )
  }

  delete() {
    this.accountsService.deleteAccount(this.item.id)
      .then(
        res => {
          this.navigateBack();
        },
        err => {
          console.log(err);
        }
      )
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

}
