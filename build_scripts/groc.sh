#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    git checkout master
    grunt groc:dist
    rm -rf app/**/**/*.* app/**/*.js app/*.js test .jshintrc bower.json .bowerrc index.js package.json
    git config user.name "Travis CI"
    git config user.email "andortang+travis.ci@gmail.com"
    git add -A
    git commit -m "Automatically updated the groc documentation via drone.io"
    git push -f --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
fi
