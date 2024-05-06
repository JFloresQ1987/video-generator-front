import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatInput } from '@angular/material/input';
// import { MatIcon } from '@angular/material/icon';
// import { MatButton } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { supabase } from 'app/libs/supabase';
import { FileUploadService } from '@api/file-upload.service';
import { Subject } from 'rxjs';
import { Production } from '@shared/models/production.interface';
import { SafePipe } from 'app/common/pipe/safe.pipe';
import { CheckoutService } from '@features/checkout/services/checkout.service';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SafePipe, FileUploadComponent/*, MatCardModule, MatInput, MatIcon, MatButton, MatFormFieldModule*/, ReactiveFormsModule],
  templateUrl: './orders.component.html'
  // template: `
  //   <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  //   <div class="flex flex-wrap -mx-3 mb-6">
  //       <div class="w-full px-3 mb-6 md:mb-0">
  //           <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
  //               Tematic
  //           </label>
  //           <input
  //               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  //               id="grid-first-name" type="text" placeholder="Tematic"
  //               formControlName="tematic">
  //       </div>
  //   </div>
  //   <div class="flex flex-wrap -mx-3 mb-6">
  //       <div class="w-full px-3 mb-6 md:mb-0">
  //           <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
  //               Title
  //           </label>
  //           <input
  //               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  //               id="grid-first-name" type="text" placeholder="Title"
  //               formControlName="m_title">
  //       </div>
  //   </div>
  //   <div class="flex flex-wrap -mx-3 mb-6">
  //       <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  //           <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
  //               Text 1
  //           </label>
  //           <input
  //               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  //               id="grid-first-name" type="text" placeholder="Text 1"
  //               formControlName="m_text_1">
  //           <p class="text-red-500 text-xs italic">Please fill out this field.</p>
  //       </div>
  //       <div class="w-full md:w-1/2 px-3">
  //           <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
  //               Text 2
  //           </label>
  //           <input
  //               class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //               id="grid-last-name" type="text" placeholder="Text 2"
  //               formControlName="m_text_2">
  //           <p class="text-red-500 text-xs italic">Please fill out this field.</p>
  //       </div>
  //   </div>  

  //   <div class="flex flex-wrap -mx-3 mb-6">
  //       <div class="w-full px-3 mb-6 md:mb-0">
  //           <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
  //               Imagen
  //           </label>
  //           <input type="file" (change)="selectFileOrder($event)" />
  //       </div>
  //   </div>

  //   <div class="md:flex md:items-center">
  //       <div class="md:w-1/3"></div>
  //       <div class="md:w-2/3">
  //           <button type="submit"
  //               class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
  //               Order
  //           </button>
  //       </div>
  //   </div>




  //   </form>


  // `


  //   <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
  // <input (change)="onFileSelected()" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file" type="file">
  // <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

  // <input type="text" formControlName="name">
  //     <input type="email" formControlName="email">
  //     <button type="submit">Submit</button>
})
export default class OrdersComponent {

  myForm: FormGroup;
  currentFile?: File;

  private readonly _checkoutSvc = inject(CheckoutService);
  cartStore = inject(CartStore);

  blanc: Production = {
    id: '',
    tematic: '',
    state: 0,
    state_payment: 0,
    path: '',
  };
  production = signal<Production | undefined>(this.blanc);

  constructor(private fb: FormBuilder, private uploadService: FileUploadService) {
    this.myForm = this.fb.group({
      tematic: [''],
      m_title: [''],
      m_text_1: [''],
      m_text_2: [''],
      user: ['Client'],
      album: [''],
      image: [''],
    });

    this.getTableChanges();
  }

  // async ngOnInit(): Promise<void> {
  //   // this.notificationsService.subscribeToRealtimeNotifications()
  //   supabase
  //     .channel('todos')
  //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'production' }, this.handleInserts)
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

  async onSubmit() {
    // console.log('Form values:', this.myForm.value);

    // let image: any = undefined;
    let image: {
      path: string
    };

    if (this.currentFile) {
      console.log('entro a cargar')
      image = await this.uploadService.upload(this.currentFile);
      console.log('image')
      console.log(image)

      let entity = { ...this.myForm.value };

      entity.image = image.path;

      console.log('Form values:', entity);

      const { data, error } = await supabase
        .from('production')
        .insert([
          // { some_column: 'someValue', other_column: 'otherValue' },
          // this.myForm.value,
          entity
        ])
        .select()

      if (data) console.log(data)
      if (error) console.log(error)

    }
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

  selectFileOrder(event: any): void {
    // this.message = '';
    this.currentFile = event.target.files.item(0);
  }

  // supabase: any
  //   .channel('todos')
  // .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'production' }, handleInserts)
  // .subscribe()

  // const handleInserts = async (payload: any) => {
  //   console.log('Change received!', payload)
  //   console.log('data', payload.new)

  //   const data = payload.new;
  //   // updateView(data.id);
  //   // await updateLink(data.image);
  //   // await updateLink(data);
  //   // await renderView(data);

  //   // const result: any = await supabaseAdmin.from("production").select();
  //   // console.log(result.data);
  //   // const productionsArray = payload.new;
  //   // setProductions(result.data);
  //   // return <pre>{JSON.stringify(notes, null, 2)}</pre>
  // }

  handleInserts(payload: any): void {
    // this.message = '';
    console.log('Change received!', payload)
    // console.log('data', payload.new)

    this.production.set(payload.new);

    console.log('llegoooo')
    console.log(this.production())

    const blanc: Product = {
      id: '5e4ecd7e-fa7d-42dc-bda8-6ef793d37354',
      title: 'qwe',
      price: 5,
      category_title: 'qwe',
      description: 'qwe',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ02w-6xm4yUZ0iItRrV5LraLLy7fXXbUNkVvYxVdv1RQ&s',
      video: '',
      rating: {
        rate: 4.5,
        count: 120,
      },
      qty: 1,
      subTotal: 0
    };

    this.onAddToCart(blanc);

  }

  getTableChanges() {
    // const changes = new Subject();

    // supabase
    //   .channel('todos')
    //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'production' }, this.handleInserts)
    //   .subscribe()

    supabase
      .channel('todos')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'production' }, (payload: any) => {
        // changes.next(payload);
        this.handleInserts(payload);
      })
      .subscribe()

    // supabase
    //   .from(CARDS_TABLE)
    //   .on('*', (payload: any) => {
    //     changes.next(payload);
    //   })
    //   .subscribe();

    // this.supabase
    //   .from(LISTS_TABLE)
    //   .on('*', (payload: any) => {
    //     changes.next(payload);
    //   })
    //   .subscribe();

    // return changes.asObservable();
  }

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }

  onProceedToPay(): void {
    console.log('entroo a pagar');
    this._checkoutSvc.onProceedToPay();
    // this._checkoutSvc.onProceedToPay(this.cartStore.products());
  }


}