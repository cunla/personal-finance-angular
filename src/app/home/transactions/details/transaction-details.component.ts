import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {TransactionInterface, TransactionsService} from "../transactions.service";
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;


@Component({
  selector: 'app-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transactionForm: FormGroup;
  item: TransactionInterface;

  validation_messages = {
    'title': [
      {type: 'required', message: 'Title is required.'}
    ],
  };
  private editMode: boolean;


  constructor(public transactionsService: TransactionsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location) {

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
    value.lastModifiedTime = firebase.firestore.Timestamp.now();
    value.date = Timestamp.fromDate(value.date);
    if (this.editMode) {
      this.transactionsService.update(this.item.id, value).then(
        () => {
          this.navigateBack();
        }
      );
    } else {
      value.creationTime = Timestamp.now();
      this.transactionsService.create(value).then(
        () => {
          this.navigateBack();
        }
      );
    }
  }

  delete() {
    this.transactionsService.delete(this.item.id).then(
      () => {
        this.navigateBack();
      }, err => {
        console.log(err);
      });
  }

  navigateBack() {
    this.location.back();
  }

  private createForm() {
    this.transactionForm = this.fb.group({
      title: [this.item.title, Validators.required],
      amount: [this.item.amount, Validators.required],
      locationName: [this.item.locationName],
      date: [this.item.date.toDate(), Validators.required],
    });
  }
}
