import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieListViewComponent } from './views/movie-list-view/movie-list-view.component';
import { MovieDetailViewComponent } from './views/movie-detail-view/movie-detail-view.component';
import { ActionbarComponent } from './views/movie-list-view/actionbar/actionbar.component';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { CardComponent } from './shared/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { TvListViewComponent } from './views/tv-list-view/tv-list-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieListViewComponent,
    MovieDetailViewComponent,
    ActionbarComponent,
    SearchbarComponent,
    CardComponent,
    TvListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
