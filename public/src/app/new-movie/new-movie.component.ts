import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  @Input() myTasks: any;
  @Output() myEvent = new EventEmitter();
  movie: any;
  review: any;
  id: any;
  error: any;
  data1: any;
  data2: any;
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.movie = {title : ""};
    this.review = {name : ""};
    this.review = {rate : 1};
    this.review = {review : ""};
  }
  onSubmit(){
    let observable = this._httpService.newMovie(this.movie);
    observable.subscribe(data =>{
      console.log(data);
      this.data1 = data;
      if(this.data1.error){
        this.error = this.data1.error.errors.title.message;
      }else{
        this.id = this.data1.data._id;
        console.log(this.id);
        let observable2 = this._httpService.newReview(this.review, this.id);
        observable2.subscribe(data =>{
          this.data2 = data;
          console.log(data);
          if(this.data2.error){
            this.error = this.data2.error.message;
            let observable3 = this._httpService.removeMovie({id: this.id});
            observable3.subscribe(data => {
              console.log(data);
            })
          }else{
            this.callParent();
          }
        })
      }
    })
  }
  callParent(){
    this.myEvent.emit("Hello");
  }

}
