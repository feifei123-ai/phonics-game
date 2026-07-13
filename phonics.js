// ==================== 全局变量 ====================
let CURRICULUM = {};
let currentWeek = null;
let currentLesson = null;
let currentMode = null;
let score = 0, steps = 0, combo = 0;
let targetWord = null;
let selectedCard = null;
let cards = [];
let matchedCount = 0;
let totalPairs = 0;
let gameWords = [];
let sentenceIndex = 0;
let isSentenceMode = false;
const COLORS = ['red','orange','yellow','green','blue','purple','pink','teal'];

// ==================== 加载课程数据 ====================
async function loadCurriculum() {
  try {
    const res = await fetch('curriculum.json');
    if (res.ok) {
      CURRICULUM = await res.json();
    } else {
      CURRICULUM = getFallbackData();
    }
  } catch(e) {
    CURRICULUM = getFallbackData();
  }
  renderHome();
}

// 内置降级数据
function getFallbackData() {
  return {
    "week1": {
      "title": "Week 1: 认识新朋友",
      "lessons": {
        "lesson1": {
          "title": "Lesson 1: 人物介绍",
          "date": "2026.7.5",
          "day": "周日",
          "core": [
            {"word": "Rosy", "emoji": "👧", "img": "girl", "sentence": "What's your name? My name's ____."},
            {"word": "Tim", "emoji": "👦", "img": "boy", "sentence": "Who's this? He's ____."},
            {"word": "Billy", "emoji": "🧒", "img": "child", "sentence": "He's my cousin, ____."},
            {"word": "Miss Jones", "emoji": "👩‍🏫", "img": "teacher", "sentence": "____ is my teacher."}
          ],
          "extra": [
            {"word": "cousin", "emoji": "👨‍👩‍👧", "img": "family", "sentence": "He's my ____."},
            {"word": "come on", "emoji": "👋", "img": "hello", "sentence": "____, let's go!"}
          ],
          "sentences": [
            {"text": "What's your name? My name's ____.", "answer": "Rosy", "options": ["Rosy", "Tim", "Billy"]},
            {"text": "How old are you? I'm ____.", "answer": "two", "options": ["one", "two", "three"]},
            {"text": "My name ____ Rosy.", "answer": "is", "options": ["is", "am", "are"]},
            {"text": "Who's this? ____ my cousin.", "answer": "He's", "options": ["He's", "She's", "It's"]}
          ]
        },
        "lesson2": {
          "title": "Lesson 2: 数字·星期·颜色",
          "date": "2026.7.8",
          "day": "周三",
          "core": [
            {"word": "one", "emoji": "1️⃣", "img": "number 1", "sentence": "I have ____ apple."},
            {"word": "two", "emoji": "2️⃣", "img": "number 2", "sentence": "I have ____ books."},
            {"word": "three", "emoji": "3️⃣", "img": "number 3", "sentence": "I am ____ years old."},
            {"word": "four", "emoji": "4️⃣", "img": "number 4", "sentence": "I see ____ birds."},
            {"word": "five", "emoji": "5️⃣", "img": "number 5", "sentence": "I have ____ fingers."},
            {"word": "Sunday", "emoji": "☀️", "img": "sunday weekend", "sentence": "Today is ____."},
            {"word": "Monday", "emoji": "📅", "img": "monday", "sentence": "____ is the first day."},
            {"word": "Tuesday", "emoji": "📅", "img": "tuesday", "sentence": "Today is ____."},
            {"word": "Wednesday", "emoji": "📅", "img": "wednesday", "sentence": "Today is ____."},
            {"word": "Thursday", "emoji": "📅", "img": "thursday", "sentence": "Today is ____."},
            {"word": "Friday", "emoji": "📅", "img": "friday", "sentence": "Today is ____."},
            {"word": "Saturday", "emoji": "🎉", "img": "saturday weekend", "sentence": "Today is ____."},
            {"word": "red", "emoji": "🔴", "img": "red color", "sentence": "The apple is ____."},
            {"word": "yellow", "emoji": "🟡", "img": "yellow color", "sentence": "The banana is ____."},
            {"word": "pink", "emoji": "🩷", "img": "pink color", "sentence": "The flower is ____."},
            {"word": "green", "emoji": "🟢", "img": "green color", "sentence": "The grass is ____."},
            {"word": "purple", "emoji": "🟣", "img": "purple color", "sentence": "The grape is ____."},
            {"word": "orange", "emoji": "🟠", "img": "orange color", "sentence": "The orange is ____."},
            {"word": "blue", "emoji": "🔵", "img": "blue color", "sentence": "The sky is ____."}
          ],
          "extra": [],
          "sentences": [
            {"text": "How old are you? I'm ____ years old.", "answer": "seven", "options": ["five", "six", "seven"]},
            {"text": "What day is it today? It's ____.", "answer": "Monday", "options": ["Sunday", "Monday", "Friday"]},
            {"text": "What color is it? It's ____.", "answer": "red", "options": ["red", "blue", "green"]}
          ]
        }
      }
    },
    "week2": {
      "title": "Week 2: 我的文具",
      "lessons": {
        "lesson1": {
          "title": "Lesson 1: School Things",
          "date": "2026.7.12",
          "day": "周日",
          "core": [
            {"word": "pen", "emoji": "🖊️", "img": "pen stationery", "sentence": "What's this? It's a ____."},
            {"word": "rubber", "emoji": "🧼", "img": "eraser rubber", "sentence": "It's a ____."},
            {"word": "pencil", "emoji": "✏️", "img": "pencil", "sentence": "What's this? It's a ____."},
            {"word": "book", "emoji": "📖", "img": "book", "sentence": "Look at my ____."},
            {"word": "ruler", "emoji": "📏", "img": "ruler", "sentence": "It's a ____."}
          ],
          "extra": [
            {"word": "school things", "emoji": "🎒", "img": "school supplies", "sentence": "These are my ____."},
            {"word": "train", "emoji": "🚂", "img": "toy train", "sentence": "Look at the ____."},
            {"word": "OK", "emoji": "👌", "img": "ok hand", "sentence": "____, here you are."},
            {"word": "look at", "emoji": "👀", "img": "look see", "sentence": "____ the train, Rosy."}
          ],
          "sentences": [
            {"text": "What's this? It's a ____.", "answer": "pen", "options": ["pen", "book", "ruler"]},
            {"text": "What's = What ____", "answer": "is", "options": ["is", "are", "am"]},
            {"text": "It's = It ____", "answer": "is", "options": ["is", "are", "am"]},
            {"text": "Look at the ____, Rosy.", "answer": "train", "options": ["train", "book", "pen"]}
          ]
        }
      }
    }
  };
}

