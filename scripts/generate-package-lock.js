const { execSync } = require('child_process');

try {
  execSync('npm install --package-lock-only');
  console.log('package-lock.json generated successfully.');
} catch (error) {
  console.error('Failed to generate package-lock.json:', error);
  process.exit(1);
}
