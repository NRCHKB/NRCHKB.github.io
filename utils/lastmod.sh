#!/bin/bash
set -x

DATE=$(date --iso-8601=seconds)
FILE=$1

echo $FILE
echo $DATE

sed -i -E "s/(lastmod:).*/lastmod: ${DATE}/" ${FILE}