FROM nginx:stable-alpine3.17-slim
WORKDIR /usr/share/nginx/html
COPY --chown=1001:1001 ./app/* . 
RUN cat home.html > index.html && mkdir img/ && mv *.jpg img/
EXPOSE 80
ENTRYPOINT ["nginx", "-g","daemon off;"]