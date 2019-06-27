import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountsService} from "../accounts.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
    public accountsService: AccountsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.accountsService.getAccounts()
      .subscribe(result => {
        this.items = result;
        this.age_filtered_items = result;
        this.name_filtered_items = result;
      })
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]).then();
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    let value = this.searchValue.toLowerCase();
    this.accountsService.searchAccounts(value)
      .subscribe(result => {
        this.name_filtered_items = result;
        this.items = this.combineLists(result, this.age_filtered_items);
      })
  }

  combineLists(a, b) {
    let result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id == x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

}
