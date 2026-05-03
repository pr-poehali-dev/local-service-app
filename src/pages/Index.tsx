import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "news" | "announcements" | "phonebook" | "chat" | "profile" | "about";

const HERO_IMG = "https://cdn.poehali.dev/projects/1ad84bbc-0154-4a1c-94b6-81c332429e38/files/f2cfe4a6-2526-479a-bccf-e76770acdaca.jpg";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const news = [
  {
    id: 1,
    date: "3 мая 2026",
    category: "Благоустройство",
    title: "Начался ремонт дороги на улице Лесной",
    text: "Подрядная организация приступила к работам по асфальтированию. Ориентировочный срок завершения — 20 мая.",
    views: 142,
  },
  {
    id: 2,
    date: "1 мая 2026",
    category: "Праздник",
    title: "Первомайский субботник прошёл успешно",
    text: "В нём приняли участие 47 жителей. Убрано более 2 км дорог, высажено 30 деревьев.",
    views: 98,
  },
  {
    id: 3,
    date: "28 апр 2026",
    category: "ЖКХ",
    title: "Плановое отключение воды 5 мая",
    text: "С 9:00 до 17:00 будет отключена горячая вода в домах №1–24 по ул. Центральной.",
    views: 211,
  },
  {
    id: 4,
    date: "25 апр 2026",
    category: "Культура",
    title: "Открытие летнего сезона в клубе",
    text: "7 мая в 18:00 состоится концерт местного ансамбля «Берёзка». Вход свободный.",
    views: 77,
  },
];

const announcements = [
  {
    id: 1,
    author: "Иван П.",
    avatar: "И",
    date: "Сегодня",
    type: "Продаю",
    typeColor: "bg-green-100 text-green-700",
    title: "Картофель домашний, 5 кг — 300 ₽",
    text: "Копаный в этом году, без химии. Звонить с 9 до 19.",
    contact: "+7 910 123-45-67",
  },
  {
    id: 2,
    author: "Светлана К.",
    avatar: "С",
    date: "Вчера",
    type: "Услуги",
    typeColor: "bg-blue-100 text-blue-700",
    title: "Выгул собак, уход за животными",
    text: "Опыт 5 лет, есть рекомендации. Недорого.",
    contact: "+7 912 987-65-43",
  },
  {
    id: 3,
    author: "Алексей М.",
    avatar: "А",
    date: "2 дня назад",
    type: "Ищу",
    typeColor: "bg-orange-100 text-orange-700",
    title: "Ищу сварщика для забора",
    text: "Нужно приварить секции профнастила, работы на 3–4 часа.",
    contact: "+7 920 111-22-33",
  },
  {
    id: 4,
    author: "Татьяна В.",
    avatar: "Т",
    date: "3 дня назад",
    type: "Отдам",
    typeColor: "bg-purple-100 text-purple-700",
    title: "Котята в добрые руки, 3 шт.",
    text: "2 рыжих и 1 серый. Здоровые, привитые. Бесплатно.",
    contact: "+7 905 444-55-66",
  },
];

const phonebook = [
  {
    id: 1,
    category: "Экстренные службы",
    items: [
      { name: "Пожарная охрана", phone: "101", icon: "Flame" },
      { name: "Скорая помощь", phone: "103", icon: "Heart" },
      { name: "Полиция", phone: "102", icon: "Shield" },
      { name: "Газовая служба", phone: "104", icon: "Zap" },
    ],
  },
  {
    id: 2,
    category: "Администрация",
    items: [
      { name: "Глава поселения", phone: "+7 495 000-11-22", icon: "User" },
      { name: "Приёмная", phone: "+7 495 000-11-23", icon: "Building" },
      { name: "Бухгалтерия", phone: "+7 495 000-11-24", icon: "Calculator" },
    ],
  },
  {
    id: 3,
    category: "Коммунальные службы",
    items: [
      { name: "ЖКХ — диспетчер", phone: "+7 495 000-33-00", icon: "Wrench" },
      { name: "Водоканал", phone: "+7 495 000-33-01", icon: "Droplets" },
      { name: "Электросети", phone: "+7 495 000-33-02", icon: "Lightbulb" },
    ],
  },
  {
    id: 4,
    category: "Образование и культура",
    items: [
      { name: "Школа", phone: "+7 495 000-44-11", icon: "GraduationCap" },
      { name: "Детский сад", phone: "+7 495 000-44-12", icon: "Baby" },
      { name: "Клуб", phone: "+7 495 000-44-13", icon: "Music" },
      { name: "Библиотека", phone: "+7 495 000-44-14", icon: "BookOpen" },
    ],
  },
];

