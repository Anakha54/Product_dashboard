# Smart Inventory Dashboard

A real-time inventory management system built with React and Express.js, featuring product cards with images, stock management, and rupee pricing.

## Project Structure

```
dashboard/
├── frontend/              # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── vercel.json
├── backend/               # Express.js API
│   ├── data/
│   │   └── products.json
│   ├── server.js
│   ├── package.json
│   └── render.yaml
├── .gitignore
└── README.md
```

## Features

- 📦 Real-time inventory tracking
- 🖼️ Product images on cards
- 💰 Pricing in Indian Rupees (₹)
- ⚠️ Low stock and out-of-stock alerts
- 📊 Dashboard statistics
- 🔄 Live stock updates
- 📱 Responsive design

## Local Development

### Prerequisites
- Node.js 14+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
```

## API Endpoints

### GET /products
Returns all products with their details.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 6639,
      "stock": 16,
      "lowStockThreshold": 10,
      "image": "https://..."
    }
  ]
}
```

### POST /update-stock
Updates the stock quantity for a product.

**Request Body:**
```json
{
  "id": 1,
  "newQuantity": 20
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 6639,
    "stock": 20,
    "lowStockThreshold": 10,
    "image": "https://..."
  }
}
```

### GET /health
Health check endpoint.

## Deployment

### Deploy Backend on Render

1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `Anakha54/Product_dashboard`
5. Configure:
   - **Name:** `inventory-backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
7. Click "Create Web Service"
8. Copy the backend URL (e.g., `https://inventory-backend-xxxxx.onrender.com`)

### Deploy Frontend on Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import repository: `Anakha54/Product_dashboard`
5. Configure:
   - **Framework:** React
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
6. Add Environment Variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://inventory-backend-xxxxx.onrender.com` (your Render URL)
7. Click "Deploy"

### Post-Deployment Setup

1. After backend deployment on Render, copy the URL
2. Go to Vercel project settings
3. Update `REACT_APP_API_URL` environment variable with your Render backend URL
4. Trigger a redeploy
5. Test the application at your Vercel URL

## Troubleshooting

### CORS Errors
- Ensure CORS is enabled in `backend/server.js`
- Check that `REACT_APP_API_URL` matches your backend URL

### Images Not Loading
- Ensure product images have valid URLs in `backend/data/products.json`
- Check browser console for 404 errors

### Backend Not Responding
- Check Render logs for errors
- Verify environment variables are set
- Ensure backend is running on the correct port

## Technology Stack

### Frontend
- React 18
- lucide-react (icons)
- CSS3 (responsive design)

### Backend
- Express.js
- Node.js
- CORS
- File-based storage (JSON)

## License

MIT

## Author

Anakha54
