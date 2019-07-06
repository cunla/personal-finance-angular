import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountInterface} from "../../accounts/accounts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../categories.service";
import {CATEGORY_ICON_OPTIONS} from "../constants";
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  categoryIconOptions = CATEGORY_ICON_OPTIONS;
  categoryForm: FormGroup;
  item: AccountInterface;

  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'}
    ],
  };
  private editMode: boolean;


  constructor(public categoryService: CategoryService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location) {

    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data.payload) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.editMode = true;
      } else {
        this.item = data;
        this.editMode = false;
      }
      this.createForm();
    });
  }

  ngOnInit() {

  }


  onSubmit(value) {
    if (this.editMode) {
      this.categoryService.update(this.item.id, value).then(
        res => {
          this.navigateBack();
        }
      );
    } else {
      this.categoryService.create(value).then(
        res => {
          this.navigateBack();
        }
      );
    }
  }

  delete() {
    this.categoryService.delete(this.item.id).then(
      res => {
        this.navigateBack();
      }, err => {
        console.log(err);
      });
  }

  navigateBack() {
    this.location.back();
  }

  private createForm() {
    this.categoryForm = this.fb.group({
      name: [this.item.name, Validators.required],
      color: [this.item.color, Validators.required],
      icon: [this.item.icon, Validators.required],
    });
  }

}
