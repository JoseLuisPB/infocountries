import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private restcountries: RestcountriesService,
              private route: ActivatedRoute)
  {
    const id = this.route.snapshot.params.id;
    this.restcountries.getCountry(id).subscribe( data => {
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

}
