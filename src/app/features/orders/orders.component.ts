import { Component, inject, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Images, Messages, NewOrder } from '@shared/models/order.interface';
import { SafePipe } from 'app/common/pipe/safe.pipe';
import { OrdersService } from '@api/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelsService } from '@api/models.service';
import { Model } from '@shared/models/model.interface';
import { FileUploadService } from '@api/file-upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SafePipe, ReactiveFormsModule, CommonModule],
  templateUrl: './orders.component.html'
})
export default class OrdersComponent {

  modelId = input<string>('', { alias: 'id' });
  myForm: FormGroup;

  fileFirst?: File;
  fileSecond?: File;
  fileThird?: File;
  fileFourth?: File;
  fileFifth?: File;

  entity_blank: Model = {
    id: '',
    title: '',
    price: 0,
    category_title: '',
    description: '',
    image: '',
    video: '',
    rating: {
      rate: 0,
      count: 0,
    },
    qty: 0,
    subTotal: 0,
    composition: '',
    total_messages: 0,
    total_images: 0,
  };

  model = signal<Model>(this.entity_blank);
  private readonly modelsSvc = inject(ModelsService);
  private readonly ordersSvc = inject(OrdersService);
  private readonly toastSvc = inject(ToastrService)

  constructor(private fb: FormBuilder,
    private uploadService: FileUploadService,
    private router: Router) {
    this.myForm = this.fb.group({
      first_message: ['', [Validators.maxLength(20)]],
      second_message: ['', [Validators.maxLength(20)]],
      third_message: ['', [Validators.maxLength(20)]],
      fourth_message: ['', [Validators.maxLength(20)]],
      fifth_message: ['', [Validators.maxLength(20)]],
      sixth_message: ['', [Validators.maxLength(20)]],
      seventh_message: ['', [Validators.maxLength(20)]],
      eighth_message: ['', [Validators.maxLength(20)]],
      nineth_message: ['', [Validators.maxLength(20)]],
      tenth_message: ['', [Validators.maxLength(20)]],
      eleventh_message: ['', [Validators.maxLength(20)]],
      twelfth_message: ['', [Validators.maxLength(20)]],
      thirteenth_message: ['', [Validators.maxLength(20)]],
      fourteenth_message: ['', [Validators.maxLength(20)]],
      fifteenth_message: ['', [Validators.maxLength(20)]],
    });

    //TODO: llamado a sincronización de data para saber si ya se renderizo video    
  }

  ngOnInit(): void {

    this.modelsSvc.getModelById(this.modelId()).subscribe((res: any) => {
      this.model.set(res);
      this.validar();
    });
  }

  async createOrder() {

    this.submitted = true;

    if (this.myForm.invalid) {
      console.log('entro')
      this.toastSvc.warning('Validar la información proporcionada.', 'Alerta');
      return;
    }

    // if (!this.myForm.valid) {

    //   console.log('entro')
    //   this.toastSvc.warning('Validar la información proporcionada.', 'Alerta');

    //   // Swal.fire({
    //   //   text: "Validar la información proporcionada.", icon: 'warning'
    //   // });
    //   return;
    // }

    console.log('paso')

    const images: Images = {
      first_image: null,
      second_image: null,
      third_image: null,
      fourth_image: null,
      fifth_image: null,
    };

    // const images: Images = {};
    const messages: Messages = { ...this.myForm.value };

    if (this.fileFirst)
      images.first_image = await this.uploadService.upload(this.fileFirst);

    if (this.fileSecond)
      images.second_image = await this.uploadService.upload(this.fileSecond);

    if (this.fileThird)
      images.third_image = await this.uploadService.upload(this.fileThird);

    if (this.fileFourth)
      images.fourth_image = await this.uploadService.upload(this.fileFourth);

    if (this.fileFifth)
      images.fifth_image = await this.uploadService.upload(this.fileFifth);

    const entity: NewOrder = {
      model_id: this.model()?.id,
      model_composition: this.model()?.composition,
      model_price: this.model()?.price,
      order_state: "created",
      messages: messages,
      images: images,
      video_rendered_url: '',
    };

    // console.log('Form values:', entity);

    // return;

    this.ordersSvc.crear(entity).subscribe((res: any) => {
      // this.analistaService.crear(this.form.value).subscribe(res => {

      // console.log(res);
      //TODO: Mejorar respuesta y manejo de errores
      if (res.ok) {
        this.toastSvc.success('El orden de pedido fue creada!', 'Info');
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
  }

  selectFirstFile(event: any): void {
    this.fileFirst = event.target.files.item(0);
  }

  selectSecondFile(event: any): void {
    this.fileSecond = event.target.files.item(0);
  }

  selectThirdFile(event: any): void {
    this.fileThird = event.target.files.item(0);
  }

  selectFourthFile(event: any): void {
    this.fileFourth = event.target.files.item(0);
  }

  selectFifthFile(event: any): void {
    this.fileFifth = event.target.files.item(0);
  }

  validar() {

    if ((this.model().total_messages || 0) >= 1)
      this.myForm.get('first_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 2)
      this.myForm.get('second_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 3)
      this.myForm.get('third_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 4)
      this.myForm.get('fourth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 5)
      this.myForm.get('fifth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 6)
      this.myForm.get('sixth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 7)
      this.myForm.get('seventh_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 8)
      this.myForm.get('eighth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 9)
      this.myForm.get('nineth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 10)
      this.myForm.get('tenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 11)
      this.myForm.get('eleventh_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 12)
      this.myForm.get('twelfth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 13)
      this.myForm.get('thirteenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 14)
      this.myForm.get('fourteenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 15)
      this.myForm.get('fifteenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);
  }

  submitted = false;

  formControlIsInitial(formControl: string): boolean {

    if (this.submitted || this.myForm.get(formControl)?.touched)
      return false;
    else      
      return true;
  }

  formControlIsValid(formControl: string): boolean {

    if (this.myForm.get(formControl)?.valid &&
      (this.submitted || this.myForm.get(formControl)?.touched))
      return true;
    else      
      return false;
  }

  isValid(formControl: string, key: string): boolean {

    if (this.myForm.get(formControl)?.hasError(key) &&
      (this.submitted || this.myForm.get(formControl)?.touched))
      return true;
    else
      return false;
  }

  // get f(): { [key: string]: AbstractControl } {
  //   return this.myForm.controls;
  // }

  // onReset(): void {
  //   this.submitted = false;
  //   this.myForm.reset();
  // }
}