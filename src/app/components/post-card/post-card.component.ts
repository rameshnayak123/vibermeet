import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/content.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() like = new EventEmitter<string>();
  @Output() share = new EventEmitter<string>();

  onLike() {
    this.like.emit(this.post.post_id);
  }

  onShare() {
    this.share.emit(this.post.post_id);
  }

  getSentimentIcon() {
    switch (this.post.sentiment_analysis.sentiment) {
      case 'positive':
        return 'fa-smile-o';
      case 'negative':
        return 'fa-frown-o';
      default:
        return 'fa-meh-o';
    }
  }

  getSentimentColor() {
    switch (this.post.sentiment_analysis.sentiment) {
      case 'positive':
        return '#28a745';
      case 'negative':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
}