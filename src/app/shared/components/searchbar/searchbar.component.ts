import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { TmdbService } from '../../services/tmdb.service';
import { SearchModel } from '../../models/search.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  searchInput = new FormControl();
  results!: SearchModel[];
  @Output() onResultsEvent = new EventEmitter()

  constructor(private tmdbSvc: TmdbService) { }

  ngOnInit() {
    // 1 traiter la saisie du user
    let search$ = this.searchInput.valueChanges.pipe(
      // filter(val => val.length > 2),
      debounceTime(500)
    );

    // 2 request
    search$
      .pipe(
        switchMap(data => this.tmdbSvc.search(data))
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
