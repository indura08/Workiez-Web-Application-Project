FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD . .

RUN npm run build --prod 
#awlk giyoth me command eka thamimeka podk blnna 

#formthis line code related to serving the app with nginx will be written

FROM nginx:1.27.2-alpine

COPY --from=build-stage /app/dist/workiez/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
#This is the command that starts NGINX in the container. The -g "daemon off;" part means to keep NGINX running in the foreground, so Docker doesn’t stop the container. It’s like telling Docker, “Start the NGINX server and keep it running to serve our Angular app.”