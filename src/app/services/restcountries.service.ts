import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  url: string = 'https://restcountries.com/v3/';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any>{
    const url_complete = this.url + 'all';
    return this.http.get(url_complete);
  }

  getCountry(id: string): Observable<any>{
    const url_complete =  this.url + 'alpha/' + id;
    return this.http.get(url_complete);
  }

}
