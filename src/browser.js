const HOME = 'https://www.google.com';
const tabsEl = document.getElementById('tabs');
const viewsEl = document.getElementById('views');
const address = document.getElementById('address');

let tabs = [];
let activeId = null;
let counter = 0;

// ورودی آدرس‌بار را به URL یا جستجوی گوگل تبدیل می‌کند
function toURL(input) {
  input = input.trim();
  if (!input) return HOME;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(input)) return input;
  if (/^localhost(:\d+)?(\/|$)/i.test(input) ||
      /^[^\s]+\.[a-z]{2,}(:\d+)?(\/\S*)?$/i.test(input)) {
    return 'https://' + input;
  }
  return 'https://www.google.com/search?q=' + encodeURIComponent(input);
}

function activeTab() {
  return tabs.find(t => t.id === activeId);
}

function createTab(url = HOME) {
  const id = ++counter;

  const view = document.createElement('webview');
  view.src = url;
  view.classList.add('hidden');
  viewsEl.appendChild(view);
  applyGoogleTheme(view);

  const tabEl = document.createElement('div');
  tabEl.className = 'tab';
  tabEl.innerHTML = '<span>New Tab</span><button class="close">✕</button>';
  tabsEl.appendChild(tabEl);

  tabEl.addEventListener('click', () => switchTab(id));
  tabEl.querySelector('.close').addEventListener('click', e => {
    e.stopPropagation();
    closeTab(id);
  });

  view.addEventListener('page-title-updated', e => {
    tabEl.querySelector('span').textContent = e.title;
  });
  const onNav = e => {
    if (id === activeId && e.url) address.value = e.url;
  };
  view.addEventListener('did-navigate', onNav);
  view.addEventListener('did-navigate-in-page', onNav);

  tabs.push({ id, view, tabEl });
  switchTab(id);
}

function switchTab(id) {
  activeId = id;
  tabs.forEach(t => {
    const isActive = t.id === id;
    t.view.classList.toggle('hidden', !isActive);
    t.tabEl.classList.toggle('active', isActive);
  });
  const t = activeTab();
  try { address.value = t.view.getURL(); } catch { address.value = ''; }
}

function closeTab(id) {
  const index = tabs.findIndex(t => t.id === id);
  if (index === -1) return;
  const [t] = tabs.splice(index, 1);
  t.view.remove();
  t.tabEl.remove();
  if (tabs.length === 0) return createTab();
  if (id === activeId) switchTab(tabs[Math.max(0, index - 1)].id);
}

address.addEventListener('keydown', e => {
  if (e.key === 'Enter') activeTab().view.loadURL(toURL(address.value));
});
document.getElementById('back').onclick = () => {
  const v = activeTab().view; if (v.canGoBack()) v.goBack();
};
document.getElementById('forward').onclick = () => {
  const v = activeTab().view; if (v.canGoForward()) v.goForward();
};
document.getElementById('reload').onclick = () => activeTab().view.reload();
document.getElementById('newtab').onclick = () => createTab();

createTab();
