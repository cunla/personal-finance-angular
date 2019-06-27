import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {AccountsService} from "../accounts.service";

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    public accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.accountsService.getAvatars()
    .subscribe(data => this.avatars = data);
  }

  close(avatar){
    this.dialogRef.close(avatar);
  }

}
