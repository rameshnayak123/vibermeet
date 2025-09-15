import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { AnalyticsDashboard, UserBehavior } from '../../models/analytics.model';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analytics: AnalyticsDashboard | null = null;
  userBehavior: UserBehavior | null = null;
  isLoading = false;
  currentUser: any = null;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.apiService.getCurrentUser();
    if (!this.currentUser) {
      this.notificationService.warning('Login Required', 'Please create a profile to view analytics');
      this.router.navigate(['/profile']);
      return;
    }

    this.loadAnalytics();
  }

  loadAnalytics() {
    this.isLoading = true;

    // Load dashboard analytics
    this.apiService.getAnalyticsDashboard(this.currentUser.user_id).subscribe({
      next: (response) => {
        this.analytics = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to load analytics');
        this.isLoading = false;
      }
    });

    // Load user behavior analytics
    this.apiService.getUserBehavior(this.currentUser.user_id).subscribe({
      next: (response) => {
        this.userBehavior = response;
      },
      error: (error) => {
        console.error('Failed to load user behavior:', error);
      }
    });
  }

  getEngagementClass(rate: number): string {
    if (rate > 10) return 'high';
    if (rate > 5) return 'medium';
    return 'low';
  }

  getActivitySegmentClass(segment: string): string {
    switch (segment) {
      case 'highly_active': return 'success';
      case 'moderately_active': return 'warning';
      default: return 'danger';
    }
  }

  getPreferenceEntries(): any[] {
    if (!this.userBehavior?.content_preferences) return [];
    return Object.entries(this.userBehavior.content_preferences)
      .map(([key, value]) => ({ category: key, score: value }))
      .sort((a, b) => b.score - a.score);
  }

  formatHour(hour: number): string {
    return hour.toString().padStart(2, '0') + ':00';
  }
}