import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  constructor(private http: HttpClient) { }

  getAllCountries(){
    return this.http.get('https://restcountries.com/v3/all');
  }

  getCountry(id: string){
    const url = 'https://restcountries.com/v3/alpha/' + id;
    return this.http.get(url);
  }

}
