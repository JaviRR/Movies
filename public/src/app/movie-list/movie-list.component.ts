import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  display = false;
  names: any = {};
  avgRates: any = [];
  sum = 0;
  avg = 0;
  data2: any;
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.recoverMovies();
  }
  recoverMovies(){
    this.avgRates = [];
    this.sum = 0;
    this.avg = 0;
    let observable = this._httpService.allMovies();
    observable.subscribe(data=>{
      console.log(data);
      this.data2 = data;
      this.names = this.data2.data;
      for(let x=0;x<this.names.length;x++){
        for(let j=0;j<this.names[x].reviews.length;j++){
          this.sum += Number(this.names[x].reviews[j].rate);
        }
        this.avg = this.sum/this.names[x].reviews.length;
        this.avgRates.push(this.avg);
        this.sum = 0;
        this.avg = 0;
      }
      console.log("rates", this.avgRates);
    })
  }
  displayNew(){
    this.display = true;
  }
  invoke(event){
    this.display = false;
    this.recoverMovies();
  }

}
