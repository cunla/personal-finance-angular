import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {AccountInterface, AccountsService} from "../accounts.service";

const EMPTY_ACCOUNT: AccountInterface = {
  id: null,
  name: '',
  balance: 0.0,
  color: '#000000',
  icon: ['fas', 'user'],
  last_validated: new Date(),
  currency: 'USD',
  currency_icon: ['fas', 'user'],
  number_of_transactions: 0,
  is_default: false,
  starting_balance: 0
}

@Injectable()
export class EditAccountResolver implements Resolve<any> {

  constructor(public accountsService: AccountsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const accountId = route.paramMap.get('id');
      if (!accountId) {
        resolve(EMPTY_ACCOUNT);
      }
      this.accountsService.getAccount(accountId).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
