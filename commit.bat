@echo off
echo Type the commit name: 
set /p CMNAME="> "
git add .
git commit -am "%CMNAME%"
git push heroku main