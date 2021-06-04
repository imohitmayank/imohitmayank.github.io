## Repo for my website: http://mohitmayank.com

### How to clean build and serve

Run the following command in bash:
1. `bundle exec jekyll clean` to clean
2. `bundle exec jekyll build` to build
3. `bundle exec jekyll serve` to serve

More commands: https://jekyllrb.com/docs/usage/

### To add new section

1. In `_config.yml`, include section in collection around line 55 and in default around line 78
2. Add a `_{section_name}` folder (same as `_projects`)
3. Add `{section_name}` folder inside `_includes` (same as `_includes/projects`). Modify `index.html` at line 36 and 51
4. Add a new `{section_name}.html` file (same as `projects.html`) in `/pages`
5. Clean, build and serve
