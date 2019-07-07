import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {TransactionInterface, TransactionsService} from "../transactions.service";
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


const EMPTY_TRANSACTION: TransactionInterface = {
  creationTime: Timestamp.now(),
  lastModifiedTime: Timestamp.now(),
  account: null,
  amount: 0,
  category: null,
  locationName: null,
  date: Timestamp.now(),
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
