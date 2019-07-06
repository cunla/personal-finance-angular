import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {CategoryInterface, CategoryService} from "../categories-pagination.service";


const EMPTY_CATEGORY: CategoryInterface = {
  id: null,
  name: '',
  color: '#000000',
  icon: ['fas', 'user'],
  number_of_transactions: 0,
  is_default: false,
  balance: 0,
}

@Injectable()
export class CategoryResolver implements Resolve<any> {

  constructor(public categoryService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      const key = route.paramMap.get('id');
      if (!key) {
        resolve(EMPTY_CATEGORY);
      }
      this.categoryService.get(key).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