// ==================== 本地存储 ====================
function getStorage() {
  try {
    return JSON.parse(localStorage.getItem('phonicsProgress') || '{}');
  } catch(e) { return {}; }
}
function setStorage(data) {
  localStorage.setItem('phonicsProgress', JSON.stringify(data));
}
function getWordStatus(word) {
  const s = getStorage();
  return s[word] || {level: 0, wrong: 0, correct: 0, lastReview: null};
}
function updateWordStatus(word, isCorrect) {
  const s = getStorage();
  if (!s[word]) s[word] = {level: 0, wrong: 0, correct: 0, lastReview: null};
  if (isCorrect) {
    s[word].correct++;
    s[word].wrong = Math.max(0, s[word].wrong - 1);
    if (s[word].correct >= 3) s[word].level = Math.min(4, s[word].level + 1);
  } else {
    s[word].wrong++;
    s[word].correct = 0;
    s[word].level = Math.max(0, s[word].level - 1);
  }
  s[word].lastReview = new Date().toISOString();
  setStorage(s);
}
function getWeakWords() {
  const s = getStorage();
  const weak = [];
  for (let w in s) {
    if (s[w].wrong > 0 || s[w].level < 2) weak.push({word: w, ...s[w]});
  }
  return weak.sort((a,b) => b.wrong - a.wrong);
}
function isLessonDone(week, lesson) {
  if (!CURRICULUM[week] || !CURRICULUM[week].lessons[lesson]) return false;
  const data = CURRICULUM[week].lessons[lesson];
  const words = [...(data.core || []), ...(data.extra || [])];
  for (let w of words) {
    const s = getWordStatus(w.word);
    if (s.level < 1) return false;
  }
  return true;
}

