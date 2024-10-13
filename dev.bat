@echo off

cd client
start npm run dev
cd ../server
start npm run dev
cd ../
start tunnell.bat

echo "All commands executed succesfully"
pause
exit