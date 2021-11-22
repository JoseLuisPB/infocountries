import { Component, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  isLoading = true;
  languagesFormated = '';
  numOfLanguages = 0;
  countryData: any;

  constructor(private restcountries: RestcountriesService,
              private route: ActivatedRoute
  )
  {
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.restcountries.getCountry(id).subscribe( data => {

        this.countryData = data[0];
        this.formatLanguages(data[0].languages);
        this.isLoading = false;
      })
    );

  }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  formatLanguages(languagesList: any): void {
    const languagesArray: string[] = [];
    const objectLanguagesArray = Object.entries(languagesList); // Convert the object into an array to iterate

    objectLanguagesArray.forEach ( item => languagesArray.push(String(item[1])) );

    if (languagesArray.length > 0) {
      this.languagesFormated = languagesArray.join(', ');
      this.numOfLanguages = languagesArray.length;
    }
  }

}
