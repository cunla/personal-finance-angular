import {Component, OnInit} from '@angular/core';
import {TransactionInterface, TransactionsService} from "../transactions.service";
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


const EMPTY_TRANSACTION: TransactionInterface = {
  creationTime: firebase.firestore.Timestamp.now(),
  lastModifiedTime: Timestamp.now(),
  account: null,
  amount: 0,
  category: null,
  locationName: null,
  date: Timestamp.now(),
  id: null,
  title: ''
};

@Component({
  selector: 'app-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  searchValue: string = "";
  selectedTransaction: TransactionInterface = EMPTY_TRANSACTION;

  constructor(public transactions: TransactionsService) {
  }

  ngOnInit() {
    this.transactions.data.subscribe(data => {
      console.log(data);
    });
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.transactions.init('transactions', 'title', {
      reverse: true, prepend: false, searchValue: value,
    });
  }

  onScroll(e) {
    this.transactions.more();
  }

  selectTransaction(item: TransactionInterface) {
    this.selectedTransaction = (item == null) ?
      this.selectedTransaction = EMPTY_TRANSACTION : item;
  }
}
