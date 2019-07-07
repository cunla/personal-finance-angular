import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../categories-pagination.service";

@Component({
  selector: 'app-categories',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  searchValue: string = "";

  constructor(public categories: CategoryService) {
  }

  ngOnInit() {
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.categories.init('categories', 'name', {
      reverse: false, prepend: false, searchValue: value,
    });
  }

  onScroll(e) {
    this.categories.more();
  }

}
