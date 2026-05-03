import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "news" | "announcements" | "phonebook" | "chat" | "profile" | "about";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/1ad84bbc-0154-4a1c-94b6-81c332429e38/files/f2cfe4a6-2526-479a-bccf-e76770acdaca.jpg";

const BLUE = "#0d6efd";
const BLUE_DARK = "#0a58ca";
const SUCCESS = "#198754";

// ─── Data ─────────────────────────────────────────────────────────────────────

const news = [
  { id: 1, date: "3 мая 2026",  category: "Благоустройство", title: "Начался ремонт дороги на улице Лесной",       text: "Подрядная организация приступила к работам по асфальтированию. Ориентировочный срок завершения — 20 мая.", views: 142 },
  { id: 2, date: "1 мая 2026",  category: "Праздник",        title: "Первомайский субботник прошёл успешно",       text: "В нём приняли участие 47 жителей. Убрано более 2 км дорог, высажено 30 деревьев.", views: 98 },
  { id: 3, date: "28 апр 2026", category: "ЖКХ",             title: "Плановое отключение воды 5 мая",             text: "С 9:00 до 17:00 будет отключена горячая вода в домах №1–24 по ул. Центральной.", views: 211 },
  { id: 4, date: "25 апр 2026", category: "Культура",        title: "Открытие летнего сезона в клубе",            text: "7 мая в 18:00 состоится концерт местного ансамбля «Берёзка». Вход свободный.", views: 77 },
];

const announcements = [
  { id: 1, avatar: "И", date: "Сегодня",     type: "Продаю", badge: "success",  title: "Картофель домашний, 5 кг — 300 ₽",  text: "Копаный в этом году, без химии. Звонить с 9 до 19.", contact: "+7 910 123-45-67" },
  { id: 2, avatar: "С", date: "Вчера",       type: "Услуги", badge: "primary",  title: "Выгул собак, уход за животными",     text: "Опыт 5 лет, есть рекомендации. Недорого.", contact: "+7 912 987-65-43" },
  { id: 3, avatar: "А", date: "2 дня назад", type: "Ищу",    badge: "warning",  title: "Ищу сварщика для забора",            text: "Нужно приварить секции профнастила, работы на 3–4 часа.", contact: "+7 920 111-22-33" },
  { id: 4, avatar: "Т", date: "3 дня назад", type: "Отдам",  badge: "secondary",title: "Котята в добрые руки, 3 шт.",        text: "2 рыжих и 1 серый. Здоровые, привитые. Бесплатно.", contact: "+7 905 444-55-66" },
];

const badgeClass: Record<string, string> = {
  success:   "bg-emerald-100 text-emerald-700",
  primary:   "bg-blue-100 text-blue-700",
  warning:   "bg-amber-100 text-amber-700",
  secondary: "bg-gray-100 text-gray-600",
};

const phonebook = [
  { id: 1, category: "🚨 Экстренные службы", items: [
    { name: "Пожарная охрана", phone: "101", icon: "Flame" },
    { name: "Скорая помощь",   phone: "103", icon: "Heart" },
    { name: "Полиция",         phone: "102", icon: "Shield" },
    { name: "Газовая служба",  phone: "104", icon: "Zap" },
  ]},
  { id: 2, category: "🏛 Администрация", items: [
    { name: "Глава поселения", phone: "+7 495 000-11-22", icon: "User" },
    { name: "Приёмная",        phone: "+7 495 000-11-23", icon: "Building" },
    { name: "Бухгалтерия",     phone: "+7 495 000-11-24", icon: "Calculator" },
  ]},
  { id: 3, category: "🔧 Коммунальные службы", items: [
    { name: "ЖКХ — диспетчер", phone: "+7 495 000-33-00", icon: "Wrench" },
    { name: "Водоканал",        phone: "+7 495 000-33-01", icon: "Droplets" },
    { name: "Электросети",      phone: "+7 495 000-33-02", icon: "Lightbulb" },
  ]},
  { id: 4, category: "🎓 Образование и культура", items: [
    { name: "Школа",       phone: "+7 495 000-44-11", icon: "GraduationCap" },
    { name: "Детский сад", phone: "+7 495 000-44-12", icon: "Baby" },
    { name: "Клуб",        phone: "+7 495 000-44-13", icon: "Music" },
    { name: "Библиотека",  phone: "+7 495 000-44-14", icon: "BookOpen" },
  ]},
];

