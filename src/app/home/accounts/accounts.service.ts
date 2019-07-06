import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PaginationService} from "../components/pagination.service";

export interface AccountInterface {
  id: number;
  name: string;
  balance: number;
  color: string;
  icon: string[];
  last_validated: Date;
  currency: string;
  currency_icon: string[];
  number_of_transactions: number;
  is_default: boolean;
  starting_balance: number;
  updated?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends PaginationService{


  constructor(public afs: AngularFirestore) {
    super(afs);
    super.init('accounts', 'name', {reverse: false, prepend: false});
  }

}
