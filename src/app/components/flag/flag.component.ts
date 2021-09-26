import { Component, OnInit } from '@angular/core';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import { flag} from '../../interfaces/flag'

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {

  flag_data: flag[] = [];
  url: string = 'https://restcountries.com/v3/alpha/';
  isLoading: boolean = true;

  constructor(private restcountries: RestcountriesService) {

    this.restcountries.getAllCountries().subscribe( (data: any) => {

      for( let item of data){
        this.flag_data.push(
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

}
