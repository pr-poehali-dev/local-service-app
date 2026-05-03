import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "news" | "announcements" | "phonebook" | "chat" | "profile" | "about";

const HERO_IMG = "https://cdn.poehali.dev/projects/1ad84bbc-0154-4a1c-94b6-81c332429e38/files/f2cfe4a6-2526-479a-bccf-e76770acdaca.jpg";
const GREEN = "#2d6a4a";
const GREEN_DARK = "#1e4d34";

// ─── Data ─────────────────────────────────────────────────────────────────────

const news = [
  { id: 1, date: "3 мая 2026",   category: "Благоустройство", title: "Начался ремонт дороги на улице Лесной",        text: "Подрядная организация приступила к работам по асфальтированию. Ориентировочный срок завершения — 20 мая.", views: 142 },
  { id: 2, date: "1 мая 2026",   category: "Праздник",        title: "Первомайский субботник прошёл успешно",        text: "В нём приняли участие 47 жителей. Убрано более 2 км дорог, высажено 30 деревьев.", views: 98 },
  { id: 3, date: "28 апр 2026",  category: "ЖКХ",             title: "Плановое отключение воды 5 мая",              text: "С 9:00 до 17:00 будет отключена горячая вода в домах №1–24 по ул. Центральной.", views: 211 },
  { id: 4, date: "25 апр 2026",  category: "Культура",        title: "Открытие летнего сезона в клубе",             text: "7 мая в 18:00 состоится концерт местного ансамбля «Берёзка». Вход свободный.", views: 77 },
];

const announcements = [
  { id: 1, avatar: "И", date: "Сегодня",     type: "Продаю", typeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200", title: "Картофель домашний, 5 кг — 300 ₽", text: "Копаный в этом году, без химии. Звонить с 9 до 19.", contact: "+7 910 123-45-67" },
  { id: 2, avatar: "С", date: "Вчера",       type: "Услуги", typeColor: "bg-sky-50 text-sky-700 border border-sky-200",             title: "Выгул собак, уход за животными",    text: "Опыт 5 лет, есть рекомендации. Недорого.", contact: "+7 912 987-65-43" },
  { id: 3, avatar: "А", date: "2 дня назад", type: "Ищу",    typeColor: "bg-amber-50 text-amber-700 border border-amber-200",       title: "Ищу сварщика для забора",          text: "Нужно приварить секции профнастила, работы на 3–4 часа.", contact: "+7 920 111-22-33" },
  { id: 4, avatar: "Т", date: "3 дня назад", type: "Отдам",  typeColor: "bg-purple-50 text-purple-700 border border-purple-200",    title: "Котята в добрые руки, 3 шт.",      text: "2 рыжих и 1 серый. Здоровые, привитые. Бесплатно.", contact: "+7 905 444-55-66" },
];

const phonebook = [
  { id: 1, category: "Экстренные службы", items: [
    { name: "Пожарная охрана", phone: "101",              icon: "Flame" },
    { name: "Скорая помощь",   phone: "103",              icon: "Heart" },
    { name: "Полиция",         phone: "102",              icon: "Shield" },
    { name: "Газовая служба",  phone: "104",              icon: "Zap" },
  ]},
  { id: 2, category: "Администрация", items: [
    { name: "Глава поселения", phone: "+7 495 000-11-22", icon: "User" },
    { name: "Приёмная",        phone: "+7 495 000-11-23", icon: "Building" },
    { name: "Бухгалтерия",     phone: "+7 495 000-11-24", icon: "Calculator" },
  ]},
  { id: 3, category: "Коммунальные службы", items: [
    { name: "ЖКХ — диспетчер", phone: "+7 495 000-33-00", icon: "Wrench" },
    { name: "Водоканал",        phone: "+7 495 000-33-01", icon: "Droplets" },
    { name: "Электросети",      phone: "+7 495 000-33-02", icon: "Lightbulb" },
  ]},
  { id: 4, category: "Образование и культура", items: [
    { name: "Школа",       phone: "+7 495 000-44-11", icon: "GraduationCap" },
    { name: "Детский сад", phone: "+7 495 000-44-12", icon: "Baby" },
    { name: "Клуб",        phone: "+7 495 000-44-13", icon: "Music" },
    { name: "Библиотека",  phone: "+7 495 000-44-14", icon: "BookOpen" },
  ]},
];

const chatMessages = [
  { id: 1, author: "Марина С.", avatar: "М", text: "Добрый день! Кто знает, когда откроют новый магазин на углу?", time: "10:12", isMe: false },
  { id: 2, author: "Николай В.", avatar: "Н", text: "Говорят, к 9 мая точно откроют — видел рабочих там.", time: "10:15", isMe: false },
  { id: 3, author: "Вы", avatar: "Я", text: "Хорошая новость, ждём!", time: "10:18", isMe: true },
  { id: 4, author: "Ольга П.", avatar: "О", text: "А кто знает расписание автобуса на праздники?", time: "10:45", isMe: false },
  { id: 5, author: "Иван К.", avatar: "И", text: "Расписание висит на остановке. 7:30, 12:00, 17:30.", time: "10:47", isMe: false },
  { id: 6, author: "Вы", avatar: "Я", text: "Спасибо, очень кстати 👍", time: "10:49", isMe: true },
];

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home",          label: "Главная",  icon: "Home" },
  { id: "news",          label: "Новости",  icon: "Newspaper" },
  { id: "announcements", label: "Объявл.",  icon: "Megaphone" },
  { id: "phonebook",     label: "Контакты", icon: "Phone" },
  { id: "chat",          label: "Чат",      icon: "MessageCircle" },
  { id: "profile",       label: "Кабинет",  icon: "UserCircle" },
];