// ==================== 页面切换 ====================
function showPage(page) {
  document.querySelectorAll('.home-page, .mode-page, .game-page, .review-page, .progress-page').forEach(el => {
    el.classList.remove('active');
    if (!el.classList.contains('home-page')) el.style.display = 'none';
  });
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  if (page === 'home') {
    document.getElementById('homePage').style.display = 'block';
    renderHome();
    document.querySelectorAll('.nav-item')[0].classList.add('active');
  } else if (page === 'mode') {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('modePage').classList.add('active');
    document.getElementById('modePage').style.display = 'block';
  } else if (page === 'game') {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('modePage').classList.remove('active');
    document.getElementById('modePage').style.display = 'none';
    document.getElementById('gamePage').classList.add('active');
    document.getElementById('gamePage').style.display = 'block';
  } else if (page === 'review') {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('modePage').classList.remove('active');
    document.getElementById('gamePage').classList.remove('active');
    document.getElementById('reviewPage').classList.add('active');
    document.getElementById('reviewPage').style.display = 'block';
    renderReview();
    document.querySelectorAll('.nav-item')[1].classList.add('active');
  } else if (page === 'progress') {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('modePage').classList.remove('active');
    document.getElementById('gamePage').classList.remove('active');
    document.getElementById('reviewPage').classList.remove('active');
    document.getElementById('progressPage').classList.add('active');
    document.getElementById('progressPage').style.display = 'block';
    renderProgress();
    document.querySelectorAll('.nav-item')[2].classList.add('active');
  }
}

// ==================== 渲染首页 ====================
function renderHome() {
  const container = document.getElementById('weekList');
  let html = '';
  for (let wk in CURRICULUM) {
    const week = CURRICULUM[wk];
    let prevDone = true;
    html += `<div class="week-card">
      <div class="week-title">${week.title} <span class="badge">${Object.keys(week.lessons).length} 课</span></div>
      <div class="lesson-row">`;
    for (let ls in week.lessons) {
      const lesson = week.lessons[ls];
      const done = isLessonDone(wk, ls);
      const locked = !prevDone;
      const status = done ? '✅' : (locked ? '🔒' : '🆕');
      const cls = done ? 'done' : (locked ? 'locked' : '');
      const onclick = locked ? '' : `onclick="selectLesson('${wk}','${ls}')"`;
      html += `<button class="lesson-btn ${cls}" ${onclick}>
        <span class="status">${status}</span>
        <div>
          <div style="font-size:.75rem;color:#78909C">${lesson.date} ${lesson.day}</div>
          <div>${lesson.title}</div>
        </div>
      </button>`;
      prevDone = done;
    }
    html += '</div></div>';
  }
  container.innerHTML = html;
}

// ==================== 选择课程 ====================
function selectLesson(week, lesson) {
  currentWeek = week;
  currentLesson = lesson;
  const data = CURRICULUM[week].lessons[lesson];
  document.getElementById('modeTitle').textContent = data.title;
  document.getElementById('modeSubtitle').textContent = `${data.date} ${data.day} · 选择练习模式`;
  showPage('mode');
}

