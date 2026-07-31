// ============================================================
// Firebase (Google Cloud) config for "For Ananya"
// ------------------------------------------------------------
// These values are NOT secret — they only identify your Google Cloud /
// Firebase project. Real protection comes from the Firestore security rules
// (see SETUP below). It's safe to commit this file and put it on GitHub Pages.
//
// SETUP (one time, in Rohit's Google account):
//  1. Go to https://console.firebase.google.com and click "Add project".
//     Pick your existing GCP project (or create a new one) and finish.
//  2. In the left menu open  Build → Firestore Database → Create database.
//     Choose "Start in production mode", pick a region close to you, Enable.
//  3. Open the "Rules" tab and paste these rules, then Publish:
//
//       rules_version = '2';
//       service cloud.firestore {
//         match /databases/{database}/documents {
//           match /notes/{id} {
//             allow read: if true;
//             allow create: if request.resource.data.msg is string
//               && request.resource.data.msg.size() > 0
//               && request.resource.data.msg.size() <= 9000
//               && request.resource.data.name is string
//               && request.resource.data.name.size() <= 60;
//             allow update, delete: if false;
//           }
//         }
//       }
//
//  4. Project Settings (gear icon) → General → "Your apps" → click the
//     web icon "</>" → register an app (any nickname) → copy the config
//     object it shows you and paste the values below.
//  5. Save, commit, push. Done — every note Ananya pins is saved in your
//     Firestore "notes" collection (viewable in the Firebase console) and
//     shows up live on the shared wall.
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID",
};
