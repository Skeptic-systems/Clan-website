FROM node:18
RUN apt-get update \
    && apt-get install -y nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
COPY package.json /app/package.json
RUN npm install dotenv
EXPOSE 65115 80
CMD ["/bin/bash", "-c", "nginx -g 'daemon off;' & node /app/app.js"]