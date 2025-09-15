import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reel } from '../../models/content.model';

@Component({
  selector: 'app-reel-card',
  templateUrl: './reel-card.component.html',
  styleUrls: ['./reel-card.component.scss']
})
export class ReelCardComponent {
  @Input() reel!: Reel;
  @Output() like = new EventEmitter<string>();
  @Output() share = new EventEmitter<string>();

  onLike() {
    this.like.emit(this.reel.reel_id);
  }

  onShare() {
    this.share.emit(this.reel.reel_id);
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}` : `${seconds}s`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  getEngagementClass(): string {
    if (this.reel.engagement_rate > 0.1) return 'high';
    if (this.reel.engagement_rate > 0.05) return 'medium';
    return 'low';
  }
}