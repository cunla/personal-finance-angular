import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMPTY_TRANSACTION, TransactionInterface, TransactionsService} from "../transactions.service";
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit, OnChanges {
  @Input() transaction: TransactionInterface;
  transactionForm: FormGroup;
  @Output() changed = new EventEmitter();

  validation_messages = {
    'title': [
      {type: 'required', message: 'Title is required.'}
    ],
  };
  private editMode: boolean;


  constructor(public transactionsService: TransactionsService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.editMode = (this.transaction.id !== null && this.transaction.id !== undefined);
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editMode = (this.transaction.id !== null && this.transaction.id !== undefined);
    this.createForm();
  }

  onSubmit(value) {
    value.lastModifiedTime = firebase.firestore.Timestamp.now();
    // value.date = Timestamp.fromDate(value.date);
    if (this.editMode) {
      this.transactionsService.update(this.transaction.id, value).then(
        () => {
          this.navigateBack();
        }
      );
    } else {
      value.creationTime = Timestamp.now();
      this.transactionsService.create(value).then(
        () => {
          this.transaction = EMPTY_TRANSACTION;
          this.createForm();
          this.navigateBack();
        }
      );
    }
  }

  delete() {
    this.transactionsService.delete(this.transaction.id).then(
      () => {
        this.navigateBack();
      }, err => {
        console.log(err);
      });
  }

  navigateBack() {
    this.changed.emit(null);
    // this.location.back();
  }

  private createForm() {
    this.transactionForm = this.fb.group({
      title: [this.transaction.title, Validators.required],
      amount: [this.transaction.amount, Validators.required],
      locationName: [this.transaction.locationName],
      date: [this.transaction.date.toDate(), Validators.required],
    });
  }
}
