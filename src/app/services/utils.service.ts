import { Injectable } from '@angular/core';
import { ICountry } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  createRegionList(countryList: ICountry[]): string[] {
    const regionListWithDuplicates = countryList.map( region => region.region);
    const regionList = [... new Set(regionListWithDuplicates)];
    return regionList;
  }

  createSubregionList(countryList: ICountry[]): string[] {
    const subregionListWithDuplicates = countryList.map((subregion: any) => subregion.subregion);
    const subregionList = [... new Set(subregionListWithDuplicates)];
    return subregionList;
  }

}
