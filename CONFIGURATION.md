# Configuration Guide

## API Endpoint Configuration

Before running the Angular application, you need to configure the API endpoint to connect to your Flask backend.

### Step 1: Update Environment Files

Edit the following files to point to your Flask API:

**For Development (src/environments/environment.ts):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',  // Change this to your Flask API URL
  appName: 'Social Media App',
  version: '1.0.0'
};
```

**For Production (src/environments/environment.prod.ts):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-domain.com/api',  // Your production API URL
  appName: 'Social Media App',
  version: '1.0.0'
};
```

### Step 2: Common API URLs

If your Flask API is running on:
- **Local development**: `http://localhost:5000/api`
- **Same server**: `http://your-domain.com:5000/api`
- **Different server**: `https://api.your-domain.com/api`
- **Docker**: `http://flask-api:5000/api`

### Step 3: CORS Configuration

Make sure your Flask API has CORS enabled to allow requests from the Angular app:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # This allows all origins
```

### Step 4: Test Connection

After updating the configuration:
1. Start your Flask API
2. Start the Angular app with `npm start`
3. Open browser network tab
4. Check if API calls are successful

## Deployment Notes

### Development
```bash
ng serve --host 0.0.0.0 --port 4200
```

### Production Build
```bash
ng build --prod
```

The built files will be in `dist/social-media-ui/` and can be deployed to any web server.
