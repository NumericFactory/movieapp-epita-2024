import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ObservableLike, debounceTime, filter, switchMap, tap } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';
import { TvShowModel } from '../../models/tv-show.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  searchInput = new FormControl();
  results!: any;
  @Output() onResultsEvent = new EventEmitter()


  constructor(private movieSvc: MovieService) { }

  ngOnInit() {
    // 1 traiter la saisie du user
    let search$ = this.searchInput.valueChanges.pipe(
      filter(val => val.length > 2),
      debounceTime(500),
      tap(val => console.log(val))
    );

    // 2/ request
    search$
      .pipe(
        switchMap(data => this.movieSvc.search(data))
      )
      .subscribe((data: any) => {
        this.results = data;
        this.onResultsEvent.emit(data)
      })

  }

}
