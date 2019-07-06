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

  constructor(public accounts: AccountsService,
              private router: Router) {
  }

  ngOnInit() {
  }


  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.accounts.init('accounts', 'name', {
      reverse: false, prepend: false, searchValue: value,
    });
  }
}
