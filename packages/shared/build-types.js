const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building TypeScript type definitions...');

// Ensure types directory exists
const typesDir = path.join(__dirname, 'dist', 'types');
fs.mkdirSync(typesDir, { recursive: true });

// Clean the types directory
console.log('Cleaning types directory...');
if (fs.existsSync(typesDir)) {
  fs.rmSync(typesDir, { recursive: true, force: true });
  fs.mkdirSync(typesDir, { recursive: true });
}

// Run TypeScript compiler with specific file list
console.log('Running TypeScript compiler...');
try {
  // First, generate type declarations in a temp directory
  const tempDir = path.join(__dirname, 'temp-types');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  
  // Run tsc with explicit file list including index.ts
  const srcFiles = [
    path.join(__dirname, 'src', 'index.ts'),
    path.join(__dirname, 'src', '**', '*.ts')
  ].join(' ');
  
  execSync(
    `npx tsc \
      --declaration \
      --declarationMap \
      --emitDeclarationOnly \
      --skipLibCheck \
      --rootDir ${path.join(__dirname, 'src')} \
      --outDir ${tempDir} \
      --module commonjs \
      --target es2020 \
      --moduleResolution node \
      ${srcFiles}`, 
    { 
      stdio: 'inherit',
      cwd: __dirname,
      env: { ...process.env, FORCE_COLOR: '1' }
    }
  );
  
  // Move files from temp dir to final location
  console.log('Moving type definitions to dist/types...');
  if (fs.existsSync(tempDir)) {
    // Create types directory if it doesn't exist
    fs.mkdirSync(typesDir, { recursive: true });
    
    // Move files from temp dir to final location
    console.log('Moving type definitions to dist/types...');
    const moveFiles = (src, dest) => {
      console.log(`Scanning directory: ${src}`);
      const entries = fs.readdirSync(src, { withFileTypes: true });
      console.log(`Found ${entries.length} entries in ${src}:`, entries.map(e => e.name).join(', '));
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        
        // For index.d.ts, move it directly to dist/types
        // For other files, maintain their directory structure
        const destPath = entry.name === 'index.d.ts' 
          ? path.join(typesDir, entry.name)
          : path.join(dest, entry.name);
        
        console.log(`Processing: ${srcPath} -> ${destPath}`);
        
        if (entry.isDirectory()) {
          console.log(`Creating directory: ${destPath}`);
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          moveFiles(srcPath, destPath);
        } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
          console.log(`Moving file: ${srcPath} -> ${destPath}`);
          try {
            fs.renameSync(srcPath, destPath);
            console.log(`Successfully moved ${srcPath} to ${destPath}`);
          } catch (error) {
            console.error(`Error moving ${srcPath} to ${destPath}:`, error.message);
          }
        }
      }
    };
    
    moveFiles(tempDir, typesDir);
    
    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    // Ensure the types directory has the correct structure
    const expectedIndexFile = path.join(typesDir, 'index.d.ts');
    if (!fs.existsSync(expectedIndexFile)) {
      // If index.d.ts is in dist/types/types, move it up
      const nestedIndexFile = path.join(typesDir, 'types', 'index.d.ts');
      if (fs.existsSync(nestedIndexFile)) {
        fs.renameSync(nestedIndexFile, expectedIndexFile);
      }
    }
  }
  
  console.log('TypeScript type definitions built successfully!');
  console.log('Generated files in dist/types:');
  
  // List all generated files
  const listFiles = (dir, prefix = '') => {
    if (!fs.existsSync(dir)) {
      console.log(`Directory not found: ${dir}`);
      return;
    }
    
    const files = fs.readdirSync(dir);
    if (files.length === 0) {
      console.log('  (empty)');
      return;
    }
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          console.log(`  ${prefix}${file}/`);
          listFiles(fullPath, `  ${prefix}  `);
        } else {
          console.log(`  ${prefix}${file}`);
        }
      } catch (err) {
        console.error(`Error reading ${fullPath}:`, err.message);
      }
    });
  };
  
  listFiles(typesDir);
  
  // Verify critical files exist
  const criticalFiles = [
    path.join(typesDir, 'index.d.ts'),
    path.join(typesDir, 'types', 'user.d.ts')
  ];
  
  let allFilesExist = true;
  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      console.error(`Error: Required file not found: ${path.relative(process.cwd(), file)}`);
      allFilesExist = false;
    }
  }
  
  if (!allFilesExist) {
    throw new Error('One or more required type definition files are missing');
  }
  
} catch (error) {
  console.error('Failed to build type definitions:', error.message);
  process.exit(1);
}
