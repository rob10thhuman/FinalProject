import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DetailLanguageComponent } from './detail-language/detail-language.component';
import { ListLangugageComponent } from './list-langugage/list-langugage.component';
import { NvgComponent } from './nvg/nvg.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { RatingComponent } from './rating/rating.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommentsComponent } from './comments/comments.component';
import { SearchComponent } from './search/search.component';
import { CalculateVotesPipe } from './calculate-votes.pipe';
import { ResourcesComponent } from './resources/resources.component';
import { SortCommentsPipe } from './sort-comments.pipe';
import { ChartsModule } from 'ng2-charts';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ActiveCommentsFilterPipe } from './active-comments-filter.pipe';
import { RatingTestsComponent } from './rating-tests/rating-tests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    DetailLanguageComponent,
    ListLangugageComponent,
    NvgComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    AddLanguageComponent,
    RatingComponent,
    UserProfileComponent,
    CommentsComponent,
    SearchComponent,
    CalculateVotesPipe,
    ResourcesComponent,
    SortCommentsPipe,
    UserGraphComponent,
    EditProfileComponent,
    ActiveCommentsFilterPipe,
    RatingTestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule.forRoot()
  ],
  providers: [
    CalculateVotesPipe,
    SortCommentsPipe,
    ActiveCommentsFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
