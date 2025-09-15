import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Social Media App';
  currentUser: User | null = null;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.apiService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Show welcome message
    if (!this.currentUser) {
      this.notificationService.info(
        'Welcome!',
        'Create a profile to get started with the social media experience.'
      );
    }
  }
}