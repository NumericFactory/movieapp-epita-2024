import { Component } from '@angular/core';
import { SearchModel } from '../../shared/models/search.model';
import { MovieModel } from '../../shared/models/movie.model';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss'
})


export class SearchViewComponent {

  results!: SearchModel[];

  getSearchResults(results: any) {
    console.log(results);
    this.results = results
  }

  isSearchModelInstance(obj: any): boolean {
    return obj instanceof MovieModel;
  }
}
