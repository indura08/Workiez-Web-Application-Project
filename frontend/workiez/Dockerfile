FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

ADD . .

RUN ng build
#awlk giyoth me command eka thamimeka podk blnna 

#formthis line code related to serving the app with nginx will be written

FROM nginx:1.27.2-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
#me 20 weni line ekn thami nginx routing krnne nathuwa nginx ekn routing tika angular app eke routing ekt maru krnne 

COPY --from=build-stage /app/dist/workiez/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
#This is the command that starts NGINX in the container. The -g "daemon off;" part means to keep NGINX running in the foreground, so Docker doesn’t stop the container. It’s like telling Docker, “Start the NGINX server and keep it running to serve our Angular app.”

#me project ektr adlawa dockerfile ek frontend ekt haduwa echchri ithuru tika krnna one aye patngaddi 