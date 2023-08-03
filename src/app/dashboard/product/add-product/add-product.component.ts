import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ICategory } from 'src/app/shared/models/category.model';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  isMobile = false;
  product: IProduct = this.initializeProduct();
  idCategory = '';
  preview = false;
  products: IProduct[] = [];
  categories$!: Observable<ICategory[]>;
  public Editor = ClassicEditor;
  file: File | null = null;
  progress = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: ToastService,
    private mobile: MobileService
  ) {}

  ngOnInit(): void {
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
    this.idCategory = '';
    this.preview = false;
    this.file = null;
  }

  private createProduct(): void {
    this.getCategoryName();
    console.log(this.product);
    this.productService.create(this.product).subscribe(
      (response) => {
        this.toast.success('Saved successfully');
        console.log(response);
        this.resetForm();
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
      Images: [],
      price: null,
      quantity: null,
      description: '',
      discount: 0,
    };
  }
  private resetForm(): void {
    this.product = this.initializeProduct();
    this.idCategory = '';
    this.preview = false;
    this.file = null;
  }

  // Adiciona uma imagem à lista de imagens do produto
  addImage() {
    // this.product.imageUrl.push(this.imageUrl);
    // this.imageUrl = '';
    if (this.file) {
      console.log(this.file);
      this.productService
        .upload(this.file)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .subscribe((response: HttpEvent<any>) => {
          console.log(response);
          if (response.type === HttpEventType.Response) {
            this.product.Images.push(response.body);
          } else if (response.type === HttpEventType.UploadProgress) {
            const percentDone =
              Math.round(response.loaded * 100) / (response.total ?? 1);
            this.progress = percentDone;
          }
          this.file = null;
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any) {
    // Extract the selected file from the event
    const selectedFile: File = event.target.files[0];
    // You can now perform any actions with the selected file, such as uploading it using a service
    console.log('Selected file:', selectedFile);
    this.file = selectedFile;
    this.progress = 0;
  }

  // Remove uma imagem da lista de imagens do produto
  deleteImage() {
    // this.product.imageUrl.splice(this.product.imageUrl.indexOf(imageUrl), 1);
  }
}
