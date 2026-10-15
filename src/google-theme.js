// رنگ‌ها را اینجا عوض کن
const THEME = {
  bg: '#0f1115',        // پس‌زمینه‌ی صفحه
  card: '#181b21',      // کادرها و نوار جستجو
  text: '#e6e8ec',      // متن اصلی
  muted: '#9aa3ad',     // آدرس سایت و توضیحات
  accent: '#7ab7ff',    // عنوان نتایج و لینک‌ها
  border: '#272b33'
};

const GOOGLE_CSS = `
  html, body { background:${THEME.bg} !important; color:${THEME.text} !important; }
  body { font-family: system-ui, Tahoma, sans-serif !important; }

  /* نوار جستجو */
  form[role="search"], .RNNXgb, .SDkEP, textarea[name="q"], input[name="q"] {
    background:${THEME.card} !important; color:${THEME.text} !important;
    border-color:${THEME.border} !important; border-radius:24px !important;
  }

  /* عنوان و لینک نتایج */
  #search h3, #rso h3 { color:${THEME.accent} !important; }
  #search a, #rso a { color:${THEME.accent} !important; }

  /* آدرس و توضیح هر نتیجه */
  cite, #rso cite, #rso .VwiC3b, #rso .lEBKkf, #rso span { color:${THEME.muted} !important; }

  /* هر نتیجه به شکل کارت */
  #rso .g, #rso .MjjYud > div {
    background:${THEME.card} !important; border-radius:14px !important;
    padding:14px 18px !important; margin-bottom:12px !important;
    border:1px solid ${THEME.border} !important;
  }

  /* نوار بالا و تب‌های همه/تصاویر/اخبار */
  #searchform, #hdtb, .sfbg, #appbar, #top_nav { background:${THEME.bg} !important; }
  #hdtb a, #hdtb div { color:${THEME.muted} !important; }

  /* پایین صفحه */
  #footcnt, #fbarcnt, footer { background:${THEME.bg} !important; }
`;

function applyGoogleTheme(view) {
  view.addEventListener('dom-ready', () => {
    let url = '';
    try { url = view.getURL(); } catch { return; }
    if (/^https:\/\/(www\.)?google\.[a-z.]+\/search/i.test(url)) {
      view.insertCSS(GOOGLE_CSS);
    }
  });
}
