import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ReelsComponent } from './components/reels/reels.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { ReelCardComponent } from './components/reel-card/reel-card.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CreatePostComponent,
    ReelsComponent,
    AnalyticsComponent,
    NavbarComponent,
    PostCardComponent,
    ReelCardComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }