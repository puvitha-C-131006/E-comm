/* ==========================================================================
   NovaCart - Firebase & Environment Resilience Engine
   Graceful HTTP/HTTPS & file:/// Protocol Handling with Mock Auth Fallback
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyCIKFsa0TspF74zyjbY7Mc4hS9WxJp46ko",
  authDomain: "novacart-841d6.firebaseapp.com",
  projectId: "novacart-841d6",
  storageBucket: "novacart-841d6.firebasestorage.app",
  messagingSenderId: "549815736481",
  appId: "1:549815736481:web:8c6414ace687c9483fb8e0",
  measurementId: "G-5FRJD2NM8Z"
};

const isFileProtocol = window.location.protocol === 'file:';
let isFirebaseAuthAvailable = false;

// Mock Auth & Storage Adapter for file:/// local development
class LocalMockAuth {
  constructor() {
    this._listeners = [];
    this.currentUser = JSON.parse(localStorage.getItem('novacart_mock_user')) || null;
    
    // Initialize demo accounts in mock database if empty
    const users = JSON.parse(localStorage.getItem('novacart_mock_users_db')) || {};
    if (!users['admin@novacart.com']) {
      users['admin@novacart.com'] = {
        uid: 'mock_admin_123',
        email: 'admin@novacart.com',
        displayName: 'Admin User',
        role: 'admin',
        password: 'password123',
        cart: [],
        wishlist: []
      };
      localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));
    }
    if (!users['john@example.com']) {
      users['john@example.com'] = {
        uid: 'mock_user_john_456',
        email: 'john@example.com',
        displayName: 'John Doe',
        role: 'customer',
        password: 'password123',
        cart: [],
        wishlist: []
      };
      localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));
    }
  }

  onAuthStateChanged(callback) {
    this._listeners.push(callback);
    setTimeout(() => callback(this.currentUser), 10);
    return () => {
      this._listeners = this._listeners.filter(cb => cb !== callback);
    };
  }

  _notify() {
    this._listeners.forEach(cb => {
      try { cb(this.currentUser); } catch (e) { console.error(e); }
    });
  }

  async signInWithEmailAndPassword(email, password) {
    const users = JSON.parse(localStorage.getItem('novacart_mock_users_db')) || {};
    const lowerEmail = (email || 'user@example.com').toLowerCase().trim();
    const userRecord = users[lowerEmail];

    if (userRecord) {
      this.currentUser = {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || userRecord.name || userRecord.email.split('@')[0],
        role: userRecord.role || (lowerEmail === 'admin@novacart.com' ? 'admin' : 'customer')
      };
    } else {
      // Create session for regular customer with their exact entered email
      const localPart = lowerEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = localPart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'User';
      this.currentUser = {
        uid: 'mock_user_' + Date.now(),
        email: lowerEmail,
        displayName: formattedName,
        role: lowerEmail === 'admin@novacart.com' ? 'admin' : 'customer'
      };
      users[lowerEmail] = {
        ...this.currentUser,
        password: password || 'password123',
        cart: [],
        wishlist: []
      };
      localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));
    }

    localStorage.setItem('novacart_mock_user', JSON.stringify(this.currentUser));
    this._notify();
    return { user: this.currentUser };
  }

  async signInWithPopup(provider) {
    // In mock/file:// environment, signal that browser OAuth popup is restricted so UI modal fallback is triggered
    const err = new Error("auth/operation-not-supported-in-this-environment");
    err.code = "auth/operation-not-supported-in-this-environment";
    throw err;
  }

  async createUserWithEmailAndPassword(email, password) {
    const users = JSON.parse(localStorage.getItem('novacart_mock_users_db')) || {};
    const lowerEmail = (email || 'user@example.com').toLowerCase().trim();

    if (users[lowerEmail]) {
      // Update existing or log in
      return this.signInWithEmailAndPassword(lowerEmail, password);
    }

    const localPart = lowerEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = localPart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'User';
    const newUser = {
      uid: 'mock_user_' + Date.now(),
      email: lowerEmail,
      displayName: formattedName,
      role: lowerEmail === 'admin@novacart.com' ? 'admin' : 'customer',
      password: password,
      cart: [],
      wishlist: []
    };

    users[lowerEmail] = newUser;
    localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));

    this.currentUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role,
      updateProfile: async (data) => {
        if (data.displayName) {
          newUser.displayName = data.displayName;
          this.currentUser.displayName = data.displayName;
          users[lowerEmail] = newUser;
          localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));
          localStorage.setItem('novacart_mock_user', JSON.stringify(this.currentUser));
          this._notify();
        }
      }
    };

    localStorage.setItem('novacart_mock_user', JSON.stringify(this.currentUser));
    this._notify();
    return { user: this.currentUser };
  }

  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('novacart_mock_user');
    this._notify();
    return true;
  }

  async sendPasswordResetEmail(email) {
    return true;
  }
}

// Mock Firestore Adapter for file:/// local development
class LocalMockFirestore {
  collection(name) {
    return {
      doc: (id) => ({
        get: async () => {
          if (name === 'users') {
            const users = JSON.parse(localStorage.getItem('novacart_mock_users_db')) || {};
            const userObj = Object.values(users).find(u => u.uid === id) || { role: 'customer', cart: [], wishlist: [] };
            return {
              exists: true,
              data: () => userObj
            };
          } else if (name === 'products') {
            const prods = typeof products !== 'undefined' ? products : [];
            const p = prods.find(item => item.id == id);
            return {
              exists: !!p,
              data: () => p
            };
          }
          return { exists: false, data: () => ({}) };
        },
        set: async (data, opts = {}) => {
          if (name === 'users') {
            const users = JSON.parse(localStorage.getItem('novacart_mock_users_db')) || {};
            let userKey = Object.keys(users).find(k => users[k].uid === id);
            if (!userKey) {
              userKey = data.email ? data.email.toLowerCase() : id;
            }
            users[userKey] = opts.merge ? { ...(users[userKey] || {}), ...data } : data;
            localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));
          }
          return true;
        },
        update: async (data) => {
          if (name === 'users') {
            const users = JSON.parse(localStorage.getItem('novacart_mock_users_db')) || {};
            const userKey = Object.keys(users).find(k => users[k].uid === id);
            if (userKey) {
              users[userKey] = { ...users[userKey], ...data };
              localStorage.setItem('novacart_mock_users_db', JSON.stringify(users));
            }
          }
          return true;
        }
      }),
      get: async () => {
        if (name === 'products') {
          const prods = typeof products !== 'undefined' ? products : [];
          return {
            empty: prods.length === 0,
            docs: prods.map(p => ({
              id: p.id.toString(),
              data: () => p
            }))
          };
        }
        return { empty: true, docs: [] };
      }
    };
  }
}

// Initialization Logic
let auth;
let db;

try {
  if (!isFileProtocol && typeof firebase !== 'undefined' && firebase.initializeApp) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();
    isFirebaseAuthAvailable = true;
  } else {
    const mockAuthInstance = new LocalMockAuth();
    const mockDbInstance = new LocalMockFirestore();

    auth = mockAuthInstance;
    db = mockDbInstance;

    if (typeof firebase === 'undefined') {
      window.firebase = {};
    }
    window.firebase.auth = () => mockAuthInstance;
    window.firebase.auth.GoogleAuthProvider = class GoogleAuthProvider {
      constructor() {
        this.providerId = 'google.com';
        this.customParameters = {};
      }
      setCustomParameters(params) {
        this.customParameters = params || {};
        return this;
      }
    };
    window.firebase.firestore = () => mockDbInstance;
    window.firebase.firestore.FieldValue = {
      serverTimestamp: () => new Date().toISOString()
    };
  }
} catch (error) {
  console.warn("Firebase Init note:", error);
  const mockAuthInstance = new LocalMockAuth();
  const mockDbInstance = new LocalMockFirestore();

  auth = mockAuthInstance;
  db = mockDbInstance;

  if (typeof firebase === 'undefined') window.firebase = {};
  window.firebase.auth = () => mockAuthInstance;
  window.firebase.auth.GoogleAuthProvider = class GoogleAuthProvider {
    constructor() {
      this.providerId = 'google.com';
      this.customParameters = {};
    }
    setCustomParameters(params) {
      this.customParameters = params || {};
      return this;
    }
  };
  window.firebase.firestore = () => mockDbInstance;
}
