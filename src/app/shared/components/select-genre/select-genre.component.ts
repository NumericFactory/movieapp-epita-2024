import { Component, EventEmitter, Input, Output } from '@angular/core';
import { genresMovie, genresTv, Genre } from './genres.data';

@Component({
  selector: 'app-select-genre',
  templateUrl: './select-genre.component.html',
  styleUrl: './select-genre.component.scss'
})
export class SelectGenreComponent {
  genres: Genre[] = genresMovie;
  menuIsOpened: boolean = false;
  @Input({ required: true }) contentType!: 'movie' | 'tv';
  @Output() selectGenreEvent = new EventEmitter()

  ngOnInit() {
    this.genres = this.contentType === 'movie'
      ? genresMovie
      : genresTv
  }

  select(genreId: number) {
    this.selectGenreEvent.emit(genreId)
    this.menuIsOpened = false;
  }
  openMenu() {
    this.menuIsOpened = true
  }
  closeMenu() {
    this.menuIsOpened = false
  }
  openOrClose() {
    this.menuIsOpened = !this.menuIsOpened
  }
}
