// Beğenileri localStorage'dan yükle
function loadLikes() {
    const likes = localStorage.getItem('projectLikes');
    return likes ? JSON.parse(likes) : {};
}

// Beğenileri localStorage'a kaydet
function saveLikes(likes) {
    localStorage.setItem('projectLikes', JSON.stringify(likes));
}

// Beğeni sayısını güncelle ve ekranda göster
function updateLikeCount(projectId, count) {
    const likeCountElement = document.querySelector(`.card[data-id="${projectId}"] .like-count`);
    likeCountElement.textContent = `${count} beğeni`;
}

// Beğeni butonlarına tıklama olayını ekle
document.querySelectorAll('.like-button').forEach(button => {
    const project = button.closest('.card');
    const projectId = project.dataset.id;

    // Başlangıçta beğeni sayısını yükle
    const likes = loadLikes();
    const likeCount = likes[projectId] || 0;
    updateLikeCount(projectId, likeCount);

    // Butona tıklama olayını ekle
    button.addEventListener('click', () => {
        const currentLikes = loadLikes();
        currentLikes[projectId] = (currentLikes[projectId] || 0) + 1;
        saveLikes(currentLikes);
        updateLikeCount(projectId, currentLikes[projectId]);

        // Butonu devre dışı bırak (tekrar beğenmeyi önlemek için)
        button.disabled = true;
        button.textContent = 'Beğenildi';
    });
});