const catStyle: Record<string, string> = {
  Благоустройство: "bg-emerald-50 text-emerald-700",
  ЖКХ:            "bg-orange-50 text-orange-700",
  Праздник:       "bg-rose-50 text-rose-700",
  Культура:       "bg-violet-50 text-violet-700",
};

function Pill({ label }: { label: string }) {
  return (
    <span className={`inline-block text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded ${catStyle[label] || "bg-gray-100 text-gray-600"}`}>
      {label}
    </span>
  );
}

function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 pt-5 pb-4 border-b border-border bg-card">
      <h2 className="text-[22px] font-bold tracking-tight leading-tight">{title}</h2>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="pb-nav">
      <div className="relative h-52 overflow-hidden">
        <img src={HERO_IMG} alt="Субботино" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-white">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-1">Портал жителей</p>
          <h1 className="text-[28px] font-bold leading-none tracking-tight font-display">Субботино</h1>
        </div>
      </div>

      {/* Weather strip */}
      <div className="mx-4 mt-3 rounded-md border border-border bg-card flex items-center justify-between px-4 py-3 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <span className="text-lg">☀️</span>
          <div>
            <p className="text-base font-bold leading-none">+18°C</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Ясно, ветер 3 м/с</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold">3 мая 2026</p>
          <p className="text-[11px] text-muted-foreground">Суббота</p>
        </div>
      </div>

      {/* Sections */}
      <div className="px-4 mt-4">
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-2.5">Разделы</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "Newspaper",     label: "Новости",    page: "news" as Page },
            { icon: "Megaphone",     label: "Объявления", page: "announcements" as Page },
            { icon: "Phone",         label: "Телефоны",   page: "phonebook" as Page },
            { icon: "MessageCircle", label: "Чат",        page: "chat" as Page },
            { icon: "UserCircle",    label: "Кабинет",    page: "profile" as Page },
            { icon: "Info",          label: "О посёлке",  page: "about" as Page },
          ].map((item, i) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`stagger-${i + 1} animate-fade-in-up flex flex-col items-center justify-center gap-1.5 rounded-md border border-border bg-card py-4 active:bg-muted transition-colors`}
            >
              <Icon name={item.icon} size={20} className="text-foreground" />
              <span className="text-[11px] font-semibold text-muted-foreground">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Latest news */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">Новости</p>
          <button onClick={() => onNavigate("news")} className="text-[11px] font-bold" style={{ color: GREEN }}>Все →</button>
        </div>
        <div className="space-y-2">
          {news.slice(0, 2).map((item, i) => (
            <div key={item.id} className={`stagger-${i + 2} animate-fade-in-up bg-card border border-border rounded-md px-4 py-3`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Pill label={item.category} />
                <span className="text-[10px] text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-sm font-semibold leading-snug">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement */}
      <div className="px-4 mt-4 mb-2">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">Объявления</p>
          <button onClick={() => onNavigate("announcements")} className="text-[11px] font-bold" style={{ color: GREEN }}>Все →</button>
        </div>
        <div className="bg-card border border-border rounded-md px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: GREEN }}>
            {announcements[0].avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{announcements[0].title}</p>
            <p className="text-[11px] text-muted-foreground">{announcements[0].contact}</p>
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
    const item = news.find(n => n.id === selected)!;
    return (
      <div className="pb-nav animate-fade-in">
        <div className="px-5 pt-5 pb-5 border-b border-border bg-card">
          <Pill label={item.category} />
          <h2 className="text-xl font-bold tracking-tight leading-snug mt-2">{item.title}</h2>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{item.date}</span>
            <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{item.views} просмотров</span>
          </div>
        </div>
        <div className="px-5 pt-4">
          <p className="text-sm leading-relaxed">{item.text}</p>
          <button onClick={() => setSelected(null)} className="mt-6 flex items-center gap-1 text-sm font-bold" style={{ color: GREEN }}>
            <Icon name="ArrowLeft" size={14} /> Назад к новостям
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      <PageHeader title="Новости" sub="Субботино и округа" />
      <div className="px-4 pt-3 space-y-2">
        {news.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`stagger-${i + 1} animate-fade-in-up w-full text-left bg-card border border-border rounded-md px-4 py-3 active:bg-muted transition-colors`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Pill label={item.category} />
              <span className="text-[10px] text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm font-semibold leading-snug">{item.title}</p>
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{item.text}</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] text-muted-foreground">
              <Icon name="Eye" size={11} /><span>{item.views}</span>
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
      <div className="px-5 pt-5 pb-4 border-b border-border bg-card flex items-start justify-between">
        <div>
          <h2 className="text-[22px] font-bold tracking-tight">Объявления</h2>
          <p className="text-xs text-muted-foreground mt-0.5">От жителей посёлка</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 text-white text-xs font-bold px-3 py-2 rounded-md active:opacity-80 mt-0.5"
          style={{ background: GREEN }}
        >
          <Icon name="Plus" size={13} /> Добавить
        </button>
      </div>

      {showForm && (
        <div className="mx-4 mt-3 bg-card border border-border rounded-md p-4 animate-fade-in-up">
          <p className="text-sm font-bold mb-3">Новое объявление</p>
          <input className="w-full border border-border rounded-md px-3 py-2.5 text-sm mb-2 bg-background outline-none focus:border-foreground" placeholder="Заголовок" />
          <textarea className="w-full border border-border rounded-md px-3 py-2.5 text-sm mb-2 bg-background resize-none h-20 outline-none focus:border-foreground" placeholder="Описание" />
          <input className="w-full border border-border rounded-md px-3 py-2.5 text-sm mb-3 bg-background outline-none focus:border-foreground" placeholder="Контактный телефон" />
          <button className="w-full text-white text-sm font-bold py-2.5 rounded-md" style={{ background: GREEN }}>Опубликовать</button>
        </div>
      )}

      <div className="px-4 pt-3 space-y-2">
        {announcements.map((item, i) => (
          <div key={item.id} className={`stagger-${i + 1} animate-fade-in-up bg-card border border-border rounded-md px-4 py-3`}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: GREEN }}>
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.typeColor}`}>{item.type}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm font-semibold leading-snug">{item.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{item.text}</p>
                <a href={`tel:${item.contact}`} className="flex items-center gap-1 mt-1.5 text-[11px] font-bold" style={{ color: GREEN }}>
                  <Icon name="Phone" size={11} />{item.contact}
                </a>
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
  const toggle = (id: number) => setExpanded(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const filtered = phonebook
    .map(cat => ({ ...cat, items: cat.items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.phone.includes(search)) }))
    .filter(cat => cat.items.length > 0);

  return (
    <div className="pb-nav">
      <PageHeader title="Телефонная книга" sub="Важные номера посёлка" />
      <div className="px-4 pt-3 mb-3">
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full bg-card border border-border rounded-md pl-8 pr-3 py-2.5 text-sm outline-none focus:border-foreground"
            placeholder="Поиск"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="px-4 space-y-2">
        {filtered.map((cat, ci) => (
          <div key={cat.id} className={`stagger-${ci + 1} animate-fade-in-up bg-card border border-border rounded-md overflow-hidden`}>
            <button className="w-full flex items-center justify-between px-4 py-3" onClick={() => toggle(cat.id)}>
              <p className="text-sm font-bold">{cat.category}</p>
              <Icon name={expanded.includes(cat.id) ? "ChevronUp" : "ChevronDown"} size={14} className="text-muted-foreground" />
            </button>
            {expanded.includes(cat.id) && (
              <div className="border-t border-border divide-y divide-border">
                {cat.items.map(item => (
                  <a key={item.name} href={`tel:${item.phone}`} className="flex items-center gap-3 px-4 py-3 active:bg-muted transition-colors">
                    <div className="w-7 h-7 rounded bg-muted flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={13} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">{item.phone}</p>
                    </div>
                    <Icon name="PhoneCall" size={14} className="shrink-0" style={{ color: GREEN }} />
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
    setMessages(p => [...p, {
      id: p.length + 1, author: "Вы", avatar: "Я", text: input.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }]);
    setInput("");
  };

  return (
    <div className="flex flex-col" style={{ height: "100dvh" }}>
      <div className="px-5 pt-5 pb-3 border-b border-border bg-card shrink-0">
        <h2 className="text-[22px] font-bold tracking-tight">Общий чат</h2>
        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          24 участника онлайн
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ paddingBottom: "calc(var(--nav-height) + 68px)" }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : ""} animate-fade-in`}>
            {!msg.isMe && (
              <div className="w-7 h-7 rounded bg-muted flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                {msg.avatar}
              </div>
            )}
            <div className={`max-w-[76%] flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
              {!msg.isMe && <p className="text-[10px] text-muted-foreground mb-1 ml-1">{msg.author}</p>}
              <div
                className="px-3 py-2 text-sm"
                style={{
                  background: msg.isMe ? GREEN : "#fff",
                  color: msg.isMe ? "#fff" : "inherit",
                  border: msg.isMe ? "none" : "1px solid hsl(var(--border))",
                  borderRadius: msg.isMe ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                }}
              >
                {msg.text}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 mx-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border-t border-border px-4 py-3 flex gap-2 shrink-0" style={{ paddingBottom: "calc(var(--nav-height) + 8px)" }}>
        <input
          className="flex-1 bg-background border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-foreground"
          placeholder="Написать сообщение..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button onClick={send} className="w-10 h-10 rounded-md flex items-center justify-center text-white active:opacity-80 shrink-0" style={{ background: GREEN }}>
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────

function ProfilePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!loggedIn) {
    return (
      <div className="pb-nav">
        <PageHeader title="Личный кабинет" />
        <div className="px-4 pt-10 pb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded bg-muted flex items-center justify-center mb-4">
            <Icon name="UserCircle" size={36} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-[220px]">
            Войдите, чтобы участвовать в жизни посёлка
          </p>
        </div>
        <div className="px-4 space-y-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1 block">Email</label>
            <input className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-card outline-none focus:border-foreground" placeholder="example@mail.ru" value={email} onChange={e => setEmail(e.target.value)} type="email" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1 block">Пароль</label>
            <input className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-card outline-none focus:border-foreground" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          </div>
          <button onClick={() => setLoggedIn(true)} className="w-full text-white font-bold py-2.5 rounded-md text-sm active:opacity-80" style={{ background: GREEN }}>
            Войти
          </button>
          <button className="w-full text-sm font-semibold py-2" style={{ color: GREEN }}>Зарегистрироваться</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      <div className="px-5 pt-5 pb-5 border-b border-border" style={{ background: GREEN_DARK }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded bg-white/15 flex items-center justify-center text-xl font-bold text-white">ИИ</div>
          <div className="text-white">
            <p className="font-bold text-base">Иван Иванов</p>
            <p className="text-xs opacity-75">Житель · ул. Лесная, 7</p>
            <p className="text-[10px] opacity-50 mt-0.5">В посёлке с 2018 года</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Объявлений",     value: "3" },
            { label: "Сообщений",      value: "47" },
            { label: "Дней",           value: "2 923" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-md p-3 text-center">
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-md divide-y divide-border">
          {[
            { icon: "Bell",       label: "Уведомления",    badge: "3" },
            { icon: "FileText",   label: "Мои объявления", badge: null },
            { icon: "Settings",   label: "Настройки",      badge: null },
            { icon: "HelpCircle", label: "Помощь",         badge: null },
          ].map(item => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-muted transition-colors">
              <Icon name={item.icon} size={16} className="text-foreground" />
              <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={13} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button onClick={() => setLoggedIn(false)} className="w-full mt-3 border border-border rounded-md py-3 text-sm text-muted-foreground active:bg-muted transition-colors">
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
      <div className="relative h-40 overflow-hidden">
        <img src={HERO_IMG} alt="Субботино" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="text-white text-2xl font-bold font-display drop-shadow-lg">О посёлке Субботино</h2>
        </div>
      </div>
      <div className="px-4 pt-4 space-y-2">
        {[
          { icon: "MapPin",    title: "Расположение",   text: "Посёлок Субботино расположен в живописном месте, окружён лесами и полями. До районного центра — 15 км." },
          { icon: "Users",     title: "Население",      text: "Около 1 200 жителей. Активное сообщество, которое помогает друг другу и развивает территорию." },
          { icon: "TreePine",  title: "Природа",        text: "Рядом протекает река. Богатые леса, чистый воздух и прекрасные виды в любое время года." },
          { icon: "Building2", title: "Инфраструктура", text: "Школа, детский сад, амбулатория, магазины, культурный центр и спортивная площадка." },
        ].map((item, i) => (
          <div key={item.title} className={`stagger-${i + 1} animate-fade-in-up bg-card border border-border rounded-md px-4 py-3 flex gap-3`}>
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
              <Icon name={item.icon} size={15} className="text-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
        <div className="rounded-md p-4 text-white text-center" style={{ background: GREEN_DARK }}>
          <p className="font-bold text-sm tracking-wide">СУББОТИНО.РФ</p>
          <p className="text-xs opacity-60 mt-0.5">Официальный сайт поселения</p>
          <a href="https://субботино.рф" target="_blank" rel="noreferrer" className="text-[11px] underline opacity-60 inline-block mt-1.5">
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

  const render = () => {
    switch (page) {
      case "home":          return <HomePage onNavigate={setPage} />;
      case "news":          return <NewsPage />;
      case "announcements": return <AnnouncementsPage />;
      case "phonebook":     return <PhonebookPage />;
      case "chat":          return <ChatPage />;
      case "profile":       return <ProfilePage />;
      case "about":         return <AboutPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto relative overflow-x-hidden">
      <div className="h-[3px] w-full" style={{ background: GREEN_DARK }} />
      <main className="min-h-screen">{render()}</main>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border z-50"
        style={{ height: "var(--nav-height)" }}
      >
        <div className="flex h-full">
          {navItems.map(item => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="relative flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
                style={{ color: active ? GREEN : "hsl(var(--muted-foreground))" }}
              >
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-6" style={{ background: GREEN }} />
                )}
                <Icon name={item.icon} size={18} />
                <span className="text-[9px] font-bold tracking-wide uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
