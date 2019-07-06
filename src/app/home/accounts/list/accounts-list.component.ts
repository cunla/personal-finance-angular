import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountsService} from "../accounts.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  searchValue: string = '';
  items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(public accountsService: AccountsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.accountsService.list().subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
    });
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.accountsService.searchAccounts(value)
      .subscribe(result => {
        this.name_filtered_items = result;
      });
  }
}
