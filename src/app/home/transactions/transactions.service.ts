import {Injectable} from '@angular/core';
import {PaginationService} from "../components/pagination.service";
import {AngularFirestore} from "@angular/fire/firestore";

export interface TransactionInterface {
  id: number;
  time: Date;
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
    super.init('transactions', 'time', {reverse: true, prepend: false});
  }
}
