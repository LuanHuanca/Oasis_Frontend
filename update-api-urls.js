/**
 * Script para actualizar todas las URLs hardcodeadas a usar la configuración centralizada
 * Ejecutar con: node update-api-urls.js
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const configImport = "import { API_URL, BASE_URL, MAIL_URL } from '@/config/api';";

// Función para buscar archivos recursivamente
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.vue') || file.endsWith('.js') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Función para actualizar un archivo
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Verificar si ya tiene el import
  const hasConfigImport = content.includes("from '@/config/api'") || 
                          content.includes("from '../config/api'") ||
                          content.includes("from './config/api'");
  
  // Reemplazar URLs hardcodeadas
  const replacements = [
    {
      pattern: /http:\/\/localhost:9999\/api\/v1/g,
      replacement: '${API_URL}',
      needsImport: true
    },
    {
      pattern: /http:\/\/localhost:9999\/mail\/send/g,
      replacement: '${MAIL_URL}',
      needsImport: true
    },
    {
      pattern: /"http:\/\/localhost:9999\/api\/v1\/([^"]+)"/g,
      replacement: '`${API_URL}/$1`',
      needsImport: true
    },
    {
      pattern: /'http:\/\/localhost:9999\/api\/v1\/([^']+)'/g,
      replacement: '`${API_URL}/$1`',
      needsImport: true
    },
    {
      pattern: /`http:\/\/localhost:9999\/api\/v1\/([^`]+)`/g,
      replacement: '`${API_URL}/$1`',
      needsImport: true
    },
    {
      pattern: /"http:\/\/localhost:9999\/mail\/send\/([^"]+)"/g,
      replacement: '`${MAIL_URL}/$1`',
      needsImport: true
    },
    {
      pattern: /'http:\/\/localhost:9999\/mail\/send\/([^']+)'/g,
      replacement: '`${MAIL_URL}/$1`',
      needsImport: true
    }
  ];
  
  replacements.forEach(({ pattern, replacement, needsImport }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
      
      if (needsImport && !hasConfigImport) {
        // Buscar el último import y agregar después
        const importRegex = /^import\s+.*from\s+['"][^'"]+['"];?$/gm;
        const imports = content.match(importRegex);
        
        if (imports && imports.length > 0) {
          const lastImport = imports[imports.length - 1];
          const lastImportIndex = content.lastIndexOf(lastImport);
          const insertIndex = lastImportIndex + lastImport.length;
          
          // Verificar que no esté ya importado
          if (!content.includes(configImport)) {
            content = content.slice(0, insertIndex) + '\n' + configImport + content.slice(insertIndex);
            modified = true;
          }
        } else {
          // Si no hay imports, agregar al principio después de <script>
          const scriptTagIndex = content.indexOf('<script>');
          if (scriptTagIndex !== -1) {
            const insertIndex = scriptTagIndex + 8;
            if (!content.includes(configImport)) {
              content = content.slice(0, insertIndex) + '\n' + configImport + '\n' + content.slice(insertIndex);
              modified = true;
            }
          }
        }
      }
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Actualizado: ${filePath}`);
    return true;
  }
  
  return false;
}

// Ejecutar
console.log('Buscando archivos...');
const files = findFiles(srcDir);
console.log(`Encontrados ${files.length} archivos`);

let updatedCount = 0;
files.forEach(file => {
  if (updateFile(file)) {
    updatedCount++;
  }
});

console.log(`\n✓ Actualizados ${updatedCount} archivos`);