const catBadge: Record<string, string> = {
  Благоустройство: "bg-emerald-100 text-emerald-700",
  ЖКХ:            "bg-orange-100 text-orange-700",
  Праздник:       "bg-pink-100 text-pink-700",
  Культура:       "bg-violet-100 text-violet-700",
};

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

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Badge({ label, className }: { label: string; className?: string }) {
  const cls = catBadge[label] || "bg-gray-100 text-gray-600";
  return <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls} ${className || ""}`}>{label}</span>;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-card ${className || ""}`}>
      {children}
    </div>
  );
}

function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="px-5 pt-5 pb-4 flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {sub && <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full bg-white border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-blue-400 transition-all ${className || ""}`}
      style={{ focusRingColor: BLUE }}
      {...props}
    />
  );
}

function Btn({ children, variant = "primary", className, onClick }: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl px-4 py-2.5 transition-all active:scale-95";
  const variants = {
    primary: "text-white shadow-sm hover:opacity-90",
    outline: "border border-border bg-white text-foreground hover:bg-muted",
    ghost:   "bg-transparent text-muted-foreground hover:bg-muted",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className || ""}`}
      style={variant === "primary" ? { background: BLUE } : undefined}
    >
      {children}
    </button>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

const quickNav = [
  { icon: "Newspaper",     label: "Новости",    page: "news" as Page,          grad: "linear-gradient(135deg,#667eea,#764ba2)", emoji: "📰" },
  { icon: "Megaphone",     label: "Объявления", page: "announcements" as Page, grad: "linear-gradient(135deg,#f093fb,#f5576c)", emoji: "📢" },
  { icon: "Phone",         label: "Телефоны",   page: "phonebook" as Page,     grad: "linear-gradient(135deg,#4facfe,#00f2fe)", emoji: "📞" },
  { icon: "MessageCircle", label: "Чат",        page: "chat" as Page,          grad: "linear-gradient(135deg,#43e97b,#38f9d7)", emoji: "💬" },
  { icon: "UserCircle",    label: "Кабинет",    page: "profile" as Page,       grad: "linear-gradient(135deg,#fa709a,#fee140)", emoji: "👤" },
  { icon: "Info",          label: "О посёлке",  page: "about" as Page,         grad: "linear-gradient(135deg,#a18cd1,#fbc2eb)", emoji: "🏡" },
];

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="pb-nav overflow-x-hidden">

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a58ca 0%, #0d6efd 60%, #3d8bff 100%)" }}
      >
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute top-6 right-16 w-16 h-16 rounded-full bg-white/8" />

        <div className="relative px-5 pt-8 pb-7 text-white">
          {/* label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-white/60">Портал жителей</span>
          </div>

          {/* title */}
          <h1 className="text-[38px] font-bold leading-none tracking-tight font-display">Субботино</h1>
          <p className="text-sm text-white/60 mt-1.5">Всё важное — рядом с вами</p>

          {/* weather row */}
          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/15">
            <span className="text-2xl">☀️</span>
            <div>
              <p className="text-lg font-bold leading-none">+18°C</p>
              <p className="text-xs text-white/55 mt-0.5">Ясно · ветер 3 м/с</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-semibold">3 мая 2026</p>
              <p className="text-xs text-white/55">Суббота</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick nav ── */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Разделы</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {quickNav.map((item, i) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`stagger-${i + 1} animate-fade-in-up group relative flex flex-col items-center justify-center gap-2 rounded-2xl py-6 active:scale-95 transition-all duration-200 overflow-hidden shadow-md`}
              style={{ background: item.grad }}
            >
              <div className="absolute inset-0 bg-black/0 group-active:bg-black/10 transition-colors" />
              <span className="text-3xl drop-shadow">{item.emoji}</span>
              <span className="text-xs font-bold text-white drop-shadow-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Alert banner ── */}
      <div className="px-5 mt-5">
        <div
          className="rounded-2xl px-4 py-3.5 flex items-center gap-3 animate-fade-in-up stagger-2"
          style={{ background: "linear-gradient(135deg, #fff3cd, #ffeeba)" }}
        >
          <span className="text-2xl shrink-0">⚠️</span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-amber-800">Важно · 5 мая</p>
            <p className="text-sm font-semibold text-amber-900 leading-snug mt-0.5 truncate">
              Отключение горячей воды с 9:00 до 17:00
            </p>
          </div>
          <button onClick={() => onNavigate("news")} className="shrink-0 text-amber-700 ml-auto">
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>

      {/* ── News feed ── */}
      <div className="mt-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <p className="text-base font-bold">Новости</p>
          <button onClick={() => onNavigate("news")} className="text-xs font-semibold" style={{ color: BLUE }}>
            Все новости →
          </button>
        </div>

        {/* first news — big card */}
        <button
          onClick={() => onNavigate("news")}
          className="stagger-3 animate-fade-in-up w-full px-5 mb-3 text-left"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img src={HERO_IMG} alt="" className="w-full h-40 object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
              <Badge label={news[0].category} />
              <p className="text-white font-bold text-sm mt-1.5 leading-snug">{news[0].title}</p>
              <p className="text-white/60 text-xs mt-1">{news[0].date}</p>
            </div>
          </div>
        </button>

        {/* rest news — horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
          {news.slice(1).map((item, i) => (
            <button
              key={item.id}
              onClick={() => onNavigate("news")}
              className={`stagger-${i + 4} animate-fade-in-up shrink-0 w-[60vw] max-w-[240px] text-left bg-white rounded-2xl shadow-card overflow-hidden active:scale-95 transition-transform`}
            >
              <div className="h-28 overflow-hidden">
                <img src={HERO_IMG} alt="" className="w-full h-full object-cover" style={{ filter: `hue-rotate(${i * 40}deg) saturate(0.7)` }} />
              </div>
              <div className="px-3.5 py-3">
                <Badge label={item.category} />
                <p className="text-sm font-semibold mt-1.5 leading-snug line-clamp-2">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Announcements preview ── */}
      <div className="mt-5 px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-bold">Объявления</p>
          <button onClick={() => onNavigate("announcements")} className="text-xs font-semibold" style={{ color: BLUE }}>
            Все →
          </button>
        </div>
        <div className="space-y-2.5">
          {announcements.slice(0, 2).map((item, i) => (
            <Card
              key={item.id}
              className={`stagger-${i + 2} animate-fade-in-up flex items-center gap-3 px-4 py-3.5`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
                style={{ background: i === 0 ? quickNav[1].grad : quickNav[3].grad }}
              >
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass[item.badge]}`}>{item.type}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.contact}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground shrink-0" />
            </Card>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="px-5 mb-2">
        <div
          className="rounded-2xl px-5 py-5 text-white animate-fade-in-up stagger-4"
          style={{ background: "linear-gradient(135deg, #0a58ca 0%, #0d6efd 50%, #3d8bff 100%)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4">Посёлок в цифрах</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: "1 200", l: "жителей" },
              { v: "47",    l: "домов" },
              { v: "2018",  l: "основан" },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl font-bold leading-none">{s.v}</p>
                <p className="text-xs opacity-65 mt-1">{s.l}</p>
              </div>
            ))}
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
        <div className="relative h-44 overflow-hidden">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
          >
            <Icon name="ArrowLeft" size={18} className="text-foreground" />
          </button>
        </div>
        <div className="px-4 pt-4">
          <Badge label={item.category} />
          <h2 className="text-xl font-bold mt-2 leading-snug">{item.title}</h2>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Icon name="Calendar" size={12} />{item.date}</span>
            <span className="flex items-center gap-1"><Icon name="Eye" size={12} />{item.views} просмотров</span>
          </div>
          <p className="text-sm leading-relaxed mt-4 text-foreground">{item.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      <PageHeader title="Новости" sub="Субботино и округа" />
      <div className="px-5 space-y-3">
        {news.map((item, i) => (
          <Card
            key={item.id}
            className={`stagger-${i + 1} animate-fade-in-up px-4 py-4 cursor-pointer active:scale-[0.99] transition-transform`}
          >
            <button className="w-full text-left" onClick={() => setSelected(item.id)}>
              <div className="flex items-center gap-2 mb-2">
                <Badge label={item.category} />
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-sm font-semibold leading-snug">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.text}</p>
              <div className="flex items-center gap-1 mt-2.5 text-xs text-muted-foreground">
                <Icon name="Eye" size={12} /><span>{item.views}</span>
              </div>
            </button>
          </Card>
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
      <PageHeader
        title="Объявления"
        sub="От жителей посёлка"
        action={
          <Btn onClick={() => setShowForm(!showForm)} className="mt-0.5">
            <Icon name="Plus" size={15} />
            Добавить
          </Btn>
        }
      />

      {showForm && (
        <div className="px-5 mb-4">
          <Card className="p-4 animate-fade-in-up">
            <p className="text-sm font-bold mb-3">Новое объявление</p>
            <div className="space-y-2.5">
              <Input placeholder="Заголовок" />
              <textarea
                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 resize-none h-24"
                placeholder="Описание"
              />
              <Input placeholder="Контактный телефон" type="tel" />
              <Btn className="w-full justify-center">Опубликовать</Btn>
            </div>
          </Card>
        </div>
      )}

      <div className="px-5 space-y-3">
        {announcements.map((item, i) => (
          <Card key={item.id} className={`stagger-${i + 1} animate-fade-in-up px-4 py-4`}>
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: BLUE }}
              >
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass[item.badge]}`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm font-semibold leading-snug">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.text}</p>
                <a
                  href={`tel:${item.contact}`}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold rounded-full px-3 py-1"
                  style={{ background: "#e7f1ff", color: BLUE_DARK }}
                >
                  <Icon name="Phone" size={11} />
                  {item.contact}
                </a>
              </div>
            </div>
          </Card>
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
    .map(cat => ({
      ...cat,
      items: cat.items.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) || i.phone.includes(search)
      ),
    }))
    .filter(cat => cat.items.length > 0);

  return (
    <div className="pb-nav">
      <PageHeader title="Телефонная книга" sub="Важные номера посёлка" />
      <div className="px-5 mb-4">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Поиск по имени или номеру" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="px-5 space-y-3">
        {filtered.map((cat, ci) => (
          <Card key={cat.id} className={`stagger-${ci + 1} animate-fade-in-up overflow-hidden`}>
            <button
              className="w-full flex items-center justify-between px-4 py-3.5"
              onClick={() => toggle(cat.id)}
            >
              <p className="text-sm font-semibold">{cat.category}</p>
              <Icon name={expanded.includes(cat.id) ? "ChevronUp" : "ChevronDown"} size={17} className="text-muted-foreground" />
            </button>
            {expanded.includes(cat.id) && (
              <div className="border-t border-border divide-y divide-border">
                {cat.items.map(item => (
                  <a
                    key={item.name}
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#e7f1ff" }}>
                      <Icon name={item.icon} size={16} style={{ color: BLUE }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.phone}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#d1e7dd" }}>
                      <Icon name="PhoneCall" size={14} style={{ color: SUCCESS }} />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Card>
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
      <div className="px-4 pt-5 pb-3.5 border-b border-border bg-white shrink-0 shadow-sm">
        <h2 className="text-xl font-bold">Общий чат</h2>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          24 участника онлайн
        </p>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        style={{ paddingBottom: "calc(var(--nav-height) + 76px)" }}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.isMe ? "flex-row-reverse" : ""} animate-fade-in`}>
            {!msg.isMe && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1" style={{ background: BLUE }}>
                {msg.avatar}
              </div>
            )}
            <div className={`max-w-[78%] flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
              {!msg.isMe && <p className="text-xs text-muted-foreground mb-1 ml-1">{msg.author}</p>}
              <div
                className="px-4 py-2.5 text-sm shadow-sm"
                style={{
                  background: msg.isMe ? BLUE : "#fff",
                  color: msg.isMe ? "#fff" : "inherit",
                  border: msg.isMe ? "none" : "1px solid hsl(var(--border))",
                  borderRadius: msg.isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                }}
              >
                {msg.text}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 mx-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-white border-t border-border px-4 py-3 flex gap-2.5 shrink-0"
        style={{ paddingBottom: "calc(var(--nav-height) + 8px)" }}
      >
        <input
          className="flex-1 bg-muted rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all"
          placeholder="Написать сообщение..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow active:scale-95 transition-transform shrink-0"
          style={{ background: BLUE }}
        >
          <Icon name="Send" size={17} />
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
      <div className="pb-nav px-4">
        <div className="pt-10 pb-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "#e7f1ff" }}>
            <Icon name="UserCircle" size={42} style={{ color: BLUE }} />
          </div>
          <h2 className="text-xl font-bold">Личный кабинет</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-[220px]">Войдите, чтобы участвовать в жизни посёлка</p>
        </div>
        <Card className="p-5">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Электронная почта</label>
              <Input placeholder="example@mail.ru" value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Пароль</label>
              <Input placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} type="password" />
            </div>
            <Btn className="w-full justify-center mt-1" onClick={() => setLoggedIn(true)}>Войти</Btn>
            <button className="w-full text-sm font-semibold py-1" style={{ color: BLUE }}>
              Зарегистрироваться
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      {/* Header banner */}
      <div className="px-4 pt-6 pb-6" style={{ background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})` }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white shadow">
            ИИ
          </div>
          <div className="text-white">
            <p className="font-bold text-lg">Иван Иванов</p>
            <p className="text-sm opacity-80">Житель · ул. Лесная, 7</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
              <span className="text-xs opacity-70">В посёлке с 2018 года</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-3 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Объявлений", value: "3" },
            { label: "Сообщений",  value: "47" },
            { label: "Дней",       value: "2 923" },
          ].map(s => (
            <Card key={s.label} className="p-3 text-center">
              <p className="text-xl font-bold" style={{ color: BLUE }}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Menu */}
        <Card className="divide-y divide-border overflow-hidden">
          {[
            { icon: "Bell",       label: "Уведомления",    badge: "3" },
            { icon: "FileText",   label: "Мои объявления", badge: null },
            { icon: "Settings",   label: "Настройки",      badge: null },
            { icon: "HelpCircle", label: "Помощь",         badge: null },
          ].map(item => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted transition-colors">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#e7f1ff" }}>
                <Icon name={item.icon} size={17} style={{ color: BLUE }} />
              </div>
              <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
            </button>
          ))}
        </Card>

        <Btn variant="outline" className="w-full justify-center" onClick={() => setLoggedIn(false)}>
          Выйти из аккаунта
        </Btn>
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
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="text-white text-2xl font-bold font-display drop-shadow-lg">О посёлке Субботино</h2>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-3">
        {[
          { icon: "MapPin",    title: "Расположение",   text: "Посёлок Субботино расположен в живописном месте, окружён лесами и полями. До районного центра — 15 км." },
          { icon: "Users",     title: "Население",      text: "Около 1 200 жителей. Активное сообщество, которое помогает друг другу и развивает территорию." },
          { icon: "TreePine",  title: "Природа",        text: "Рядом протекает река. Богатые леса, чистый воздух и прекрасные виды в любое время года." },
          { icon: "Building2", title: "Инфраструктура", text: "Школа, детский сад, амбулатория, магазины, культурный центр и спортивная площадка." },
        ].map((item, i) => (
          <Card key={item.title} className={`stagger-${i + 1} animate-fade-in-up px-4 py-3.5 flex gap-3.5`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#e7f1ff" }}>
              <Icon name={item.icon} size={18} style={{ color: BLUE }} />
            </div>
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.text}</p>
            </div>
          </Card>
        ))}

        <div className="rounded-2xl p-5 text-white text-center shadow-card" style={{ background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})` }}>
          <p className="font-bold text-base">субботино.рф</p>
          <p className="text-sm opacity-75 mt-0.5">Официальный сайт поселения</p>
          <a
            href="https://субботино.рф"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2.5 text-xs bg-white/20 hover:bg-white/30 transition-colors px-4 py-1.5 rounded-full font-semibold"
          >
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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <main className="min-h-screen max-w-lg mx-auto">{render()}</main>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 shadow-[0_-2px_12px_rgba(0,0,0,0.07)]"
        style={{ height: "var(--nav-height)" }}
      >
        <div className="flex h-full max-w-lg mx-auto">
          {navItems.map(item => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
                style={{ color: active ? BLUE : "hsl(var(--muted-foreground))" }}
              >
                {active && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-10 rounded-b-full"
                    style={{ background: BLUE }}
                  />
                )}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${active ? "bg-blue-50" : ""}`}>
                  <Icon name={item.icon} size={20} />
                </div>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}