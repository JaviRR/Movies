import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  allMovies(){
    return this._http.get("/all");
  }
  newMovie(data){
    // console.log(data);
    return this._http.post("/newMovie", data);
  }
  newReview(data, id){
    console.log(data, id);
    console.log(id);
    return this._http.post("/newReview/"+id, data);
  }
  recoverReviews(id){
    // console.log(id);
    return this._http.get("/allreviews/"+id.id);
  }
  recoverMovie(id){
    // console.log(id);
    return this._http.get("/recovermovie/"+id.id);
  }
  removeReview(id, id2){
    // console.log(id);
    // console.log(id2.id);
    return this._http.post("/review/"+id2.id, id);
  }
  removeMovie(id){
    // console.log("service",id);
    return this._http.delete("/deletemovie"+id.id);
  }
}
