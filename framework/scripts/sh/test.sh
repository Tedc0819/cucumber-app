#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

set -o allexport
source $(pwd)/.env
set +o allexport

report_mount_dir="${REPORT_DIR_PATH:=$(pwd)}/reports"
test_run_id="${TEST_RUN_ID:=$(date +%Y%m%d%H%M%S)}"

export TEST_REPORT_NAME="${TEST_REPORT_NAME}-${test_run_id}"

echo 'building testing node...'
docker build -t test-node -f ./framework/docker/Dockerfile-test-node .

echo 'remove old test-node image...'
docker rmi $(docker images -f "dangling=true" -q) || true

echo 'start test-node container...'
docker run --rm --net="host" \
  -e TEST_REPORT_NAME \
  -e TEST_CAPABILITIES \
  -e TEST_TAG \
  -v $report_mount_dir:/app/reports \
  test-node

echo 'open the report...'
open $(ls -t ./reports/$TEST_REPORT_NAME/index.html | awk '{printf("%s",$0);exit}') || true
