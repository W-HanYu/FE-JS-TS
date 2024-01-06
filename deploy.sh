cd vuepress
yarn
yarn build


# 进入生成的文件夹
cd ./vuepress/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:W-HanYu/FE-JS-TS.git master:gh-pages
cd -
