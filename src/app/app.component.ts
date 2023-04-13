import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PieCloudAngular';
    enableModule: boolean = false;

  constructor() {
    this.loadModules();
  }

  loadModules() {
    if ((window.location.pathname.includes('/Details'))) {
      this.enableModule = true;
    }
    else {
      this.enableModule = false;
    }
  }
}
