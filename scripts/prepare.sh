#!/bin/bash

# Skip entire script in CI environment
if [ "$CI" = "true" ]; then
  echo "CI environment detected, skipping script execution."
  exit 0
fi

# Run Husky installation if not already installed
echo "Setting up Husky..."
if [ ! -d ".husky" ]; then
  husky install
else
  echo "Husky is already set up."
fi

# Check and install @lobehub/i18n-cli if not installed
if ! npm list -g --depth=0 @lobehub/i18n-cli > /dev/null 2>&1; then
  echo "Installing @lobehub/i18n-cli globally..."
  npm install -g @lobehub/i18n-cli
else
  echo "@lobehub/i18n-cli is already installed."
fi

# Check and install @lobehub/commit-cli if not installed
if ! npm list -g --depth=0 @lobehub/commit-cli > /dev/null 2>&1; then
  echo "Installing @lobehub/commit-cli globally..."
  npm install -g @lobehub/commit-cli
else
  echo "@lobehub/commit-cli is already installed."
fi

# Set up pre-commit hook if it doesn't exist
if [ ! -f ".husky/pre-commit" ]; then
  echo "Setting up pre-commit hook..."
  cat > .husky/pre-commit <<EOL
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

git add .
npx --no-install lint-staged
EOL
  chmod +x .husky/pre-commit
else
  echo "pre-commit hook is already set up."
fi

# Set up commit-msg hook if it doesn't exist
if [ ! -f ".husky/commit-msg" ]; then
  echo "Setting up commit-msg hook..."
  cat > .husky/commit-msg <<EOL
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit "\$1"
EOL
  chmod +x .husky/commit-msg
else
  echo "commit-msg hook is already set up."
fi

# Run lobe-commit -i
echo "Running lobe-commit -i..."
lobe-commit -i
