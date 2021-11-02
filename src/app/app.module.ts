import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FlagComponent } from './components/flag/flag.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BaseComponentComponent } from './components/base-component/base-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from '../app/materials/materials.module';
import { TablesComponent } from './components/tables/tables.component';
import { ChartsComponent } from './components/charts/charts.component';
import { AuthorComponent } from './components/dialog/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    FlagComponent,
    DetailComponent,
    LoadingComponent,
    BaseComponentComponent,
    FooterComponent,
    StatisticsComponent,
    TablesComponent,
    ChartsComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