const chatMessages = [
  { id: 1, author: "Марина С.", avatar: "М", text: "Добрый день! Кто знает, когда откроют новый магазин на углу?", time: "10:12", isMe: false },
  { id: 2, author: "Николай В.", avatar: "Н", text: "Говорят, к 9 мая точно откроют — видел рабочих там.", time: "10:15", isMe: false },
  { id: 3, author: "Вы", avatar: "Я", text: "Хорошая новость, ждём!", time: "10:18", isMe: true },
  { id: 4, author: "Ольга П.", avatar: "О", text: "А кто знает расписание автобуса на праздники?", time: "10:45", isMe: false },
  { id: 5, author: "Иван К.", avatar: "И", text: "Расписание висит на остановке. 7:30, 12:00, 17:30.", time: "10:47", isMe: false },
  { id: 6, author: "Вы", avatar: "Я", text: "Спасибо, очень кстати 👍", time: "10:49", isMe: true },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "announcements", label: "Объявления", icon: "Megaphone" },
  { id: "phonebook", label: "Контакты", icon: "Phone" },
  { id: "chat", label: "Чат", icon: "MessageCircle" },
  { id: "profile", label: "Кабинет", icon: "UserCircle" },
];

const categoryColors: Record<string, string> = {
  Благоустройство: "bg-green-50 text-green-700",
  ЖКХ: "bg-orange-50 text-orange-700",
  Праздник: "bg-pink-50 text-pink-700",
  Культура: "bg-violet-50 text-violet-700",
};

