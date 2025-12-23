import Firebase from "firebase-admin";
import serviceAccount from "./firebaseAdmin.json";

export type FirebaseErrorInfo = {
  code: string;
  message: string;
};

const adminFirebaseConfig = {
  credential: Firebase.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  }),
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(adminFirebaseConfig);
}

const app = Firebase.app();
const authAdmin = Firebase.auth(app);

export { Firebase };

export default authAdmin;