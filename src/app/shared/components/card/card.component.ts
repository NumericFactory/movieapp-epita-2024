import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../../models/movie.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() movie!: any;

  ngOnInit(): void {

  }
  getFullImageUrl(fragmentUrl: string) {
    return 'https://image.tmdb.org/t/p/w500' + fragmentUrl;
  }

}
