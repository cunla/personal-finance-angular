import {Injectable} from '@angular/core';
import {PaginationService} from "../components/pagination.service";
import {AngularFirestore} from "@angular/fire/firestore";

export interface TransactionInterface {
  id: number;
  creationTime: Date;
  lastModifiedTime: Date;
  date: Date;
  title: string;
  locationName: string;
  amount: number;
  category: string;
  account: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends PaginationService<TransactionInterface> {

  constructor(afs: AngularFirestore) {
    super(afs);
    super.init('transactions', 'date', {reverse: true, prepend: false});
  }
}
