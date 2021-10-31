import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICountry } from '../../interfaces/country';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {

  @Input() countryData!:ICountry[];

  displayedColumns: string[] = ['flag', 'country', 'capital', 'population', 'area'];
  dataSource!: MatTableDataSource<ICountry>;
  subscriptions: Subscription[] = [];
  countriesFilteredByRegion: ICountry[] = [];
  regionList: string[] = [];
  subregionList: string[] = [];
  regionsForm!: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private liveAnnouncer: LiveAnnouncer,
    ) {
    }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ICountry>(this.countryData);
    this.regionList = this.utils.createRegionList(this.countryData);
    this.regionsForm = this.initForm();
    this.regionsForm.get('region')?.valueChanges.subscribe( region => this.filterByRegion(region));
    this.regionsForm.get('subregion')?.valueChanges.subscribe( subregion => this.filterBySubregion(subregion));
  }

  ngAfterViewInit(): void {
    this.refreshPaginatorAndSort();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  initForm(): FormGroup{
    return this.fb.group({
      region: ['World'],
      subregion: [{value: 'All', disabled: true}]
    })
  }

  filterByRegion(region: string): void {

    if ( region === 'World' ) {
      this.dataSource = new MatTableDataSource<ICountry>(this.countryData);
      this.regionsForm.get('subregion')?.disable();

    } else {
      this.countriesFilteredByRegion = this.countryData.filter( reg => reg.region === region);
      this.dataSource = new MatTableDataSource<ICountry>(this.countriesFilteredByRegion);
      this.subregionList = this.utils.createSubregionList(this.countriesFilteredByRegion);
      this.regionsForm.get('subregion')?.enable();
      console.log(this.subregionList);
    }

    this.refreshPaginatorAndSort();
  }

  filterBySubregion(subregion: string): void {

    if ( subregion === 'All' ) {
      this.dataSource = new MatTableDataSource<ICountry>(this.countriesFilteredByRegion);
    } else {
      const filteredSubregionData = this.countriesFilteredByRegion.filter( sub => sub.subregion === subregion);
      this.dataSource = new MatTableDataSource<ICountry>(filteredSubregionData);
    }

    this.refreshPaginatorAndSort();
  }

  refreshPaginatorAndSort(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

}
