import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {
  id: any;
  title: any;
  review: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.review = {name : ""};
    this.review = {rate : 1};
    this.review = {review : ""};
    this._route.params.subscribe(params => this.id = params);
    let observable = this._httpService.recoverMovie(this.id);
    observable.subscribe(data => {
      // console.log(data);
      this.title = data.data.title;
    })
  }
  onSubmit(){
    let observable = this._httpService.newReview(this.review, this.id.id);
    observable.subscribe(data => {
      console.log(data);
    })
    this._router.navigate(['/movies']);
  }

}
