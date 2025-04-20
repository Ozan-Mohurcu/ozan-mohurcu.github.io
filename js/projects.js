console.log("JavaScript kodu çalışıyor! Dosya yolu doğru.");

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyDt-YuYCFTpbVmBvHFIcLtCXowgKiBgX8w",
    authDomain: "ozanprojects.firebaseapp.com",
    databaseURL: "https://ozanprojects-default-rtdb.firebaseio.com",
    projectId: "ozanprojects",
    storageBucket: "ozanprojects.appspot.com",
    messagingSenderId: "508217082371",
    appId: "1:508217082371:web:32ff717d0f3efd79714436"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
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
