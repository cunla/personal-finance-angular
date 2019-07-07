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
  items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(public transactions: TransactionsService,
              private router: Router) {
  }

  ngOnInit() {
  }


  viewDetails(item) {
    this.router.navigate(['./details/' + item.payload.doc.id]).then();
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.transactions.init('transactions', 'name', {
      reverse: false, prepend: false, searchValue: value,
    });
  }

  intersection(a, b) {
    const result = [];
    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

  onScroll(e) {
    this.transactions.more();
  }
}
