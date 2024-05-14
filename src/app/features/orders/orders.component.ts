import { Component, inject, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Images, Messages, NewOrder } from '@shared/models/order.interface';
import { SafePipe } from 'app/common/pipe/safe.pipe';
import { OrdersService } from '@api/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelsService } from '@api/models.service';
import { Model } from '@shared/models/model.interface';
import { FileUploadService } from '@api/file-upload.service';
import { CommonModule } from '@angular/common';
import { CaptchaComponent } from '@shared/components/captcha/captcha.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

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

    //   public reactiveForm: FormGroup = new FormGroup({
    //   recaptchaReactive: new FormControl(null, Validators.required),
    // });

    // recaptchaReactive: new FormControl(null, Validators.required),

    this.myForm = this.fb.group({
      recaptchaReactive: new FormControl(null, Validators.required),

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

      first_image: new FormControl(null, Validators.required),
    });

    //TODO: llamado a sincronización de data para saber si ya se renderizo video    
  }

  ngOnInit(): void {

    this.modelsSvc.getModelById(this.modelId()).subscribe((res: any) => {
      this.model.set(res);
      this.validar();
    });
  }

  public captchaResolved: boolean = false;
  checkCaptcha(captchaResponse: any) {
    // console.log(captchaResponse)
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  async createOrder() {

    this.submitted = true;
    this.messageType = false;
    this.messageSize = false;

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

    // return;

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

    return;

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

  currentFile?: File;
  // message = '';
  preview = '';

  selectFirstFile(event: any): void {
    // this.fileFirst = event.target.files.item(0);

    // this.selectFirstFileHelp(event);
    this.selectFirstFileHelp(event.target.files);
  }

  messageType: boolean = false;
  messageSize: boolean = false;

  // selectFirstFileHelp(event: any): void {
  selectFirstFileHelp(files: any): void {
    // this.fileFirst = event.target.files.item(0);

    // this.message = '';
    this.preview = '';
    // const selectedFiles = event.target.files;
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
          this.messageType = true;
          this.changeFirstImage();
          //       this.preview = '';
          // this.cssisDragOver = false;
          // this.myForm.get('first_image')?.setValue(null);
          return;
        } else if (size > 2097152) {//<--2MB

          this.messageSize = true;
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

        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  changeFirstImage() {
    this.preview = '';
    this.cssisDragOver = false;
    this.myForm.get('first_image')?.setValue(null);

    // console.log(this.formControlIsInitial('first_image'))
    // console.log(this.formControlIsValid('first_image'))
    // console.log((this.formControlIsInitial('first_image') || this.formControlIsValid('first_image')))
    // this.myForm.get('fifteenth_message')?.setValidators([Validators.maxLength(20), Validators.required]);
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

    // console.log('formControlIsInitial')    
    // console.log(this.submitted)
    // console.log(this.myForm.get(formControl)?.touched)

    if (this.submitted || this.myForm.get(formControl)?.touched)
      return false;
    else
      return true;
  }

  formControlIsValid(formControl: string): boolean {

    // console.log('formControlIsValid')
    // console.log(this.myForm.get(formControl)?.valid)
    // console.log(this.submitted)
    // console.log(this.myForm.get(formControl)?.touched)

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

  onDrop(event: DragEvent): void {

    event.preventDefault();
    if (event?.dataTransfer?.files) {

      this.selectFirstFileHelp(event.dataTransfer.files);
    }
  }

  cssisDragOver: boolean = false;

  onDragOver(event: DragEvent): void {

    event.preventDefault();
    this.cssisDragOver = true;
  }

  onDragLeave(event: DragEvent): void {

    event.preventDefault();
    this.cssisDragOver = false;
    // this.cssisDragOver=false;

    // console.log(this.cssisDragOver)
    // console.log('entro a onDragOver')

    // event.preventDefault();
    // if(event.target.dataset.effect)
    // event.dataTransfer.dropEffect = event.target.dataset.effect;
    // let ul = event.target.closest('ul.drop');
    // if (ul) ul.classList.add('over');
  }



  // cssisDragOver:boolean=false;

  // document.querySelector('.droplists').addEventListener('dragover', e => {
  //   e.preventDefault();
  //   if(e.target.dataset.effect)
  //     e.dataTransfer.dropEffect = e.target.dataset.effect;
  //   let ul = e.target.closest('ul.drop');
  //   if (ul) ul.classList.add('over');
  // });

  // document.querySelector('.droplists').addEventListener('dragleave', e => {
  //   e.preventDefault();
  //   let ul = e.target.closest('ul.drop');
  //   if (ul) ul.classList.remove('over');
  // });
}