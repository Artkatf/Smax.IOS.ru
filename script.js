:root {
    --bg-dark: #0A0A0C;
    --panel-dark: #161618;
    --accent-green: #10B981;
    --bubble-user: #059669;
    --bubble-friend: #222224;
    --text-main: #F4F4F5;
    --text-muted: #A1A1AA;
    --border-color: #27272A;
}

* { box-sizing: border-box; margin: 0; padding: 0; letter-spacing: -0.5px; }

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* --- ЭКРАН АВТОРИЗАЦИИ (ВЕРТИКАЛЬНОЕ ВЫРАВНИВАНИЕ) --- */
.auth-screen {
    background-color: var(--panel-dark);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 30px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    display: flex; /* Включаем флекс для вертикального потока */
    flex-direction: column;
    gap: 15px; /* Расстояние между элементами */
}

.auth-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 0; /* Убираем лишний отступ, так как есть gap */
    background: linear-gradient(to right, var(--accent-green), #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.avatar-picker {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: var(--bg-dark);
    border: 2px dashed var(--accent-green);
    margin: 0 auto; /* Центрируем сам аватар */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
}

.avatar-picker img { width: 100%; height: 100%; object-fit: cover; }
.avatar-picker span { font-size: 12px; color: var(--accent-green); padding: 5px; }

.auth-input {
    width: 100%;
    background-color: var(--bg-dark);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--text-main);
    font-size: 15px;
    outline: none;
}

.auth-input:focus { border-color: var(--accent-green); }

.auth-btn {
    width: 100%;
    background-color: var(--accent-green);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.auth-btn:hover { opacity: 0.9; }

.id-container-box {
    background-color: rgba(255,255,255,0.05);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 14px;
    font-family: monospace;
    font-size: 13px;
    color: var(--accent-green);
    word-break: break-all;
    user-select: all;
    text-align: left;
    margin-left: -15px; /* Компенсация padding родителя */
    margin-right: -15px;
}

/* --- ОСНОВНОЙ ИНТЕРФЕЙС --- */
.app-container {
    width: 100%;
    height: 100vh;
    display: none;
    flex-direction: row;
}

.sidebar {
    width: 320px;
    background-color: var(--panel-dark);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
    min-width: 320px;
}

.app-title {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 24px;
    background: linear-gradient(to right, var(--accent-green) 0%, var(--accent-green) 35%, var(--text-main) 35%, var(--text-main) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}

.my-profile-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.02);
    padding: 12px;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    margin-bottom: 20px;
}

