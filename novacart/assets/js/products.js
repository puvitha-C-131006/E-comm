let products = [];

async function fetchProducts() {
    try {
        if (typeof db === 'undefined') {
            console.error("Firestore 'db' is not initialized.");
            return;
        }
        const snapshot = await db.collection('products').get();
        products = snapshot.docs.map(doc => doc.data());
        console.log(`Loaded ${products.length} products from Firestore.`);
    } catch (e) {
        console.error("Failed to fetch products from Firestore:", e);
    }
}

// Helper functions that were originally in products.js
function calculateDiscount(price, discount) {
    if (!discount || discount <= 0) return price;
    return Math.floor(price - (price * (discount / 100)));
}

function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}
