import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {AccountsService} from "../accounts.service";

@Injectable()
export class EditAccountResolver implements Resolve<any> {

  constructor(public accountsService: AccountsService) {
  }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let accountId = route.paramMap.get('id');
      this.accountsService.getAccount(accountId).subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
