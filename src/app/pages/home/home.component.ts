import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFlag } from 'src/app/interfaces/flag';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  flag_array: IFlag[] = [];
  url: string = 'https://restcountries.com/v3/alpha/';
  isLoading: boolean = true;


  constructor(private restcountries: RestcountriesService,
              private router: Router
  ){

    this.subscriptions.push(
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
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  randomCountry(): void{

    const codeArray = this.flag_array.map( item => item.code);
    const numberOfCountries = this.flag_array.length;
    const position = Math.round(Math.random() * (numberOfCountries - 0) + 0);
    const countryCode = codeArray[position];
    this.router.navigate(['/detail', countryCode]);

  }

}
