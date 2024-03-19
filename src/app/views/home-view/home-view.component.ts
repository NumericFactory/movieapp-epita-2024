import { Component } from '@angular/core';
import { MovieModel } from '../../core/models/movie.model';
import { TvShowModel } from '../../core/models/tv-show.model';
import { TMDBService } from '../../core/adapters/tmdb.service';
import { APIExternalMoviesGateway } from '../../core/ports/api-external-movies.gateway';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

  movies!: MovieModel[];
  tv!: TvShowModel[];
  pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  activeSlide = 0;
  sliders!: MovieModel[];

  constructor(
    //private _TMDBSvc: TMDBService
    private _TMDBSvc: APIExternalMoviesGateway,
    private _sanitize: DomSanitizer
  ) { }




  nextSlide() {
    this.activeSlide++;
    if (this.activeSlide > this.sliders.length - 1) {
      this.activeSlide = 0;
    }
  }

  previousSlide() {
    this.activeSlide--;
    if (this.activeSlide < 0) {
      this.activeSlide = this.sliders.length - 1;
    }
  }

  ngOnInit() {
    // recuperer les 5 premiers movies
    this._TMDBSvc.getMoviesFromApi().subscribe(
      data => {
        console.log(data)
        this.movies = data
        this.sliders = data

      }
    )
  }

  findNextMoviesAction(pageNumber?: number) {
    if (pageNumber) {
      this._TMDBSvc.getNextMoviesFromApi(pageNumber)
    }
    else {
      this._TMDBSvc.getNextMoviesFromApi()
    }
  }

  findPrevMoviesAction() {
    this._TMDBSvc.getPrevMoviesFromApi()
  }

  getFullImageUrl(fragmentUrl: string): string {
    return `url(https://image.tmdb.org/t/p/original/${fragmentUrl})`;
  }



  ngOnDestroy() {
    console.log('ceci va s\'executer juste avant la destruction du component HomeView')
  }

}
