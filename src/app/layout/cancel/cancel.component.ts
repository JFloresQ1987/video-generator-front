import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cancel.component.html',  
  styleUrl: './cancel.component.css',
})
export default class CancelComponent {

  year = new Date().getFullYear();
}
