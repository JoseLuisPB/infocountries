import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  country: any = {
    flag: '',
    name: '',
    capital:'',
    population: 0,
    area: 0,
    region: '',
    subregion: '',
    continent: '',
  };

  constructor(private restcountries: RestcountriesService,
              private route: ActivatedRoute)
  {
    const id = this.route.snapshot.params.id;
    this.restcountries.getCountry(id).subscribe( (data:any) => {
      this.country.flag = data[0].flags[1];
      this.country.name = data[0].name.common;
      this.country.capital = data[0].capital[0];
      this.country.population = data[0].population;
      this.country.area = data[0].area;
      this.country.region = data[0].region;
      this.country.subregion = data[0].subregion;
      this.country.continent = data[0].continent;
    })
  }

  ngOnInit(): void {
  }

}
