import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ReadReviewComponent } from './read-review/read-review.component';
import { WriteReviewComponent } from './write-review/write-review.component';

const routes: Routes = [
  {path: 'movies', component: MoviesComponent, children: [
    {path: '', component: MovieListComponent},
    {path: ':id/review', component: WriteReviewComponent},
    {path: ':id', component: ReadReviewComponent}
  ]},
  {path: '', pathMatch: 'full', redirectTo: 'movies'},
  {path:'**', component: MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
