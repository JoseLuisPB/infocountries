import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICountry } from '../../interfaces/country';

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
  regionList: string[] = [];
  regionSelection!: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder) {
    }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ICountry>(this.countryData);
    this.regionList = this.createRegionList();
    this.regionSelection = this.initForm();
    this.regionSelection.get('region')?.valueChanges.subscribe( region => this.filterByRegion(region));
  }

  ngAfterViewInit(): void {
    this.adjustPaginatorAndSort();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  initForm(): FormGroup{
    return this.fb.group({
      region: ['world']
    })
  }

  createRegionList(): string[] {
    const regionDuplicateArray = this.countryData.map( region => region.region);
    const regionSingleArray = [... new Set(regionDuplicateArray)];
    return regionSingleArray;
  }

  filterByRegion(region: string): void {
    const filteredCountryData = this.countryData.filter( reg => reg.region === region);
    this.dataSource = new MatTableDataSource<ICountry>(filteredCountryData);
    this.adjustPaginatorAndSort();
  }

  adjustPaginatorAndSort(): void {
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
