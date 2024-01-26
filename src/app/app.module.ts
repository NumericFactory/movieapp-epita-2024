import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MovieDetailViewComponent } from './views/movies/movie-detail-view/movie-detail-view.component';
import { ActionbarComponent } from './views/movies/movie-list-view/actionbar/actionbar.component';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { CardComponent } from './shared/components/card/card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TvListViewComponent } from './views/tv/tv-list-view/tv-list-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { MovieListViewComponent } from './views/movies/movie-list-view/movie-list-view.component';
import { PrintdurationPipe } from './shared/pipes/printduration.pipe';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { RegisterViewComponent } from './views/user/register-view/register-view.component';
import { LoginViewComponent } from './views/user/login-view/login-view.component';
import { TvDetailViewComponent } from './views/tv/tv-detail-view/tv-detail-view.component';
import { WatchlistComponent } from './views/user/watchlist/watchlist.component';
import { SelectGenreComponent } from './shared/components/select-genre/select-genre.component';
import { ClickoutsideDirective } from './shared/directives/clickoutside.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieListViewComponent,
    MovieDetailViewComponent,
    ActionbarComponent,
    SearchbarComponent,
    CardComponent,
    TvListViewComponent,
    HomeViewComponent,
    SearchViewComponent,
    PrintdurationPipe,
    RegisterViewComponent,
    LoginViewComponent,
    TvDetailViewComponent,
    WatchlistComponent,
    SelectGenreComponent,
    ClickoutsideDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
