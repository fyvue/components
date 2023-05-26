#!/usr/bin/env sh

set -e
pnpm run build:components
cd packages/fy-components/dist

npm publish --access public
