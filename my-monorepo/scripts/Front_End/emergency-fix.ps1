# emergency-fix.ps1
cd ../../
Write-Host "EMERGENCY FIX - This will clear everything!" -ForegroundColor Red
Write-Host ""

# 1. Kill everything
Write-Host "Killing Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "nx" -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Clear ALL caches
Write-Host "Clearing ALL caches..." -ForegroundColor Yellow
nx reset
Remove-Item -Recurse -Force .vite,dist,.nx,node_modules/.cache -ErrorAction SilentlyContinue
npm cache clean --force

# 3. Delete and reinstall (optional - prompt first)
$response = Read-Host "Delete node_modules and reinstall? (y/n)"
if ($response -eq 'y') {
    Write-Host "Deleting node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    Write-Host "Running npm install..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

Write-Host ""
Write-Host "✅ Emergency fix complete!" -ForegroundColor Green
Write-Host "Run: nx serve your-app" -ForegroundColor White
