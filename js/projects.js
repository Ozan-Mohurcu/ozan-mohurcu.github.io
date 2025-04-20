console.log("JavaScript kodu çalışıyor! Dosya yolu doğru.");

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://ozanprojects-default-rtdb.firebaseio.com",  // (Alternatif olarak burada da .env kullanabilirsiniz)
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  
  // Firebase başlatma
  const app = initializeApp(firebaseConfig);
console.log("Firebase bağlantısı kuruldu!");

// Sayfadaki tüm beğeni butonlarını bul
document.querySelectorAll('.like-button').forEach(button => {
    const card = button.closest('.card');
    const projectId = card.dataset.id;
    const likeText = card.querySelector('.like-count');
    const likesRef = db.ref('likes/' + projectId);

    // Firebase'den beğeni verisini al ve göster
    likesRef.on('value', snapshot => {
        const data = snapshot.val();
        const count = data ? data.count : 0;
        likeText.textContent = `${count} beğeni`;

        const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
        if (userLikes[projectId]) {
            button.disabled = true;
            button.textContent = "Beğenildi";
        }
    });

    // Butona tıklanınca sayacı artır
    button.addEventListener('click', () => {
        likesRef.once('value').then(snapshot => {
            const data = snapshot.val();
            const current = data ? data.count : 0;
            likesRef.update({ count: current + 1 });

            const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
            userLikes[projectId] = true;
            localStorage.setItem('userLikes', JSON.stringify(userLikes));

            button.disabled = true;
            button.textContent = "Beğenildi";
        });
    });
});
