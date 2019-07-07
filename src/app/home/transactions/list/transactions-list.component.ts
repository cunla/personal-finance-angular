import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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
    this.transactions.data.subscribe(res => {
      console.log(res);
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
}
