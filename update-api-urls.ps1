# Script PowerShell para actualizar URLs hardcodeadas en el frontend
# Ejecutar desde la carpeta Oasis_Frontend: .\update-api-urls.ps1

Write-Host "Buscando archivos para actualizar..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "src" -Recurse -Include *.vue,*.js,*.ts | Where-Object { $_.FullName -notmatch "node_modules" }

$updatedCount = 0
$skippedFiles = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $modified = $false
    
    # Verificar si ya tiene el import de config/api
    $hasConfigImport = $content -match "from ['`"]@/config/api['`"]" -or 
                       $content -match "from ['`"]\.\.\/config\/api['`"]" -or
                       $content -match "from ['`"]\.\.\/\.\.\/config\/api['`"]"
    
    # Reemplazos
    if ($content -match "http://localhost:9999") {
        # Reemplazar URLs de API
        $content = $content -replace '"http://localhost:9999/api/v1/([^"]+)"', '`${API_URL}/$1`'
        $content = $content -replace "'http://localhost:9999/api/v1/([^']+)'", '`${API_URL}/$1`'
        $content = $content -replace '`http://localhost:9999/api/v1/([^`]+)`', '`${API_URL}/$1`'
        $content = $content -replace 'http://localhost:9999/api/v1', '${API_URL}'
        
        # Reemplazar URLs de mail
        $content = $content -replace '"http://localhost:9999/mail/send/([^"]+)"', '`${MAIL_URL}/$1`'
        $content = $content -replace "'http://localhost:9999/mail/send/([^']+)'", '`${MAIL_URL}/$1`'
        $content = $content -replace '`http://localhost:9999/mail/send/([^`]+)`', '`${MAIL_URL}/$1`'
        $content = $content -replace 'http://localhost:9999/mail/send', '${MAIL_URL}'
        
        $modified = $true
        
        # Agregar import si no existe y el archivo fue modificado
        if (-not $hasConfigImport -and $modified) {
            # Buscar la sección de imports
            if ($content -match "(<script[^>]*>[\s\S]*?)(import\s+.*?from\s+['`"][^'`"]+['`"];?)") {
                $lastImport = $matches[2]
                $importStatement = "import { API_URL, BASE_URL, MAIL_URL } from '@/config/api';"
                
                # Verificar que no esté ya importado
                if ($content -notmatch [regex]::Escape($importStatement)) {
                    # Agregar después del último import
                    $content = $content -replace "($lastImport)", "`$1`n$importStatement"
                }
            } elseif ($content -match "(<script[^>]*>)") {
                # Si no hay imports, agregar después de <script>
                $importStatement = "`nimport { API_URL, BASE_URL, MAIL_URL } from '@/config/api';"
                $content = $content -replace "(<script[^>]*>)", "`$1$importStatement"
            }
        }
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "✓ Actualizado: $($file.FullName)" -ForegroundColor Green
            $updatedCount++
        }
    } else {
        $skippedFiles += $file.Name
    }
}

Write-Host "`n✓ Proceso completado!" -ForegroundColor Cyan
Write-Host "Archivos actualizados: $updatedCount" -ForegroundColor Green
Write-Host "Archivos sin cambios: $($skippedFiles.Count)" -ForegroundColor Yellow

if ($skippedFiles.Count -gt 0) {
    Write-Host "`nArchivos que no necesitaron actualización:" -ForegroundColor Gray
    $skippedFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
}

