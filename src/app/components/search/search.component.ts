import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFlag } from 'src/app/interfaces/flag';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import { ICountry } from '../../interfaces/country'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

  @Output() codeListEmiter = new EventEmitter<string[]>();

  isLoading: boolean = true;
  searchFindResult: boolean = true;
  subscriptions: Subscription[] = [];
  countryList: ICountry[] = [];
  workingCountryList: ICountry[] = [];
  flagList: IFlag[] = [];
  codeList: string[] = []
  regionList: string[] = [];
  subregionList: string[] = [];
  searchForm!: FormGroup;


  constructor(
    private restcountries: RestcountriesService,
    private fb: FormBuilder,
  ) {
    this.subscriptions.push(
      this.restcountries.getAllCountries().subscribe( (countries:  any) => {
        this.createCountryList(countries);
        this.createFlagList(this.countryList);
        this.createCodeList(this.countryList);
        this.regionList = this.createRegionList();
        this.subregionList = [];
        this.searchForm = this.initForm();
        this.loadFormValueChanges();
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

  createCountryList(countries: any): void{
    for( let country of countries){
      const adaptedCountry: ICountry = {
        flag: country.flags[1],
        code: country.cca2,
        name: country.name,
        region: country.region,
        subregion: country.subregion,
      }
      this.countryList.push( adaptedCountry );
    }
  }

  createFlagList(countries: any): void {
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

  createCodeList(countries: any): void {
    for(let country of countries){
      this.codeList.push(country.code)
    }

    this.codeListEmiter.emit(this.codeList);
  }

  loadFormValueChanges(): void {
    this.searchForm.get('region')?.valueChanges.subscribe( data => {
      this.filterCountryRegion(this.countryList);
    });

    this.searchForm.get('subregion')?.valueChanges.subscribe( data => {
      this.filterCountrySubRegion(this.countryList);
    })
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
    const searchText = this.searchForm.controls.name.value;
    const searchList: ICountry[] = this.countryList.filter( (country: any) => country.name.common.toLowerCase().includes(searchText) );
    this.createFlagList(searchList);
    this.workingCountryList = searchList;

    if(searchList.length === 0 ){
      this.searchFindResult = false;
    } else {
      this.searchFindResult = true;
    }
  }

  filterCountryRegion(actualCountryList: ICountry[]): void{
    this.searchFindResult = true;
    const regionSelected = this.searchForm.get('region')?.value

      if( regionSelected === 'all'){
        this.searchForm.get('subregion')?.disable();
        this.workingCountryList = this.countryList;
      } else {
        this.searchForm.get('subregion')?.enable();
        this.workingCountryList = actualCountryList.filter((region: any) => region.region === regionSelected);
        this.subregionList = this.createSubregionList();
      }

      this.createFlagList(this.workingCountryList);
      this.resetSearchText();
    }

  filterCountrySubRegion(actualCountryList: any): void {
    this.searchFindResult = true;
    const subregionSelected = this.searchForm.controls.subregion.value;
    const regionSelected = this.searchForm.controls.region.value;

    if ( subregionSelected !== 'all' ){
      this.workingCountryList = actualCountryList.filter((subregion: any) => subregion.subregion === subregionSelected);
    } else {
      this.workingCountryList = actualCountryList.filter((region: any) => region.region === regionSelected);
    }

    this.createFlagList(this.workingCountryList);
      this.resetSearchText();
  }

  resetSearchText(): void {
    this.searchForm.patchValue({name: ''});
  }

  resetSelectInput(): void {
    this.searchForm.patchValue({region: 'all', subregion: 'all'});
  }

}