// ─── Home ─────────────────────────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="pb-nav">
      <div className="relative h-56 overflow-hidden">
        <img src={HERO_IMG} alt="Субботино" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-xs font-medium tracking-widest uppercase opacity-75 mb-1">Добро пожаловать</p>
          <h1 className="text-2xl font-bold leading-tight font-display">Субботино</h1>
          <p className="text-sm opacity-80 mt-0.5">Портал жителей нашего посёлка</p>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-[#3a7d55] text-white rounded-2xl px-4 py-3 flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-3">
          <span className="text-2xl">☀️</span>
          <div>
            <p className="text-lg font-semibold">+18°C</p>
            <p className="text-xs opacity-80">Ясно, ветер 3 м/с</p>
          </div>
        </div>
        <div className="text-right text-xs opacity-80">
          <p>3 мая 2026</p>
          <p>Суббота</p>
        </div>
      </div>

      <div className="px-4 mt-5">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">Разделы</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "Newspaper", label: "Новости", page: "news" as Page, color: "bg-blue-50 text-blue-600" },
            { icon: "Megaphone", label: "Объявления", page: "announcements" as Page, color: "bg-orange-50 text-orange-600" },
            { icon: "Phone", label: "Телефоны", page: "phonebook" as Page, color: "bg-green-50 text-green-700" },
            { icon: "MessageCircle", label: "Чат", page: "chat" as Page, color: "bg-violet-50 text-violet-600" },
            { icon: "UserCircle", label: "Кабинет", page: "profile" as Page, color: "bg-pink-50 text-pink-600" },
            { icon: "Info", label: "О нас", page: "about" as Page, color: "bg-yellow-50 text-yellow-700" },
          ].map((item, i) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`animate-fade-in-up stagger-${i + 1} flex flex-col items-center justify-center gap-2 rounded-2xl p-3 ${item.color} hover:scale-105 transition-transform active:scale-95`}
            >
              <Icon name={item.icon} size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Последние новости</p>
          <button onClick={() => onNavigate("news")} className="text-xs text-[#3a7d55] font-medium">Все →</button>
        </div>
        <div className="space-y-3">
          {news.slice(0, 2).map((item, i) => (
            <div key={item.id} className={`animate-fade-in-up stagger-${i + 2} bg-card rounded-xl p-4 shadow-sm border border-border`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <p className="font-semibold text-sm leading-tight">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5 mb-2">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Объявления</p>
          <button onClick={() => onNavigate("announcements")} className="text-xs text-[#3a7d55] font-medium">Все →</button>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8b6f47] text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {announcements[0].avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{announcements[0].title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{announcements[0].contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── News ─────────────────────────────────────────────────────────────────────

function NewsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    const item = news.find((n) => n.id === selected)!;
    return (
      <div className="pb-nav animate-fade-in">
        <div className="relative h-40 bg-gradient-to-br from-green-800 to-green-600 flex items-end p-5">
          <div className="text-white">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 text-white">{item.category}</span>
            <h2 className="text-xl font-bold mt-2 leading-tight">{item.title}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Icon name="Calendar" size={13} />
            <span>{item.date}</span>
            <span>·</span>
            <Icon name="Eye" size={13} />
            <span>{item.views} просмотров</span>
          </div>
          <p className="text-sm leading-relaxed">{item.text}</p>
          <button onClick={() => setSelected(null)} className="mt-6 flex items-center gap-1 text-sm text-[#3a7d55] font-medium">
            <Icon name="ArrowLeft" size={16} /> Назад к новостям
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xl font-bold">Новости</h2>
        <p className="text-sm text-muted-foreground">Субботино и округа</p>
      </div>
      <div className="px-4 space-y-3">
        {news.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`animate-fade-in-up stagger-${i + 1} w-full text-left bg-card rounded-xl p-4 shadow-sm border border-border hover:border-[#3a7d55] transition-colors active:scale-[0.98]`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                {item.category}
              </span>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="font-semibold text-sm leading-snug mb-1">{item.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{item.text}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Icon name="Eye" size={12} />
              <span>{item.views}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Announcements ────────────────────────────────────────────────────────────

function AnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="pb-nav">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Объявления</h2>
          <p className="text-sm text-muted-foreground">От жителей посёлка</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 bg-[#3a7d55] text-white text-sm font-medium px-3 py-2 rounded-lg active:scale-95 transition-transform"
        >
          <Icon name="Plus" size={15} />
          Добавить
        </button>
      </div>

      {showForm && (
        <div className="mx-4 mb-4 bg-card border border-border rounded-2xl p-4 animate-fade-in-up">
          <p className="font-semibold text-sm mb-3">Новое объявление</p>
          <input className="w-full border border-border rounded-xl px-3 py-2.5 text-sm mb-2 bg-background outline-none focus:border-[#3a7d55]" placeholder="Заголовок" />
          <textarea className="w-full border border-border rounded-xl px-3 py-2.5 text-sm mb-2 bg-background resize-none h-20 outline-none focus:border-[#3a7d55]" placeholder="Описание" />
          <input className="w-full border border-border rounded-xl px-3 py-2.5 text-sm mb-3 bg-background outline-none focus:border-[#3a7d55]" placeholder="Контактный телефон" />
          <button className="w-full bg-[#3a7d55] text-white text-sm font-medium py-2.5 rounded-xl">Опубликовать</button>
        </div>
      )}

      <div className="px-4 space-y-3">
        {announcements.map((item, i) => (
          <div key={item.id} className={`animate-fade-in-up stagger-${i + 1} bg-card rounded-xl p-4 shadow-sm border border-border`}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3a7d55] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.typeColor}`}>{item.type}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="font-semibold text-sm leading-snug">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.text}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-[#3a7d55] font-medium">
                  <Icon name="Phone" size={12} />
                  <span>{item.contact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Phonebook ────────────────────────────────────────────────────────────────

function PhonebookPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number[]>([1]);

  const toggle = (id: number) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const filtered = phonebook
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.phone.includes(search)
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="pb-nav">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xl font-bold">Телефонная книга</h2>
        <p className="text-sm text-muted-foreground">Важные номера посёлка</p>
      </div>

      <div className="px-4 mb-4">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#3a7d55]"
            placeholder="Поиск по имени или номеру"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 space-y-3">
        {filtered.map((cat, ci) => (
          <div key={cat.id} className={`animate-fade-in-up stagger-${ci + 1} bg-card rounded-xl border border-border shadow-sm overflow-hidden`}>
            <button className="w-full flex items-center justify-between px-4 py-3" onClick={() => toggle(cat.id)}>
              <p className="font-semibold text-sm">{cat.category}</p>
              <Icon name={expanded.includes(cat.id) ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
            </button>
            {expanded.includes(cat.id) && (
              <div className="border-t border-border divide-y divide-border">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors active:bg-accent"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={15} className="text-[#3a7d55]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.phone}</p>
                    </div>
                    <Icon name="PhoneCall" size={16} className="text-[#3a7d55] shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

function ChatPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "Вы",
        avatar: "Я",
        text: input.trim(),
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col" style={{ height: "100dvh" }}>
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background shrink-0">
        <h2 className="text-xl font-bold">Общий чат</h2>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          24 участника онлайн
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ paddingBottom: "calc(var(--nav-height) + 60px)" }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : ""} animate-fade-in`}>
            {!msg.isMe && (
              <div className="w-7 h-7 rounded-full bg-[#8b6f47] text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-1">
                {msg.avatar}
              </div>
            )}
            <div className={`max-w-[75%] flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
              {!msg.isMe && <p className="text-xs text-muted-foreground mb-1 ml-1">{msg.author}</p>}
              <div
                className={`px-3 py-2 text-sm ${
                  msg.isMe
                    ? "bg-[#3a7d55] text-white"
                    : "bg-card border border-border text-foreground"
                }`}
                style={{ borderRadius: msg.isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px" }}
              >
                {msg.text}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 mx-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-background border-t border-border px-4 py-3 flex gap-2 shrink-0"
        style={{ paddingBottom: "calc(var(--nav-height) + 8px)" }}
      >
        <input
          className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none"
          placeholder="Написать сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="w-10 h-10 rounded-xl bg-[#3a7d55] text-white flex items-center justify-center active:scale-95 transition-transform"
        >
          <Icon name="Send" size={17} />
        </button>
      </div>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="pb-nav px-4">
        <div className="pt-10 pb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <Icon name="UserCircle" size={40} className="text-[#3a7d55]" />
          </div>
          <h2 className="text-xl font-bold">Личный кабинет</h2>
          <p className="text-sm text-muted-foreground mt-1">Войдите, чтобы участвовать в жизни посёлка</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
            <input
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background outline-none focus:border-[#3a7d55]"
              placeholder="example@mail.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Пароль</label>
            <input
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background outline-none focus:border-[#3a7d55]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-[#3a7d55] text-white font-semibold py-2.5 rounded-xl text-sm active:scale-[0.98] transition-transform"
          >
            Войти
          </button>
          <button className="w-full text-[#3a7d55] text-sm font-medium py-1">Зарегистрироваться</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      <div className="bg-gradient-to-br from-green-800 to-[#3a7d55] px-4 pt-6 pb-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            ИИ
          </div>
          <div>
            <p className="font-bold text-lg">Иван Иванов</p>
            <p className="text-sm opacity-80">Житель · ул. Лесная, 7</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
              <span className="text-xs opacity-80">В посёлке с 2018 года</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3">
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Объявлений", value: "3" },
            { label: "Сообщений", value: "47" },
            { label: "Дней", value: "2923" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-3 text-center">
              <p className="text-xl font-bold text-[#3a7d55]">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border divide-y divide-border animate-fade-in-up">
          {[
            { icon: "Bell", label: "Уведомления", badge: "3" },
            { icon: "FileText", label: "Мои объявления", badge: null },
            { icon: "Settings", label: "Настройки", badge: null },
            { icon: "HelpCircle", label: "Помощь", badge: null },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors">
              <Icon name={item.icon} size={18} className="text-[#3a7d55]" />
              <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="w-full mt-4 border border-border rounded-xl py-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div className="pb-nav">
      <div className="relative h-44 overflow-hidden">
        <img src={HERO_IMG} alt="Субботино" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold font-display text-center drop-shadow-lg">О посёлке Субботино</h2>
        </div>
      </div>

      <div className="px-4 py-5 space-y-3">
        {[
          { icon: "MapPin", title: "Расположение", text: "Посёлок Субботино расположен в живописном месте, окружён лесами и полями. До районного центра — 15 км." },
          { icon: "Users", title: "Население", text: "Около 1 200 жителей. Активное сообщество соседей, которые помогают друг другу и развивают территорию." },
          { icon: "TreePine", title: "Природа", text: "Рядом протекает река. Богатые леса, чистый воздух и прекрасные виды в любое время года." },
          { icon: "Building2", title: "Инфраструктура", text: "Школа, детский сад, амбулатория, магазины, культурный центр и спортивная площадка." },
        ].map((item, i) => (
          <div key={item.title} className={`animate-fade-in-up stagger-${i + 1} bg-card rounded-xl border border-border p-4 flex gap-3`}>
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <Icon name={item.icon} size={18} className="text-[#3a7d55]" />
            </div>
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}

        <div className="bg-[#3a7d55] rounded-xl p-4 text-white text-center">
          <p className="font-semibold">Субботино.рф</p>
          <p className="text-sm opacity-80 mt-1">Официальный сайт поселения</p>
          <a href="https://субботино.рф" target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs underline opacity-80">
            Перейти на сайт →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={setPage} />;
      case "news": return <NewsPage />;
      case "announcements": return <AnnouncementsPage />;
      case "phonebook": return <PhonebookPage />;
      case "chat": return <ChatPage />;
      case "profile": return <ProfilePage />;
      case "about": return <AboutPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto relative overflow-x-hidden shadow-2xl">
      <div className="h-1 bg-[#3a7d55] w-full" />
      <main className="min-h-screen">{renderPage()}</main>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border z-50"
        style={{ height: "var(--nav-height)" }}
      >
        <div className="flex h-full">
          {navItems.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 transition-all ${
                  active ? "text-[#3a7d55]" : "text-muted-foreground"
                }`}
              >
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-[#3a7d55] rounded-b-full" />
                )}
                <Icon name={item.icon} size={active ? 22 : 20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
