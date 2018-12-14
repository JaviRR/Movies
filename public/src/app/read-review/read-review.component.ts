import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-read-review',
  templateUrl: './read-review.component.html',
  styleUrls: ['./read-review.component.css']
})
export class ReadReviewComponent implements OnInit {
  id: any;
  reviews: any;
  data2: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => this.id = params);
    this.recoverReviews();
  }
  recoverReviews(){
    let observable = this._httpService.recoverReviews(this.id);
    observable.subscribe(data =>{
      this.data2 = data;
      console.log(this.data2.data.reviews);
      this.reviews = this.data2.data.reviews;
    })
  }
  deleteReview(id){
      let observable = this._httpService.removeReview({_id: id}, this.id);
      observable.subscribe(data =>{
        console.log(data);
        this.recoverReviews();
      })
  }
  deleteMovie(){
    let observable = this._httpService.removeMovie(this.id);
    observable.subscribe(data => {
      console.log(data);
      this._router.navigate(['/movies']);
    })
  }
}
