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
  file!: File;

  @Output() editProduct = new EventEmitter<IProduct>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: ToastService,
    private mobile: MobileService
  ) {}

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;

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
    this.productService.getAll().subscribe((response) => {
      this.updateProductTable(response);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
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
      this.idCategory = product.category?.id as string;
    });
  }

  private updateProduct(): void {
    this.getCategoryName();
    this.productService
      .update(this.product.id as string, this.product)
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
        (category) => category.id === this.idCategory
      );
      this.product.category = selectedCategory || null;
    });
  }

  private initializeProduct(): IProduct {
    return {
      name: '',
      category: null,
      Images: [],
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

  addImage(event: any) {
    // this.product.imageUrl.push(this.imageUrl);
    // this.imageUrl = '';
    if (this.file) {
      console.log(this.file);
      this.productService.upload(this.file).subscribe((response) => {
        console.log(response);
        this.product.Images.push(response);
        event.target.value = '';
      });
    }
  }

  onFileSelected(event: any) {
    // Extract the selected file from the event
    const selectedFile: File = event.target.files[0];
    // You can now perform any actions with the selected file, such as uploading it using a service
    console.log('Selected file:', selectedFile);
    this.file = selectedFile;
  }

  // Remove uma imagem da lista de imagens do produto
  deleteImage() {
    // this.product.imageUrl.splice(this.product.imageUrl.indexOf(imageUrl), 1);
  }
}
