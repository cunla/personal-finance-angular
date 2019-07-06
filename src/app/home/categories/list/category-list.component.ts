import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../categories-pagination.service";

@Component({
  selector: 'app-categories',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  searchValue: string = "";
  items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(public categories: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    // this.getData();
  }

  // getData() {
  //   this.categoryService.list().subscribe(result => {
  //     this.items = result;
  //     this.name_filtered_items = result;
  //   });
  // }

  viewDetails(item) {
    this.router.navigate(['./details/' + item.payload.doc.id]).then();
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.categories.init('categories', 'name', {
      reverse: false, prepend: false, searchValue: value,
    });
  }

  intersection(a, b) {
    const result = [];
    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

  onScroll(e) {
    this.categories.more();
  }

}
