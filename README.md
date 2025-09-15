# Social Media Angular UI

A modern, responsive Angular application for the Social Media Platform with AI-powered features.

## Features

- 🎨 Modern, responsive UI design
- 🚀 Real-time API integration with Flask backend
- 🤖 AI-powered content recommendations
- 📊 Analytics dashboard with ML insights
- 📱 Mobile-first responsive design
- 🎵 Support for posts and reels (TikTok-like)
- 💬 Interactive user interface with notifications
- 🔄 Real-time content updates

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Extract and setup:**
```bash
cd social-media-ui
npm install
```

2. **Configure API endpoint:**
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://your-flask-api-domain.com/api'  // Change this
};
```

3. **Run the application:**
```bash
npm start
# or
ng serve
```

4. **Access the app:**
Open http://localhost:4200

## Configuration

### API Endpoint Configuration

The application connects to your Flask API. Update the API URL in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-domain.com/api'  // Change this URL
};
```

### Build for Production

```bash
ng build --prod
```

Built files will be in `dist/social-media-ui/`

## Components

### Core Components
- **Home Component** - Main feed with posts and reels
- **Profile Component** - User profile management
- **Create Post Component** - Content creation with ML predictions
- **Reels Component** - Short video content feed
- **Analytics Component** - AI-powered analytics dashboard

### Shared Components
- **Navbar Component** - Navigation bar
- **Post Card Component** - Individual post display
- **Reel Card Component** - Individual reel display  
- **Notification Component** - Toast notifications

## Services

- **ApiService** - HTTP client for Flask API communication
- **NotificationService** - Toast notification system

## Features Overview

### 🏠 Home Feed
- Personalized content feed
- AI-powered recommendations
- Real-time content updates
- Category-based filtering

### 👤 User Profiles
- Profile creation and management
- Interest selection for ML recommendations
- User behavior analytics
- Activity insights

### 📝 Content Creation
- Post and reel creation
- Real-time sentiment analysis
- Engagement prediction
- ML-powered content optimization tips

### 📊 Analytics Dashboard
- Content performance metrics
- AI insights and recommendations
- User behavior analysis
- Peak activity time suggestions
- Engagement predictions

### 🎥 Reels (TikTok-like)
- Short video content
- Category filtering
- Engagement metrics
- Viral score predictions

## Styling

The app uses:
- **Bootstrap 5** for responsive grid and components
- **Font Awesome** for icons
- **Custom SCSS** for modern glassmorphism design
- **Gradient backgrounds** and smooth animations

## API Integration

The app integrates with these Flask API endpoints:

### User Management
- `POST /api/profile` - Create user
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Delete profile

### Content Management  
- `POST /api/post` - Create post
- `GET /api/post` - Get posts
- `POST /api/reels` - Create reel
- `GET /api/reels` - Get reels

### ML Features
- `GET /api/recommendations` - Get AI recommendations
- `POST /api/sentiment` - Analyze sentiment
- `GET /api/user-behavior` - Get behavior analytics
- `POST /api/engagement/predict` - Predict engagement
- `GET /api/analytics/dashboard` - Get analytics

## Deployment

### Development Server
```bash
ng serve --host 0.0.0.0 --port 4200
```

### Production Build
```bash
ng build --prod
```

Deploy the `dist/` folder to any web server (nginx, Apache, etc.)

### Docker Deployment
```dockerfile
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/social-media-ui /usr/share/nginx/html
EXPOSE 80
```

## Browser Support

- Chrome 70+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.

---

**Enjoy building with the Social Media Angular UI! 🚀**
