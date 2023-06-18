import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ICategory } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
  constructor(private toastService: ToastService) {}

  category: ICategory = {
    name: '',
    description: '',
  };
}
