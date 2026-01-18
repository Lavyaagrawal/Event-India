# Event India

An event management platform for discovering and creating events across India.

## Project Structure

- `Event managment/frontend/` - Frontend static files (HTML, CSS, JavaScript)
- `Event managment/backend/` - Flask backend API (currently not used by frontend)

## Deployment on Netlify

This project is configured for automatic deployment on Netlify via Git.

### Setup Instructions

1. **Push your code to Git**:
   
   If you haven't initialized Git yet:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   
   Create a repository on GitHub/GitLab/Bitbucket, then connect and push:
   ```bash
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```
   
   **Note**: Replace `<your-repository-url>` with your actual repository URL (e.g., `https://github.com/Lavyaagrawal/Event-India.git`)

2. **Connect to Netlify**:
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Choose your repository
   - Netlify will auto-detect the settings from `netlify.toml`
   - Click "Deploy site"

3. **Automatic Deployments**:
   - Every push to your main/master branch will trigger a new deployment
   - Netlify will build and deploy your site automatically

### Configuration

The `netlify.toml` file is configured to:
- Publish from `Event managment/frontend` directory
- Serve static HTML, CSS, and JavaScript files
- Apply security headers
- Cache static assets

### Notes

- The frontend currently uses `localStorage` for data persistence
- The Flask backend (`Event managment/backend/app.py`) is not required for the current frontend deployment
- If you want to use the backend later, consider deploying it separately (e.g., on Railway, Render, or Heroku) or converting it to Netlify Functions

## Development

To run locally:
1. Open `Event managment/frontend/index.html` in your browser
2. Or use a local server:
   ```bash
   cd "Event managment/frontend"
   python -m http.server 8000
   ```

## Backend (Optional)

If you want to use the Flask backend:
```bash
cd "Event managment/backend"
pip install flask werkzeug
python app.py
```
