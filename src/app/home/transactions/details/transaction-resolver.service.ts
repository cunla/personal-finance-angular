import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {TransactionInterface, TransactionsService} from "../transactions.service";


const EMPTY_TRANSACTION: TransactionInterface = {
  creationTime: new Date(),
  lastModifiedTime: new Date(),
  account: null,
  amount: 0,
  category: null,
  locationName: null,
  date: new Date(),
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