.profile-img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background-color: #222; }
.profile-info h4 { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.profile-info p { color: var(--accent-green); font-size: 11px; font-weight: 700; margin-top: 2px; }

#chatListContainer { flex: 1; display: flex; flex-direction: column; }
#chatList { display: flex; flex-direction: column; gap: 10px; }

.chat-item {
    padding: 12px;
    background: rgba(255,255,255,0.03);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 12px;
}
.chat-item:hover { background: rgba(255,255,255,0.08); }
.chat-item-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background-color: #333; }
.chat-item-info h5 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.chat-item-info p { font-size: 12px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }

.search-friend-box { border-top: 1px solid var(--border-color); padding-top: 15px; margin-top: auto; }
.search-label { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; padding-left: 4px; }

/* Правая часть - Чат */
.chat-stage { flex: 1; display: flex; flex-direction: column; background-color: var(--bg-dark); }

.chat-header {
    height: 60px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
}
.chat-title { font-size: 15px; font-weight: 700; }

.status-block { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-muted); }
.status-dot { width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 8px #ef4444; transition: all 0.3s; }
.status-dot.online { background-color: var(--accent-green); box-shadow: 0 0 8px var(--accent-green); }

.messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.msg-row { display: flex; flex-direction: column; max-width: 75%; width: fit-content; }
.msg-row.my-msg { align-self: flex-end; }
.msg-row.friend-msg { align-self: flex-start; }

.msg-author { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; padding: 0 6px; }
.my-msg .msg-author { text-align: right; }

.bubble {
    padding: 12px 16px;
    border-radius: 18px;
    font-size: 15px;
    line-height: 1.4;
    word-break: break-word;
}
.my-msg .bubble { background-color: var(--bubble-user); color: #fff; border-bottom-right-radius: 4px; }
.friend-msg .bubble { background-color: var(--bubble-friend); color: var(--text-main); border-bottom-left-radius: 4px; border: 1px solid var(--border-color); }

.input-bar { padding: 16px 20px; background-color: var(--bg-dark); border-top: 1px solid var(--border-color); }
.input-wrapper { width: 100%; display: flex; align-items: center; gap: 10px; }
.input-wrapper input { flex: 1; background-color: var(--panel-dark); border: 1px solid var(--border-color); border-radius: 22px; padding: 12px 18px; color: var(--text-main); font-size: 15px; outline: none; }
.input-wrapper input:focus { border-color: var(--accent-green); }
.send-btn { background-color: var(--accent-green); border: none; color: white; padding: 12px 20px; border-radius: 22px; font-weight: 600; cursor: pointer; font-size: 14px; }

/* --- Адаптивность для планшетов и мобильных --- */
@media (max-width: 768px) {
    body {
        justify-content: flex-start; /* Прижимаем контент к верху, если экран маленький */
    }

    .auth-screen {
        max-width: 100%;
        width: 100%;
        border-radius: 0; /* На мобильном можно убрать скругления по углам экрана */
        padding: 20px;
        margin: 0;
        box-shadow: none;
        height: 100vh; /* На весь экран */
        overflow-y: auto; /* Если экран очень маленький, появится скролл */
    }

    /* Компактнее делаем поля ввода на входе */
    .auth-input {
        font-size: 14px;
        padding: 10px 14px;
    }

    .auth-btn {
        padding: 12px;
        font-size: 15px;
    }

    .id-container-box {
        margin-left: 0;
        margin-right: 0;
        padding: 10px;
        font-size: 12px;
    }

    /* Основной контейнер: сайдбар на всю ширину, чат скрыт по умолчанию */
    .app-container {
        display: flex;
        flex-direction: column; /* На мобильном сначала сайдбар, потом чат (если активен) */
        height: 100vh;
    }

    .sidebar {
        width: 100%;
        min-width: auto;
        padding: 15px;
        border-right: none;
        border-bottom: 1px solid var(--border-color); /* Линия под списком чатов */
        order: 1; /* Сайдбар будет первым */
        max-height: 50vh; /* Ограничиваем высоту списка, чтобы чат не уезжал вниз */
        overflow-y: auto;
    }

    /* Когда чат открыт (.chat-active), сайдбар скрывается */
    .app-container.chat-active .sidebar {
        display: none;
    }

    /* Чат занимает всё место, когда сайдбар скрыт */
    .chat-stage {
        flex: 1;
        width: 100%;
        order: 2;
    }

    /* Шапка чата */
    .chat-header {
        padding: 0 16px;
        height: 52px;
        align-items: center;
    }

    #backBtn {
        display: block; /* Кнопка "Назад" видна только в режиме чата */
        margin-right: 10px;
    }

    .chat-title {
        font-size: 14px;
    }

    .status-block {
        gap: 6px;
    }

    .status-dot {
        width: 6px;
        height: 6px;
    }

    /* Область сообщений */
    .messages-area {
        padding: 16px 12px; /* Чуть меньше отступы по бокам */
    }

    .msg-row {
        max-width: 85%; /* Пузыри чуть шире, чтобы не были слишком узкими */
    }

    .bubble {
        padding: 10px 14px;
        font-size: 14px;
        border-radius: 14px;
    }

    /* Поле ввода */
    .input-bar {
        padding: 12px 16px;
    }

    .input-wrapper input {
        padding: 10px 14px;
        font-size: 14px;
    }

    .send-btn {
        padding: 10px 18px;
        font-size: 13px;
    }

    /* Элементы профиля и списка чатов */
    .my-profile-card {
        padding: 10px;
        border-radius: 12px;
    }

    .profile-img {
        width: 40px;
        height: 40px;
    }

    .profile-info h4 {
        font-size: 13px;
    }

    .profile-info p {
        font-size: 10px;
    }

    .chat-item {
        padding: 10px;
        border-radius: 10px;
    }

    .chat-item-avatar {
        width: 36px;
        height: 36px;
    }

    .chat-item-info h5 {
        font-size: 13px;
    }

    .chat-item-info p {
        font-size: 11px;
        max-width: 100%; /* Текст не обрезается, а переносится */
    }
}

/* --- Очень узкие экраны (старые телефоны, 320-360px) --- */
@media (max-width: 375px) {
    .auth-title {
        font-size: 22px;
    }

    .avatar-picker {
        width: 80px;
        height: 80px;
    }

    .app-title {
        font-size: 20px;
    }

    .chat-item-info h5 {
        font-size: 12px;
    }

    .chat-item-info p {
        font-size: 10px;
    }
}
