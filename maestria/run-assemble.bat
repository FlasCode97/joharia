@echo off
cd /d "C:\Users\flaso\OneDrive\Desktop\Portfollio site\maestria"
echo START > assemble-status.txt
node scripts/assemble.mjs >> assemble-status.txt 2>&1
echo DONE >> assemble-status.txt
