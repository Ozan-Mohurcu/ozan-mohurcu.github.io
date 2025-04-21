console.log("JavaScript kodu çalışıyor!");

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: window.FIREBASE_API_KEY,
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

// Beğeni sayısını güncelleyen fonksiyon
function updateLikeCount(projectId, count) {
    const likeCountElement = document.querySelector(`.card[data-id="${projectId}"] .like-count`);
    if (likeCountElement) {
        likeCountElement.textContent = `${count} beğeni`;
    }
}

// Sayfa yüklendiğinde tüm butonları kontrol et
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.like-button').forEach(button => {
        const project = button.closest('.card');
        const projectId = project.dataset.id;

        if (!projectId) {
            console.warn('Proje ID’si eksik!');
            return;
        }

        const likesRef = db.ref(`likes/${projectId}`);

        // Firebase'dan beğeni verisini dinle
        likesRef.on('value', snapshot => {
            const likeCount = snapshot.val() ? snapshot.val().count : 0;
            updateLikeCount(projectId, likeCount);

            const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
            if (userLikes[projectId]) {
                button.disabled = true;
                button.textContent = 'Beğenildi';
            }
        });

        // Butona tıklama işlemi
        button.addEventListener('click', () => {
            const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');

            // Eğer daha önce beğendiyse engelle
            if (userLikes[projectId]) return;

            // Beğeni sayısını artır
            likesRef.once('value', snapshot => {
                const currentCount = snapshot.val() ? snapshot.val().count : 0;
                likesRef.set({ count: currentCount + 1 });

                userLikes[projectId] = true;
                localStorage.setItem('userLikes', JSON.stringify(userLikes));

                button.disabled = true;
                button.textContent = 'Beğenildi';
            });
        });
    });
});
