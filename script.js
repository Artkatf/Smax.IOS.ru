// --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
let myPeer = null;
let currentConnection = null; // Активное соединение с другом
let currentFriendId = null;   // ID текущего собеседника
let chatsHistory = [];         // История чатов (хранится в localStorage)

// --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
document.addEventListener('DOMContentLoaded', () => {
    // Пытаемся восстановить профиль из памяти
    const savedProfile = localStorage.getItem('smax_profile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        renderProfile(profile);
        showApp();
    } else {
        // Если профиля нет — показываем экран входа
        hideApp();
    }

    // Загружаем историю чатов
    loadChatsHistory();
});

// --- ЭКРАН АВТОРИЗАЦИИ ---
function previewAvatar(input) {
    const preview = document.getElementById('avatarPreview');
    const placeholder = document.getElementById('avatarPlaceholder');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function saveProfile() {
    const firstName = document.getElementById('firstNameInput').value.trim();
    const lastName = document.getElementById('lastNameInput').value.trim();
    const avatarPreview = document.getElementById('avatarPreview').src;
    
    if (!firstName || !lastName) {
        alert('Пожалуйста, введите Имя и Фамилию');
        return;
    }

    // Генерируем уникальный ID (простой вариант: случайная строка + время)
    const myId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();

    const profile = {
        firstName,
        lastName,
        avatar: avatarPreview,
        id: myId
    };

    // Сохраняем в localStorage
    localStorage.setItem('smax_profile', JSON.stringify(profile));

    // Рендерим профиль и показываем приложение
    renderProfile(profile);
    showApp();

    // Инициализируем PeerJS
    initPeer(myId);
}

function renderProfile(profile) {
    document.getElementById('myAvatar').src = profile.avatar || 'https://via.placeholder.com/50';
    document.getElementById('myFullNameDisplay').textContent = `${profile.firstName} ${profile.lastName}`;
    document.getElementById('myIdDisplay').textContent = `ID: ${profile.id}`;
}

// Переключение экранов
function showApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
}

function hideApp() {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
}

// --- PEERJS ЛОГИКА (P2P СОЕДИНЕНИЕ) ---
function initPeer(myId) {
    myPeer = new Peer(myId, {
        debug: 2 // Уровень логирования (можно убрать для продакшена)
    });

    myPeer.on('open', (id) => {
        console.log('Мой ID:', id);
        document.getElementById('myIdPreviewBox').textContent = `ID: ${id}`;
    });

    myPeer.on('connection', (conn) => {
        handleIncomingConnection(conn);
    });
}

function handleIncomingConnection(conn) {
    conn.on('data', (data) => {
        receiveMessage(conn, data);
    });
    
    conn.on('error', (err) => {
        console.error('Ошибка соединения:', err);
    });

    currentConnection = conn;
    currentFriendId = conn.peer; // ID того, кто нам написал
    startChatSession(conn);
}

function connectToFriend() {
    const friendId = document.getElementById('friendIdInput').value.trim();
    if (!friendId) {
        alert('Введите ID друга');
        return;
    }

    const conn = myPeer.connect(friendId);
    
    conn.on('open', () => {
        currentConnection = conn;
        currentFriendId = friendId;
        startChatSession(conn);
        conn.on('data', (data) => receiveMessage(conn, data));
    });

    conn.on('error', (err) => {
        alert('Не удалось соединиться. Возможно, ID неверный или друг оффлайн.');
        console.error(err);
    });
}

function startChatSession(conn) {
    // Показываем правую панель чата
    document.getElementById('appContainer').classList.add('chat-active');
    
    // Обновляем заголовок чата
    const chatTitle = document.getElementById('chatWithTitle');
    chatTitle.textContent = `Чат с ID: ${currentFriendId}`;

    // Меняем статус на "Онлайн"
    updateStatus(true);

    // Очищаем поле ввода ID
    document.getElementById('friendIdInput').value = '';

    // Добавляем/обновляем чат в историю
    addToChatsHistory(currentFriendId, 'Вы начали чат');
}

