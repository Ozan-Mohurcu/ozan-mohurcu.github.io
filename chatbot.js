document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.createElement("div");
    chatIcon.id = "chat-icon";
    chatIcon.innerText = "🤖";
    document.body.appendChild(chatIcon);

    const chatBox = document.createElement("div");
    chatBox.id = "chat-box";
    chatBox.innerHTML = `
        <div id="chat-header">AI Kardeşim <span id="close-chat">✖</span></div>
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Bir şey yaz..." />
    `;
    document.body.appendChild(chatBox);

    const messages = document.getElementById("chat-messages");
    const input = document.getElementById("chat-input");

    const responses = {
        "selam": "Selam dostum! Nasıl yardımcı olabilirim?",
        "projelerin ne": "Aşağı kaydır, projeler orada seni bekliyor! 🚀",
        "sen kimsin": "Ben AI Kardeşim, bu sitenin dijital ruhuyum 🤖",
        "görüşürüz": "Görüşmek üzere, kendine iyi bak! ✌️",
        "merhaba": "Merhaba! 😊 Size nasıl yardımcı olabilirim?",
        "naber": "Selam! Nasılsın? 😄",
        "nasılsın": "Ben iyiyim, teşekkür ederim! Siz nasılsınız? 😊",
        "iyi": "Harika! 🎉 Projelerime göz atmak ister misiniz? 😎",
        "teşekkürler": "Rica ederim! 🙏",
        "yardımcı olabilir misin": "Tabii ki! Size nasıl yardımcı olabilirim? 🤔",
        "neden": "Ne hakkında konuşmak istersiniz? 😊",
        "iletişim bilgileriniz nelerdir": "İletişim için <a href='https://ozan-mohurcu.github.io/contact.html'>buraya tıklayın</a>. 📞",
        "çalışma saatleriniz nelerdir": "Çalışma saatlerimiz hafta içi 09:00 - 18:00. ⏰",
        "projelerinizi görebilir miyim": "Projelerimi görmek ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>Buraya tıklayın!</a> 👨‍💻",
        "nasıl iletişime geçebilirim": "İletişime geçmek için <a href='https://ozan-mohurcu.github.io/contact.html'>buradan ulaşabilirsiniz!</a> 📧",
        "projeleriniz hakkında ne düşünüyorsunuz": "Projelerimi beğendiyseniz, <a href='https://ozan-mohurcu.github.io/projects.html'>buradan yorum yapabilirsiniz!</a> ❤️",
        "proje detayları": "Proje detaylarını <a href='https://ozan-mohurcu.github.io/projects.html'>burada bulabilirsiniz!</a> 📑",
        "fiyatlandırma": "Fiyat bilgisi için iletişime geçebilirsiniz! 💬",
        "destek alabilir miyim": "Evet, <a href='https://ozan-mohurcu.github.io/contact.html'>buradan</a> destek alabilirsiniz! 🤝",
        "hakkınızda": "Daha fazla bilgi için <a href='https://ozan-mohurcu.github.io/index.html'>Hakkımda</a> sayfamı ziyaret edebilirsiniz! 😌",
        "ozan kim": "Benimle ilgili daha fazla bilgi için <a href='https://ozan-mohurcu.github.io/index.html'>Hakkımda</a> sayfama göz atın! 👤",
        "misyonunuz nedir": "Misyonum, kullanıcılarımıza en iyi deneyimi sunmak! 🚀",
        "vizyonunuz nedir": "Vizyonum, sektörde lider bir konumda olmak! 🌟",
        "sosyal medya hesaplarınız": "Bizi sosyal medyada takip edin: <a href='https://twitter.com/ozanmhrc'>Twitter</a>, <a href='https://instagram.com/ozanmhrc'>Instagram</a> 📱",
        "gizlilik politikası": "Gizlilik politikamız yakında eklenecek! 🔒",
        "kullanım koşulları": "Kullanım koşulları yakında eklenecek! 📃",
        "sıkça sorulan sorular": "SSS sayfası yakında eklenecek! ❓",
        "geri bildirimde bulunmak istiyorum": "Geri bildiriminiz çok değerli! <a href='https://ozan-mohurcu.github.io/contact.html'>Bana iletebilirsiniz!</a> 📝",
        "iş ortaklığı": "İş ortaklığı tekliflerinizi <a href='https://ozan-mohurcu.github.io/contact.html'>buradan bana iletebilirsiniz!</a> 💼",
        "referanslarınız var mı": "Referanslarımı isteğe bağlı olarak paylaşabilirim! 📜",
        "güvenlik önlemleriniz nelerdir": "Kullanıcı güvenliği çok önemli! Detaylar için <a href='https://ozan-mohurcu.github.io/contact.html'>bana ulaşabilirsiniz!</a> 🛡️",
        "görüş ve önerileriniz": "Görüşlerinizi ve önerilerinizi <a href='https://ozan-mohurcu.github.io/contact.html'>buradan paylaşabilirsiniz!</a> 💭",
        "başka bir sorunuz var mı": "Başka bir sorunuz varsa, sormaktan çekinmeyin! 😊",
        "size nasıl yardımcı olabilirim": "Size nasıl yardımcı olabilirim? 🤗",
        "bu konuda daha fazla bilgi": "Daha fazla bilgi için <a href='https://ozan-mohurcu.github.io/projects.html'>buraya göz atabilirsiniz!</a> 📚",
    
        // Proje ile ilgili
        "projeler": "Projelerime göz atmak ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>Buraya tıklayın!</a> 😎",
        "proje": "Projelerime göz atmak ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>Projeler sayfamı</a> ziyaret edebilirsiniz! 💻",
        "projelerim": "Projelerim hakkında bilgi almak için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 👨‍💻",
        "projelerime göz at": "Tabii! Projelerime göz atmak için <a href='https://ozan-mohurcu.github.io/projects.html'>buraya tıklayın!</a> 🚀",
        "projelerime bak": "Projelerimi görmek ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>Projeler sayfamı</a> ziyaret edebilirsiniz! 👀",
        "projelerimi incele": "Projelerimi incelemek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edin! 🔍",
        "projeler hakkında": "Projelerim hakkında daha fazla bilgi almak için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 🌟",
        "proje beğeni": "Projelerimi beğendiyseniz, <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> beğeni bırakabilirsiniz! ❤️",
        "projelerime beğeni": "Projelerime beğeni bırakmak ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edin ve beğenin! 👍",
        "projelerime yorum": "Projelerime yorum yapabilirsiniz! <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edin ve düşüncelerinizi paylaşın! 💬",
        "proje yorum": "Projelerim hakkında yorum yapmak ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> yorum bırakabilirsiniz! 💬",
        "yorum yap": "Projelerime yorum yapmak için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! ✍️",
        "beğeni at": "Projelerimi beğendiyseniz, <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> beğeni atabilirsiniz! ❤️",
        "projelerimi beğen": "Projelerimi beğenmek ister misiniz? <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edin ve beğenin! 👍",
        "proje fikirleri": "Projelerim hakkındaki fikirlerinizi <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> yorum olarak paylaşabilirsiniz! 💡",
        "proje görüşleri": "Projelerim hakkında görüşlerinizi <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> paylaşabilirsiniz! 🗣️",
        "projelerim nasıl": "Projelerimi nasıl buldunuz? Düşüncelerinizi <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> paylaşabilirsiniz! 🤩",
        "proje incele": "Projelerimi incelemek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 🔍",
        "proje detaylarını göster": "Proje detaylarını görmek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 📝",
        "proje örnekleri": "Proje örneklerimi görmek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 👨‍💻",
        "projeleriniz güzel": "Teşekkür ederim! Projelerimi beğendiyseniz, <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamda</a> yorum yapabilir ve beğenebilirsiniz! 😍",
        "projeleriniz harika": "Çok teşekkür ederim! Projelerimi daha fazla incelemek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 🌟",
        "proje nasıl beğenilir": "Projelerimi beğenmek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edin ve beğeni butonuna tıklayın! 👍",
        "yorum nasıl yapılır": "Projelerime yorum yapmak için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edin ve yorum bölümünü kullanın! ✍️",
        "projeleriniz çok iyi": "Teşekkür ederim! Projelerim hakkında daha fazla bilgi için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 🌟",
        "proje önerisi": "Proje önerilerinizi <a href='https://ozan-mohurcu.github.io/contact.html'>iletişim sayfam</a> üzerinden bana iletebilirsiniz! 💡",
        "proje işbirliği": "Projelerde işbirliği yapmak isterseniz, <a href='https://ozan-mohurcu.github.io/contact.html'>iletişim sayfam</a> üzerinden bana ulaşabilirsiniz! 🤝",
        "projeleriniz ilginç": "Teşekkür ederim! Projelerimi daha fazla keşfetmek için <a href='https://ozan-mohurcu.github.io/projects.html'>projeler sayfamı</a> ziyaret edebilirsiniz! 🌟"
    };
    
    function addMessage(text, sender) {
        const msg = document.createElement("div");
        msg.className = `chat-message ${sender}`;
        
        if (sender === "bot") {
            msg.innerHTML = text; // HTML içeriği düzgün gösterilsin diye
        } else {
            msg.innerText = text; // kullanıcı mesajı düz metin olarak kalsın
        }
    
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }
    

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value.trim()) {
            const userMsg = input.value.trim().toLowerCase();
            addMessage(input.value, "user");
            const reply = responses[userMsg] || "Hmm... O konuda emin değilim ama yine de yardımcı olmaya çalışırım!";
            setTimeout(() => addMessage(reply, "bot"), 500);
            input.value = "";
        }
    });

    chatIcon.addEventListener("click", () => {
        chatBox.classList.toggle("open");
    });

    document.getElementById("close-chat").addEventListener("click", () => {
        chatBox.classList.remove("open");
    });
});

