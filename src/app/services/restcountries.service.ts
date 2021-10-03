import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  url: string = 'https://restcountries.com/v3/';

  constructor(private http: HttpClient) { }

  getAllCountries(){
    const url_complete = this.url + 'all';
    return this.http.get(url_complete);
  }

  getCountry(id: string){
    const url_complete =  this.url + 'alpha/' + id;
    return this.http.get(url_complete);
  }

}
