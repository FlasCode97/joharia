@echo off
cd /d "C:\Users\flaso\OneDrive\Desktop\Portfollio site\maestria"
node scripts/capture-cdp.mjs > capture-out.log 2>&1
echo DONE >> capture-out.log
