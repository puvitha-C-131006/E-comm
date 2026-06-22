/* ==========================================================================
   NovaCart - Auth & Session Logic
   ========================================================================== */

// Listen for auth state changes globally
firebase.auth().onAuthStateChanged((user) => {
    updateAuthUI(user);
    if (typeof updateCartCounters === 'function') {
        updateCartCounters();
    }
    // Auto-redirect if on login/register pages and logged in
    const path = window.location.pathname;
    if (user && !window.isRegistering && (path.includes('login.html') || path.includes('register.html'))) {
        window.location.href = 'index.html';
    }
});

// Update UI based on auth state
async function updateAuthUI(user) {
  const authLinks = document.querySelectorAll('.auth-link');
  const profileLinks = document.querySelectorAll('.profile-link');
  
  if (user) {
    // Logged in
    authLinks.forEach(el => el.style.display = 'none');
    profileLinks.forEach(el => {
      el.style.display = 'flex';
      const nameSpan = el.querySelector('.user-name');
      if(nameSpan) {
          // If display name is not set, use part of email
          nameSpan.textContent = user.displayName ? user.displayName.split(' ')[0] : user.email.split('@')[0];
      }
    });

    // Check admin role
    try {
        if (typeof db !== 'undefined') {
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists && doc.data().role === 'admin') {
                if (!document.getElementById('nav-admin-link')) {
                    const adminLink = document.createElement('a');
                    adminLink.href = 'admin.html';
                    adminLink.id = 'nav-admin-link';
                    adminLink.className = 'btn btn-outline';
                    adminLink.style.marginRight = '10px';
                    adminLink.style.display = 'flex';
                    adminLink.style.alignItems = 'center';
                    adminLink.style.gap = '5px';
                    adminLink.innerHTML = '<i class="fas fa-shield-alt"></i> Admin';
                    
                    const navActions = document.querySelector('.nav-actions');
                    if (navActions) {
                        const firstProfileLink = document.querySelector('.profile-link');
                        if (firstProfileLink) {
                            navActions.insertBefore(adminLink, firstProfileLink);
                        }
                    }
                }
            }
        }
    } catch(e) {
        console.error("Error checking admin role:", e);
    }

  } else {
    // Not logged in
    authLinks.forEach(el => el.style.display = 'flex');
    profileLinks.forEach(el => el.style.display = 'none');
    const adminLink = document.getElementById('nav-admin-link');
    if (adminLink) adminLink.remove();
  }
}

// Get current user (sync method if needed, but onAuthStateChanged is preferred)
function getCurrentUser() {
  return firebase.auth().currentUser;
}

// Login
function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        showToast('Login successful!');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
        return true;
    })
    .catch((error) => {
        console.error(error);
        showToast(error.message, 'error');
        return false;
    });
}

// Register
function register(name, email, phone, password) {
  window.isRegistering = true;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Update profile with name
        return userCredential.user.updateProfile({
            displayName: name
        }).then(() => {
            // Also store phone in firestore if needed
            return db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                phone: phone,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
    })
    .then(() => {
        // Firebase auto-logs in after registration, so we sign out immediately 
        // to force them to login manually.
        return firebase.auth().signOut().then(() => {
            showToast('Registration successful! Please login.');
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 1000);
            return true;
        });
    })
    .catch((error) => {
        console.error(error);
        showToast(error.message, 'error');
        return false;
    });
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    showToast('Logged out successfully');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }).catch((error) => {
      console.error(error);
      showToast('Error logging out', 'error');
  });
}

// Google Login
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        const user = result.user;
        // Check if user exists in firestore, if not create
        const userRef = db.collection('users').doc(user.uid);
        userRef.get().then((doc) => {
            if (!doc.exists) {
                userRef.set({
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber || '',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        });
        showToast('Login successful!');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
    }).catch((error) => {
        console.error(error);
        showToast(error.message, 'error');
    });
}

// Reset Password
function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            showToast('Password reset link sent to your email!');
            return true;
        })
        .catch((error) => {
            console.error(error);
            showToast(error.message, 'error');
            return false;
        });
}
