import {Injectable} from '@angular/core';
import {PaginationService} from "../components/pagination.service";
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface TransactionInterface {
  id: number;
  creationTime: Timestamp;
  lastModifiedTime: Timestamp;
  date: Timestamp;
  title: string;
  locationName: string;
  amount: number;
  category: string;
  account: string;
}

export const EMPTY_TRANSACTION: TransactionInterface = {
  creationTime: firebase.firestore.Timestamp.now(),
  lastModifiedTime: Timestamp.now(),
  account: null,
  amount: 0,
  category: null,
  locationName: null,
  date: Timestamp.now(),
  id: null,
  title: ''
};

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends PaginationService<TransactionInterface> {

  constructor(afs: AngularFirestore) {
    super(afs);
    super.init('transactions', 'date',
      {reverse: true, prepend: false, filter: false});
  }
}
