import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Images, Messages, NewOrder } from '@shared/models/order.interface';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { OrdersService } from '@api/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelsService } from '@api/models.service';
import { Model } from '@shared/models/model.interface';
import { FileUploadService } from '@api/file-upload.service';
import { CommonModule } from '@angular/common';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SafePipe, ReactiveFormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export default class OrdersComponent {

  modelId = input<string>('', { alias: 'id' });
  myForm: FormGroup;

  spinnerSvc = inject(SpinnerService);

  fileFirst?: File | null;
  fileSecond?: File | null;
  fileThird?: File | null;
  fileFourth?: File | null;
  fileFifth?: File | null;

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

  public reactiveForm: FormGroup = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required),
  });

  constructor(private fb: FormBuilder,
    private uploadService: FileUploadService,
    private router: Router) {

    this.myForm = this.fb.group({
      recaptchaReactive: new FormControl(null, Validators.required),

      first_message: ['Te Invito!', []],
      second_message: ['A mi Fiesta', []],
      third_message: ['', []],
      fourth_message: ['Cumple', []],
      fifth_message: ['', []],
      sixth_message: ['Añitos', []],
      seventh_message: ['Acompáñanos a Celebrar', []],
      eighth_message: ['Fecha:', []],
      nineth_message: ['', []],
      tenth_message: ['Hora:', []],
      eleventh_message: ['', []],
      twelfth_message: ['Dirección:', []],
      thirteenth_message: ['', []],
      fourteenth_message: ['', []],
      fifteenth_message: ['Te Esperamos!', []],
      sixteenth_message: ['No Faltes!', []],

      first_image: [null, []],
      second_image: [null, []],
      third_image: [null, []],
      fourth_image: [null, []],
      fifth_image: [null, []],
    });
  }

  ngOnInit(): void {

    this.modelsSvc.getModelById(this.modelId()).subscribe((res: any) => {

      if (res) {
        this.model.set(res);
        this.validar();
      }
      else {
        //TODO: tal vez mostrar página con aviso de error
        this.router.navigateByUrl('/categories');
      }
    });
  }

  public captchaResolved: boolean = false;
  checkCaptcha(captchaResponse: any) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  async createOrder() {

    this.submitted = true;
    this.messageTypeFirstFile = false;
    this.messageTypeSecondFile = false;
    this.messageTypeThirdFile = false;
    this.messageTypeFourthFile = false;
    this.messageTypeFifthFile = false;
    this.messageSizeFirstFile = false;
    this.messageSizeSecondFile = false;
    this.messageSizeThirdFile = false;
    this.messageSizeFourthFile = false;
    this.messageSizeFifthFile = false;

    //console.log(this.myForm)

    if (this.myForm.invalid) {
      //console.log('entro')
      this.toastSvc.warning('Validar la información proporcionada.', 'Alerta');
      return;
    }
    //console.log('paso')

    // const spinnerSvc = inject(SpinnerService);
    this.spinnerSvc.show();

    // return;

    let images: Images = {
      first_image: null,
      second_image: null,
      third_image: null,
      fourth_image: null,
      fifth_image: null,
    };

    const form_data = this.myForm.value;

    const messages: Messages = {
      first_message: form_data?.first_message,
      second_message: form_data?.second_message,
      third_message: form_data?.third_message,
      fourth_message: form_data?.fourth_message,
      fifth_message: form_data?.fifth_message,
      sixth_message: form_data?.sixth_message,
      seventh_message: form_data?.seventh_message,
      eighth_message: form_data?.eighth_message,
      nineth_message: form_data?.nineth_message,
      tenth_message: form_data?.tenth_message,
      eleventh_message: form_data?.eleventh_message,
      twelfth_message: form_data?.twelfth_message,
      thirteenth_message: form_data?.thirteenth_message,
      fourteenth_message: form_data?.fourteenth_message,
      fifteenth_message: form_data?.fifteenth_message,
      sixteenth_message: form_data?.sixteenth_message,
    };

    if (this.fileFirst) {
      // images.first_image = await this.uploadService.upload(this.fileFirst);
      const { data } = await this.uploadService.upload(this.fileFirst);
      // const resp = await this.uploadService.upload(this.fileFirst);
      // //console.log(resp)
      images.first_image = data?.path;

      // this.uploadService.upload(this.fileFirst).subscribe((res: any) => {

      //   //TODO: Mejorar respuesta y manejo de errores
      //   if (res.ok) {
      //     const data = res.data;
      //     images.first_image = data.path;
      //     // this.myForm.get('first_image')?.setValue(data.path);
      //   }
      // })



      // const data = await this.uploadService.upload(this.fileFirst).subscribe((res: any) => {
      //   // this.analistaService.crear(this.form.value).subscribe(res => {

      //   // //console.log(res);
      //   //TODO: Mejorar respuesta y manejo de errores
      //   if (res.ok) {
      //     this.toastSvc.success('El orden de pedido fue creada!', 'Info');
      //     this.router.navigateByUrl(`/previews/${res.data.id}`);
      //     // this.progress = 'width: 10%';
      //   }

      //   // this.formSubmitted = false;
      //   // if (res['ok']) {
      //   //   Swal.fire({
      //   //     text: res['msg'], icon: 'success'
      //   //   });
      //   //   this.router.navigateByUrl('seguridad/gestion/analista');
      //   // } else {
      //   //   Swal.fire({
      //   //     text: res['msg'], icon: 'error'
      //   //   });
      //   // }
      // });
      // images.first_image = data.path;
      // //console.log(data)
      // //console.log(images.first_image)
    }

    if (this.fileSecond) {

      const { data } = await this.uploadService.upload(this.fileSecond);
      images.second_image = data?.path;
      // this.uploadService.upload(this.fileSecond).subscribe((res: any) => {
      //   if (res.ok) {
      //     const data = res.data;
      //     images.second_image = data.path;
      //   }
      // })
    }

    if (this.fileThird) {

      const { data } = await this.uploadService.upload(this.fileThird);
      images.third_image = data?.path;
      // await this.uploadService.upload(this.fileThird).subscribe((res: any) => {
      //   if (res.ok) {
      //     const data = res.data;
      //     images.third_image = data.path;
      //   }
      // })
    }

    if (this.fileFourth) {

      const { data } = await this.uploadService.upload(this.fileFourth);
      images.fourth_image = data?.path;
      // this.uploadService.upload(this.fileFourth).subscribe((res: any) => {
      //   if (res.ok) {
      //     const data = res.data;
      //     images.fourth_image = data.path;
      //   }
      // })
    }

    if (this.fileFifth) {

      const { data } = await this.uploadService.upload(this.fileFifth);
      images.fifth_image = data?.path;
      // await this.uploadService.upload(this.fileFifth).subscribe((res: any) => {
      //   if (res.ok) {
      //     const data = res.data;
      //     images.fifth_image = data.path;
      //   }
      // })
    }

    const entity: NewOrder = {
      model_id: this.model()?.id,
      model_composition: this.model()?.composition,
      model_title: this.model()?.title,
      model_image: this.model()?.image,
      model_price: this.model()?.price,
      model_total_messages: this.model()?.total_messages,
      model_total_images: this.model()?.total_images,
      order_state: "created",
      messages: messages,
      images: images,
      video_rendered_url: '',
    };

    //console.log('Form values:', entity);

    // return;

    this.ordersSvc.crear(entity).subscribe((res: any) => {
      this.spinnerSvc.hide()
      //TODO: Mejorar respuesta y manejo de errores
      if (res.ok) {
        this.toastSvc.success('El orden de pedido fue creada!', 'Info');
        this.router.navigateByUrl(`/previews/${res.data.id}`);   
      }
    })
  }

  currentFirstFile?: File;
  currentSecondFile?: File;
  currentThirdFile?: File;
  currentFourthFile?: File;
  currentFifthFile?: File;
  previewFirstFile = '';
  previewSecondFile = '';
  previewThirdFile = '';
  previewFourthFile = '';
  previewFifthFile = '';

  selectFirstFile(event: any): void {
    this.selectFirstFileHelp(event.target.files);
  }

  messageTypeFirstFile: boolean = false;
  messageTypeSecondFile: boolean = false;
  messageTypeThirdFile: boolean = false;
  messageTypeFourthFile: boolean = false;
  messageTypeFifthFile: boolean = false;

  messageSizeFirstFile: boolean = false;
  messageSizeSecondFile: boolean = false;
  messageSizeThirdFile: boolean = false;
  messageSizeFourthFile: boolean = false;
  messageSizeFifthFile: boolean = false;


  selectFirstFileHelp(files: any): void {

    this.previewFirstFile = '';
    const selectedFiles = files;
    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {

        /* */
        // this.selectedFile = event.target.files[0];
        const type = file.type;
        const size = file.size;
        if (
          // type != "application/pdf" &&
          type != "image/png" &&
          type != "image/jpg" &&
          type != "image/jpeg" &&
          type != "image/gif"

        ) {
          // this.siagieUtilsService.error({
          //   message:
          //     "No es posible cargar el archivo seleccionado, debe seleccionar un archivo con extensión .pdf, .jpg o .png",
          //   button: { text: "CERRAR" },
          // });
          this.messageTypeFirstFile = true;
          this.changeFirstImage();
          //       this.preview = '';
          // this.cssisDragOver = false;
          // this.myForm.get('first_image')?.setValue(null);
          return;
        } else if (size > 2097152) {//<--2MB

          this.messageSizeFirstFile = true;
          this.changeFirstImage();
          return;
          // this.siagieUtilsService.error({
          //   message: "El archivo seleccionado supera los 2MB",
          //   button: { text: "CERRAR" },
          // });
          // return false;
        } /*else {
        item.archivoBase64ContentType = type;
        this.onUpload(item);
      }*/
        /* */

        this.fileFirst = file;

        this.previewFirstFile = '';
        this.currentFirstFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // //console.log(e.target.result);
          this.previewFirstFile = e.target.result;
        };

        reader.readAsDataURL(this.currentFirstFile);

        const name = file.name;
        //console.log(name)
        this.myForm.get('first_image')?.setValue(name);
      }
    }
  }

  selectSecondFileHelp(files: any): void {

    this.previewSecondFile = '';
    const selectedFiles = files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {

        const type = file.type;
        const size = file.size;
        if (
          // type != "application/pdf" &&
          type != "image/png" &&
          type != "image/jpg" &&
          type != "image/jpeg" &&
          type != "image/gif"

        ) {

          this.messageTypeSecondFile = true;
          this.changeSecondImage();
          return;
        } else if (size > 2097152) {//<--2MB

          this.messageSizeSecondFile = true;
          this.changeSecondImage();
          return;
        }

        this.fileSecond = file;
        this.previewSecondFile = '';
        this.currentSecondFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewSecondFile = e.target.result;
        };

        reader.readAsDataURL(this.currentSecondFile);
        const name = file.name;
        //console.log(name)
        this.myForm.get('second_image')?.setValue(name);
      }
    }
  }

  selectThirdFileHelp(files: any): void {

    this.previewThirdFile = '';
    const selectedFiles = files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {

        const type = file.type;
        const size = file.size;
        if (
          // type != "application/pdf" &&
          type != "image/png" &&
          type != "image/jpg" &&
          type != "image/jpeg" &&
          type != "image/gif"

        ) {

          this.messageTypeThirdFile = true;
          this.changeThirdImage();
          return;
        } else if (size > 2097152) {//<--2MB

          this.messageSizeThirdFile = true;
          this.changeThirdImage();
          return;
        }

        this.fileThird = file;
        this.previewThirdFile = '';
        this.currentThirdFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewThirdFile = e.target.result;
        };

        reader.readAsDataURL(this.currentThirdFile);
        const name = file.name;
        //console.log(name)
        this.myForm.get('third_image')?.setValue(name);
      }
    }
  }

  selectFourthFileHelp(files: any): void {

    this.previewFourthFile = '';
    const selectedFiles = files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {

        const type = file.type;
        const size = file.size;
        if (
          // type != "application/pdf" &&
          type != "image/png" &&
          type != "image/jpg" &&
          type != "image/jpeg" &&
          type != "image/gif"

        ) {

          this.messageTypeFourthFile = true;
          this.changeFourthImage();
          return;
        } else if (size > 2097152) {//<--2MB

          this.messageSizeFourthFile = true;
          this.changeFourthImage();
          return;
        }

        this.fileFourth = file;
        this.previewFourthFile = '';
        this.currentFourthFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewFourthFile = e.target.result;
        };

        reader.readAsDataURL(this.currentFourthFile);
        const name = file.name;
        //console.log(name)
        this.myForm.get('fourth_image')?.setValue(name);
      }
    }
  }

  selectFifthFileHelp(files: any): void {

    this.previewFifthFile = '';
    const selectedFiles = files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {

        const type = file.type;
        const size = file.size;
        if (
          // type != "application/pdf" &&
          type != "image/png" &&
          type != "image/jpg" &&
          type != "image/jpeg" &&
          type != "image/gif"

        ) {

          this.messageTypeFifthFile = true;
          this.changeFifthImage();
          return;
        } else if (size > 2097152) {//<--2MB

          this.messageSizeFifthFile = true;
          this.changeFifthImage();
          return;
        }

        this.fileFifth = file;
        this.previewFifthFile = '';
        this.currentFifthFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewFifthFile = e.target.result;
        };

        reader.readAsDataURL(this.currentFifthFile);
        const name = file.name;
        //console.log(name)
        this.myForm.get('fifth_image')?.setValue(name);
      }
    }
  }

  changeFirstImage() {
    this.previewFirstFile = '';
    this.cssIsDragOverFirstFile = false;
    this.myForm.get('first_image')?.setValue('');    
  }

  changeSecondImage() {
    this.previewSecondFile = '';
    this.cssIsDragOverSecondFile = false;
    this.myForm.get('second_image')?.setValue('');
  }

  changeThirdImage() {
    this.previewThirdFile = '';
    this.cssIsDragOverThirdFile = false;
    this.myForm.get('third_image')?.setValue('');
  }

  changeFourthImage() {
    this.previewFourthFile = '';
    this.cssIsDragOverFourthFile = false;
    this.myForm.get('fourth_image')?.setValue('');
  }

  changeFifthImage() {
    this.previewFifthFile = '';
    this.cssIsDragOverFifthFile = false;
    this.myForm.get('fifth_image')?.setValue('');
  }

  selectSecondFile(event: any): void {
    this.selectSecondFileHelp(event.target.files);
  }

  selectThirdFile(event: any): void {
    this.selectThirdFileHelp(event.target.files);
  }

  selectFourthFile(event: any): void {
    this.selectFourthFileHelp(event.target.files);
  }

  selectFifthFile(event: any): void {
    this.selectFifthFileHelp(event.target.files);
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
      this.myForm.get('seventh_message')?.setValidators([Validators.maxLength(30), Validators.required]);

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
      this.myForm.get('thirteenth_message')?.setValidators([Validators.maxLength(30), Validators.required]);

    if ((this.model().total_messages || 0) >= 14)
      this.myForm.get('fourteenth_message')?.setValidators([Validators.maxLength(30), Validators.required]);

    if ((this.model().total_messages || 0) >= 15)
      this.myForm.get('fifteenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_messages || 0) >= 16)
      this.myForm.get('sixteenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);

    if ((this.model().total_images || 0) >= 1)
      this.myForm.get('first_image')?.setValidators([Validators.required]);

    if ((this.model().total_images || 0) >= 2)
      this.myForm.get('second_image')?.setValidators([Validators.required]);

    if ((this.model().total_images || 0) >= 3)
      this.myForm.get('third_image')?.setValidators([Validators.required]);

    if ((this.model().total_images || 0) >= 4)
      this.myForm.get('fourth_image')?.setValidators([Validators.required]);

    if ((this.model().total_images || 0) >= 5)
      this.myForm.get('fifth_image')?.setValidators([Validators.required]);
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

  cssIsDragOverFirstFile: boolean = false;
  cssIsDragOverSecondFile: boolean = false;
  cssIsDragOverThirdFile: boolean = false;
  cssIsDragOverFourthFile: boolean = false;
  cssIsDragOverFifthFile: boolean = false;

  onDropFirstFile(event: DragEvent): void {

    event.preventDefault();
    if (event?.dataTransfer?.files) {

      this.selectFirstFileHelp(event.dataTransfer.files);
    }
  }

  onDragOverFirstFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverFirstFile = true;
  }

  onDragLeaveFirstFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverFirstFile = false;
  }

  onDropSecondFile(event: DragEvent): void {

    event.preventDefault();
    if (event?.dataTransfer?.files) {

      this.selectSecondFileHelp(event.dataTransfer.files);
    }
  }

  onDragOverSecondFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverSecondFile = true;
  }

  onDragLeaveSecondFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverSecondFile = false;
  }

  onDropThirdFile(event: DragEvent): void {

    event.preventDefault();
    if (event?.dataTransfer?.files) {

      this.selectThirdFileHelp(event.dataTransfer.files);
    }
  }

  onDragOverThirdFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverThirdFile = true;
  }

  onDragLeaveThirdFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverThirdFile = false;
  }

  onDropFourthFile(event: DragEvent): void {

    event.preventDefault();
    if (event?.dataTransfer?.files) {

      this.selectFourthFileHelp(event.dataTransfer.files);
    }
  }

  onDragOverFourthFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverFourthFile = true;
  }

  onDragLeaveFourthFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverFourthFile = false;
  }

  onDropFifthFile(event: DragEvent): void {

    event.preventDefault();
    if (event?.dataTransfer?.files) {

      this.selectFifthFileHelp(event.dataTransfer.files);
    }
  }

  onDragOverFifthFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverFifthFile = true;
  }

  onDragLeaveFifthFile(event: DragEvent): void {

    event.preventDefault();
    this.cssIsDragOverFifthFile = false;
  }
}