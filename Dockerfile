FROM mhart/alpine-node:slim-16

COPY ./backend/server/src /server

COPY ./frontend/dist /frontend

WORKDIR /server
ENV NODE_ENV=production
ENV FRONTEND_DIR=/frontend
EXPOSE 8080
CMD node .