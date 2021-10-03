import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFlag } from 'src/app/interfaces/flag';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flag_array: IFlag[] = [];
  url: string = 'https://restcountries.com/v3/alpha/';
  isLoading: boolean = true;


  constructor(private restcountries: RestcountriesService,
              private router: Router) {
    this.restcountries.getAllCountries().subscribe( (data: any) => {

      for( let item of data){
        this.flag_array.push(
          {
            code: item.cca2,
            country_flag: item.flags[1],
            country: item.name.common
          }
        )
      }

      this.isLoading = false;
    });
  }

  ngOnInit(): void {
  }

  randomCountry(): void{

    const codeArray = this.flag_array.map( item => item.code);
    const numberOfCountries = this.flag_array.length;
    const position = Math.round(Math.random() * (numberOfCountries - 0) + 0);
    const countryCode = codeArray[position];
    this.router.navigate(['/detail', countryCode]);

  }

}
