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
  workingCountryList: IAdaptedCountry[] = [];
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
        this.adaptFlag(this.countryList);
        this.regionList = this.createRegionList();
        this.subregionList = [];
        this.searchForm = this.initForm();
        this.isLoading = false;
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
      region: ['all'],
      subregion: [{value: 'all', disabled: true}],
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
    this.flagList = [];
    for( let country of countries ){
        this.flagList.push(
          {
            code: country.code,
            country: country.name.common,
            country_flag: country.flag,
          }
        );
    }
  }
  createRegionList(): string[] {
    const regionDuplicateArray = this.countryList.map( region => region.region);
    const regionSingleArray = [... new Set(regionDuplicateArray)];
    return regionSingleArray;
  }

  createSubregionList(): string[] {
    const subregionDuplicateArray = this.workingCountryList.map((subregion: any) => subregion.subregion);
    const subregionSingleArray = [... new Set(subregionDuplicateArray)];
    return subregionSingleArray;
  }

  search(): void{
    const inputText = this.searchForm.controls.name.value;
    const searchList = this.countryList.filter( (data: any) => data.name.common.toLowerCase().includes(inputText) );
    this.adaptFlag(searchList);
    this.workingCountryList = searchList;
  }

  filterCountryRegion(): void{

    this.workingCountryList = [];
    this. subregionList = [];
    const regionSelected = this.searchForm.controls.region.value;

    if ( this.searchForm.controls.name.value.length === 0){
      if( regionSelected !== 'all'){
        this.workingCountryList = this.countryList.filter(region => region.region === regionSelected);
        this.subregionList = this.createSubregionList();
        this.searchForm.get('subregion')?.enable();
      } else {
        this.workingCountryList = this.countryList;
        this.searchForm.get('subregion')?.disable();
      }
    }
    else {
      const auxCountryList = this.workingCountryList;

      if ( regionSelected !== 'all'){

      }
      else{
        this.workingCountryList = auxCountryList.filter(region => region.region === regionSelected);
        this.searchForm.get('subregion')?.disable();
      }

    }



    this.adaptFlag(this.workingCountryList);

  }

  filterCountrySubRegion(): void{
    const subregionSelected = this.searchForm.controls.subregion.value;
    const regionSelected = this.searchForm.controls.region.value;

    if ( subregionSelected !== 'all' ){
      this.workingCountryList = this.countryList.filter(subregion => subregion.subregion === subregionSelected);
    } else {
      this.workingCountryList = this.countryList.filter(region => region.region === regionSelected);
    }

    this.adaptFlag(this.workingCountryList);
  }



}
