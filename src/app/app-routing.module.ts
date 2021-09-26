import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { SearchComponent } from '../app/pages/search/search.component';
import { DetailComponent} from '../app/pages/detail/detail.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'search', component:SearchComponent},
  {path:'detail/:id', component:DetailComponent},
  {path:'**', pathMatch:'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
