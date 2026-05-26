/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

  apiKey: "API_KEY_KAMU",

  authDomain: "PROJECT.firebaseapp.com",

  projectId: "PROJECT_ID",

  storageBucket: "PROJECT.appspot.com",

  messagingSenderId: "123456",

  appId: "APP_ID"

};

/* =========================
   INIT
========================= */

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

/* =========================
   LOGIN
========================= */

function login(){

  const provider =
  new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider);

}

function logout(){

  auth.signOut();

}

/* =========================
   LOGIN UI
========================= */

auth.onAuthStateChanged(user => {

  const loginBtn =
  document.getElementById("loginBtn");

  const logoutBtn =
  document.getElementById("logoutBtn");

  if(loginBtn && logoutBtn){

    if(user){

      loginBtn.style.display = "none";

      logoutBtn.style.display = "inline";

    } else {

      loginBtn.style.display = "inline";

      logoutBtn.style.display = "none";

    }

  }

});

/* =========================
   GO CREATE
========================= */

function goCreate(){

  window.location.href =
  "create.html";

}

/* =========================
   UPLOAD POST
========================= */

function uploadPost(){

  const title =
  document.getElementById("title").value;

  const content =
  document.getElementById("content").value;

  if(!title || !content){

    alert("Isi semua");

    return;

  }

  db.collection("posts").add({

    title:title,

    content:content,

    time:Date.now()

  })

  .then(() => {

    alert("Post berhasil");

    window.location.href =
    "index.html";

  });

}

/* =========================
   LOAD POSTS
========================= */

const postList =
document.getElementById("post-list");

if(postList){

  db.collection("posts")

  .orderBy("time","desc")

  .onSnapshot(snapshot => {

    let html = "";

    snapshot.forEach(doc => {

      let p = doc.data();

      html += `

      <div class="post"
      onclick="openPost('${doc.id}')">

        <h3>${p.title}</h3>

        <p>
        ${p.content.substring(0,100)}...
        </p>

      </div>

      `;

    });

    postList.innerHTML = html;

  });

}

/* =========================
   OPEN POST
========================= */

function openPost(id){

  window.location.href =
  "post.html?id=" + id;

}

/* =========================
   DETAIL POST
========================= */

const detail =
document.getElementById("post-detail");

if(detail){

  const params =
  new URLSearchParams(window.location.search);

  const id = params.get("id");

  db.collection("posts")
  .doc(id)
  .get()

  .then(doc => {

    const p = doc.data();

    detail.innerHTML = `

      <h2>${p.title}</h2>

      <p>${p.content}</p>

    `;

  });

}