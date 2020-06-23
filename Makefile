.PHONY: build

NAME=web_backend
REGISTRY=registry.cn-shenzhen.aliyuncs.com
NAMESPACE=leoliew
TAG=beta

build:
	echo building ${NAME}:${TAG}
	docker build -t ${REGISTRY}/${NAMESPACE}/${NAME}:${TAG} .
	docker push "${REGISTRY}/${NAMESPACE}/${NAME}:${TAG}"
