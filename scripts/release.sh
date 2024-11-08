#!/bin/bash

pnpm -r --filter ./apps/** --workspace-concurrency=1 exec -- npx --no-install semantic-release \
  -e semantic-release-monorepo \
  -e semantic-release-config-gitmoji \
  -p @semantic-release/commit-analyzer \
  -p @semantic-release/release-notes-generator \
  -p @semantic-release/changelog \
  -p @semantic-release/npm \
  -p @semantic-release/git \
  -p @semantic-release/github \
  --message "🚀 chore(release): \${nextRelease.version} [skip ci]"
