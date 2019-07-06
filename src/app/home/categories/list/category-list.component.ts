import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {


  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(public categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.categoryService.list().subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['./details/' + item.payload.doc.id]).then();
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.categoryService.search(value)
      .subscribe(result => {
        this.name_filtered_items = result;
        this.items = this.combineLists(result, this.age_filtered_items);
      });
  }

  combineLists(a, b) {
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

}
