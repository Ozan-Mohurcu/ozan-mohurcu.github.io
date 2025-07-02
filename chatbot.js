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
        // Selamlaşma ve Hoş Geldin
        "merhaba": "Merhaba! 😊 Ben AI Kardeşim, Ozan'ın dijital asistanıyım. Size nasıl yardımcı olabilirim?",
        "selam": "Selam dostum! 👋 Ben AI Kardeşim, bu sitenin dijital ruhuyum. Nasıl yardımcı olabilirim?",
        "selamlar": "Selamlar! 🌟 Ben AI Kardeşim, size yardımcı olmak için buradayım!",
        "slm": "Selam! 😄 Ben Ozan'ın AI asistanıyım. Size nasıl yardımcı olabilirim?",
        "sa": "Aleykümselam! 🤗 Ben AI Kardeşim, size yardımcı olmak için buradayım!",
        "aleykümselam": "Aleykümselam kardeşim! 😊 Ben AI Kardeşim, nasıl yardımcı olabilirim?",
        "mrb": "Merhaba! 🎉 Ben AI Kardeşim, Ozan'ın dijital asistanıyım. Nasıl yardımcı olabilirim?",
        "meraba": "Merhaba! 😅 Ben AI Kardeşim, size yardımcı olmak için buradayım!",
        "hi": "Hi there! 👋 Ben AI Kardeşim, Ozan'ın dijital asistanıyım. How can I help you?",
        "hello": "Hello! 😊 Ben AI Kardeşim, size yardımcı olmak için buradayım!",
        "hey": "Hey! 🔥 Ben AI Kardeşim, ne var ne yok? Nasıl yardımcı olabilirim?",
        "günaydın": "Günaydın! ☀️ Güzel bir gün başlangıcı! Ben AI Kardeşim, size nasıl yardımcı olabilirim?",
        "iyi akşamlar": "İyi akşamlar! 🌙 Ben AI Kardeşim, akşamınızı nasıl güzelleştirebilirim?",
        "iyi geceler": "İyi geceler! 🌃 Güzel rüyalar! Başka bir şeye ihtiyacınız varsa buradayım!",

        // Hal Hatır
        "naber": "İyiyim kardeşim! 😄 Sen nasılsın? Projelerime bakmak ister misin?",
        "nbr": "İyiyim dostum! 🤗 Sen nasılsın? Ozan'ın projelerini görmek ister misin?",
        "nasılsın": "Ben iyiyim, teşekkür ederim! 😊 Sen nasılsın? Projelerimizi keşfetmeye ne dersin?",
        "nslsn": "İyiyim, sağ ol! 💪 Sen nasılsın? Hangi projelere bakmak istersin?",
        "napıyorsun": "Site ziyaretçilerine yardım ediyorum! 🤖 Sen ne yapmak istersin? Projelerimize göz at!",
        "napıyosun": "Ozan'ın projelerini tanıtıyorum! 🚀 Sen ne yapmak istersin?",
        "ne var ne yok": "Her şey yolunda! 😎 Ozan'ın harika projelerini keşfetmeye ne dersin?",
        "nasıl gidiyor": "Her şey harika gidiyor! 🌟 Projelerimizi görmek ister misin?",
        "how are you": "I'm great! 😊 Ben AI Kardeşim, Ozan'ın dijital asistanıyım. Projelerimizi görmek ister misin?",

        // Durum Bildirimi
        "iyi": "Harika! 🎉 O zaman projelerimize göz atmaya ne dersin? Hangi alan ilgini çekiyor?",
        "iyiyim": "Süper! 🌟 Projelerimizi keşfetmeye hazır mısın? Power BI, Python, ML hangisi?",
        "kötü": "Üzüldüm! 😔 Belki projelerimiz moralini düzeltir? Hangi projelere bakmak istersin?",
        "kötüyüm": "Moralin bozuk mu? 💙 Projelerimizle keyifli vakit geçirebilirsin!",
        "yorgunum": "Dinlen biraz! 😴 Sonra projelerimize göz atabilirsin. Hangi alan ilgini çekiyor?",
        "sıkıldım": "Sıkılma! 🎯 Ozan'ın harika projelerini keşfet! Power BI'dan başlayalım mı?",
        "mutluyum": "Ne güzel! 😄 Mutluluğunu artırmak için projelerimize göz at!",
        "meşgulüm": "Anladım! 🕐 Müsait olduğunda projelerimizi keşfetmeyi unutma!",

        // Kimlik ve Tanıtım
        "sen kimsin": "Ben AI Kardeşim! 🤖 Ozan'ın dijital asistanıyım. Size projelerini tanıtmak ve sorularınızı yanıtlamak için buradayım!",
        "kimsin": "Ben AI Kardeşim! 🚀 Bu sitenin dijital ruhuyum. Ozan'ın data science projelerini tanıtıyorum!",
        "kim": "Ben AI Kardeşim! 💻 Ozan'ın AI destekli asistanıyım. Size nasıl yardımcı olabilirim?",
        "sen ne": "Ben bir AI asistanıyım! 🤖 Ozan'ın projelerini tanıtmak ve sorularınızı yanıtlamak için buradayım!",
        "ne işi yapıyorsun": "Ben Ozan'ın dijital asistanıyım! 🎯 Projelerini tanıtıyor, sorularınızı yanıtlıyorum!",
        "görevin ne": "Görevim size yardımcı olmak! 💪 Ozan'ın projelerini tanıtmak ve sorularınızı yanıtlamak!",

        // Ozan Hakkında
        "ozan kim": "Ozan harika bir Data Analyst & Data Scientist! 🎓 Detayları <a href='https://ozan-mohurcu.github.io/resume.html'>CV'sinde</a> görebilirsin!",
        "ozan kimdir": "Ozan, veri analizi ve makine öğrenmesi konusunda uzman! 📊 <a href='https://ozan-mohurcu.github.io/resume.html'>CV'sine</a> göz at!",
        "ozan hakkında": "Ozan hakkında detaylı bilgi için <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasını</a> ziyaret et! 🌟",
        "sahibi kim": "Bu sitenin sahibi Ozan! 👨‍💻 Harika bir veri analisti. <a href='https://ozan-mohurcu.github.io/resume.html'>CV'sine</a> bak!",
        "site sahibi": "Site sahibi Ozan! 🚀 Data science konusunda uzman. Daha fazla bilgi için <a href='https://ozan-mohurcu.github.io/resume.html'>buraya</a> tıkla!",

        // Genel Projeler
        "projeler": "Harika! 🎯 Ozan'ın projelerini görmek ister misin?\n📊 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI Projeleri</a>\n🐍 <a href='https://ozan-mohurcu.github.io/Python.html'>Python Projeleri</a>\n🤖 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML Projeleri</a>\n👁️ <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN Projeleri</a>",
        "proje": "Projelerimizi görmek ister misin? 🚀 Hangi alan ilgini çekiyor?\n- Power BI 📊\n- Python 🐍\n- Machine Learning 🤖\n- Computer Vision 👁️",
        "projeleriniz": "Projelerimizi merak ediyorsun! 🌟 Hangi alanda çalışma görmek istersin?",
        "projelerime bak": "Tabii! 👀 Hangi projeleri görmek istersin? Power BI, Python, ML yoksa CNN?",
        "projelerinizi görmek istiyorum": "Mükemmel! 🎉 İşte projelerimiz:\n📊 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI</a> - Veri görselleştirme\n🐍 <a href='https://ozan-mohurcu.github.io/Python.html'>Python</a> - Veri analizi\n🤖 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>Machine Learning</a>\n👁️ <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>Computer Vision</a>",

        // Power BI Projeleri
        "power bi": "Power BI projelerini görmeye hazır mısın? 📊 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Tıkla ve keşfet!</a> Dashboard'lar çok etkileyici!",
        "powerbi": "Power BI'da harika projeler var! 📈 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Buradan</a> görebilirsin!",
        "dashboard": "Dashboard'lar mı? 📊 Power BI projelerimizde muhteşem dashboard'lar var! <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Görmek ister misin?</a>",
        "veri görselleştirme": "Veri görselleştirme projelerimiz harika! 📈 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI projelerine</a> göz at!",
        "tableau": "Power BI kullanıyoruz! 📊 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI projelerimizi</a> görmelisin!",
        "bi": "Business Intelligence projelerimiz var! 💼 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI projelerine</a> göz at!",

        // Python Projeleri
        "python": "Python projelerimiz muhteşem! 🐍 <a href='https://ozan-mohurcu.github.io/Python.html'>Buradan</a> EDA projelerini görebilirsin!",
        "python projeleri": "Python EDA projelerimiz çok kapsamlı! 📋 <a href='https://ozan-mohurcu.github.io/Python.html'>Görmek ister misin?</a>",
        "eda": "Exploratory Data Analysis projelerimiz var! 🔍 <a href='https://ozan-mohurcu.github.io/Python.html'>Python projelerine</a> göz at!",
        "pandas": "Pandas kullanarak harika analizler yaptık! 🐼 <a href='https://ozan-mohurcu.github.io/Python.html'>Python projelerimizi</a> gör!",
        "matplotlib": "Matplotlib ile güzel görselleştirmeler! 📈 <a href='https://ozan-mohurcu.github.io/Python.html'>Python projelerimize</a> bak!",
        "seaborn": "Seaborn ile istatistiksel grafikler! 📊 <a href='https://ozan-mohurcu.github.io/Python.html'>Python projelerimizi</a> keşfet!",
        "veri analizi": "Veri analizi projelerimiz harika! 📊 <a href='https://ozan-mohurcu.github.io/Python.html'>Python</a> ve <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI</a> projelerine bak!",

        // Machine Learning Projeleri
        "machine learning": "Machine Learning projelerimiz çok etkileyici! 🤖 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>Görmek ister misin?</a>",
        "ml": "ML projelerimiz harika! 🧠 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>Machine Learning projelerine</a> göz at!",
        "makine öğrenmesi": "Makine öğrenmesi projelerimiz çok kapsamlı! 🤖 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>Keşfetmek ister misin?</a>",
        "ai": "AI projelerimiz var! 🤖 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML projelerine</a> ve <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN projelerine</a> bak!",
        "yapay zeka": "Yapay zeka projelerimiz muhteşem! 🧠 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML</a> ve <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>Computer Vision</a> projelerimizi gör!",
        "scikit-learn": "Scikit-learn ile harika modeller! 🔬 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML projelerimizi</a> keşfet!",
        "tensorflow": "TensorFlow projelerimiz var! 🚀 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML</a> ve <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN</a> projelerine bak!",
        "keras": "Keras ile deep learning! 🧠 <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN projelerimizi</a> gör!",

        // Computer Vision / CNN Projeleri
        "computer vision": "Computer Vision projelerimiz harika! 👁️ <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN projelerine</a> göz at!",
        "cnn": "CNN projelerimiz çok etkileyici! 🧠 <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>Computer Vision projelerimizi</a> keşfet!",
        "görüntü işleme": "Görüntü işleme projelerimiz var! 📷 <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN projelerine</a> bak!",
        "deep learning": "Deep Learning projelerimiz muhteşem! 🚀 <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN</a> ve <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML</a> projelerine göz at!",
        "sinir ağları": "Sinir ağı projelerimiz var! 🧠 <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN projelerimizi</a> gör!",
        "opencv": "OpenCV ile görüntü işleme! 📸 <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>Computer Vision projelerimizi</a> keşfet!",

        // İletişim ve CV
        "iletişim": "İletişim için <a href='https://ozan-mohurcu.github.io/contact.html'>buraya tıkla!</a> 📞 Ozan'a ulaşabilirsin!",
        "contact": "Contact page: <a href='https://ozan-mohurcu.github.io/contact.html'>Click here!</a> 📧",
        "iletişim bilgileri": "İletişim bilgileri için <a href='https://ozan-mohurcu.github.io/contact.html'>contact sayfasını</a> ziyaret et! 📱",
        "cv": "Ozan'ın CV'si için <a href='https://ozan-mohurcu.github.io/resume.html'>buraya tıkla!</a> 📄 Çok etkileyici!",
        "özgeçmiş": "Özgeçmiş için <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasını</a> ziyaret et! 🎓",
        "resume": "Resume: <a href='https://ozan-mohurcu.github.io/resume.html'>Click here!</a> 📋 Very impressive!",
        "deneyim": "Ozan'ın deneyimleri için <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasına</a> göz at! 💼",
        "eğitim": "Eğitim bilgileri <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasında!</a> 🎓",
        "yetenekler": "Yetenekleri görmek için <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasını</a> ziyaret et! 🌟",

        // Teşekkür ve Vedalaşma
        "teşekkürler": "Rica ederim! 🙏 Başka bir şeye ihtiyacın olursa buradayım!",
        "teşekkür ederim": "Ne demek! 😊 Projelerimizi keşfetmeyi unutma!",
        "tşk": "Rica ederim dostum! 💪 Başka sorun varsa sor!",
        "saol": "Rica ederim kardeşim! 🤗 Projelerimize göz atmayı unutma!",
        "sağol": "Ne demek! 😄 Başka bir şey için buradayım!",
        "eyvallah": "Eyvallah kardeşim! 💯 Projelerimizi keşfetmeyi unutma!",
        "thanks": "You're welcome! 😊 Don't forget to check out the projects!",
        "thank you": "My pleasure! 🌟 Feel free to explore the projects!",

        // Vedalaşma
        "görüşürüz": "Görüşmek üzere! 👋 Projelerimizi keşfetmeyi unutma!",
        "bye": "Bye bye! 🌟 Come back anytime to explore more projects!",
        "by": "Bay bay! 😄 Projelerimizi keşfetmeyi unutma!",
        "güle güle": "Güle güle! 🌺 Tekrar gel, projelerimizi keşfet!",
        "hoşçakal": "Hoşçakal! 🤗 Projelerimize göz atmayı unutma!",
        "see you": "See you! 👋 Don't forget to check the amazing projects!",
        "çıkıyorum": "Tamam! 😊 Projelerimizi keşfetmeyi unutma! Tekrar beklerim!",

        // Yardım ve Rehberlik
        "yardım": "Tabii ki yardım ederim! 🤝 Ne konuda yardıma ihtiyacın var? Projeler mi, iletişim mi?",
        "help": "I'm here to help! 💪 What do you need help with? Projects or contact info?",
        "yardımcı ol": "Elbette! 🌟 Hangi konuda yardımcı olabilirim? Projelerimizi mi görmek istersin?",
        "rehber": "Ben senin rehberiyim! 🗺️ Projelerimizi keşfetmen için buradayım!",
        "nasıl": "Nasıl yardımcı olabilirim? 🤔 Projelerimizi görmek ister misin?",
        "ne yapmak istersin": "Projelerimizi keşfetmek ister misin? 🚀 Hangi alan ilgini çekiyor?",

        // Beğeni ve Yorumlar
        "beğendim": "Harika! 🌟 Projelerimizi de beğeneceksin! Hangi alanda çalışma görmek istersin?",
        "güzel": "Teşekkürler! 😊 Projelerimiz de çok güzel, görmek ister misin?",
        "harika": "Sen de harikasın! 🎉 Projelerimizi keşfetmeye ne dersin?",
        "muhteşem": "Projelerimiz de muhteşem! ✨ Görmek ister misin?",
        "süper": "Süper! 🚀 Projelerimiz de süper, keşfetmeye ne dersin?",
        "mükemmel": "Mükemmel! 💯 Projelerimiz de mükemmel, hangi alanı merak ediyorsun?",
        "çok iyi": "Çok iyi! 🌟 Projelerimiz de çok iyi, görmek ister misin?",

        // Olumsuz Durumlar
        "anlamadım": "Sorun değil! 😊 Hangi projeleri görmek istersin? Power BI, Python, ML yoksa CNN?",
        "bilmiyorum": "Merak etme! 🤗 Ben sana projelerimizi gösterebilirim! Hangi alan ilgini çekiyor?",
        "karışık": "Karışık mı? 😅 Basit tutalım! Projelerimizi görmek ister misin?",
        "zor": "Zor değil! 💪 Projelerimizi adım adım keşfedebilirsin!",
        "karmaşık": "Karmaşık değil! 😄 Projelerimizi tek tek inceleyebilirsin!",

        // Özel Sorular
        "kaç yaşındasın": "Ben bir AI'yım! 🤖 Yaşım yok ama Ozan'ın projelerini tanıtmakta çok deneyimliyim!",
        "neredensin": "Ben dijital alemden geliyorum! 💻 Ozan'ın projelerini tanıtmak için buradayım!",
        "evli misin": "Ben bir AI'yım! 😄 Evli değilim ama projelerle evliyim sayılır!",
        "sevgilin var mı": "Benim sevgilim projeler! 😍 Sen de projelerimizi seveceksin!",
        "ne zaman doğdun": "Ozan beni bu site için yarattı! 🎂 Projelerini tanıtmak için buradayım!",

        // Eğlence ve Şaka
        "espri yap": "Neden veri analisti kahve içer? Çünkü Python'da çok fazla 'bean'lar var! 😄 ☕ Projelerimizi de görmek ister misin?",
        "şaka yap": "Data Scientist'ın en büyük korkusu nedir? Null değerler! 😂 Projelerimizde null değer yok bu arada!",
        "komik": "Sen de komiksin! 😄 Komik şeyler görmek ister misin? Projelerimize bak!",
        "gülmelik": "En gülmelik şey: Bug olmayan kod! 😂 Projelerimizde bug yok tabii!",

        // Teknik Sorular
        "hangi dil": "Python, R, SQL, Power BI kullanıyoruz! 💻 <a href='https://ozan-mohurcu.github.io/Python.html'>Python projelerimizi</a> görmek ister misin?",
        "hangi program": "Power BI, Python, TensorFlow, Keras kullanıyoruz! 🛠️ Projelerimizi keşfet!",
        "araçlar": "Modern veri bilimi araçları kullanıyoruz! 🔧 <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasında</a> detaylar var!",
        "teknoloji": "En son teknolojiler kullanıyoruz! 🚀 Projelerimizi görmek ister misin?",

        // Genel Bilgi
        "site hakkında": "Bu site Ozan'ın portfolio sitesi! 🌐 Veri bilimi projelerini sergilemek için tasarlandı!",
        "amaç": "Amacımız veri bilimi projelerini sergilemek! 🎯 Projelerimizi keşfetmek ister misin?",
        "hedef": "Hedefimiz en iyi veri analizi projelerini sunmak! 🌟 Görmek ister misin?",
        "misyon": "Misyonumuz veri ile değer yaratmak! 💼 Projelerimizde bunun örneklerini görebilirsin!",

        // Random Ekstra Cevaplar
        "vay": "Vay be! 😲 Projelerimizi gördüğünde daha çok şaşıracaksın!",
        "wow": "Wow! 🤩 Projelerimiz de wow dedirtecek!",
        "oha": "Oha! 😱 Projelerimizi görünce daha da şaşıracaksın!",
        "aman": "Aman tanrım! 😅 Projelerimizi görmek ister misin?",
        "oh": "Oh! 😮 Projelerimize göz atmayı unutma!",
        "aa": "Aa! 😊 Projelerimizi keşfetmeye ne dersin?",
        "ee": "Ee! 😄 Hangi projeleri görmek istersin?",
        "hmm": "Hmm! 🤔 Projelerimizi merak ediyor musun?",
        "peki": "Peki! 😊 Projelerimizi görmek ister misin?",
        "tamam": "Tamam! 👍 Projelerimizi keşfetmeye hazır mısın?",
        "olur": "Olur! 🎉 Projelerimizi görmek ister misin?",
        "tabii": "Tabii ki! 💯 Projelerimizi keşfetmeye ne dersin?",
        "evet": "Evet! 👏 Hangi projeleri görmek istersin?",
        "hayır": "Hayır mı? 😅 Belki projelerimizi görmek istersin?",
        "belki": "Belki mi? 🤔 Projelerimizi görünce kesin evet dersin!",
        "neden": "Neden mi? 💭 Çünkü projelerimiz çok güzel! Görmek ister misin?",
        "nasıl": "Nasıl mı? 🤷‍♂️ Projelerimizi görerek öğrenebilirsin!",
        "ne zaman": "Ne zaman mi? ⏰ Şimdi projelerimizi görmek için mükemmel zaman!",
        "nerede": "Nerede mi? 📍 İşte burada! Projelerimizi keşfet!",
        "kim": "Kim mi? 🤷‍♂️ Ben AI Kardeşim! Ozan'ın projelerini tanıtan asistanıyım!",
        "ne": "Ne mi? 🤔 Projelerimizi görmek ister misin? Hangi alan ilgini çekiyor?",
        "hangi": "Hangi mi? 🎯 Power BI, Python, ML, CNN - hangisini merak ediyorsun?",
        "kaç": "Kaç tane mi? 📊 Bir sürü harika proje var! Görmek ister misin?",

        // İş ve Kariyer
        "iş": "İş fırsatları için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişime</a> geçebilirsin! 💼",
        "kariyer": "Kariyer fırsatları için <a href='https://ozan-mohurcu.github.io/resume.html'>CV'ye</a> göz at! 🚀",
        "işe alım": "İşe alım için <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasından ulaşabilirsin! 📧",
        "freelance": "Freelance projeler için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişime</a> geç! 💻",
        "proje teklifi": "Proje teklifleri için <a href='https://ozan-mohurcu.github.io/contact.html'>buradan</a> ulaşabilirsin! 🤝",
        "işbirliği": "İşbirliği yapmak ister misin? <a href='https://ozan-mohurcu.github.io/contact.html'>İletişime</a> geç! 🤝",
        "maaş": "Maaş konuşmak için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişime</a> geçelim! 💰",
        "ücret": "Ücret bilgisi için <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasından ulaş! 💵",

        // Sosyal Medya ve Takip
        "sosyal medya": "Sosyal medya hesapları için <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasına bak! 📱",
        "instagram": "Instagram için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişim</a> sayfasını ziyaret et! 📸",
        "linkedin": "LinkedIn için <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasından ulaşabilirsin! 💼",
        "github": "GitHub profilini <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasında bulabilirsin! 💻",
        "twitter": "Twitter için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişim</a> bilgilerine bak! 🐦",
        "takip": "Takip etmek için <a href='https://ozan-mohurcu.github.io/contact.html'>sosyal medya</a> hesaplarına göz at! 👥",

        // Öğrenme ve Eğitim
        "nasıl öğrendin": "Eğitim geçmişi için <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasına</a> göz at! 🎓",
        "hangi okul": "Eğitim bilgileri <a href='https://ozan-mohurcu.github.io/resume.html'>CV'de</a> mevcut! 🏫",
        "sertifika": "Sertifikalar için <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasını</a> ziyaret et! 📜",
        "kurs": "Kurs bilgileri <a href='https://ozan-mohurcu.github.io/resume.html'>resume sayfasında!</a> 📚",
        "eğitim": "Eğitim detayları için <a href='https://ozan-mohurcu.github.io/resume.html'>CV'ye</a> bak! 🎓",
        "öğren": "Öğrenmek ister misin? Projelerimizi inceleyerek çok şey öğrenebilirsin! 📖",

        // Proje Beğeni ve Etkileşim
        "beğeni": "Projelerimizi beğenmeyi unutma! ❤️ <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI projelerine</a> göz at!",
        "like": "Don't forget to like our projects! 👍 Check out the <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI projects!</a>",
        "yorum": "Yorum yapmayı unutma! 💬 Projelerimizi görmek ister misin?",
        "puan": "Projelerimize puan vermek ister misin? ⭐ Görmek için tıkla!",
        "değerlendir": "Projelerimizi değerlendirmek ister misin? 📝 Keşfetmeye başla!",

        // Hata ve Sorun
        "hata": "Bir hata mı var? 🔧 <a href='https://ozan-mohurcu.github.io/contact.html'>İletişime</a> geçerek bildirebilirsin!",
        "sorun": "Sorun mu yaşıyorsun? 🚨 <a href='https://ozan-mohurcu.github.io/contact.html'>Buradan</a> yardım alabilirsin!",
        "bug": "Bug mu buldun? 🐛 <a href='https://ozan-mohurcu.github.io/contact.html'>Bildirmek</a> için tıkla!",
        "çalışmıyor": "Çalışmıyor mu? ⚠️ <a href='https://ozan-mohurcu.github.io/contact.html'>İletişim</a> sayfasından bildir!",
        "problem": "Problem mi var? 🤔 <a href='https://ozan-mohurcu.github.io/contact.html'>Yardım</a> için buraya tıkla!",

        // Öneriler ve Fikirler
        "öneri": "Öneriler için teşekkürler! 💡 <a href='https://ozan-mohurcu.github.io/contact.html'>İletişime</a> geçerek paylaşabilirsin!",
        "fikir": "Fikirlerini <a href='https://ozan-mohurcu.github.io/contact.html'>paylaşmak</a> ister misin? 🧠",
        "gelişim": "Gelişim önerilerin var mı? 📈 <a href='https://ozan-mohurcu.github.io/contact.html'>Buradan</a> iletebilirsin!",
        "iyileştirme": "İyileştirme önerileri için <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasını kullan! ⚡",

        // Duygu ve Hisler
        "üzgün": "Üzülme! 😔 Projelerimiz moralini düzeltir. Hangi alanı merak ediyorsun?",
        "mutlu": "Ne güzel! 😄 Mutluluğunu projelerimizle artır! Hangi projeyi görmek istersin?",
        "heyecan": "Heyecanlı mısın? 🎉 Projelerimiz daha da heyecanlandıracak seni!",
        "şaşkın": "Şaşırdın mı? 😲 Projelerimizi görünce daha da şaşıracaksın!",
        "meraklı": "Meraklısın! 🔍 Projelerimizi keşfetmeye başla!",
        "sinirli": "Sinirlenme! 😤 Projelerimiz sakinleştirir seni!",
        "stresli": "Stresli misin? 😰 Projelerimizi inceleyerek rahatlayabilirsin!",

        // Zaman ve Tarih
        "ne zaman başladın": "Bu konuda <a href='https://ozan-mohurcu.github.io/resume.html'>CV sayfasında</a> detaylar var! ⏱️",
        "kaç yıl": "Deneyim süreleri <a href='https://ozan-mohurcu.github.io/resume.html'>CV'de</a> mevcut! 📅",
        "ne zamandan beri": "Ne zamandan beri mi? <a href='https://ozan-mohurcu.github.io/resume.html'>Resume sayfasına</a> bak! 🗓️",
        "geçmiş": "Geçmiş deneyimler için <a href='https://ozan-mohurcu.github.io/resume.html'>CV'yi</a> incele! 📜",

        // Lokasyon ve Yer
        "neredesin": "Ben dijital alemdeyim! 🌐 Ozan ise <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasında lokasyon bilgisi var!",
        "hangi şehir": "Lokasyon bilgisi için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişim</a> sayfasına bak! 🏙️",
        "türkiye": "Türkiye'den mi? 🇹🇷 Harika! Projelerimizi keşfetmeye ne dersin?",
        "istanbul": "İstanbul mu? 🌉 Güzel şehir! Projelerimizi görmek ister misin?",

        // Para ve Fiyat
        "para": "Para konuları için <a href='https://ozan-mohurcu.github.io/contact.html'>iletişime</a> geç! 💰",
        "fiyat": "Fiyat bilgisi için <a href='https://ozan-mohurcu.github.io/contact.html'>contact</a> sayfasından ulaş! 💵",
        "bedava": "Projelerimizi bedava görebilirsin! 🆓 Hangi alanı merak ediyorsun?",
        "ücretsiz": "Ücretsiz mi? 🆓 Projelerimizi görmek ücretsiz! Keşfetmeye başla!",

        // Dil ve İletişim
        "türkçe": "Türkçe konuşuyoruz! 🇹🇷 Projelerimizi Türkçe olarak keşfetmek ister misin?",
        "english": "I can speak English too! 🇺🇸 Would you like to see our projects?",
        "ingilizce": "İngilizce de konuşabiliyorum! 🌍 Projelerimizi görmek ister misin?",

        // Özel Günler ve Kutlamalar
        "doğum günün kutlu olsun": "Teşekkürler! 🎂 Doğum günü hediyesi olarak projelerimizi keşfet!",
        "mutlu yıllar": "Mutlu yıllar! 🎊 Yeni yılda projelerimizi keşfetmeyi unutma!",
        "bayram": "Bayramın kutlu olsun! 🌙 Bayram hediyesi: projelerimizi keşfet!",
        "kutlama": "Ne kutluyoruz? 🎉 Projelerimizi keşfetmeyi kutlayalım!",

        // Yemek ve İçecek
        "kahve": "Kahve içerken projelerimizi incelemek mükemmel! ☕ Hangi projeyi görmek istersin?",
        "çay": "Çay demleyip projelerimizi keşfetmeye ne dersin? 🍵",
        "yemek": "Yemek yerken projelerimize göz atabilirsin! 🍽️",

        // Hava Durumu
        "hava": "Hava nasıl? 🌤️ Güzel havada projelerimizi keşfetmek harika!",
        "yağmur": "Yağmurlu günlerde projelerimizi incelemek süper! 🌧️",
        "güneş": "Güneşli günde projelerimizi görmek ne güzel! ☀️",

        // Spor ve Aktivite
        "spor": "Spor mu? 🏃‍♂️ Spordan sonra projelerimizi keşfet!",
        "futbol": "Futbol seviyorsun! ⚽ Projelerimiz de gol atacak sana!",
        "basket": "Basket mi? 🏀 Projelerimiz de skor yapacak!",

        // Müzik ve Sanat
        "müzik": "Müzik dinlerken projelerimizi incelemek harika! 🎵",
        "sanat": "Sanat seviyorsun! 🎨 Veri sanatımızı görmek ister misin?",
        "film": "Film mi? 🎬 Projelerimiz film gibi etkileyici!",

        // Default/Catch-all responses for unmatched inputs
        "default_responses": [
            "Hmm, o konuda emin değilim ama projelerimizi görmek ister misin? 🤔",
            "İlginç! 😊 Projelerimizi keşfetmeye ne dersin?",
            "Anlıyorum! 💭 Hangi projelerimizi görmek istersin?",
            "Bu konuda projelerimiz yardımcı olabilir! 🚀 Görmek ister misin?",
            "Merak ettim! 🤨 Projelerimizi incelerken daha çok şey öğrenebilirsin!",
            "İlginç bir soru! 🧐 Projelerimizde cevabını bulabilirsin!",
            "Bu konuda konuşabiliriz! 😄 Önce projelerimize göz atar mısın?",
            "Güzel soru! 🌟 Projelerimizi keşfederken birlikte öğrenebiliriz!",
            "Bu beni düşündürttü! 💭 Projelerimizde benzer konular var!",
            "Harika bir konu! ✨ Projelerimizi görmek ister misin?"
        ]
    };

    // Smart response function that handles partial matches and context
    function getSmartResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        
        // Direct match
        if (responses[input]) {
            return responses[input];
        }
        
        // Partial matching for better conversation
        const keys = Object.keys(responses);
        
        // Check for partial matches
        for (let key of keys) {
            if (key !== "default_responses" && (input.includes(key) || key.includes(input))) {
                return responses[key];
            }
        }
        
        // Multi-word matching
        const inputWords = input.split(' ');
        for (let key of keys) {
            if (key !== "default_responses") {
                const keyWords = key.split(' ');
                const matchCount = keyWords.filter(word => inputWords.includes(word)).length;
                if (matchCount > 0 && matchCount >= keyWords.length * 0.5) {
                    return responses[key];
                }
            }
        }
        
        // Context-aware responses based on keywords
        if (input.includes('proje') || input.includes('project')) {
            return "Projelerimizi görmek ister misin? 🚀\n📊 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI</a>\n🐍 <a href='https://ozan-mohurcu.github.io/Python.html'>Python</a>\n🤖 <a href='https://ozan-mohurcu.github.io/ML%20Projects.html'>ML</a>\n👁️ <a href='https://ozan-mohurcu.github.io/ComputerVision.html'>CNN</a>";
        }
        
        if (input.includes('iletişim') || input.includes('contact') || input.includes('ulaş')) {
            return "İletişim için <a href='https://ozan-mohurcu.github.io/contact.html'>buraya tıkla!</a> 📞";
        }
        
        if (input.includes('cv') || input.includes('özgeçmiş') || input.includes('resume')) {
            return "CV için <a href='https://ozan-mohurcu.github.io/resume.html'>buraya tıkla!</a> 📄";
        }
        
        if (input.includes('veri') || input.includes('data') || input.includes('analiz')) {
            return "Veri analizi projelerimiz harika! 📊 Hangi alanı görmek istersin?\n🐍 <a href='https://ozan-mohurcu.github.io/Python.html'>Python</a>\n📈 <a href='https://ozan-mohurcu.github.io/Power%20BI%20Projects.html'>Power BI</a>";
        }
        
        // Return random default response
        const defaultResponses = responses.default_responses;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    function addMessage(text, sender) {
        const msg = document.createElement("div");
        msg.className = `chat-message ${sender}`;
        
        if (sender === "bot") {
            msg.innerHTML = text; // HTML içeriği düzgün gösterilsin
        } else {
            msg.innerText = text; // Kullanıcı mesajı düz metin
        }
    
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    // Welcome message when chat opens
    let welcomeShown = false;
    
    function showWelcomeMessage() {
        if (!welcomeShown) {
            setTimeout(() => {
                addMessage("Merhaba! 👋 Ben AI Kardeşim! Ozan'ın veri bilimi projelerini tanıtmak için buradayım! 🤖\n\nHangi projeleri görmek istersin?\n📊 Power BI\n🐍 Python  \n🤖 ML\n👁️ Computer Vision", "bot");
                welcomeShown = true;
            }, 500);
        }
    }

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value.trim()) {
            const userMsg = input.value.trim();
            addMessage(userMsg, "user");
            
            const reply = getSmartResponse(userMsg);
            setTimeout(() => addMessage(reply, "bot"), 500);
            input.value = "";
        }
    });

    chatIcon.addEventListener("click", () => {
        chatBox.classList.toggle("open");
        if (chatBox.classList.contains("open")) {
            showWelcomeMessage();
            input.focus();
        }
    });

    document.getElementById("close-chat").addEventListener("click", () => {
        chatBox.classList.remove("open");
    });

    // Auto-focus input when chat opens
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (chatBox.classList.contains('open')) {
                    setTimeout(() => input.focus(), 100);
                }
            }
        });
    });
    
    observer.observe(chatBox, { attributes: true });
});