import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PaginationService} from "../components/pagination.service";

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
export class CategoryService extends PaginationService<CategoryInterface> {
  constructor(afs: AngularFirestore) {
    super(afs);
    super.init('categories', 'name', {reverse: false, prepend: false});
  }

}
