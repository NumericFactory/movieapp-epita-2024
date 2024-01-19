import { Component } from '@angular/core';
import { TvShowModel } from '../../shared/models/tv-show.model';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-tv-list-view',
  templateUrl: './tv-list-view.component.html',
  styleUrl: './tv-list-view.component.scss'
})
export class TvListViewComponent {


  // variable d'affichage
  tvShows: TvShowModel[] = [];

  constructor(private movieSvc: MovieService) { }

  ngOnInit() {
    this.movieSvc.getTvShowFromApi()
      .subscribe((data: TvShowModel[]) => {
        console.log(data);
        this.tvShows = data
      });
  }

}
