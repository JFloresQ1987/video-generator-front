import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatInput } from '@angular/material/input';
// import { MatIcon } from '@angular/material/icon';
// import { MatButton } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { supabase, supabaseAdmin } from 'app/libs/supabase';
import { FileUploadService } from '@api/file-upload.service';
import { Subject } from 'rxjs';
import { Images, Messages, Order } from '@shared/models/order.interface';
import { SafePipe } from 'app/common/pipe/safe.pipe';
import { CheckoutService } from '@features/checkout/services/checkout.service';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';
import { OrdersService } from '@api/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SafePipe, FileUploadComponent/*, MatCardModule, MatInput, MatIcon, MatButton, MatFormFieldModule*/, ReactiveFormsModule],
  templateUrl: './orders.component.html'
})
export default class OrdersComponent {

  myForm: FormGroup;

  fileFirst?: File;
  fileSecond?: File;
  fileThird?: File;
  fileFourth?: File;
  fileFifth?: File;

  private readonly _checkoutSvc = inject(CheckoutService);
  private readonly ordersSvc = inject(OrdersService);
  private readonly toastSvc = inject(ToastrService)
  // cartStore = inject(CartStore);

  // progress: string = 'width: 1%';

  // entity_blank: Order = {
  //   // id: '',
  //   // tematic: '',
  //   // state: 0,
  //   // state_payment: 0,
  //   // path: '',
  //   model_id: '',
  //   model_composition: '',
  //   // messages: null,
  //   // images: null,
  //   video_rendered_url: '',
  // };
  // production = signal<Order | undefined>(this.entity_blank);

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

  // async ngOnInit(): Promise<void> {
  //   // this.notificationsService.subscribeToRealtimeNotifications()
  //   supabaseAdmin
  //     .channel('todos')
  //     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, this.handleInserts)
  //     .subscribe()
  // }

  //   public subscribeToRealtimeNotifications(): void {
  //     this.notificationsChannel = supabaseClient
  //       .channel('notificationsChannel')
  //       .on('postgres_changes', {
  //     ...
  //     })
  //     this.notificationsChannel.subscribe()
  // }

  async createOrder() {
    // console.log('Form values:', this.myForm.value);

    // // let image: any = undefined;
    // let images: {      
    //   first_image: 'string',
    //   second_image: 'string',
    //   third_image: 'string',
    //   fourth_image: 'string',
    //   fifth_image: 'string',
    // };

    // type Images = {
    //   first_image: string,
    //   second_image: string,
    //   third_image: string,
    //   fourth_image: string,
    //   fifth_image: string,
    // };

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
      model_id: '59948e5e-abd6-4260-b49a-496c8fd4f447',
      model_composition: 'BobEsponja1',
      order_state: "created",
      messages: messages,
      images: images,
      video_rendered_url: '',
    };

    // console.log('Form values:', entity);

    this.ordersSvc.crear(entity).subscribe((res: any) => {
      // this.analistaService.crear(this.form.value).subscribe(res => {

      // console.log(res);
      //TODO: Mejorar respuesta y manejo de errores
      if (res.ok) {
        this.toastSvc.success('El orden de pedido fue creada!');
        this.router.navigateByUrl(`/previews/${res.data.id}`);
        // this.progress = 'width: 10%';
      }



      // this.formSubmitted = false;
      // if (res['ok']) {
      //   Swal.fire({
      //     text: res['msg'], icon: 'success'
      //   });
      //   this.router.navigateByUrl('seguridad/gestion/analista');
      // } else {
      //   Swal.fire({
      //     text: res['msg'], icon: 'error'
      //   });
      // }
    })

    // const { data, error } = await supabase
    //   .from('production')
    //   .insert([
    //     // { some_column: 'someValue', other_column: 'otherValue' },
    //     // this.myForm.value,
    //     entity
    //   ])
    //   .select()

    // if (data) console.log(data)
    // if (error) console.log(error)
  }

  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');


  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       // this.srcResult = e.target.result;
  //       // console.log(e.target.result);
  //       const result = e.target.result;
  //       console.log(result);
  //     };

  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //     console.log(reader);
  //   }
  // }

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


  // handleInserts(payload: any): void {
  //   // this.message = '';
  //   console.log('Change received!', payload)
  //   // console.log('data', payload.new)

  //   this.production.set(payload.new);

  //   console.log('llegoooo')
  //   console.log(this.production())

  //   // const blanc: Product = {
  //   //   id: '5e4ecd7e-fa7d-42dc-bda8-6ef793d37354',
  //   //   title: 'qwe',
  //   //   price: 5,
  //   //   category_title: 'qwe',
  //   //   description: 'qwe',
  //   //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ02w-6xm4yUZ0iItRrV5LraLLy7fXXbUNkVvYxVdv1RQ&s',
  //   //   video: '',
  //   //   rating: {
  //   //     rate: 4.5,
  //   //     count: 120,
  //   //   },
  //   //   qty: 1,
  //   //   subTotal: 0
  //   // };

  //   // this.onAddToCart(blanc);

  // }

  // getTableChanges() {
  //   // const changes = new Subject();

  //   // supabase
  //   //   .channel('todos')
  //   //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'production' }, this.handleInserts)
  //   //   .subscribe()

  //   supabase
  //     .channel('todos')
  //     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'production' }, (payload: any) => {
  //       // changes.next(payload);
  //       this.handleInserts(payload);
  //     })
  //     .subscribe()

  //   // supabase
  //   //   .from(CARDS_TABLE)
  //   //   .on('*', (payload: any) => {
  //   //     changes.next(payload);
  //   //   })
  //   //   .subscribe();

  //   // this.supabase
  //   //   .from(LISTS_TABLE)
  //   //   .on('*', (payload: any) => {
  //   //     changes.next(payload);
  //   //   })
  //   //   .subscribe();

  //   // return changes.asObservable();
  // }

  // // onAddToCart(product: Product): void {
  // //   // this.cartStore.addToCart(product);
  // // }

  // onProceedToPay(): void {
  //   console.log('entroo a pagar');
  //   this._checkoutSvc.onProceedToPay();
  //   // this._checkoutSvc.onProceedToPay(this.cartStore.products());
  // }


}