function updateStatus(isOnline) {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    
    if (isOnline) {
        dot.classList.add('online');
        text.textContent = 'В сети';
    } else {
        dot.classList.remove('online');
        text.textContent = 'Оффлайн';
    }
}

// --- ОТПРАВКА И ПРИЁМ СООБЩЕНИЙ ---
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message || !currentConnection) return;

    // 1. Отображаем сообщение у себя
    appendMessageToUI(message, 'me');

    // 2. Отправляем другу
    currentConnection.send(message);

    // 3. Обновляем историю чатов (последнее сообщение)
    addToChatsHistory(currentFriendId, message);

    input.value = '';
}

// Обработка нажатия Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function receiveMessage(conn, data) {
    // data — это текст сообщения
    appendMessageToUI(data, 'friend');
    addToChatsHistory(conn.peer, data); // Обновляем историю
}

function appendMessageToUI(text, sender) {
    const messagesArea = document.getElementById('messagesArea');
    const msgRow = document.createElement('div');
    msgRow.className = `msg-row ${sender === 'me' ? 'my-msg' : 'friend-msg'}`;

    const authorSpan = document.createElement('div');
    authorSpan.className = 'msg-author';
    authorSpan.textContent = sender === 'me' 
        ? 'Вы' 
        : `Друг (${currentFriendId})`;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    msgRow.appendChild(authorSpan);
    msgRow.appendChild(bubble);
    messagesArea.appendChild(msgRow);

    // Прокрутка вниз
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// --- ИСТОРИЯ ЧАТОВ (СПИСОК СЛЕВА) ---
function loadChatsHistory() {
    const stored = localStorage.getItem('smax_chats');
    chatsHistory = stored ? JSON.parse(stored) : [];
    renderChatsList();
}

function addToChatsHistory(friendId, lastMessage) {
    // Ищем существующий чат
    const index = chatsHistory.findIndex(c => c.id === friendId);
    const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const entry = { id: friendId, lastMessage, time: now };

    if (index > -1) {
        // Обновляем существующий
        chatsHistory[index] = entry;
    } else {
        // Добавляем новый
        chatsHistory.unshift(entry); // Добавляем в начало
    }

    // Сохраняем
    localStorage.setItem('smax_chats', JSON.stringify(chatsHistory));
    renderChatsList();
}

function renderChatsList() {
    const listContainer = document.getElementById('chatList');
    listContainer.innerHTML = '';
    const emptyMsg = document.getElementById('emptyChatList');

    if (chatsHistory.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';

    chatsHistory.forEach((chat) => {
        const item = document.createElement('div');
        item.className = 'chat-item';
        item.onclick = () => openChatWith(chat.id);

        item.innerHTML = `
            <img src="https://via.placeholder.com/40" class="chat-item-avatar" alt="Avatar">
            <div class="chat-item-info">
                <h5>Друг (${chat.id.substring(0, 8)}...)</h5>
                <p>${chat.lastMessage}</p>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function openChatWith(friendId) {
    // Если уже в чате с этим человеком — ничего не делаем
    if (currentFriendId === friendId) return;

    // Создаем новое соединение
    const conn = myPeer.connect(friendId);
    
    conn.on('open', () => {
        currentConnection = conn;
        currentFriendId = friendId;
        startChatSession(conn);
        conn.on('data', (data) => receiveMessage(conn, data));
    });

    conn.on('error', (err) => {
        alert('Не удалось открыть чат. Возможно, друг оффлайн.');
    });
}

// Кнопка "Назад" в список чатов (можно добавить кнопку в UI, если нужно)
function goBackToChats() {
    currentConnection = null;
    currentFriendId = null;
    document.getElementById('appContainer').classList.remove('chat-active');
    updateStatus(false);
    document.getElementById('messagesArea').innerHTML = ''; // Очистить чат
}
