import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Reel } from '../../models/content.model';

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.scss']
})
export class ReelsComponent implements OnInit {
  reels: Reel[] = [];
  isLoading = false;
  selectedCategory = '';

  categories = [
    'all', 'music', 'comedy', 'dance', 'education', 'sports', 
    'food', 'lifestyle', 'tech', 'art', 'travel'
  ];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadReels();
  }

  loadReels(category?: string) {
    this.isLoading = true;
    const currentUser = this.apiService.getCurrentUser();

    this.apiService.getReels(
      currentUser?.user_id, 
      category === 'all' ? undefined : category,
      20
    ).subscribe({
      next: (response) => {
        this.reels = response.reels || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to load reels');
        this.isLoading = false;
      }
    });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.loadReels(category);
  }

  onLike(reelId: string) {
    const currentUser = this.apiService.getCurrentUser();
    if (!currentUser) {
      this.notificationService.warning('Login Required', 'Please create a profile to interact with content');
      return;
    }

    this.apiService.recordUserAction(currentUser.user_id, 'like', reelId).subscribe({
      next: () => {
        this.notificationService.success('Liked!', 'Your interaction has been recorded');
        // Update the like count locally
        const reel = this.reels.find(r => r.reel_id === reelId);
        if (reel) reel.likes++;
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to record interaction');
      }
    });
  }

  onShare(reelId: string) {
    const currentUser = this.apiService.getCurrentUser();
    if (!currentUser) {
      this.notificationService.warning('Login Required', 'Please create a profile to interact with content');
      return;
    }

    this.apiService.recordUserAction(currentUser.user_id, 'share', reelId).subscribe({
      next: () => {
        this.notificationService.success('Shared!', 'Content shared successfully');
        // Update the share count locally
        const reel = this.reels.find(r => r.reel_id === reelId);
        if (reel) reel.shares++;
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to share content');
      }
    });
  }

  trackByReelId(index: number, reel: Reel): string {
    return reel.reel_id;
  }
}