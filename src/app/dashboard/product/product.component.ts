import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ICategory } from 'src/app/shared/models/category.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  // Propriedade que armazena os dados da tabela
  dataSource!: MatTableDataSource<IProduct>;

  // Referências aos elementos filho (MatSort e MatPaginator)
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: ToastService,
    private mobile: MobileService
  ) {}

  // Variáveis e propriedades
  isMobile = false; // Indica se o aplicativo está em um dispositivo móvel
  imageUrl = ''; // URL da imagem sendo visualizada ou adicionada
  product: IProduct = {
    // Objeto que representa um produto
    name: '',
    category: null,
    imageUrl: [],
    price: null,
    quantity: null,
    description: '',
  };
  idCategory = ''; // ID da categoria selecionada
  preview = false; // Indica se a visualização de imagem está ativada
  products: IProduct[] = []; // Lista de produtos
  categorys: ICategory[] = []; // Lista de categorias
  isEdit = false; // Indica se o modo de edição está ativado
  displayedColumns = ['name', 'description', 'price', 'quantity', 'action']; // Colunas exibidas na tabela
  displayedColumnsMobile = ['name', 'price', 'action']; // Colunas exibidas na tabela

  // Método executado durante a inicialização do componente
  ngOnInit(): void {
    this.load(); // Carrega os produtos
    this.loadCategories(); // Carrega as categorias

    // Assina as alterações no status de dispositivo móvel
    this.mobile.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  // Método chamado ao enviar o formulário
  submit() {
    if (!this.isEdit) {
      // Lógica para criar um novo produto
      this.productService.create(this.product).subscribe(
        (response) => {
          this.toast.sucess('Saved successfully');
          console.log(response);

          // Reseta o objeto do produto e outras propriedades relacionadas
          this.product = {
            name: '',
            category: null,
            imageUrl: [],
            price: null,
            quantity: null,
            description: '',
          };
          this.imageUrl = '';
          this.idCategory = '';

          // Recarrega os produtos
          this.load();
        },
        (error) => {
          this.toast.error(error.message);
        }
      );
    } else {
      // Lógica para atualizar um produto existente
      this.getCategoryName();

      this.productService
        .update(this.product._id as string, this.product)
        .subscribe(
          (response) => {
            this.toast.sucess('Saved successfully');
            console.log(response);

            // Reseta o objeto do produto e outras propriedades relacionadas
            this.product = {
              name: '',
              category: null,
              imageUrl: [],
              price: null,
              quantity: null,
              description: '',
            };
            this.idCategory = '';
            this.imageUrl = '';

            // Recarrega os produtos
            this.load();
            this.isEdit = false; // Desativa o modo de edição
          },
          (error) => {
            this.toast.error(error.message);
            this.isEdit = false; // Desativa o modo de edição em caso de erro
          }
        );
    }
  }

  // Método chamado ao cancelar a ação atual
  cancel() {
    // Reseta o objeto do produto e outras propriedades relacionadas
    this.product = {
      name: '',
      category: null,
      imageUrl: [],
      price: null,
      quantity: null,
      description: '',
    };
    this.imageUrl = '';
    this.idCategory = '';
    this.isEdit = false; // Desativa o modo de edição
    this.preview = false; // Desativa a visualização de imagem
  }

  // Carrega as categorias disponíveis
  loadCategories() {
    this.categoryService.getAll().subscribe(
      (response) => {
        this.categorys = response;
        console.log(response);
      },
      () => {
        this.toast.error('Erro ao carregar as categorias');
      }
    );
  }

  // Carrega os produtos disponíveis
  load() {
    this.productService.getAll().subscribe(
      (response) => {
        this.products = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  // Aplica o filtro na tabela
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Exclui um produto pelo ID
  delete(id: string): void {
    console.log(id);
    this.productService.delete(id).subscribe(
      () => {
        this.toast.sucess('Deleted successfully');
        this.load(); // Recarrega os produtos
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  // Ativa o modo de edição para um produto específico
  edit(id: string): void {
    this.isEdit = true;
    this.productService.getById(id).subscribe((product) => {
      this.product = product;
      this.imageUrl = product.imageUrl[0];
      this.idCategory = product.category?._id as string;
    });
  }

  // Obtém o nome da categoria selecionada
  getCategoryName() {
    this.product.category =
      this.categorys.find((category) => category._id === this.idCategory) ??
      null;
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
