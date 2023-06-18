import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ICategory } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  dataSource!: MatTableDataSource<ICategory>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  category: ICategory = {
    name: '',
    description: '',
  };

  categorys: ICategory[] = [];

  displayedColumns = ['name', 'description', 'action'];

  submit() {
    this.categoryService.create(this.category).subscribe(
      (response) => {
        this.toast.sucess('Saved successfully');
        console.log(response);
        this.category = {
          name: '',
          description: '',
        };
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  cancel() {
    this.category = {
      name: '',
      description: '',
    };
  }

  load() {
    this.categoryService.getAll().subscribe(
      (response) => {
        this.categorys = response;
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: string): void {
    this.categoryService.get(id).subscribe((category) => {
      this.category = category;
    });
  }

  delete(id: string): void {
    this.categoryService.get(id).subscribe((category) => {
      this.category = category;
    });
  }
}
