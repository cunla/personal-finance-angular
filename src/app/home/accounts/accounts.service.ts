import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

export const ACCOUNTS_COLLECTION = 'accounts';

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
export class AccountsService {


  constructor(public db: AngularFirestore) {
  }

  getAccount(accountKey) {
    return this.db.collection(ACCOUNTS_COLLECTION).doc(accountKey).snapshotChanges();
  }

  updateAccount(accountKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection(ACCOUNTS_COLLECTION).doc(accountKey).set(value);
  }

  deleteAccount(accountKey) {
    return this.db.collection(ACCOUNTS_COLLECTION).doc(accountKey).delete();
  }

  getAccounts() {
    return this.db.collection(ACCOUNTS_COLLECTION).snapshotChanges();
  }

  searchAccounts(searchValue) {
    return this.db.collection('accounts',
      ref => ref.where('nameToSearch', '>=', searchValue)
        .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }


  createAccount(account: AccountInterface) {
    return this.db.collection(ACCOUNTS_COLLECTION).add(account);
  }
}
