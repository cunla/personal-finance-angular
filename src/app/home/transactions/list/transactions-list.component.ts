import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../transactions.service";

@Component({
  selector: 'app-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {


  searchValue: string = "";

  constructor(public transactions: TransactionsService) {
  }

  ngOnInit() {
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
}