// ==================== 开始模式 ====================
function startMode(mode) {
  currentMode = mode;
  const data = CURRICULUM[currentWeek].lessons[currentLesson];
  document.getElementById('gameInfo').textContent = `${data.title}`;
  const modeNames = {new: '🆕 新课模式', review: '🔄 巩固模式', weak: '⚠️ 薄弱强化'};
  document.getElementById('gameModeName').textContent = modeNames[mode];

  score = 0; steps = 0; combo = 0; matchedCount = 0; sentenceIndex = 0;
  document.getElementById('sc').textContent = '0';
  document.getElementById('st').textContent = '0';
  document.getElementById('combo').textContent = '0';

  if (mode === 'weak') {
    const weak = getWeakWords();
    if (weak.length === 0) {
      alert('太棒了！没有薄弱单词，去试试巩固模式吧！');
      return;
    }
    gameWords = [];
    for (let w of weak.slice(0, 9)) {
      for (let wk in CURRICULUM) {
        for (let ls in CURRICULUM[wk].lessons) {
          const all = [...(CURRICULUM[wk].lessons[ls].core || []), ...(CURRICULUM[wk].lessons[ls].extra || [])];
          const found = all.find(x => x.word === w.word);
          if (found) { gameWords.push(found); break; }
        }
        if (gameWords.find(x => x.word === w.word)) break;
      }
    }
  } else if (mode === 'new') {
    gameWords = [...(data.core || [])];
  } else {
    gameWords = [...(data.core || []), ...(data.extra || [])];
  }

  if (gameWords.length > 9) gameWords = gameWords.slice(0, 9);
  if (gameWords.length === 0) {
    alert('本课暂无单词，请检查课程数据');
    return;
  }

  showPage('game');
  initGame();
}

// ==================== 获取图片URL ====================
function getImgUrl(word, img) {
  const query = encodeURIComponent(img || word);
  return `https://source.unsplash.com/200x200/?${query}`;
}

// ==================== 初始化游戏 ====================
function initGame() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  cards = [];
  selectedCard = null;

  let pool = [];
  for (let w of gameWords) {
    pool.push({...w, id: w.word + '_1'});
    pool.push({...w, id: w.word + '_2'});
  }
  pool.sort(() => Math.random() - 0.5);

  totalPairs = gameWords.length;
  matchedCount = 0;

  pool.forEach((item, idx) => {
    const card = document.createElement('div');
    const color = COLORS[idx % COLORS.length];
    card.className = `card ${color}`;
    card.dataset.word = item.word;
    card.dataset.id = item.id;

    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = getImgUrl(item.word, item.img);
    img.onerror = function() {
      this.style.display = 'none';
      const emoji = document.createElement('div');
      emoji.className = 'card-emoji';
      emoji.textContent = item.emoji;
      card.insertBefore(emoji, this.nextSibling);
    };

    const txt = document.createElement('div');
    txt.className = 'txt';
    txt.textContent = item.word;

    card.appendChild(img);
    card.appendChild(txt);
    card.onclick = () => onCardClick(card);
    grid.appendChild(card);
    cards.push(card);
  });

  pickNewTarget();
  document.getElementById('sentenceQuiz').classList.remove('active');
  isSentenceMode = false;
}

// ==================== 选择新目标 ====================
function pickNewTarget() {
  const remaining = gameWords.filter(w => {
    return cards.some(c => c.dataset.word === w.word && !c.classList.contains('matched'));
  });
  if (remaining.length === 0) {
    startSentenceQuiz();
    return;
  }
  targetWord = remaining[Math.floor(Math.random() * remaining.length)];
  document.getElementById('targetWord').textContent = targetWord.word;
  document.getElementById('targetSentence').textContent = targetWord.sentence || '';

  if (currentMode === 'new') {
    setTimeout(() => speak(targetWord.word), 500);
  }
}

