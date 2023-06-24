import { IStatus } from './../../shared/models/status.model';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';
import { StatusService } from 'src/app/shared/services/status/status.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  isMobile = false;
  status: IStatus = this.intializeStatus();
  statusList: IStatus[] = [];
  isEdit = false;
  public Editor = ClassicEditor;

  constructor(
    private statusService: StatusService,
    private toast: ToastService,
    private mobile: MobileService
  ) {}

  ngOnInit(): void {
    this.mobile.isMobile$.subscribe((isMobile) => (this.isMobile = isMobile));
    this.load();
  }

  intializeStatus(): IStatus {
    return {
      name: '',
      description: '',
      color: '#000000',
    };
  }

  onSubmit() {
    if (!this.isEdit) {
      this.create();
    } else {
      this.update();
    }
  }

  cancel() {
    this.status = this.intializeStatus();
  }

  load() {
    this.statusService
      .getAll()
      .subscribe((status) => (this.statusList = status));
  }

  create() {
    this.statusService.create(this.status).subscribe(
      () => {
        this.toast.sucess(this.status.name);
        this.status = this.intializeStatus();
        this.load();
      },
      (error) => {
        this.toast.error(error);
      }
    );
  }

  update() {
    this.statusService.update(this.status._id as string, this.status).subscribe(
      () => {
        this.toast.sucess('Atualizado com sucesso');
        this.status = this.intializeStatus();
        this.isEdit = false;
        this.load();
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  edit(id: string) {
    this.statusService.getById(id).subscribe((status) => {
      this.status = status;
      this.isEdit = true;
    });
  }

  delete(id: string) {
    this.statusService.delete(id).subscribe(
      () => {
        this.toast.sucess('Deletado com sucesso');
        this.status = this.intializeStatus();
        this.load();
        this.isEdit = false;
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }
}
