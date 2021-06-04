# Use the LTS version of node - currently Node LTS is 14.6.1
FROM node:lts-alpine

# Get into a temporary directory to build Angular App
WORKDIR /temp

# Install modules
COPY package.json .
RUN  npm install

# Copy source
COPY . .

# Build and copy to /app
# RUN /temp/node_modules/@angular/cli/bin/ng build 

# Clean-up to /app - remaining as todo
#    && cp -r dist/ /app \
#    && cd \
#    && rm -rf /temp

# Copy to /app

# Clear temporary folder

# Change user

# Run App

EXPOSE 8080

# ENTRYPOINT [ "npm", "start" ]
 ENTRYPOINT [ "/bin/sh" ]