// ==================== 卡片点击 ====================
function onCardClick(card) {
  if (card.classList.contains('matched') || card === selectedCard) return;

  card.style.transform = 'scale(0.95)';
  setTimeout(() => card.style.transform = '', 100);

  if (!selectedCard) {
    selectedCard = card;
    card.classList.add('selected');
    speak(card.dataset.word);
  } else {
    steps++;
    document.getElementById('st').textContent = steps;

    const prev = selectedCard;
    selectedCard = null;
    prev.classList.remove('selected');

    if (prev.dataset.word === card.dataset.word) {
      matchedCount++;
      combo++;
      score += 10 * combo;
      document.getElementById('sc').textContent = score;
      document.getElementById('combo').textContent = combo;

      updateWordStatus(card.dataset.word, true);

      prev.classList.add('matched');
      card.classList.add('matched');
      showScorePop(card, '+' + (10 * combo));

      setTimeout(() => {
        prev.style.visibility = 'hidden';
        card.style.visibility = 'hidden';
        if (matchedCount >= totalPairs) {
          startSentenceQuiz();
        } else {
          pickNewTarget();
        }
      }, 500);
    } else {
      combo = 0;
      document.getElementById('combo').textContent = 0;
      updateWordStatus(card.dataset.word, false);

      prev.classList.add('shake');
      card.classList.add('shake');
      setTimeout(() => {
        prev.classList.remove('shake');
        card.classList.remove('shake');
      }, 400);
    }
  }
}

// ==================== 句子填空 ====================
function startSentenceQuiz() {
  const data = CURRICULUM[currentWeek].lessons[currentLesson];
  if (!data.sentences || data.sentences.length === 0) {
    showWin();
    return;
  }
  isSentenceMode = true;
  sentenceIndex = 0;
  document.getElementById('grid').innerHTML = '<div style="text-align:center;padding:40px;color:#78909C;font-size:1.2rem">📝 接下来是句子练习！</div>';
  setTimeout(() => showSentence(), 1000);
}

function showSentence() {
  const data = CURRICULUM[currentWeek].lessons[currentLesson];
  const sentences = data.sentences || [];
  if (sentenceIndex >= sentences.length) {
    showWin();
    return;
  }
  const s = sentences[sentenceIndex];
  document.getElementById('targetWord').textContent = '句子填空';
  document.getElementById('targetSentence').textContent = '选择正确的单词填入句子';

  const quiz = document.getElementById('sentenceQuiz');
  quiz.classList.add('active');

  let html = s.text.replace('____', '<span class="blank" id="answerBlank">?</span>');
  document.getElementById('sentenceText').innerHTML = html;

  const opts = document.getElementById('sentenceOptions');
  opts.innerHTML = '';
  s.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkSentence(btn, opt, s.answer);
    opts.appendChild(btn);
  });
}

function checkSentence(btn, selected, answer) {
  const btns = document.querySelectorAll('.sentence-options button');
  btns.forEach(b => b.disabled = true);

  const blank = document.getElementById('answerBlank');
  blank.textContent = selected;

  if (selected === answer) {
    btn.classList.add('correct');
    score += 20;
    document.getElementById('sc').textContent = score;
    speak(answer);
    setTimeout(() => {
      sentenceIndex++;
      showSentence();
    }, 1500);
  } else {
    btn.classList.add('wrong');
    btns.forEach(b => {
      if (b.textContent === answer) b.classList.add('correct');
    });
    setTimeout(() => {
      sentenceIndex++;
      showSentence();
    }, 2000);
  }
}

// ==================== 发音 ====================
function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }
}
function speakTarget() {
  if (targetWord) speak(targetWord.word);
}
function showHint() {
  if (!targetWord) return;
  cards.forEach(c => {
    if (c.dataset.word === targetWord.word && !c.classList.contains('matched')) {
      c.style.boxShadow = '0 0 0 4px #FFD54F, 0 5px 15px rgba(0,0,0,.3)';
      setTimeout(() => c.style.boxShadow = '', 1500);
    }
  });
  score = Math.max(0, score - 5);
  document.getElementById('sc').textContent = score;
}

