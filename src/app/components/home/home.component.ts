import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Post, Reel } from '../../models/content.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  reels: Reel[] = [];
  recommendations: string[] = [];
  isLoading = false;
  activeTab = 'posts';

  constructor(
    public apiService: ApiService,
    public notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadContent();
    this.loadRecommendations();
  }

  loadContent() {
    this.isLoading = true;

    // Load posts
    this.apiService.getPosts().subscribe({
      next: (response) => {
        this.posts = response.posts || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to load posts');
        this.isLoading = false;
      }
    });

    // Load reels
    this.apiService.getReels().subscribe({
      next: (response) => {
        this.reels = response.reels || [];
      },
      error: (error) => {
        console.error('Failed to load reels:', error);
      }
    });
  }

  loadRecommendations() {
    const currentUser = this.apiService.getCurrentUser();
    if (currentUser) {
      this.apiService.getRecommendations(currentUser.user_id).subscribe({
        next: (response) => {
          this.recommendations = response.categories || [];
        },
        error: (error) => {
          console.error('Failed to load recommendations:', error);
        }
      });
    }
  }

  onLike(contentId: string, contentType: 'post' | 'reel') {
    const currentUser = this.apiService.getCurrentUser();
    if (!currentUser) {
      this.notificationService.warning('Login Required', 'Please create a profile to interact with content');
      return;
    }

    this.apiService.recordUserAction(currentUser.user_id, 'like', contentId).subscribe({
      next: () => {
        this.notificationService.success('Liked!', 'Your interaction has been recorded');
        // Update the like count locally
        if (contentType === 'post') {
          const post = this.posts.find(p => p.post_id === contentId);
          if (post) post.likes++;
        } else {
          const reel = this.reels.find(r => r.reel_id === contentId);
          if (reel) reel.likes++;
        }
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to record interaction');
      }
    });
  }

  onShare(contentId: string, contentType: 'post' | 'reel') {
    const currentUser = this.apiService.getCurrentUser();
    if (!currentUser) {
      this.notificationService.warning('Login Required', 'Please create a profile to interact with content');
      return;
    }

    this.apiService.recordUserAction(currentUser.user_id, 'share', contentId).subscribe({
      next: () => {
        this.notificationService.success('Shared!', 'Content shared successfully');
        // Update the share count locally
        if (contentType === 'post') {
          const post = this.posts.find(p => p.post_id === contentId);
          if (post) post.shares++;
        } else {
          const reel = this.reels.find(r => r.reel_id === contentId);
          if (reel) reel.shares++;
        }
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to share content');
      }
    });
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}