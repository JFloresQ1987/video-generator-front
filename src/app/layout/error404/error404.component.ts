import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error404.component.html',  
  styleUrl: './error404.component.css',
})
export class Error404Component {

  year = new Date().getFullYear();

}
