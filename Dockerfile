FROM oven/bun

RUN apt update
RUN apt install -y git

WORKDIR /app

COPY ./package.json ./bun.lockb ./

RUN bun install

COPY . ./

EXPOSE 3000

CMD bun run dev