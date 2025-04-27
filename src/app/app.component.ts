import { Component } from '@angular/core';
 import { APP_VERSION } from '../environments/version';;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'CPP_Frontend app is running!'; ;
  seleccion: string = '';
  version = APP_VERSION;
}
