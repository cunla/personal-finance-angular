import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

export const ACCOUNTS_COLLECTION = 'accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {


  constructor(public db: AngularFirestore) {
  }

  getAvatars() {
    return this.db.collection('/avatar').valueChanges()
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
      .snapshotChanges()
  }


  createAccount(value, avatar) {
    return this.db.collection(ACCOUNTS_COLLECTION).add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}
