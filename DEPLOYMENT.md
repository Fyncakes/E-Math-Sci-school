# Deployment Guide

This guide covers different deployment options for the E-Math-Sci School Platform.

## 🚀 Quick Deployment with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git installed

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fyncakes/E-Math-Sci-school.git
   cd E-Math-Sci-school
   ```

2. **Configure environment variables**
   ```bash
   # Copy environment files
   cp backend/env.example backend/.env
   cp frontend/env.example frontend/.env
   
   # Edit the .env files with your production values
   nano backend/.env
   nano frontend/.env
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## 🌐 Production Deployment

### Option 1: VPS/Cloud Server

#### Prerequisites
- Ubuntu 20.04+ or CentOS 8+
- Node.js 18+
- MongoDB 5.0+
- Nginx
- SSL certificate (Let's Encrypt)

#### Steps

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Application Setup**
   ```bash
   # Clone repository
   git clone https://github.com/Fyncakes/E-Math-Sci-school.git
   cd E-Math-Sci-school
   
   # Install dependencies
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   
   # Build frontend
   npm run build
   ```

3. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/emathsci
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/E-Math-Sci-school/frontend/build;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable site and start services**
   ```bash
   sudo ln -s /etc/nginx/sites-available/emathsci /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   
   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl enable mongod
   
   # Start application
   cd /path/to/E-Math-Sci-school
   npm start
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Create Heroku apps**
   ```bash
   # Create backend app
   heroku create emathsci-backend
   
   # Create frontend app
   heroku create emathsci-frontend
   ```

3. **Configure environment variables**
   ```bash
   # Backend environment
   heroku config:set NODE_ENV=production -a emathsci-backend
   heroku config:set MONGODB_URI=your-mongodb-uri -a emathsci-backend
   heroku config:set JWT_SECRET=your-jwt-secret -a emathsci-backend
   
   # Frontend environment
   heroku config:set REACT_APP_API_URL=https://emathsci-backend.herokuapp.com/api -a emathsci-frontend
   ```

4. **Deploy**
   ```bash
   # Deploy backend
   cd backend
   git subtree push --prefix=backend heroku main
   
   # Deploy frontend
   cd frontend
   git subtree push --prefix=frontend heroku main
   ```

### Option 3: AWS

#### Using AWS Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize Elastic Beanstalk**
   ```bash
   cd backend
   eb init
   eb create production
   ```

3. **Deploy**
   ```bash
   eb deploy
   ```

#### Using AWS ECS with Docker

1. **Build and push Docker images**
   ```bash
   # Build images
   docker build -t emathsci-backend ./backend
   docker build -t emathsci-frontend ./frontend
   
   # Tag and push to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
   
   docker tag emathsci-backend:latest your-account.dkr.ecr.us-east-1.amazonaws.com/emathsci-backend:latest
   docker tag emathsci-frontend:latest your-account.dkr.ecr.us-east-1.amazonaws.com/emathsci-frontend:latest
   
   docker push your-account.dkr.ecr.us-east-1.amazonaws.com/emathsci-backend:latest
   docker push your-account.dkr.ecr.us-east-1.amazonaws.com/emathsci-frontend:latest
   ```

2. **Create ECS cluster and services**
   - Create ECS cluster
   - Create task definitions
   - Create services
   - Configure load balancer

## 🔒 SSL Configuration

### Using Let's Encrypt

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain SSL certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 📊 Monitoring and Logging

### Application Monitoring

1. **Install PM2 for process management**
   ```bash
   npm install -g pm2
   ```

2. **Create PM2 ecosystem file**
   ```bash
   nano ecosystem.config.js
   ```

   ```javascript
   module.exports = {
     apps: [{
       name: 'emathsci-backend',
       script: './backend/server.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 5000
       }
     }]
   };
   ```

3. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Logging

1. **Configure log rotation**
   ```bash
   sudo nano /etc/logrotate.d/emathsci
   ```

   ```
   /path/to/E-Math-Sci-school/logs/*.log {
       daily
       missingok
       rotate 52
       compress
       delaycompress
       notifempty
       create 644 root root
   }
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions

1. **Create workflow file**
   ```bash
   mkdir -p .github/workflows
   nano .github/workflows/deploy.yml
   ```

   ```yaml
   name: Deploy to Production
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v2
       
       - name: Setup Node.js
         uses: actions/setup-node@v2
         with:
           node-version: '18'
           
       - name: Install dependencies
         run: |
           npm install
           cd backend && npm install
           cd ../frontend && npm install
           
       - name: Build frontend
         run: |
           cd frontend && npm run build
           
       - name: Deploy to server
         run: |
           # Add your deployment commands here
   ```

## 🛡️ Security Checklist

- [ ] Change default passwords
- [ ] Configure firewall rules
- [ ] Enable SSL/TLS
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up backup strategy
- [ ] Configure monitoring and alerting
- [ ] Regular security updates

## 📈 Performance Optimization

1. **Enable Gzip compression**
2. **Configure CDN for static assets**
3. **Use Redis for caching**
4. **Optimize database queries**
5. **Implement pagination**
6. **Use image optimization**
7. **Enable browser caching**

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 PID
   ```

2. **MongoDB connection issues**
   ```bash
   sudo systemctl status mongod
   sudo systemctl restart mongod
   ```

3. **Nginx configuration errors**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Logs

- Application logs: `./logs/`
- Nginx logs: `/var/log/nginx/`
- MongoDB logs: `/var/log/mongodb/`
- PM2 logs: `pm2 logs`

## 📞 Support

For deployment issues:
- Check the logs
- Review the configuration
- Create an issue on GitHub
- Contact support: support@emathsci.edu
