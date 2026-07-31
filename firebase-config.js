// ============================================================
// Firebase (Google Cloud) config for "For Ananya"
// ------------------------------------------------------------
// These values are NOT secret — they only identify your Google Cloud /
// Firebase project. Real protection comes from the Firestore security rules.
// It's safe to commit this file and put it on GitHub Pages.
//
// Project: My Project 69495  (Project ID: radiant-wall-504100-j2)
// Firestore database name: "project"  (region asia-south1)
//
// STILL NEEDED from Rohit — the apiKey and appId. Get them here:
//  1. Go to https://console.firebase.google.com and open this project.
//     If it says "Add Firebase to a Google Cloud project", pick
//     radiant-wall-504100-j2 and finish the short wizard.
//  2. Gear icon → Project settings → General tab.
//  3. Under "Your apps", click the web icon  </>  → register an app.
//  4. Copy the apiKey and appId it shows and paste them below.
//
// Also publish the Firestore security rules (Firestore Database → Rules tab):
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /notes/{id} {
//         allow read: if true;
//         allow create: if request.resource.data.msg is string
//           && request.resource.data.msg.size() > 0
//           && request.resource.data.msg.size() <= 9000
//           && request.resource.data.name is string
//           && request.resource.data.name.size() <= 60;
//         allow update, delete: if false;
//       }
//     }
//   }
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCi35kOjzaL-HriTiSJjVFy01wzYE7QAV0",
  authDomain: "radiant-wall-504100-j2.firebaseapp.com",
  projectId: "radiant-wall-504100-j2",
  storageBucket: "radiant-wall-504100-j2.firebasestorage.app",
  messagingSenderId: "513762820141",
  appId: "1:513762820141:web:3cb8f87120c878507c38a4",
  measurementId: "G-G4G8V9VDR3",
};

// Name of the Firestore database you created (not the usual "(default)").
window.FIREBASE_DB_ID = "project";
