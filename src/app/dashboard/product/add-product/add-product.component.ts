import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ICategory } from 'src/app/shared/models/category.model';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  isMobile = false;
  imageUrl = '';
  product: IProduct = this.initializeProduct();
  idCategory = '';
  preview = false;
  products: IProduct[] = [];
  categories$!: Observable<ICategory[]>;
  public Editor = ClassicEditor;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: ToastService,
    private mobile: MobileService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll().pipe(tap(console.log));

    this.mobile.isMobile$.subscribe((isMobile) => (this.isMobile = isMobile));
  }

  public onChange() {
    console.log(this.product.description);
  }

  submit(): void {
    this.createProduct();
  }

  cancel(): void {
    this.product = this.initializeProduct();
    this.imageUrl = '';
    this.idCategory = '';
    this.preview = false;
  }

  private createProduct(): void {
    this.getCategoryName();
    this.productService.create(this.product).subscribe(
      (response) => {
        this.toast.sucess('Saved successfully');
        console.log(response);
        this.resertForm();
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  getCategoryName(): void {
    this.categories$.subscribe((categories) => {
      const selectedCategory = categories.find(
        (category) => category.id === this.idCategory
      );
      this.product.category = selectedCategory || null;
      console.log(selectedCategory);
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
      discount: 0,
    };
  }

  private resertForm(): void {
    this.product = this.initializeProduct();
    this.imageUrl = '';
    this.idCategory = '';
    this.preview = false;
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
