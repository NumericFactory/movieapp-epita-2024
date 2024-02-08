import { Component, ViewEncapsulation } from '@angular/core';
import { APIExternalMoviesGateway } from '../../../../core/ports/api-external-movies.gateway';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrl: './actionbar.component.scss'
})
export class ActionbarComponent {

  constructor(private _TMDBSvc: APIExternalMoviesGateway) { }

  nextMoviesAction() {
    this._TMDBSvc.getNextMoviesFromApi();
  }

}
