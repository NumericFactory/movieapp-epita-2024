import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
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
      // filter(val => val.length > 2),
      debounceTime(500)
    );

    // 2/ request
    search$.pipe(
      switchMap(data => this.movieSvc.search(data))
    )
      .subscribe((data: any) => {
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
