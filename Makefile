.PHONY: build

# TODO: 6.Docker仓库地址配置
NAME=web_backend
REGISTRY=registry.cn-shenzhen.aliyuncs.com
NAMESPACE=leoliew
TAG=beta

build:
	echo building ${NAME}:${TAG}
	docker build -t ${REGISTRY}/${NAMESPACE}/${NAME}:${TAG} .
	docker push "${REGISTRY}/${NAMESPACE}/${NAME}:${TAG}"
