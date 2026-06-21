const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\ADMIN\\Downloads\\E-comm\\novacart';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const scriptsToAdd = `
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js"></script>
    <script src="assets/js/firebase-config.js"></script>
    <script src="assets/js/auth.js"></script>`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if not already injected
    if (!content.includes('firebase-app-compat.js')) {
        content = content.replace('<script src="assets/js/auth.js"></script>', scriptsToAdd);
        fs.writeFileSync(filePath, content);
        console.log('Injected into', file);
    }
}
