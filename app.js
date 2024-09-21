// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP2awitgt9hL45bKxpuJyPXcTHLxRqa5M",
  authDomain: "gym-management-01.firebaseapp.com",
  databaseURL: "https://gym-management-01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gym-management-01",
  storageBucket: "gym-management-01.appspot.com",
  messagingSenderId: "886264433927",
  appId: "1:886264433927:web:f658ca9d1a84726f8649a2",
  measurementId: "G-4KJB0MR2K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// DOM Elements
const loginForm = document.getElementById('login-form');
const createUserForm = document.getElementById('create-user-form');
const loggedInView = document.getElementById('logged-in-view');
const dietPlansView = document.getElementById('diet-plans-view');
const adminView = document.getElementById('admin-view');
const memberManagementView = document.getElementById('member-management-view');

const loginBtn = document.getElementById('login-btn');
const googleLoginBtn = document.getElementById('google-login-btn');
const createUserBtn = document.getElementById('create-user-btn');
const createBtn = document.getElementById('create-btn');
const googleCreateBtn = document.getElementById('google-create-btn');
const logoutBtn = document.getElementById('logout-btn');

const dietPlansBtn = document.getElementById('diet-plans-btn');
const submitBmiBtn = document.getElementById('submit-bmi-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const bmiCategorySelect = document.getElementById('bmi-category');
const dietPlanText = document.getElementById('diet-plan-text');

const adminLogoutBtn = document.getElementById('admin-logout-btn');
const addMemberBtn = document.getElementById('add-member-btn');
const addMemberSubmitBtn = document.getElementById('add-member-submit-btn');
const addMemberForm = document.getElementById('add-member-form');
const memberNameInput = document.getElementById('member-name');
const memberEmailInput = document.getElementById('member-email');
const updateMemberBtn = document.getElementById('update-member-btn');

const ADMIN_EMAIL = 'mithunn429@gmail.com'; // Replace with your admin email

// Event Listeners
loginBtn.addEventListener('click', loginWithEmailPassword);
googleLoginBtn.addEventListener('click', loginWithGoogle);
createUserBtn.addEventListener('click', showCreateUserForm);
createBtn.addEventListener('click', createUserWithEmailPassword);
googleCreateBtn.addEventListener('click', createUserWithGoogle);
logoutBtn.addEventListener('click', logoutUser);
dietPlansBtn.addEventListener('click', showDietPlansView);
submitBmiBtn.addEventListener('click', showDietPlanText);
backToMenuBtn.addEventListener('click', backToMenu);

// Admin Event Listeners
adminLogoutBtn.addEventListener('click', adminLogout);
addMemberSubmitBtn.addEventListener('click', addMember);
addMemberBtn.addEventListener('click', showAddMemberForm);
updateMemberBtn.addEventListener('click', updateMember);

// Functions
function loginWithEmailPassword() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (email === ADMIN_EMAIL) {
        showAdminView();
      } else {
        showLoggedInView();
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      if (result.user.email === ADMIN_EMAIL) {
        showAdminView();
      } else {
        showLoggedInView();
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

function showCreateUserForm() {
  loginForm.style.display = 'none';
  createUserForm.style.display = 'block';
}

function createUserWithEmailPassword() {
  const email = document.getElementById('create-email').value;
  const password = document.getElementById('create-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      showLoggedInView();
    })
    .catch((error) => {
      alert(error.message);
    });
}

function createUserWithGoogle() {
  signInWithPopup(auth, provider)
    .then(() => {
      showLoggedInView();
    })
    .catch((error) => {
      alert(error.message);
    });
}

function adminLogout() {
  signOut(auth).then(() => {
    adminView.style.display = 'none';
    loginForm.style.display = 'block';
    clearInput()
  }).catch((error) => {
    alert(error.message);
  });
}

function showAdminView() {
  loginForm.style.display = 'none';
  adminView.style.display = 'block';
  addMemberForm.style.display = 'none';
}

async function loadMembers() {
  const querySnapshot = await getDocs(collection(db, "members"));
  memberList.innerHTML = ''; // Clear the list first

  querySnapshot.forEach((doc) => {
    const member = doc.data();
    const listItem = document.createElement('li');
    listItem.textContent = `${member.name} (${member.email})`;
    listItem.setAttribute('data-id', doc.id);
    listItem.addEventListener('click', () => editMember(doc.id, member));
    memberList.appendChild(listItem);
  });
}

function showAddMemberForm() {
  memberManagementView.style.display = 'none';
  updateMemberBtn.style.display = 'none';
  // adminView.style.display = 'none';
  
  addMemberForm.style.display = 'block';
  
  memberNameInput.value = '';
  memberEmailInput.value = '';
}

function addMember() {
  const name = memberNameInput.value;
  const email = memberEmailInput.value;

  addDoc(collection(db, "members"), { name, email })
    .then(() => {
      memberNameInput.value = '';
      memberEmailInput.value = '';
      loadMembers();
    })
    .catch((error) => {
      alert(error.message);
    });
}

function editMember(id, member) {
  memberNameInput.value = member.name;
  memberEmailInput.value = member.email;
  updateMemberBtn.style.display = 'block';
  addMemberBtn.style.display = 'none';

  updateMemberBtn.onclick = function() {
    updateMember(id);
  };
}

function updateMember(id) {
  const name = memberNameInput.value;
  const email = memberEmailInput.value;

  updateDoc(doc(db, "members", id), { name, email })
    .then(() => {
      memberNameInput.value = '';
      memberEmailInput.value = '';
      loadMembers();
      updateMemberBtn.style.display = 'none';
      addMemberBtn.style.display = 'block';
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logoutUser() {
  signOut(auth).then(() => {
    loginForm.style.display = 'block';
    createUserForm.style.display = 'none';
    loggedInView.style.display = 'none';
    dietPlansView.style.display = 'none';
    clearInput();
  }).catch((error) => {
    alert(error.message);
  });
}

function showLoggedInView() {
  loginForm.style.display = 'none';
  createUserForm.style.display = 'none';
  loggedInView.style.display = 'block';
  dietPlansView.style.display = 'none';
}

function clearInput() {
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('create-email').value = '';
  document.getElementById('create-password').value = '';
}

function showDietPlansView() {
  loggedInView.style.display = 'none';
  dietPlansView.style.display = 'block';
}

function showDietPlanText() {
  const bmiCategory = bmiCategorySelect.value;
  let text;

  if (bmiCategory === 'lean') {
    text = 'For lean individuals, it is important to increase calorie intake with a balanced diet rich in protein, carbohydrates, and healthy fats. Consider including foods like avocados, nuts, and lean meats.';
  } else if (bmiCategory === 'normal') {
    text = 'For individuals with a normal BMI, maintaining a balanced diet with a variety of foods including vegetables, fruits, lean proteins, and whole grains is recommended to maintain your weight and health.';
  } else if (bmiCategory === 'obese') {
    text = 'For obese individuals, it is advisable to reduce calorie intake with a focus on low-calorie, nutrient-dense foods like vegetables, fruits, and lean proteins. Avoid sugary drinks and high-fat foods.';
  } else {
    text = 'Please select a valid BMI category.';
  }

  dietPlanText.textContent = text;
}

function backToMenu() {
    showLoggedInView();
}

// Initialize application state
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.email === ADMIN_EMAIL) {
      showAdminView();
    } else {
      showLoggedInView();
    }
  } else {
    loginForm.style.display = 'block';
    createUserForm.style.display = 'none';
    loggedInView.style.display = 'none';
    adminView.style.display = 'none';
  }
});