// ==================== 得分动画 ====================
function showScorePop(el, text) {
  const rect = el.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'score-pop';
  pop.textContent = text;
  pop.style.left = rect.left + rect.width/2 - 20 + 'px';
  pop.style.top = rect.top + 'px';
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1000);
}

// ==================== 通关弹窗 ====================
function showWin() {
  const overlay = document.getElementById('overlay');
  document.getElementById('modalScore').textContent = score;

  let title = '🎉 恭喜通关！';
  let text = '';
  if (score >= 150) {
    title = '🌟 太棒了！完美通关！';
    text = '所有单词和句子都掌握了！';
  } else if (score >= 100) {
    title = '👍 做得很好！';
    text = '继续加油，下次争取满分！';
  } else {
    title = '💪 完成挑战！';
    text = '多练习几次，你会越来越棒的！';
  }
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  overlay.classList.add('show');
}

function nextLevel() {
  document.getElementById('overlay').classList.remove('show');
  showPage('home');
}

// ==================== 渲染错题本 ====================
function renderReview() {
  const container = document.getElementById('weakList');
  const weak = getWeakWords();

  if (weak.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🎉</div>
        <div>太棒了！没有薄弱单词</div>
        <div style="font-size:.8rem;margin-top:5px">继续保持，加油！</div>
      </div>`;
    return;
  }

  let html = '';
  for (let w of weak) {
    let info = null;
    for (let wk in CURRICULUM) {
      for (let ls in CURRICULUM[wk].lessons) {
        const all = [...(CURRICULUM[wk].lessons[ls].core || []), ...(CURRICULUM[wk].lessons[ls].extra || [])];
        const found = all.find(x => x.word === w.word);
        if (found) { info = found; break; }
      }
      if (info) break;
    }

    const statusClass = w.level >= 2 ? 'mastered' : (w.wrong > 2 ? 'review' : 'new');
    const statusText = w.level >= 2 ? '已掌握' : (w.wrong > 2 ? '需复习' : '学习中');

    html += `<div class="weak-item">
      <img class="word-img" src="${getImgUrl(w.word, info?.img)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" alt="">
      <div style="width:50px;height:50px;display:none;justify-content:center;align-items:center;font-size:2rem">${info?.emoji || '📖'}</div>
      <div class="word-info">
        <div class="word-name">${w.word}</div>
        <div class="word-meta">错误 ${w.wrong} 次 · 正确 ${w.correct} 次</div>
      </div>
      <div class="word-status ${statusClass}">${statusText}</div>
    </div>`;
  }
  container.innerHTML = html;
}

// ==================== 渲染进度 ====================
function renderProgress() {
  const s = getStorage();
  let total = 0, mastered = 0, weak = 0;
  for (let w in s) {
    total++;
    if (s[w].level >= 3) mastered++;
    if (s[w].wrong > 0 || s[w].level < 2) weak++;
  }

  document.getElementById('totalWords').textContent = total;
  document.getElementById('masteredWords').textContent = mastered;
  document.getElementById('weakWords').textContent = weak;

  let weekTotal = 0, weekMastered = 0;
  for (let wk in CURRICULUM) {
    for (let ls in CURRICULUM[wk].lessons) {
      const words = [...(CURRICULUM[wk].lessons[ls].core || []), ...(CURRICULUM[wk].lessons[ls].extra || [])];
      for (let w of words) {
        weekTotal++;
        const st = getWordStatus(w.word);
        if (st.level >= 2) weekMastered++;
      }
    }
  }
  const pct = weekTotal > 0 ? Math.round(weekMastered / weekTotal * 100) : 0;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = pct + '% (' + weekMastered + '/' + weekTotal + ')';
}

// ==================== 初始化 ====================
loadCurriculum();
