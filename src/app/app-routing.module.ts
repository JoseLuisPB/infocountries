import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { DetailComponent} from '../app/pages/detail/detail.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'detail/:id', component:DetailComponent},
  {path: 'statistics', component:StatisticsComponent},
  {path:'**', pathMatch:'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
