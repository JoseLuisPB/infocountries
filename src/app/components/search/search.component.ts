import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFlag } from 'src/app/interfaces/flag';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import { ICountry } from '../../interfaces/country';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

  @Output() codeListEmiter = new EventEmitter<string[]>();

  isLoading = true;
  searchFindResult = true;
  subscriptions: Subscription[] = [];
  countryList: ICountry[] = [];
  filteredCountryList: ICountry[] = [];
  flagList: IFlag[] = [];
  codeList: string[] = []
  regionList: string[] = [];
  subregionList: string[] = [];
  searchForm!: FormGroup;


  constructor(
    private restcountries: RestcountriesService,
    private utils: UtilsService,
    private fb: FormBuilder,
  ) {
    this.subscriptions.push(
      this.restcountries.getAllCountries().subscribe( countries => {
        this.createCountryList(countries);
        this.createFlagList(this.countryList);
        this.createCodeList(this.countryList);
        this.regionList = this.utils.createRegionList(this.countryList);
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

  search(): void{
    const searchText = this.searchForm.get('name')?.value;
    const searchList: ICountry[] = this.countryList.filter( (country: any) => country.name.common.toLowerCase().includes(searchText) );
    this.createFlagList(searchList);
    this.filteredCountryList = searchList;

    if(searchList.length === 0 ){
      this.searchFindResult = false;
    } else {
      this.searchFindResult = true;
    }
  }

  filterCountryRegion(countryList: ICountry[]): void{

    if ( countryList.length === 0 ){
      this.searchFindResult = false;
      return;
    }

    this.searchFindResult = true;
    const regionSelected = this.searchForm.get('region')?.value

      if( regionSelected === 'all'){
        this.searchForm.get('subregion')?.disable();
        this.filteredCountryList = this.countryList;
      } else {
        this.searchForm.get('subregion')?.enable();
        this.filteredCountryList = countryList.filter((region: any) => region.region === regionSelected);
        this.subregionList = this.utils.createSubregionList(this.filteredCountryList);
      }

      this.createFlagList(this.filteredCountryList);
      this.resetSearchText();
  }

  filterCountrySubRegion(countryList: any): void {

    if ( countryList.length === 0 ){
      this.searchFindResult = false;
      return;
    }

    this.searchFindResult = true;
    const subregionSelected = this.searchForm.get('subregion')?.value;
    const regionSelected = this.searchForm.get('region')?.value;

    if ( subregionSelected === 'all' ){
      this.filteredCountryList = countryList.filter((region: any) => region.region === regionSelected);
    } else {
      this.filteredCountryList = countryList.filter((subregion: any) => subregion.subregion === subregionSelected);
    }

    this.createFlagList(this.filteredCountryList);
    this.resetSearchText();
  }

  resetSearchText(): void {
    this.searchForm.get('name')?.patchValue('');
  }

}
