import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListLangugageComponent } from './list-langugage/list-langugage.component';
import { DetailLanguageComponent } from './detail-language/detail-language.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'languages', component: ListLangugageComponent },
  { path: 'languages/search/:searchString', component: ListLangugageComponent },
  { path: 'languages/:id', component: DetailLanguageComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'addLanguage', component: AddLanguageComponent},
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
