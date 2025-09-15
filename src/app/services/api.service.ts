import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import {
  Post, Reel, CreatePostRequest, CreateReelRequest,
  SentimentAnalysis, Recommendation
} from '../models/content.model';
import {
  UserBehavior, EngagementPrediction, AnalyticsDashboard
} from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load current user from localStorage if exists
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // User Management APIs
  createUser(userData: CreateUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile`, userData, this.getHttpOptions());
  }

  getUser(userId: string): Observable<any> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get(`${this.apiUrl}/profile`, { params });
  }

  updateUser(userData: UpdateUserRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData, this.getHttpOptions());
  }

  deleteUser(userId: string): Observable<any> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.delete(`${this.apiUrl}/profile`, { params });
  }

  // Post Management APIs
  createPost(postData: CreatePostRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, postData, this.getHttpOptions());
  }

  getPosts(userId?: string, category?: string, limit: number = 10): Observable<any> {
    let params = new HttpParams().set('limit', limit.toString());
    if (userId) params = params.set('user_id', userId);
    if (category) params = params.set('category', category);

    return this.http.get(`${this.apiUrl}/post`, { params });
  }

  deletePost(postId: string, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('post_id', postId)
      .set('user_id', userId);
    return this.http.delete(`${this.apiUrl}/post`, { params });
  }

  // Reels Management APIs
  createReel(reelData: CreateReelRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reels`, reelData, this.getHttpOptions());
  }

  getReels(userId?: string, category?: string, limit: number = 10): Observable<any> {
    let params = new HttpParams().set('limit', limit.toString());
    if (userId) params = params.set('user_id', userId);
    if (category) params = params.set('category', category);

    return this.http.get(`${this.apiUrl}/reels`, { params });
  }

  deleteReel(reelId: string, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('reel_id', reelId)
      .set('user_id', userId);
    return this.http.delete(`${this.apiUrl}/reels`, { params });
  }

  // Machine Learning APIs
  getRecommendations(userId: string, type: string = 'content', limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('user_id', userId)
      .set('type', type)
      .set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/recommendations`, { params });
  }

  analyzeSentiment(text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sentiment`, { text }, this.getHttpOptions());
  }

  getUserBehavior(userId: string): Observable<any> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get(`${this.apiUrl}/user-behavior`, { params });
  }

  recordUserAction(userId: string, actionType: string, contentId?: string): Observable<any> {
    const actionData = {
      user_id: userId,
      action_type: actionType,
      content_id: contentId
    };
    return this.http.post(`${this.apiUrl}/user-behavior`, actionData, this.getHttpOptions());
  }

  predictEngagement(contentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/engagement/predict`, contentData, this.getHttpOptions());
  }

  getAnalyticsDashboard(userId: string): Observable<any> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get(`${this.apiUrl}/analytics/dashboard`, { params });
  }

  // User session management
  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}