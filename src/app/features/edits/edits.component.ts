import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '@api/file-upload.service';
import { OrdersService } from '@api/orders.service';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { Images, Messages, Order } from '@shared/models/order.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edits',
  standalone: true,
  imports: [FileUploadComponent, ReactiveFormsModule],
  templateUrl: './edits.component.html'
})
export default class EditsComponent {

  myForm: FormGroup;

  fileFirst?: File;
  fileSecond?: File;
  fileThird?: File;
  fileFourth?: File;
  fileFifth?: File;

  // private readonly _checkoutSvc = inject(CheckoutService);
  private readonly ordersSvc = inject(OrdersService);
  private readonly toastSvc = inject(ToastrService)

  orderId = input<string>('', { alias: 'id' });
  
  constructor(private fb: FormBuilder,
    private uploadService: FileUploadService,
    private router: Router) {
    this.myForm = this.fb.group({

      first_message: "",
      second_message: "",
      third_message: "",
      fourth_message: "",
      fifth_message: "",
      sixth_message: "",
      seventh_message: "",
      eighth_message: "",
      nineth_message: "",
      tenth_message: "",
      eleventh_message: "",
      twelfth_message: "",
      thirteenth_message: "",
      fourteenth_message: "",
      fifteenth_message: "",
    });

    //TODO: llamado a sincronización de data para saber si ya se renderizo video
    // this.getTableChanges();
  }

  async createOrder() {
    
    const images: Images = {
      first_image: null,
      second_image: null,
      third_image: null,
      fourth_image: null,
      fifth_image: null,
    };

    // const images: Images = {};
    const messages: Messages = { ...this.myForm.value };

    if (this.fileFirst) {
      images.first_image = await this.uploadService.upload(this.fileFirst);
    }

    if (this.fileSecond) {
      images.second_image = await this.uploadService.upload(this.fileSecond);
    }

    if (this.fileThird) {
      images.third_image = await this.uploadService.upload(this.fileThird);
    }

    if (this.fileFourth) {
      images.fourth_image = await this.uploadService.upload(this.fileFourth);
    }

    if (this.fileFifth) {
      images.fifth_image = await this.uploadService.upload(this.fileFifth);
    }

    const entity: Order = {
      // id: 'f19133e0-d2ae-4ffd-9f76-b3de859162b1',
      id: this.orderId(),
      model_id: '59948e5e-abd6-4260-b49a-496c8fd4f447',
      model_composition: 'BobEsponja1',
      model_price: 5,
      order_state: "created",
      messages: messages,
      images: images,
      video_rendered_url: '',
    };

    // console.log('Form values:', entity);

    this.ordersSvc.editar(entity).subscribe((res: any) => {
      // this.analistaService.crear(this.form.value).subscribe(res => {

      // console.log(res);
      //TODO: Mejorar respuesta y manejo de errores
      if (res.ok) {
        this.toastSvc.success('El orden de pedido fue creada!');
        // this.router.navigateByUrl(`/sales/${res.data.id}`);
        this.router.navigateByUrl(`/sales/${this.orderId()}`);
        
        // this.progress = 'width: 10%';
      }

    })
  }

  selectFirstFile(event: any): void {
    this.fileFirst = event.target.files.item(0);
  }

  selectSecondFile(event: any): void {
    this.fileFirst = event.target.files.item(0);
  }

  selectThirdFile(event: any): void {
    this.fileFirst = event.target.files.item(0);
  }

  selectFourthFile(event: any): void {
    this.fileFirst = event.target.files.item(0);
  }

  selectFifthFile(event: any): void {
    this.fileFirst = event.target.files.item(0);
  }

}
