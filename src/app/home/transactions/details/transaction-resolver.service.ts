import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {TransactionInterface, TransactionsService} from "../transactions.service";


const EMPTY_TRANSACTION: TransactionInterface = {
  account: null,
  amount: 0,
  category: null,
  locationName: null,
  time: new Date(),
  id: null,
  title: ''
}

@Injectable()
export class TransactionResolver implements Resolve<any> {

  constructor(public transactionsService: TransactionsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      const key = route.paramMap.get('id');
      if (!key) {
        resolve(EMPTY_TRANSACTION);
      }
      this.transactionsService.get(key).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
