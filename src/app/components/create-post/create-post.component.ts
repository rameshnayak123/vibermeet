import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  reelForm: FormGroup;
  isLoading = false;
  activeTab = 'post';
  sentimentPrediction: any = null;
  engagementPrediction: any = null;

  categories = [
    'music', 'comedy', 'dance', 'education', 'sports', 
    'food', 'lifestyle', 'tech', 'art', 'travel'
  ];

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public notificationService: NotificationService,
    public router: Router
  ) {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      hashtags: [''],
      media_urls: ['']
    });

    this.reelForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      category: ['', Validators.required],
      video_url: ['', Validators.required],
      thumbnail_url: [''],
      duration: [30, [Validators.min(5), Validators.max(300)]],
      hashtags: [''],
      music_id: [''],
      effects: ['']
    });
  }

  ngOnInit() {
    // Check if user is logged in
    if (!this.apiService.getCurrentUser()) {
      this.notificationService.warning('Login Required', 'Please create a profile first');
      this.router.navigate(['/profile']);
    }
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.sentimentPrediction = null;
    this.engagementPrediction = null;
  }

  analyzeSentiment() {
    const content = this.activeTab === 'post' ? 
      this.postForm.get('content')?.value : 
      this.reelForm.get('title')?.value + ' ' + this.reelForm.get('description')?.value;

    if (content && content.trim()) {
      this.apiService.analyzeSentiment(content.trim()).subscribe({
        next: (response) => {
          this.sentimentPrediction = response;
        },
        error: (error) => {
          this.notificationService.error('Analysis Failed', 'Could not analyze sentiment');
        }
      });
    }
  }

  predictEngagement() {
    const formData = this.activeTab === 'post' ? this.postForm.value : this.reelForm.value;
    const content = this.activeTab === 'post' ? formData.content : formData.title;

    const predictionData = {
      content: content,
      category: formData.category,
      hashtags: this.parseHashtags(formData.hashtags),
      posting_time: new Date().getHours()
    };

    this.apiService.predictEngagement(predictionData).subscribe({
      next: (response) => {
        this.engagementPrediction = response;
      },
      error: (error) => {
        this.notificationService.error('Prediction Failed', 'Could not predict engagement');
      }
    });
  }

  parseHashtags(hashtagString: string): string[] {
    if (!hashtagString) return [];
    return hashtagString
      .split(/[,\s]+/)
      .map(tag => tag.replace('#', '').trim())
      .filter(tag => tag.length > 0);
  }

  onSubmitPost() {
    if (this.postForm.valid) {
      const currentUser = this.apiService.getCurrentUser();
      if (!currentUser) {
        this.notificationService.error('Error', 'Please login first');
        return;
      }

      this.isLoading = true;
      const formData = this.postForm.value;

      const postData = {
        user_id: currentUser.user_id,
        content: formData.content,
        category: formData.category,
        hashtags: this.parseHashtags(formData.hashtags),
        media_urls: formData.media_urls ? formData.media_urls.split(',').map((url: string) => url.trim()) : []
      };

      this.apiService.createPost(postData).subscribe({
        next: (response) => {
          this.notificationService.success('Success!', 'Post created successfully');
          this.postForm.reset();
          this.sentimentPrediction = null;
          this.engagementPrediction = null;
          this.router.navigate(['/home']);
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.error('Error', 'Failed to create post');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmitReel() {
    if (this.reelForm.valid) {
      const currentUser = this.apiService.getCurrentUser();
      if (!currentUser) {
        this.notificationService.error('Error', 'Please login first');
        return;
      }

      this.isLoading = true;
      const formData = this.reelForm.value;

      const reelData = {
        user_id: currentUser.user_id,
        content: formData.title,
        description: formData.description,
        category: formData.category,
        video_url: formData.video_url,
        thumbnail_url: formData.thumbnail_url,
        duration: formData.duration,
        hashtags: this.parseHashtags(formData.hashtags),
        music_id: formData.music_id,
        effects: formData.effects ? formData.effects.split(',').map((effect: string) => effect.trim()) : []
      };

      this.apiService.createReel(reelData).subscribe({
        next: (response) => {
          this.notificationService.success('Success!', 'Reel created successfully');
          this.reelForm.reset();
          this.sentimentPrediction = null;
          this.engagementPrediction = null;
          this.router.navigate(['/reels']);
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.error('Error', 'Failed to create reel');
          this.isLoading = false;
        }
      });
    }
  }
}