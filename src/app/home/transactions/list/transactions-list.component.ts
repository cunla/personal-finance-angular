import {Component, OnInit} from '@angular/core';
import {EMPTY_TRANSACTION, TransactionInterface, TransactionsService} from "../transactions.service";


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
