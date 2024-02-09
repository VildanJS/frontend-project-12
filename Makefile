install:
	(npm ci) && (cd frontend && npm ci)

build:
	npm run build:prod

start:
	npm run start:server
