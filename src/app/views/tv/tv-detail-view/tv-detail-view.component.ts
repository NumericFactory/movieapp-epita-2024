import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TMDBService } from '../../../core/adapters/tmdb.service';
import { TvShowModel } from '../../../core/models/tv-show.model';
import { Location } from '@angular/common';
import { APIExternalMoviesGateway } from '../../../core/ports/api-external-movies.gateway';

@Component({
  selector: 'app-tv-detail-view',
  templateUrl: './tv-detail-view.component.html',
  styleUrl: './tv-detail-view.component.scss'
})
export class TvDetailViewComponent {
  tvshow$!: Observable<TvShowModel>
  constructor(
    private _route: ActivatedRoute,
    //private _TMDBSvc: TMDBService,
    private _TMDBSvc: APIExternalMoviesGateway,
    private _sanitize: DomSanitizer,
    public location: Location) { }

  ngOnInit() {
    // 1 On récupere l'id dans l'URL
    const tvShowId: string = this._route.snapshot.params['id'];
    this.tvshow$ = this._TMDBSvc.getOneTvShowFromApi(tvShowId).pipe(
      tap(console.log)
    )
    // 2 dans la view (tvshow$ | async; as tvshow)
  }

  getFullVideoUrl(key: string): SafeResourceUrl {
    return this._sanitize.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + key);
  }

  getBackdropImage(tvshow: TvShowModel) {
    return `background: url(https://image.tmdb.org/t/p/w1280/${tvshow.image_landscape})`;
  }

}
