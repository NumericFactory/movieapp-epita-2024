import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { TMDBService } from '../../../core/adapters/tmdb.service';
import { SearchModel } from '../../../core/models/search.model';
import { APIExternalMoviesGateway } from '../../../core/ports/api-external-movies.gateway';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  searchInput = new FormControl();
  results!: SearchModel[];
  @Output() onResultsEvent = new EventEmitter()

  constructor(private _TMDBSvc: APIExternalMoviesGateway, private _router: Router) { }

  ngOnInit() {
    // 1 traiter la saisie du user
    let search$ = this.searchInput.valueChanges.pipe(
      // filter(val => val.length > 2),
      debounceTime(500)
    );

    // 2 request
    search$
      .pipe(
        switchMap(data => this._TMDBSvc.search(data))
      )
      .subscribe((data: SearchModel[]) => {
        console.log(data)
        this.results = data;
        this.onResultsEvent.emit(data)
      })
  }















  // /**
  //  * 
  //  * @returns Observable<boolean>
  //  */
  // scrollingFinished$(): Observable<boolean> {
  //   let emitted: boolean = false;
  //   return fromEvent(window, 'scroll').pipe(
  //     map(() => {
  //       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !emitted) {
  //         emitted = true;
  //         return true;
  //         //this.scrollingFinished.emit();
  //       } else {
  //         emitted = false;
  //         return false;
  //       }
  //     }),
  //     //debounceTime(100),
  //     filter(val => val === true)
  //   )
  // }



}
