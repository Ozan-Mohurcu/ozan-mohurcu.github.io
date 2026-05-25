/* ============================================================
   Inject premium dark-theme chatbot styles on every page that
   loads this script. Allows chatbot.js to be a drop-in include
   without each page duplicating ~200 lines of CSS.
   ============================================================ */
(function injectChatbotStyles() {
  if (document.getElementById('chatbot-injected-styles')) return;
  const css = `
    :root {
      --cb-bg: #07070a;
      --cb-surface-2: rgba(255, 255, 255, 0.06);
      --cb-border: rgba(255, 255, 255, 0.08);
      --cb-text: #f4f4f5;
      --cb-text-dim: #a1a1aa;
      --cb-text-mute: #71717a;
      --cb-violet: #3b82f6;
      --cb-cyan: #22d3ee;
      --cb-emerald: #10b981;
      --cb-grad: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #22d3ee 100%);
    }
    #chat-icon {
      position: fixed; bottom: 28px; right: 28px;
      width: 82px; height: 82px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 60;
      box-shadow: 0 14px 40px rgba(59,130,246,0.55);
      overflow: hidden;
      border: 2.5px solid rgba(255,255,255,0.18);
      background: var(--cb-grad);
      animation: cb-bob 3.5s ease-in-out infinite;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    #chat-icon:hover {
      transform: scale(1.08);
      box-shadow: 0 18px 48px rgba(59,130,246,0.75);
    }
    #chat-icon .chat-icon-image {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
    }
    @keyframes cb-bob {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-6px); }
    }

    #chat-nudge {
      position: fixed; bottom: 130px; right: 30px;
      max-width: 240px;
      padding: 14px 18px;
      background: rgba(13, 13, 18, 0.92);
      backdrop-filter: blur(20px) saturate(150%);
      -webkit-backdrop-filter: blur(20px) saturate(150%);
      border: 1px solid var(--cb-border);
      border-radius: 16px;
      color: var(--cb-text);
      font-family: 'Inter', system-ui, sans-serif;
      cursor: pointer;
      z-index: 59;
      box-shadow: 0 12px 30px rgba(0,0,0,0.5);
      display: none;
      text-align: left;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    #chat-nudge.show { display: block; opacity: 1; transform: translateY(0); }
    #chat-nudge strong {
      display: block;
      font-size: 0.95rem; font-weight: 700;
      margin-bottom: 4px;
      background: var(--cb-grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    #chat-nudge span {
      display: block;
      font-size: 0.82rem; color: var(--cb-text-dim);
    }

    #chat-box {
      position: fixed; bottom: 130px; right: 30px;
      width: 380px; max-width: calc(100vw - 48px);
      height: 540px; max-height: calc(100vh - 140px);
      background: rgba(13, 13, 18, 0.95);
      backdrop-filter: blur(24px) saturate(160%);
      -webkit-backdrop-filter: blur(24px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      display: none; flex-direction: column;
      z-index: 70;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      overflow: hidden;
      font-family: 'Inter', system-ui, sans-serif;
      color: var(--cb-text);
    }
    #chat-box.open { display: flex; animation: cb-pop 0.3s cubic-bezier(.2,.8,.2,1); }
    @keyframes cb-pop {
      from { opacity: 0; transform: translateY(12px) scale(.97); }
      to   { opacity: 1; transform: translateY(0)    scale(1);   }
    }
    #chat-header {
      padding: 14px 18px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid var(--cb-border);
      background: rgba(255,255,255,0.025);
      font-size: 0.9rem; font-weight: 600;
    }
    #chat-header > div { display: flex; align-items: center; gap: 10px; }
    .chat-status-dot {
      display: inline-block;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--cb-emerald);
      box-shadow: 0 0 10px var(--cb-emerald);
      animation: cb-pulse 2s ease-in-out infinite;
    }
    @keyframes cb-pulse { 50% { opacity: 0.4; } }
    #close-chat {
      background: transparent; border: none;
      color: var(--cb-text-dim);
      font-size: 1.4rem; line-height: 1;
      cursor: pointer; padding: 4px 8px;
      border-radius: 6px;
      transition: background 0.2s, color 0.2s;
    }
    #close-chat:hover { background: var(--cb-surface-2); color: var(--cb-text); }

    #chat-messages {
      flex: 1; overflow-y: auto;
      padding: 16px;
      display: flex; flex-direction: column; gap: 10px;
      font-size: 0.9rem; line-height: 1.5;
    }
    #chat-messages::-webkit-scrollbar { width: 8px; }
    #chat-messages::-webkit-scrollbar-thumb { background: var(--cb-surface-2); border-radius: 4px; }

    #chat-messages .chat-message {
      padding: 10px 14px;
      border-radius: 14px;
      max-width: 85%;
      word-wrap: break-word;
      line-height: 1.5;
    }
    #chat-messages .chat-message.bot {
      background: var(--cb-surface-2);
      border: 1px solid var(--cb-border);
      align-self: flex-start;
      color: var(--cb-text);
      border-bottom-left-radius: 4px;
    }
    #chat-messages .chat-message.user {
      background: var(--cb-grad);
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    #chat-messages .chat-message p { margin: 0 0 6px; }
    #chat-messages .chat-message p:last-child { margin-bottom: 0; }
    #chat-messages .chat-message.typing {
      display: inline-flex; gap: 4px;
      background: var(--cb-surface-2);
      border: 1px solid var(--cb-border);
      padding: 12px 16px;
    }
    #chat-messages .chat-message.typing span {
      width: 6px; height: 6px;
      background: var(--cb-text-dim);
      border-radius: 50%;
      animation: cb-typing 1.2s infinite ease-in-out;
    }
    #chat-messages .chat-message.typing span:nth-child(2) { animation-delay: 0.15s; }
    #chat-messages .chat-message.typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes cb-typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30%           { transform: translateY(-4px); opacity: 1; }
    }

    #chat-messages .chat-suggestions {
      display: flex; flex-wrap: wrap; gap: 6px;
      margin-top: 4px;
      align-self: flex-start;
      max-width: 100%;
    }
    #chat-messages .chat-chip {
      padding: 7px 14px;
      background: var(--cb-surface-2);
      border: 1px solid var(--cb-border);
      border-radius: 999px;
      color: var(--cb-text-dim);
      font-size: 0.78rem;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      line-height: 1;
      transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
      white-space: nowrap;
    }
    #chat-messages .chat-chip:hover {
      background: var(--cb-violet);
      color: white;
      border-color: var(--cb-violet);
      transform: translateY(-1px);
    }
    #chat-messages a { color: var(--cb-cyan); text-decoration: underline; }

    #chat-form {
      display: flex; gap: 8px;
      padding: 12px 14px;
      border-top: 1px solid var(--cb-border);
      background: rgba(255,255,255,0.025);
    }
    #chat-input {
      flex: 1;
      padding: 10px 14px;
      background: #0d0d12;
      border: 1px solid var(--cb-border);
      border-radius: 10px;
      color: var(--cb-text);
      font-family: inherit; font-size: 0.88rem;
      outline: none;
      transition: border-color 0.2s;
    }
    #chat-input:focus { border-color: var(--cb-violet); }
    #chat-send {
      padding: 10px 14px;
      background: var(--cb-grad);
      border: none; border-radius: 10px;
      color: white; font-size: 1rem; cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #chat-send:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(59,130,246,0.4);
    }
  `;
  const style = document.createElement('style');
  style.id = 'chatbot-injected-styles';
  style.textContent = css;
  document.head.appendChild(style);
})();

