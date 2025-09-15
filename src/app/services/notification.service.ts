import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  private addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, newNotification]);

    // Auto-remove notification after duration (default 5 seconds)
    const duration = notification.duration || 5000;
    setTimeout(() => {
      this.removeNotification(newNotification.id);
    }, duration);
  }

  success(title: string, message: string, duration?: number): void {
    this.addNotification({ type: 'success', title, message, duration });
  }

  error(title: string, message: string, duration?: number): void {
    this.addNotification({ type: 'error', title, message, duration });
  }

  warning(title: string, message: string, duration?: number): void {
    this.addNotification({ type: 'warning', title, message, duration });
  }

  info(title: string, message: string, duration?: number): void {
    this.addNotification({ type: 'info', title, message, duration });
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }
}