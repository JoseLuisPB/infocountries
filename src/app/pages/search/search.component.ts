import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFlag } from 'src/app/interfaces/flag';
import { RestcountriesService } from 'src/app/services/restcountries.service';

interface IAdaptedCountry {
  flag: string;
  code: string;
  name: string;
  region: string;
  subregion: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  countryList: IAdaptedCountry[] = [];
  auxCountryList: IAdaptedCountry[] = [];
  flagList: IFlag[] = [];
  regionList: string[] = [];
  subregionList: string[] = [];
  searchForm!: FormGroup;
  isLoading: boolean = true;

  constructor(
    private restcountries: RestcountriesService,
    private fb: FormBuilder,
  ) {
    this.subscriptions.push(
      this.restcountries.getAllCountries().subscribe( (countries:  any) => {
        this.adaptCountry(countries);
        this.auxCountryList = this.countryList;
        this.adaptFlag(this.auxCountryList);
        this.regionList = this.createRegionList();
        this.searchForm = this.initForm();
        this.isLoading = false
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  initForm(): FormGroup{
    return this.fb.group({
      name: [''],
      region: [null],
      subregion: [''],
      language: [null],
    });
  }

  adaptCountry(countries: any): void{
    for( let item of countries){
      const adaptedCountry: IAdaptedCountry = {
        flag: item.flags[1],
        code: item.cca2,
        name: item.name,
        region: item.region,
        subregion: item.subregion,
      }
      this.countryList.push( adaptedCountry );
    }
  }

  adaptFlag(countries: any): void{
    console.log(countries);
    for( let country of countries ){

        this.flagList.push(
          {
            code: country.code,
            country: country.name,
            country_flag: country.flag,
          }
        );

    }
    console.log(this.flagList);
  }

  createRegionList(): string[]{
    const regionDuplicateArray = this.countryList.map( region => region.region);
    const regionSingleArray = [... new Set(regionDuplicateArray)];
    return regionSingleArray;
  }

  filterCountry(): void{

    const regionSelected = this.searchForm.controls.region.value;

    if( regionSelected !== 'all'){
      this.auxCountryList = this.countryList.filter(region => region.region === regionSelected);
    } else {
      this.auxCountryList = this.countryList;
    }

    this.adaptFlag(this.auxCountryList);

  }

  dataCheck(): void{

  }

}