document.addEventListener("DOMContentLoaded", function () {
    const NAV = {
        resume: { label: "Resume / CV", href: "resume.html" },
        contact: { label: "Contact", href: "contact.html" },
        powerbi: { label: "Power BI Projects", href: "Power%20BI%20Projects.html" },
        python: { label: "Python Projects", href: "Python.html" },
        ml: { label: "Machine Learning Projects", href: "ML%20Projects.html" },
        vision: { label: "Computer Vision / CNN Projects", href: "ComputerVision.html" },
        nlp: { label: "NLP Projects", href: "NLP.html" },
        live: { label: "Live Projects", href: "LiveProjects.html" },
        github: { label: "GitHub", href: "https://github.com/Ozan-Mohurcu" },
        linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/ozanmhrc/" },
        kaggle: { label: "Kaggle", href: "https://www.kaggle.com/analyticaobscura" }
    };

    const AREAS = {
        powerbi: {
            label: "Power BI",
            nav: NAV.powerbi,
            summary: "KPI, operasyon, satış, müşteri ve performans verilerini karar almayı kolaylaştıran dashboardlara dönüştüren çalışmalar.",
            bestFor: "iş zekası, yönetici raporu, dashboard tasarımı ve veri görselleştirme örnekleri",
            keywords: ["power bi", "powerbi", "dashboard", "pano", "rapor", "görselleştirme", "gorsellestirme", "bi", "kpi", "business intelligence", "satış", "satis"],
            projects: [
                "Nijerya Araba Pazarı",
                "Kahve Satış Panosu",
                "Akıllı Saat Performans İzleyici",
                "Araç Satış Gösterge Paneli",
                "Global Süpermarket Projesi",
                "Washington D.C. Suçları",
                "Titanic Yolcu Analizi",
                "Operasyon ve Lojistik Performans Dashboard'u",
                "Mobil Uygulama Performans ve Analiz Dashboard'u",
                "İnsan Kaynakları Performans ve Analiz Dashboard'u",
                "Havayolu Gecikme ve Operasyon Analizi Dashboard'u"
            ]
        },
        python: {
            label: "Python EDA",
            nav: NAV.python,
            summary: "Pandas, görselleştirme ve keşifsel veri analizi ile ham veriden anlamlı içgörü çıkaran projeler.",
            bestFor: "EDA, veri temizleme, istatistiksel keşif ve Python analitik akışı",
            keywords: ["python", "pandas", "eda", "matplotlib", "seaborn", "analiz", "analysis", "veri analizi", "keşif", "kesif"],
            projects: [
                "Araba Performansı ve Analizi",
                "İnme Analizi",
                "Dizüstü Bilgisayar Fiyat Analizi",
                "Bisiklet Paylaşımı Analizi",
                "Diyabet Analizi",
                "Uyku Sağlığı Analizi",
                "Netflix Trend Analizi",
                "Öğrenci Performans Analizi",
                "Süpermarket Analizi",
                "Sağlık Harcamaları Analizi",
                "Gayrimenkul Analizi"
            ]
        },
        ml: {
            label: "Machine Learning",
            nav: NAV.ml,
            summary: "Sınıflandırma, regresyon, segmentasyon, AutoML ve model yorumlanabilirliği odaklı makine öğrenmesi projeleri.",
            bestFor: "tahmin modelleri, Kaggle tarzı modelleme, feature engineering ve model kıyaslama",
            keywords: ["machine learning", "ml", "makine öğrenmesi", "makine ogrenmesi", "model", "tahmin", "classification", "regression", "xgboost", "lightgbm", "catboost", "scikit", "automl"],
            projects: [
                "İNG HUB DATATHON 2025",
                "Bank Marketing EDA + Stacking",
                "E-Ticaret RFM-Churn Analiz",
                "Kaggle Winner: Smoker Prediction",
                "Breast Cancer Classification",
                "Calories Burned Prediction - AutoML",
                "RFM ve Kümeleme ile Müşteri Segmentasyonu",
                "Body Measurement Prediction",
                "Medical Cost Prediction",
                "Fertilizer Recommendation System",
                "Introvert & Extrovert"
            ]
        },
        vision: {
            label: "Computer Vision / CNN",
            nav: NAV.vision,
            summary: "Görüntü verisi, CNN mimarileri ve gerçek zamanlı risk tahmini üzerine yoğunlaşan projeler.",
            bestFor: "deep learning, görüntü işleme, sınıflandırma ve gerçek zamanlı görsel AI örnekleri",
            keywords: ["computer vision", "cnn", "görüntü", "goruntu", "görüntü işleme", "goruntu isleme", "deep learning", "keras", "tensorflow", "opencv", "sinir ağı", "sinir agi", "trafik", "mobese", "kedi", "köpek", "kopek", "patates"],
            projects: [
                "Gerçek Zamanlı Trafik Tehlike Tahmin Sistemi",
                "CNN ile Kedi ve Köpek Sınıflandırması",
                "Patates Yaprak Hastalığı Sınıflandırması"
            ]
        },
        nlp: {
            label: "NLP",
            nav: NAV.nlp,
            summary: "Metin verisini anlamlandırma, sosyal medya yorumları ve konu/duygu analizi üzerine doğal dil işleme çalışmaları.",
            bestFor: "yorum analizi, sosyal medya metinleri, text mining ve doğal dil işleme",
            keywords: ["nlp", "natural language", "doğal dil", "dogal dil", "metin", "text", "tweet", "reddit", "yorum", "duygu", "sentiment"],
            projects: [
                "Türkiye Sağlık Turizmi NLP Analizi Reddit Yorumları",
                "Yangın Tweet'leri Üzerine NLP Analizi"
            ]
        },
        live: {
            label: "Live Projects",
            nav: NAV.live,
            summary: "Kullanılabilir uygulama formatında hazırlanmış, doğrudan denenebilen AI ve veri ürünleri.",
            bestFor: "işe alım demo etkisi, canlı uygulama deneyimi ve ürünleşmiş veri bilimi örnekleri",
            keywords: ["live", "canlı", "canli", "uygulama", "app", "demo", "ats", "mülakat", "mulakat", "kripto", "istatistik", "konut", "hype"],
            projects: [
                "Otomatik Kripto Hype Analiz Sistemi",
                "Yapay Zeka Destekli CV ATS Tarayıcı",
                "Data Science Mülakat Simülatörü",
                "StatistikLab - Visual Statistics Discovery Tool",
                "Türkiye'de Konut Fiyatları"
            ]
        }
    };

    const QUICK_REPLIES = [
        { label: "Projeleri Göster", value: "Projeleri göster" },
        { label: "Bana Proje Öner", value: "Hangi projeden başlamalıyım?" },
        { label: "Yetenekler", value: "Ozan hangi teknolojileri kullanıyor?" },
        { label: "İletişim", value: "Ozan ile nasıl iletişime geçebilirim?" }
    ];

    const state = {
        lastIntent: null,
        lastTopic: null,
        turnCount: 0,
        expectingUserMood: false,
        userMood: null
    };

    const chatIcon = prepareChatIcon();
    const chatBox = prepareChatBox();
    const chatNudge = prepareChatNudge();
    const messages = document.getElementById("chat-messages");
    const input = document.getElementById("chat-input");
    const form = document.getElementById("chat-form");
    const closeButton = document.getElementById("close-chat");
    let welcomeShown = false;
    let nudgeShown = false;
    let nudgeTimer = null;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        handleUserMessage(input.value);
    });

    chatIcon.addEventListener("click", function () {
        chatBox.classList.toggle("open");
        chatIcon.setAttribute("aria-expanded", chatBox.classList.contains("open") ? "true" : "false");
        hideChatNudge();

        if (chatBox.classList.contains("open")) {
            showWelcomeMessage();
            setTimeout(function () {
                input.focus();
            }, 100);
        }
    });

    chatIcon.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            chatIcon.click();
        }
    });

    closeButton.addEventListener("click", function () {
        chatBox.classList.remove("open");
        chatIcon.setAttribute("aria-expanded", "false");
    });

    chatNudge.addEventListener("click", function () {
        if (!chatBox.classList.contains("open")) {
            chatIcon.click();
        }
    });

    showChatNudge();

    function prepareChatIcon() {
        let icon = document.getElementById("chat-icon");

        if (!icon) {
            icon = document.createElement("div");
            icon.id = "chat-icon";
            document.body.appendChild(icon);
        }

        icon.setAttribute("aria-label", "Ozan AI asistanını aç");
        icon.setAttribute("aria-expanded", "false");
        icon.setAttribute("role", "button");
        icon.setAttribute("tabindex", "0");
        icon.innerHTML = "<img class=\"chat-icon-image\" src=\"Graident%20Ai%20Robot.jpg\" alt=\"\" aria-hidden=\"true\" />";

        return icon;
    }

    function prepareChatNudge() {
        let nudge = document.getElementById("chat-nudge");

        if (!nudge) {
            nudge = document.createElement("button");
            nudge.id = "chat-nudge";
            nudge.type = "button";
            document.body.appendChild(nudge);
        }

        nudge.innerHTML = "<strong>Merhaba!</strong><span>Nasıl yardımcı olabilirim?</span>";
        nudge.setAttribute("aria-label", "Ozan AI asistanından karşılama bildirimi");

        return nudge;
    }

    function prepareChatBox() {
        let box = document.getElementById("chat-box");

        if (!box) {
            box = document.createElement("section");
            box.id = "chat-box";
            document.body.appendChild(box);
        }

        box.setAttribute("aria-label", "Ozan portfolio chatbot");
        box.innerHTML = `
            <div id="chat-header">
                <div>
                    <span class="chat-status-dot" aria-hidden="true"></span>
                    <span>Ozan AI Asistan</span>
                </div>
                <button id="close-chat" type="button" aria-label="Sohbeti kapat">×</button>
            </div>
            <div id="chat-messages" aria-live="polite"></div>
            <form id="chat-form" autocomplete="off">
                <input type="text" id="chat-input" placeholder="Projeler, CV veya iletişim hakkında sor..." aria-label="Mesaj yaz" />
                <button id="chat-send" type="submit" aria-label="Mesaj gönder">➤</button>
            </form>
        `;

        return box;
    }

    function showWelcomeMessage() {
        if (welcomeShown) return;

        setTimeout(function () {
            addBotMessage({
                html: `
                    <p>Merhaba, ben Ozan'ın portfolio asistanıyım. Önce ne aradığını anlamaya çalışırım; sonra seni en doğru projeye, CV'ye veya iletişim bağlantısına yönlendiririm.</p>
                    <p>İstersen “Power BI projeleri”, “Machine Learning örnekleri”, “canlı uygulamalar” ya da sadece “biraz sohbet edelim” diye yazabilirsin.</p>
                `,
                suggestions: QUICK_REPLIES
            });
            welcomeShown = true;
        }, 350);
    }

    function showChatNudge() {
        if (nudgeShown || welcomeShown || chatBox.classList.contains("open")) return;

        chatNudge.classList.add("show");
        nudgeShown = true;

        nudgeTimer = setTimeout(hideChatNudge, 10000);
    }

    function hideChatNudge() {
        chatNudge.classList.remove("show");
        if (nudgeTimer) {
            clearTimeout(nudgeTimer);
            nudgeTimer = null;
        }
    }

    function handleUserMessage(rawValue) {
        const value = rawValue.trim();
        if (!value) return;

        clearSuggestions();
        addMessage(value, "user");
        input.value = "";

        const answer = getSmartResponse(value);
        showTyping(function () {
            addBotMessage(answer);
        });
    }

    function getSmartResponse(userInput) {
        const parsed = parse(userInput);
        state.turnCount += 1;
        const intent = detectIntent(parsed);

        if (intent === "ask-back") {
            return askBackResponse();
        }

        if (intent === "conversation") {
            return conversationResponse();
        }

        if (intent === "feedback") {
            return feedbackResponse();
        }

        if (state.expectingUserMood && ["mood-positive", "mood-negative", "mood-busy"].includes(intent)) {
            return moodFollowUpResponse(intent);
        }

        if (isPositiveFollowUp(parsed)) {
            if (state.lastTopic && AREAS[state.lastTopic]) {
                return areaResponse(state.lastTopic, true);
            }

            return overviewResponse("Harika. Ozan'ın portfolyosunu en hızlı şu başlıklardan gezebilirsin:");
        }

        if (isNegativeFollowUp(parsed)) {
            state.lastIntent = "clarify";
            return {
                html: "<p>Sorun değil. O zaman ne aradığını birlikte netleştirelim: proje örnekleri mi, teknik yetenekler mi, CV mi, yoksa iletişim bilgileri mi?</p>",
                suggestions: [
                    { label: "Projeler", value: "Projeler" },
                    { label: "Yetenekler", value: "Yetenekler" },
                    { label: "CV", value: "CV" },
                    { label: "İletişim", value: "İletişim" }
                ]
            };
        }

        const projectMatch = detectProject(parsed);
        if (projectMatch) {
            state.lastIntent = "project-detail";
            state.lastTopic = projectMatch.areaKey;

            return {
                html: `
                    <p><strong>${projectMatch.project}</strong> projesi ${AREAS[projectMatch.areaKey].label} tarafında yer alıyor.</p>
                    <p>Bu başlık Ozan'ın ${AREAS[projectMatch.areaKey].bestFor} konusundaki yaklaşımını görmek için iyi bir örnek.</p>
                    ${linkList([AREAS[projectMatch.areaKey].nav])}
                `,
                suggestions: topicSuggestions(projectMatch.areaKey)
            };
        }

        const areaKey = detectArea(parsed);

        if (areaKey && ["projects", "recommend", "help", "unknown"].includes(intent)) {
            return areaResponse(areaKey, false);
        }

        switch (intent) {
            case "greeting":
                state.lastIntent = "greeting";
                state.expectingUserMood = false;
                return {
                    html: pick([
                        "<p>Merhaba. Ben buradayım; ister sohbet ederek ilerleyelim, ister direkt Ozan'ın projelerine geçelim. Sen nasıl bir şey arıyorsun?</p>",
                        "<p>Selam. Önce hal hatır mı yapalım, yoksa portfolyoda hızlı bir tur mu atalım? Power BI, Python, ML, NLP/CV ve canlı uygulamalar tarafını gösterebilirim.</p>"
                    ]),
                    suggestions: QUICK_REPLIES
                };

            case "wellbeing":
                state.lastIntent = "small-talk";
                state.expectingUserMood = true;
                return {
                    html: "<p>İyiyim, teşekkür ederim. Sorduğun iyi oldu. Sen nasılsın, günün nasıl gidiyor?</p><p>İstersen önce biraz sohbet ederiz; sonra Ozan'ın projelerine beraber geçeriz.</p>",
                    suggestions: [
                        { label: "İyiyim", value: "İyiyim" },
                        { label: "Yorgunum", value: "Yorgunum" },
                        { label: "Biraz Sohbet", value: "Biraz sohbet edelim" },
                        { label: "Projeler", value: "Projeler" }
                    ]
                };

            case "ask-back":
                return askBackResponse();

            case "conversation":
                return conversationResponse();

            case "feedback":
                return feedbackResponse();

            case "mood-positive":
                state.lastIntent = "small-talk";
                state.userMood = "positive";
                state.expectingUserMood = false;
                return {
                    html: "<p>Güzel, sevindim. O zaman seni yormadan iyi bir rota çizeyim: canlı uygulamalar ürün hissini, ML projeleri modelleme gücünü, Power BI projeleri de iş tarafını iyi gösteriyor.</p><p>Hangisinden başlayalım?</p>",
                    suggestions: [
                        { label: "Canlı Projeler", value: "Canlı projeler" },
                        { label: "ML Projeleri", value: "ML projeleri" },
                        { label: "Power BI", value: "Power BI projeleri" }
                    ]
                };

            case "mood-negative":
                state.lastIntent = "small-talk";
                state.userMood = "negative";
                state.expectingUserMood = false;
                return {
                    html: "<p>Anladım. O zaman acele etmeyelim. İstersen kısa ve yormayan bir tur yaparız; sana sadece en net başlangıç noktalarını öneririm.</p><p>Bugün kafanı dağıtmak için canlı projeler iyi olabilir, daha profesyonel bakmak istersen CV veya ML tarafına geçebiliriz.</p>",
                    suggestions: [
                        { label: "Bana Öner", value: "Hangi projeden başlamalıyım?" },
                        { label: "Canlı Projeler", value: "Canlı projeler" },
                        { label: "CV", value: "CV" }
                    ]
                };

            case "mood-busy":
                state.lastIntent = "small-talk";
                state.userMood = "busy";
                state.expectingUserMood = false;
                return {
                    html: "<p>Anladım, vaktini uzatmayayım. Sana en kısa rotayı vereyim: hızlı etki için Live Projects, teknik derinlik için ML Projects, genel geçmiş için CV.</p>",
                    suggestions: [
                        { label: "Live Projects", value: "Canlı projeler" },
                        { label: "ML Projects", value: "ML projeleri" },
                        { label: "CV", value: "CV" }
                    ]
                };

            case "identity":
                state.lastIntent = "identity";
                return {
                    html: "<p>Ben Ozan'ın portfolio asistanıyım. Bu sitedeki projeleri, teknik yetenekleri, CV sayfasını ve iletişim kanallarını daha hızlı bulman için tasarlandım.</p><p>Canlı bir genel internet botu değilim; odağım Ozan'ın çalışmalarını net ve kısa şekilde anlatmak.</p>",
                    suggestions: QUICK_REPLIES
                };

            case "about":
                state.lastIntent = "about";
                return aboutResponse();

            case "projects":
                return overviewResponse("Ozan'ın projeleri birkaç güçlü alana ayrılıyor:");

            case "recommend":
                state.lastIntent = "recommend";
                return recommendationResponse();

            case "skills":
                state.lastIntent = "skills";
                return skillsResponse();

            case "experience":
                state.lastIntent = "experience";
                return {
                    html: `
                        <p>Ozan'ın deneyimi veri analizi, data science, otomasyon, RAG tabanlı chatbotlar ve agentic AI sistemleri etrafında şekilleniyor.</p>
                        <p>Detaylı rol geçmişi, eğitim ve sertifikalar için CV sayfası en doğru kaynak.</p>
                        ${linkList([NAV.resume])}
                    `,
                    suggestions: [
                        { label: "Yetenekleri Aç", value: "Teknik yetenekler" },
                        { label: "İletişim", value: "İletişim" },
                        { label: "Projeler", value: "Projeler" }
                    ]
                };

            case "resume":
                state.lastIntent = "resume";
                return {
                    html: `<p>CV, deneyim, eğitim, teknik yetenekler ve sertifikaları tek yerde görmek için buradan ilerleyebilirsin.</p>${linkList([NAV.resume])}`,
                    suggestions: [
                        { label: "Yetenekler", value: "Yetenekler" },
                        { label: "Deneyim", value: "Deneyim" },
                        { label: "İletişim", value: "İletişim" }
                    ]
                };

            case "contact":
                state.lastIntent = "contact";
                return contactResponse();

            case "hire":
                state.lastIntent = "hire";
                return {
                    html: `
                        <p>İş birliği veya işe alım için en iyi akış şu olur: önce CV'yi incele, ardından canlı projeler ve en ilgili proje kategorisine bak, sonra contact sayfasından Ozan'a ulaş.</p>
                        ${linkList([NAV.resume, NAV.live, NAV.contact])}
                    `,
                    suggestions: [
                        { label: "Canlı Projeler", value: "Canlı projeler" },
                        { label: "ML Projeleri", value: "ML projeleri" },
                        { label: "Power BI", value: "Power BI projeleri" }
                    ]
                };

            case "social":
                state.lastIntent = "social";
                return {
                    html: `<p>Ozan'ın sosyal ve profesyonel profillerine buradan ulaşabilirsin.</p>${linkList([NAV.linkedin, NAV.github, NAV.kaggle])}`,
                    suggestions: QUICK_REPLIES
                };

            case "thanks":
                state.lastIntent = "thanks";
                return {
                    html: pick([
                        "<p>Rica ederim. İstersen şimdi portfolyonun en güçlü projelerini birlikte seçebiliriz.</p>",
                        "<p>Ne demek. Başka bir başlık için buradayım: projeler, CV, yetenekler veya iletişim.</p>"
                    ]),
                    suggestions: QUICK_REPLIES
                };

            case "goodbye":
                state.lastIntent = "goodbye";
                return {
                    html: "<p>Görüşmek üzere. Portfolyoda kaldığın yerden devam etmek istersen yine buradayım.</p>",
                    suggestions: []
                };

            case "joke":
                state.lastIntent = "joke";
                return {
                    html: "<p>Kısa bir veri şakası: Model çok özgüvenliydi, sonra test setini görünce gerçek hayatla tanıştı.</p><p>Şakayı geçersek, modelleme tarafını görmek için ML projeleri iyi bir başlangıç.</p>",
                    suggestions: [
                        { label: "ML Projeleri", value: "ML projeleri" },
                        { label: "Canlı Projeler", value: "Canlı projeler" }
                    ]
                };

            case "site":
                state.lastIntent = "site";
                return {
                    html: "<p>Bu site Ozan'ın resmi portfolio alanı gibi çalışıyor: veri analizi, dashboard, makine öğrenmesi, NLP, computer vision ve canlı AI uygulamalarını tek yerde topluyor.</p><p>Amacı, ziyaretçinin Ozan'ın teknik kapsamını hızlıca anlaması ve doğru projeye yönlenmesi.</p>",
                    suggestions: QUICK_REPLIES
                };

            case "personal":
                state.lastIntent = "personal";
                return {
                    html: "<p>Ben kişisel hayatı olan bir karakterden çok, bu portfolyoyu anlatmak için tasarlanmış bir asistansım. En iyi olduğum konu Ozan'ın projelerini, CV'sini ve iletişim kanallarını hızlıca buldurmak.</p>",
                    suggestions: QUICK_REPLIES
                };

            case "english":
                state.lastIntent = "english";
                return {
                    html: "<p>Yes, I can guide visitors in English too. I can summarize Ozan's projects, skills, resume, contact links, and recommend the most relevant portfolio section.</p>",
                    suggestions: [
                        { label: "Show Projects", value: "Show projects" },
                        { label: "Contact", value: "Contact" },
                        { label: "Resume", value: "Resume" }
                    ]
                };

            case "help":
                state.lastIntent = "help";
                return helpResponse();

            default:
                if (areaKey) {
                    return areaResponse(areaKey, false);
                }

                state.lastIntent = "unknown";
                return fallbackResponse(parsed);
        }
    }

    function areaResponse(areaKey, detailed) {
        const area = AREAS[areaKey];
        state.lastIntent = "area";
        state.lastTopic = areaKey;

        const projects = detailed ? area.projects : area.projects.slice(0, 4);
        const extra = detailed
            ? "<p>Bu bölümdeki proje kartları üzerinden kullanılan veri, amaç ve çıktı yapısını inceleyebilirsin.</p>"
            : "<p>Daha fazla detay istersen “detay” yaz; bu kategorideki örnekleri biraz daha açarım.</p>";

        return {
            html: `
                <p><strong>${area.label}</strong> tarafında ${area.summary}</p>
                <p>Bu alan özellikle ${area.bestFor} görmek isteyenler için iyi.</p>
                ${projectBullets(projects)}
                ${extra}
                ${linkList([area.nav])}
            `,
            suggestions: topicSuggestions(areaKey)
        };
    }

    function overviewResponse(intro) {
        state.lastIntent = "projects";
        state.lastTopic = null;

        return {
            html: `
                <p>${intro}</p>
                <ul>
                    <li><strong>Power BI:</strong> dashboard ve yönetici raporları.</li>
                    <li><strong>Python:</strong> EDA, veri temizleme ve analitik keşif.</li>
                    <li><strong>Machine Learning:</strong> tahmin, sınıflandırma ve segmentasyon.</li>
                    <li><strong>Computer Vision / NLP:</strong> görüntü ve metin odaklı AI projeleri.</li>
                    <li><strong>Live Projects:</strong> doğrudan denenebilen uygulamalar.</li>
                </ul>
                ${linkList([NAV.powerbi, NAV.python, NAV.ml, NAV.vision, NAV.nlp, NAV.live])}
            `,
            suggestions: [
                { label: "Power BI", value: "Power BI projeleri" },
                { label: "Machine Learning", value: "Machine Learning projeleri" },
                { label: "Live Projects", value: "Canlı projeler" },
                { label: "Bana Öner", value: "Hangi projeden başlamalıyım?" }
            ]
        };
    }

    function recommendationResponse() {
        state.lastTopic = null;

        return {
            html: `
                <p>İlk izlenim için üç yerden başlamanı öneririm:</p>
                <ul>
                    <li><strong>Live Projects:</strong> Ozan'ın işleri uygulama deneyimine dönüştürme gücünü gösterir.</li>
                    <li><strong>Machine Learning:</strong> modelleme, feature engineering ve performans kıyaslama tarafını anlatır.</li>
                    <li><strong>Power BI:</strong> veriyi karar vericiye anlaşılır dashboard olarak sunma yeteneğini gösterir.</li>
                </ul>
                ${linkList([NAV.live, NAV.ml, NAV.powerbi])}
            `,
            suggestions: [
                { label: "Live Projects", value: "Canlı projeler" },
                { label: "ML Projeleri", value: "ML projeleri" },
                { label: "Power BI", value: "Power BI projeleri" },
                { label: "İletişim", value: "İletişim" }
            ]
        };
    }

    function skillsResponse() {
        return {
            html: `
                <p>Ozan'ın teknik odağı veri analizi ve AI üretimi etrafında toplanıyor:</p>
                <ul>
                    <li><strong>Analiz:</strong> Python, SQL, Pandas, NumPy, veri temizleme ve EDA.</li>
                    <li><strong>Görselleştirme:</strong> Power BI, dashboard tasarımı, KPI ve raporlama.</li>
                    <li><strong>AI/ML:</strong> scikit-learn, XGBoost, LightGBM, CatBoost, TensorFlow/Keras.</li>
                    <li><strong>NLP & CV:</strong> metin analizi, CNN, görüntü sınıflandırma ve deep learning.</li>
                    <li><strong>Ürünleşme:</strong> RAG tabanlı chatbotlar, agentic AI ve otomasyon.</li>
                </ul>
                ${linkList([NAV.resume, NAV.ml, NAV.live])}
            `,
            suggestions: [
                { label: "CV", value: "CV" },
                { label: "ML Projeleri", value: "ML projeleri" },
                { label: "Canlı Projeler", value: "Canlı projeler" }
            ]
        };
    }

    function aboutResponse() {
        return {
            html: `
                <p>Ozan, veri analizi ve veri bilimi alanında çalışan; veriyi dashboard, model, otomasyon ve AI uygulamasına dönüştürmeye odaklanan bir profesyonel.</p>
                <p>Portfolyoda Power BI raporları, Python EDA çalışmaları, makine öğrenmesi modelleri, NLP/CV projeleri ve canlı AI uygulamaları bulunuyor.</p>
                ${linkList([NAV.resume, NAV.live, NAV.contact])}
            `,
            suggestions: [
                { label: "Projeler", value: "Projeler" },
                { label: "Yetenekler", value: "Yetenekler" },
                { label: "İletişim", value: "İletişim" }
            ]
        };
    }

    function contactResponse() {
        return {
            html: `
                <p>Ozan ile iletişim kurmak, iş birliği konuşmak veya profesyonel profillerine ulaşmak için contact sayfasını kullanabilirsin.</p>
                ${linkList([NAV.contact, NAV.linkedin, NAV.github, NAV.kaggle])}
            `,
            suggestions: [
                { label: "CV", value: "CV" },
                { label: "Canlı Projeler", value: "Canlı projeler" },
                { label: "Projeler", value: "Projeler" }
            ]
        };
    }

    function helpResponse() {
        return {
            html: `
                <p>Şunları sorabilirsin:</p>
                <ul>
                    <li>“Hangi projeden başlamalıyım?”</li>
                    <li>“Power BI projelerini göster.”</li>
                    <li>“Ozan hangi teknolojileri kullanıyor?”</li>
                    <li>“CV ve iletişim bilgilerini ver.”</li>
                    <li>“Canlı uygulamalar var mı?”</li>
                </ul>
            `,
            suggestions: QUICK_REPLIES
        };
    }

    function askBackResponse() {
        state.lastIntent = "small-talk";
        state.expectingUserMood = true;

        return {
            html: "<p>Haklısın, burada fazla hızlı portfolyoya bağladım. Tabii ki sorayım: sen nasılsın?</p><p>Günün nasıl geçiyor; iyi misin, yoğun musun, biraz mı yoruldun?</p>",
            suggestions: [
                { label: "İyiyim", value: "İyiyim" },
                { label: "Yorgunum", value: "Yorgunum" },
                { label: "Yoğunum", value: "Yoğunum" },
                { label: "Keyfim Yerinde", value: "Keyfim yerinde" }
            ]
        };
    }

    function conversationResponse() {
        state.lastIntent = "small-talk";
        state.expectingUserMood = true;

        return {
            html: "<p>Olur, biraz sohbet edelim. Ben portfolyo asistanıyım ama sadece link veren kuru bir menü gibi davranmak zorunda değilim.</p><p>Önce senden başlayalım: bugün nasıl gidiyor?</p>",
            suggestions: [
                { label: "İyi Gidiyor", value: "İyi gidiyor" },
                { label: "Yorucu", value: "Yorucu" },
                { label: "Projeye Bakalım", value: "Projeye bakalım" },
                { label: "CV", value: "CV" }
            ]
        };
    }

    function feedbackResponse() {
        state.lastIntent = "feedback";
        state.expectingUserMood = false;

        return {
            html: "<p>Haklı olabilirsin. Eğer cevabım fazla mekanik geldiyse toparlayayım: önce ne demek istediğini anlamaya çalışacağım, sonra gerekiyorsa portfolyoya bağlayacağım.</p><p>İstersen son söylediğini biraz daha doğal şekilde yanıtlayayım; istersen direkt projelerden devam edelim.</p>",
            suggestions: [
                { label: "Sohbet Edelim", value: "Biraz sohbet edelim" },
                { label: "Projeler", value: "Projeler" },
                { label: "Yetenekler", value: "Yetenekler" },
                { label: "İletişim", value: "İletişim" }
            ]
        };
    }

    function moodFollowUpResponse(intent) {
        state.lastIntent = "small-talk";
        state.expectingUserMood = false;

        if (intent === "mood-positive") {
            state.userMood = "positive";
            return {
                html: "<p>İyi olmana sevindim. O zaman enerjiyi bozmadan güzel bir rota seçelim.</p><p>İstersen sana Ozan'ın portfolyosunda en güçlü görünen üç alanı önereyim; istersen direkt ilgini çeken bölüme geçelim.</p>",
                suggestions: [
                    { label: "En İyi Rota", value: "Hangi projeden başlamalıyım?" },
                    { label: "Canlı Projeler", value: "Canlı projeler" },
                    { label: "ML Projeleri", value: "ML projeleri" },
                    { label: "Power BI", value: "Power BI projeleri" }
                ]
            };
        }

        if (intent === "mood-busy") {
            state.userMood = "busy";
            return {
                html: "<p>Tamam, kısa keseyim. Vaktin azsa en mantıklı sıra şu: önce Live Projects, sonra CV, sonra ilgine göre ML veya Power BI.</p>",
                suggestions: [
                    { label: "Live Projects", value: "Canlı projeler" },
                    { label: "CV", value: "CV" },
                    { label: "ML", value: "ML projeleri" },
                    { label: "Power BI", value: "Power BI projeleri" }
                ]
            };
        }

        state.userMood = "negative";
        return {
            html: "<p>Üzüldüm. O zaman seni bilgiye boğmadan, kısa ve sakin ilerleyeyim.</p><p>İstersen sadece tek bir iyi başlangıç noktası önereyim: canlı projeler, portfolyonun en hızlı anlaşılır kısmı.</p>",
            suggestions: [
                { label: "Canlı Projeler", value: "Canlı projeler" },
                { label: "Kısa Öneri", value: "Hangi projeden başlamalıyım?" },
                { label: "Sohbet", value: "Biraz sohbet edelim" },
                { label: "Sonra Bakalım", value: "Sonra bakalım" }
            ]
        };
    }

    function fallbackResponse(parsed) {
        if (looksLikeGeneralWebQuestion(parsed)) {
            return {
                html: "<p>Bu sohbet canlı internete bağlı genel bir arama motoru gibi çalışmıyor. Ama Ozan'ın portfolyosu içinde proje, CV, yetenek ve iletişim konularında seni net şekilde yönlendirebilirim.</p>",
                suggestions: QUICK_REPLIES
            };
        }

        if (state.expectingUserMood) {
            return {
                html: "<p>Seni tam anlayamadım ama merak ettiğim şey şu: şu an nasılsın?</p><p>İstersen tek kelimeyle bile yazabilirsin: iyi, yorgun, yoğun, meraklı... Ben ona göre tempoyu ayarlarım.</p>",
                suggestions: [
                    { label: "İyiyim", value: "İyiyim" },
                    { label: "Yorgunum", value: "Yorgunum" },
                    { label: "Meraklıyım", value: "Meraklıyım" },
                    { label: "Projeler", value: "Projeler" }
                ]
            };
        }

        return {
            html: pick([
                "<p>Bunu tam yakalayamadım ama burada kalabiliriz; istersen cümleni başka şekilde yaz, ben anlamaya çalışayım.</p><p>Portfolyo tarafında da projeler, CV, yetenekler veya iletişim için hızlıca yönlendirebilirim.</p>",
                "<p>Sanırım ne demek istediğini kaçırdım. Biraz daha açarsan daha iyi cevap veririm.</p><p>Bu arada Ozan'ın projeleri, teknik yetenekleri veya iletişim bilgileri için de yardımcı olabilirim.</p>",
                "<p>Bir adım geri alayım: sohbet mi etmek istiyorsun, yoksa portfolyoda belli bir yeri mi arıyorsun?</p>"
            ]),
            suggestions: QUICK_REPLIES
        };
    }

    function detectIntent(parsed) {
        const intents = [
            { name: "greeting", phrases: ["merhaba", "selam", "selamlar", "slm", "mrb", "meraba", "hi", "hello", "hey", "günaydın", "iyi akşamlar", "iyi geceler", "sa"] },
            { name: "wellbeing", phrases: ["nasılsın", "naber", "nbr", "ne haber", "nasıl gidiyor", "napıyorsun", "ne yapıyorsun", "how are you"] },
            { name: "ask-back", phrases: ["ben nasılım", "ben nasilim", "bana sormayacak mısın", "bana sormayacak misin", "sormayacak mısın", "sormayacak misin", "beni merak etmiyor musun", "bana da sor", "ya ben", "beni sormadın", "beni sormadin"] },
            { name: "conversation", phrases: ["sohbet edelim", "konuşalım", "konusalim", "muhabbet edelim", "biraz sohbet", "benimle konuş", "benimle konus", "sadece sohbet", "laflayalım", "laflayalim"] },
            { name: "feedback", phrases: ["robot gibi", "çok mekanik", "cok mekanik", "daha akıllı", "daha akilli", "daha doğal", "daha dogal", "anlamadın", "anlamadin", "mantıksız", "mantiksiz", "kötü cevap", "kotu cevap", "yanlış anladın", "yanlis anladin"] },
            { name: "mood-positive", phrases: ["iyiyim", "iyi hissediyorum", "iyi gidiyor", "keyfim yerinde", "harika", "süper", "super", "mutluyum", "çok iyi", "cok iyi", "beğendim", "begendim", "meraklıyım", "merakliyim"] },
            { name: "mood-busy", phrases: ["yoğunum", "yogunum", "meşgulüm", "mesgulum", "vaktim az", "acelem var", "hızlı olsun", "hizli olsun", "kısa kes", "kisa kes"] },
            { name: "mood-negative", phrases: ["kötüyüm", "kotuyum", "kötü hissediyorum", "kotu hissediyorum", "yorgunum", "yoruldum", "yorucu", "sıkıldım", "sikildim", "üzgünüm", "uzgunum", "stresliyim", "moralim bozuk"] },
            { name: "identity", phrases: ["sen kimsin", "kimsin", "bot musun", "asistan mısın", "ne işe yarıyorsun", "görevin ne", "ne yapabilirsin"] },
            { name: "about", phrases: ["ozan kim", "ozan kimdir", "ozan hakkında", "site sahibi", "sahibi kim", "hakkında bilgi"] },
            { name: "site", phrases: ["site hakkında", "site ne", "bu site", "amaç", "amacı ne", "hedef", "misyon"] },
            { name: "projects", phrases: ["projeler", "proje", "project", "portfolio", "çalışmalar", "calismalar", "neler var", "göster", "goster"] },
            { name: "recommend", phrases: ["öner", "oner", "tavsiye", "hangisinden başlayayım", "nereden başlayayım", "en iyi", "öne çıkan", "one cikan", "hangi proje", "başlamalıyım", "baslamaliyim"] },
            { name: "skills", phrases: ["yetenek", "skill", "teknoloji", "teknolojiler", "araçlar", "araclar", "hangi dil", "hangi program", "tech stack", "python biliyor mu", "sql"] },
            { name: "experience", phrases: ["deneyim", "tecrübe", "tecrube", "experience", "çalıştı", "calisti", "iş geçmişi", "is gecmisi", "kariyer"] },
            { name: "resume", phrases: ["cv", "resume", "özgeçmiş", "ozgecmis", "eğitim", "egitim", "sertifika", "certificate"] },
            { name: "contact", phrases: ["iletişim", "iletisim", "contact", "ulaş", "ulas", "mail", "email", "e-posta", "telefon", "mesaj"] },
            { name: "hire", phrases: ["iş", "is", "işe alım", "ise alim", "hire", "freelance", "iş birliği", "is birligi", "proje teklifi", "maaş", "maas", "ücret", "ucret"] },
            { name: "social", phrases: ["linkedin", "github", "kaggle", "sosyal medya", "profil", "hesap"] },
            { name: "thanks", phrases: ["teşekkür", "tesekkur", "sağ ol", "sag ol", "saol", "eyvallah", "thanks", "thank you"] },
            { name: "goodbye", phrases: ["görüşürüz", "gorusuruz", "hoşça kal", "hosca kal", "bye", "see you", "çıkıyorum", "cikiyorum"] },
            { name: "joke", phrases: ["espri", "şaka", "saka", "komik"] },
            { name: "personal", phrases: ["kaç yaşındasın", "kac yasindasin", "neredensin", "evli misin", "sevgilin var mı", "sevgilin var mi", "ne zaman doğdun", "ne zaman dogdun"] },
            { name: "english", phrases: ["english", "ingilizce", "do you speak english"] },
            { name: "help", phrases: ["yardım", "yardim", "help", "rehber", "nasıl kullanırım", "nasil kullanirim"] }
        ];

        let best = { name: "unknown", score: 0 };

        intents.forEach(function (intent) {
            let score = 0;

            intent.phrases.forEach(function (phrase) {
                const normalizedPhrase = normalizeText(phrase);
                if (parsed.normalized === normalizedPhrase) score += 5;
                else if (phraseMatches(parsed, normalizedPhrase)) score += normalizedPhrase.includes(" ") ? 3 : 2;
            });

            if (score > best.score) {
                best = { name: intent.name, score };
            }
        });

        return best.score >= 2 ? best.name : "unknown";
    }

    function detectArea(parsed) {
        let best = { key: null, score: 0 };

        Object.keys(AREAS).forEach(function (areaKey) {
            const area = AREAS[areaKey];
            let score = 0;

            area.keywords.forEach(function (keyword) {
                const normalizedKeyword = normalizeText(keyword);
                if (parsed.normalized === normalizedKeyword) score += 6;
                else if (phraseMatches(parsed, normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 4 : 2;
            });

            area.projects.forEach(function (project) {
                const normalizedProject = normalizeText(project);
                if (parsed.normalized.includes(normalizedProject)) score += 7;
                else {
                    const projectWords = normalizedProject.split(" ").filter(function (word) {
                        return word.length > 4;
                    });
                    const matches = projectWords.filter(function (word) {
                        return parsed.tokens.includes(word);
                    }).length;

                    if (matches >= 2) score += 4;
                }
            });

            if (score > best.score) {
                best = { key: areaKey, score };
            }
        });

        return best.score >= 2 ? best.key : null;
    }

    function detectProject(parsed) {
        for (const areaKey of Object.keys(AREAS)) {
            const area = AREAS[areaKey];

            for (const project of area.projects) {
                const normalizedProject = normalizeText(project);
                if (parsed.normalized.includes(normalizedProject)) {
                    return { areaKey, project };
                }

                const projectWords = normalizedProject.split(" ").filter(function (word) {
                    return word.length > 4;
                });
                const matches = projectWords.filter(function (word) {
                    return parsed.tokens.includes(word);
                }).length;

                if (projectWords.length > 1 && matches >= Math.min(2, projectWords.length)) {
                    return { areaKey, project };
                }
            }
        }

        return null;
    }

    function isPositiveFollowUp(parsed) {
        if (!["area", "projects", "recommend", "clarify", "unknown"].includes(state.lastIntent || "")) return false;
        return hasAny(parsed, ["evet", "olur", "tabii", "tabi", "tamam", "devam", "göster", "goster", "bakalım", "bakalim", "detay", "daha fazla", "aç", "ac"]);
    }

    function isNegativeFollowUp(parsed) {
        return hasAny(parsed, ["hayır", "hayir", "istemiyorum", "gerek yok", "boşver", "bosver"]);
    }

    function looksLikeGeneralWebQuestion(parsed) {
        return hasAny(parsed, ["hava", "bugün", "bugun", "haber", "dolar", "euro", "kaç derece", "kac derece", "son dakika"]);
    }

    function parse(value) {
        const normalized = normalizeText(value);
        const tokens = normalized.split(/\s+/).filter(Boolean);
        return { original: value, normalized, tokens };
    }

    function normalizeText(value) {
        const charMap = {
            "ç": "c",
            "ğ": "g",
            "ı": "i",
            "ö": "o",
            "ş": "s",
            "ü": "u",
            "â": "a",
            "î": "i",
            "û": "u"
        };

        return value
            .toLocaleLowerCase("tr-TR")
            .replace(/[çğıöşüâîû]/g, function (char) {
                return charMap[char] || char;
            })
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function hasAny(parsed, phrases) {
        return phrases.some(function (phrase) {
            const normalizedPhrase = normalizeText(phrase);
            return parsed.normalized === normalizedPhrase || phraseMatches(parsed, normalizedPhrase);
        });
    }

    function phraseMatches(parsed, normalizedPhrase) {
        if (normalizedPhrase.length <= 2) {
            return parsed.tokens.includes(normalizedPhrase);
        }

        return parsed.normalized.includes(normalizedPhrase);
    }

    function addBotMessage(answer) {
        addMessage(answer.html, "bot");
        renderSuggestions(answer.suggestions || QUICK_REPLIES);
    }

    function addMessage(text, sender) {
        const msg = document.createElement("div");
        msg.className = `chat-message ${sender}`;

        if (sender === "bot") {
            msg.innerHTML = text;
        } else {
            msg.innerText = text;
        }

        messages.appendChild(msg);
        scrollToBottom();
    }

    function showTyping(callback) {
        const typing = document.createElement("div");
        typing.className = "chat-message bot typing";
        typing.innerHTML = "<span></span><span></span><span></span>";
        messages.appendChild(typing);
        scrollToBottom();

        setTimeout(function () {
            typing.remove();
            callback();
        }, 420);
    }

    function renderSuggestions(suggestions) {
        clearSuggestions();
        if (!suggestions.length) return;

        const wrapper = document.createElement("div");
        wrapper.className = "chat-suggestions";

        suggestions.slice(0, 4).forEach(function (suggestion) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "chat-chip";
            button.innerText = suggestion.label;
            button.addEventListener("click", function () {
                handleUserMessage(suggestion.value);
            });
            wrapper.appendChild(button);
        });

        messages.appendChild(wrapper);
        scrollToBottom();
    }

    function clearSuggestions() {
        messages.querySelectorAll(".chat-suggestions").forEach(function (item) {
            item.remove();
        });
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function linkList(items) {
        return `
            <div class="chat-link-list">
                ${items.map(function (item) {
                    const isExternal = /^https?:\/\//i.test(item.href);
                    const target = isExternal ? " target=\"_blank\" rel=\"noopener noreferrer\"" : "";
                    return `<a href="${item.href}"${target}>${item.label}</a>`;
                }).join("")}
            </div>
        `;
    }

    function projectBullets(projects) {
        return `
            <ul>
                ${projects.map(function (project) {
                    return `<li>${project}</li>`;
                }).join("")}
            </ul>
        `;
    }

    function topicSuggestions(areaKey) {
        const area = AREAS[areaKey];
        return [
            { label: "Detay", value: `${area.label} detay` },
            { label: "Proje Öner", value: "Hangi projeden başlamalıyım?" },
            { label: "Yetenekler", value: "Yetenekler" },
            { label: "İletişim", value: "İletişim" }
        ];
    }

    function pick(options) {
        return options[Math.floor(Math.random() * options.length)];
    }
});
