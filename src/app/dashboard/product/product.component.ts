import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ICategory } from 'src/app/shared/models/category.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<IProduct>;
  isMobile = false;
  imageUrl = '';
  product: IProduct = this.initializeProduct();
  idCategory = '';
  preview = false;
  products: IProduct[] = [];
  categories$!: Observable<ICategory[]>;
  isEdit = false;
  displayedColumns = ['name', 'description', 'price', 'quantity', 'action'];
  displayedColumnsMobile = ['name', 'price', 'action'];
  public Editor = ClassicEditor;

  @Output() editProduct = new EventEmitter<IProduct>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: ToastService,
    private mobile: MobileService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categories$ = this.categoryService.getAll().pipe(tap(console.log));

    this.mobile.isMobile$.subscribe((isMobile) => (this.isMobile = isMobile));
  }

  public onChange() {
    console.log(this.product.description);
  }

  submit(): void {
    this.updateProduct();
  }

  cancel(): void {
    this.product = this.initializeProduct();
    this.imageUrl = '';
    this.idCategory = '';
    this.isEdit = false;
    this.preview = false;
  }

  loadProducts(): void {
    this.productService
      .getAll()
      .subscribe((response) => this.updateProductTable(response));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string): void {
    this.productService.delete(id).subscribe(
      () => {
        this.toast.sucess('Deleted successfully');
        this.loadProducts();
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  edit(id: string): void {
    this.isEdit = true;
    this.productService.getById(id).subscribe((product) => {
      this.product = product;
      this.idCategory = product.category?._id as string;
    });
  }

  private updateProduct(): void {
    this.getCategoryName();
    this.productService
      .update(this.product._id as string, this.product)
      .subscribe(
        (response) => {
          this.toast.sucess('Saved successfully');
          console.log(response);
          this.resertForm();
          this.loadProducts();
          this.isEdit = false;
        },
        (error) => {
          this.toast.error(error.message);
          this.isEdit = false;
        }
      );
  }

  getCategoryName(): void {
    this.categories$.subscribe((categories) => {
      const selectedCategory = categories.find(
        (category) => category._id === this.idCategory
      );
      this.product.category = selectedCategory || null;
    });
  }

  private initializeProduct(): IProduct {
    return {
      name: '',
      category: null,
      imageUrl: [],
      price: null,
      quantity: null,
      description: '',
      discount: null,
    };
  }

  private resertForm(): void {
    this.product = this.initializeProduct();
    this.imageUrl = '';
    this.idCategory = '';
    this.preview = false;
  }

  private updateProductTable(products: IProduct[]): void {
    this.products = products;
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Adiciona uma imagem à lista de imagens do produto
  addImage() {
    this.product.imageUrl.push(this.imageUrl);
    this.imageUrl = '';
  }

  // Remove uma imagem da lista de imagens do produto
  deleteImage(imageUrl: string) {
    this.product.imageUrl.splice(this.product.imageUrl.indexOf(imageUrl), 1);
  }
}
