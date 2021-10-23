import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  codeList: string[] = [];
  randomButtonDisabled = true;

  constructor(private router: Router){}

  createCodeList(event: string[]): void {

    this.codeList = event;
    this.randomButtonDisabled = false;
  }

  randomCountry(): void{

    const numberOfCountries = this.codeList.length;
    const position = Math.round(Math.random() * (numberOfCountries - 0) + 0);
    const countryCode = this.codeList[position];
    this.router.navigate(['/detail', countryCode]);
  }

}
