import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading!: Observable<boolean>;

  constructor(public loaderSvc: LoaderService) {
    this.isLoading = loaderSvc.isLoading$
  }

}
