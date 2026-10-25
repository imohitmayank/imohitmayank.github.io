#!/bin/bash
set -euo pipefail

# macOS system Ruby (2.6) cannot build native gems on recent macOS/Xcode.
# Prefer Homebrew Ruby when available.
if [ -d "/opt/homebrew/opt/ruby/bin" ]; then
  export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
elif [ -d "/usr/local/opt/ruby/bin" ]; then
  export PATH="/usr/local/opt/ruby/bin:$PATH"
fi

bundle config set --local path 'vendor/bundle'
bundle install
bundle exec jekyll serve "$@"
