import { Component } from '@angular/core';
import { TMDBService } from '../../../core/adapters/tmdb.service';
import { MovieModel } from '../../../core/models/movie.model';
import { Observable, Subscription } from 'rxjs';
import { Genre, genresMovie } from '../../../shared/data/genres.data';
import { APIExternalMoviesGateway } from '../../../core/ports/api-external-movies.gateway';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { DialogConfirmComponent } from '../../../shared/components/ui/dialog-confirm/dialog-confirm.component';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrl: './movie-list-view.component.scss'
})
export class MovieListViewComponent {

  movies$: Observable<MovieModel[]> = this._TMDBSvc.getMoviesFromApi();
  genres: Genre[] = genresMovie;
  subscription!: Subscription;

  constructor(
    // private _TMDBSvc: TMDBService
    private _TMDBSvc: APIExternalMoviesGateway,
    private _modalSvc: ModalService
  ) { }
  /**
     * getMoviesFromApi()
     * retourne _TMDBSvc.movies$$.asObservable()
     * 
     * donc je peux subscribe à cette source
     * this.subscription = this._TMDBSvc.getMoviesFromApi().subscribe(data => this.movies = data) 
     * 
     * ou directement avec le pipe async dans la view...
     * @for (itemMovie of movies$ | async ; track itemMovie.id)
     * 
     * 
     */

  ngOnInit() {
    this._TMDBSvc.getMoviesFromApi()
  }

  confirmDeleteAction() {
    this._modalSvc.confirmDialog('Supprimer ce film')
      .subscribe((isConfirmed: boolean) => {
        isConfirmed ? console.log("je supprime") : console.log("je supprime pas");
      })
  }

  selectGenre(genre: Genre) {
    console.log(genre)
    // Request TMDV /movie/
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}
