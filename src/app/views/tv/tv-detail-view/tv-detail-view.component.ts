import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../shared/services/tmdb.service';
import { TvShowModel } from '../../../shared/models/tv-show.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tv-detail-view',
  templateUrl: './tv-detail-view.component.html',
  styleUrl: './tv-detail-view.component.scss'
})
export class TvDetailViewComponent {
  tvshow$!: Observable<TvShowModel>
  constructor(
    private route: ActivatedRoute,
    private tmdbSvc: TmdbService,
    private sanitize: DomSanitizer,
    public location: Location) { }

  ngOnInit() {
    // 1 On récupere l'id dans l'URL
    const tvShowId: string = this.route.snapshot.params['id'];
    this.tvshow$ = this.tmdbSvc.getOneTvShowFromApi(tvShowId).pipe(
      tap(console.log)
    )
    // 2 dans la view (tvshow$ | async; as tvshow)
  }

  getFullVideoUrl(key: string): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + key);
  }

  getBackdropImage(tvshow: TvShowModel) {
    return `background: url(https://image.tmdb.org/t/p/w1280/${tvshow.image_landscape})`;
  }

}
