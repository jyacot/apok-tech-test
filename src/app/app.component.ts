import { AfterViewInit, Component } from '@angular/core';

declare var feather: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'apok-tech-test';

  ngAfterViewInit() {
    feather.replace();
  }
}
