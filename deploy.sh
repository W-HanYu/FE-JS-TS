#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

yarn
cd vuepress
yarn
yarn build

cd .vuepress/dist


git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:W-HanYu/FE-JS-TS.git master:gh-pages

cd -

