FROM mhart/alpine-node:slim-16

COPY ./backend/server/ /server

COPY ./frontend/dist /frontend

WORKDIR ./server

ENV NODE_ENV=production
ENV FRONT_DIR=/frontend
EXPOSE 8080
CMD node .