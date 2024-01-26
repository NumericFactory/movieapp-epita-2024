import { Component } from '@angular/core';
import { SearchModel } from '../../shared/models/search.model';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss'
})
export class SearchViewComponent {

  results!: SearchModel[];

  getSearchResults(results: any) {
    this.results = results
  }

}
