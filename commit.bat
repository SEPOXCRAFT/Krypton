@echo off
echo Type the commit name: 
set /p CMNAME="> "
git commit -am "%CMNAME%"
git push heroku main