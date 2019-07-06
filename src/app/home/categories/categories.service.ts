import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

const CATEGORIES_COLLECTION = 'categories';

export interface CategoryInterface {
  id: number;
  name: string;
  balance: number;
  color: string;
  icon: string[];
  number_of_transactions: number;
  is_default: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(public db: AngularFirestore) {
  }

  get(key) {
    return this.db.collection(CATEGORIES_COLLECTION).doc(key).snapshotChanges();
  }

  update(key, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection(CATEGORIES_COLLECTION).doc(key).set(value);
  }

  delete(key) {
    return this.db.collection(CATEGORIES_COLLECTION).doc(key).delete();
  }

  list() {
    return this.db.collection(CATEGORIES_COLLECTION).snapshotChanges();
  }

  search(searchValue) {
    return this.db.collection(CATEGORIES_COLLECTION,
      ref => ref.where('nameToSearch', '>=', searchValue)
        .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  create(account: CategoryInterface) {
    return this.db.collection(CATEGORIES_COLLECTION).add(account);
  }
}
