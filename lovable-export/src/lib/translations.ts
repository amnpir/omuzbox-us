export type Lang = "EN" | "RU";

export type Translations = {
  meta: { title: string; description: string };
  nav: { courses: string; how: string; pricing: string; reviews: string; faq: string; contact: string; cta: string };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    levelHint: string;
    levelLink: string;
    social: string;
    handNote: string;
    liveName: string;
    liveStatus: string;
    progressTitle: string;
    progressSub: string;
    ielts: string;
    ieltsSub: string;
    timezone: string;
  };
  stickyCta: { label: string; aria: string };
  metrics: { students: string; duration: string; practice: string; certified: string };
  features: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    items: Array<{ title: string; text: string }>;
  };
  courses: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    more: string;
    items: Array<{ t: string; d: string; r: string; badge?: string }>;
  };
  levels: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    items: Array<{ c: string; e: string; desc: string }>;
  };
  how: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    steps: Array<{ t: string; d: string }>;
    timelineTitle: string;
    timeline: Array<{ m: string; t: string; d: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    perLesson: string;
    cta: string;
    plans: Array<{
      name: string;
      count: string;
      price: string;
      total: string;
      perk: string;
      features: string[];
      badge?: string;
      dark: boolean;
    }>;
  };
  reviews: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    items: Array<{ n: string; p: string; q: string; badge: string }>;
  };
  levelTest: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    bullets: string[];
    cta: string;
    note: string;
    cards: Array<{ level: string; name: string; desc: string; time: string; questions: string }>;
  };
  showcase: {
    platform: {
      title: string;
      subtitle: string;
      mockLabel: string;
      items: { lessons: string; schedule: string; progress: string };
      progressHint: string;
      liveBadge: string;
      upcomingLabel: string;
      upcomingLesson: string;
      upcomingTeacher: string;
      homeworkLabel: string;
      homework: string[];
      weekLabel: string;
      weekLessons: string;
      weekSpeaking: string;
      weekStreak: string;
    };
    ai: {
      title: string;
      subtitle: string;
      botName: string;
      idle: string;
      listening: string;
      prompt: string;
      cta: string;
    };
    telegram: {
      title: string;
      subtitle: string;
      botName: string;
      prompt: string;
      feedback: string;
      stages: { record: string; send: string; analyze: string; feedback: string };
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    emailLabel: string;
    whatsappLabel: string;
    whatsappValue: string;
    telegramLabel: string;
    telegramValue: string;
    timezone: string;
  };
  teachers: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    years: string;
    items: Array<{ n: string; spec: string; y: string }>;
  };
  trial: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    bullets: string[];
    adult: string;
    kid: string;
    nameAdult: string;
    nameKid: string;
    email: string;
    phone: string;
    promo: string;
    consent: string;
    submit: string;
    success: string;
    spam: string;
    sending: string;
    errorGeneric: string;
    phoneError: string;
    emailError: string;
    emailDisposableError: string;
    consentLabel: string;
    consentError: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: { title: string; titleAccent: string; subtitle: string; cta: string };
  footer: {
    desc: string;
    courses: string;
    school: string;
    contacts: string;
    copyright: string;
    privacy: string;
    terms: string;
    documents: string;
    sitemap: string;
    addressLabel: string;
    links: { courses: string[]; school: string[]; contacts: string[] };
  };
  legal: { backHome: string };
};

const EN: Translations = {
  meta: {
    title: "Omuzbox — Speak English with Confidence",
    description: "1-on-1 live English lessons. Certified teachers. Free trial lesson — no card required.",
  },
  nav: {
    courses: "Courses",
    how: "How it works",
    pricing: "Pricing",
    reviews: "Reviews",
    faq: "FAQ",
    contact: "Contact",
    cta: "Free trial",
  },
  hero: {
    badge: "Trusted by 10,000+ students",
    title: "Learn English ",
    titleAccent: "with confidence and real results",
    subtitle:
      "1-on-1 live lessons and speaking clubs. Flexible schedule. Certified teachers — from first words to fluent conversation.",
    cta: "Book free trial",
    levelHint: "Planning for work or life in the US?",
    levelLink: "See what each level means",
    social: "89% of students speak confidently after 30 lessons",
    handNote: "free ✦",
    liveName: "Anna in class",
    liveStatus: "Live · speaking 80%",
    progressTitle: "Your progress",
    progressSub: "A0 → B2 in 6 months",
    ielts: "IELTS 7.5",
    ieltsSub: "first attempt ★",
    timezone: "Lessons 8am–11pm Eastern — easy scheduling from East to West Coast.",
  },
  stickyCta: {
    label: "Book free trial",
    aria: "Quick action: book a free trial lesson",
  },
  metrics: {
    students: "active students",
    duration: "lesson length",
    practice: "class time is speaking",
    certified: "certified teachers",
  },
  features: {
    eyebrow: "Why Omuzbox",
    title: "Everything you need for confident ",
    titleAccent: "English",
    subtitle:
      "Live lessons, speaking clubs, and patient teachers. Programs adapt to your goals and pace.",
    items: [
      {
        title: "A teacher matched to you",
        text: "We adapt to your level, goals, and personality. Not a fit? We'll switch — no questions asked.",
      },
      {
        title: "Speaking clubs",
        text: "Practice with teachers and other students in live conversation sessions.",
      },
      {
        title: "1-on-1 lessons",
        text: "Lessons built around you — your rhythm, topics, and pace.",
      },
      {
        title: "Telegram speaking bot",
        text: "Practice between lessons — record a voice message in Telegram and get pronunciation feedback.",
      },
    ],
  },
  courses: {
    eyebrow: "Courses",
    title: "Pick the path that fits ",
    titleAccent: "your goal",
    subtitle: "Work, travel, exams, or everyday life — we have a program for you.",
    more: "Learn more",
    items: [
      { t: "Beginners", d: "Starting from zero or refreshing school English.", r: "Start speaking calmly from lesson one" },
      { t: "For work", d: "Meetings, calls, emails with international teams.", r: "Confident work conversations", badge: "Popular" },
      { t: "Business English", d: "Negotiations, presentations, professional email.", r: "Sound professional and persuasive" },
      { t: "Travel", d: "Airport, hotel, directions — everything for trips.", r: "No panic abroad" },
      { t: "Relocation", d: "Daily life, services, documents in a new country.", r: "Confidence from week one" },
      { t: "Exam prep", d: "IELTS, TOEFL, SAT — format, strategy, timed practice.", r: "High score on first try", badge: "IELTS · TOEFL" },
      { t: "Kids 7–14", d: "Playful lessons kids actually enjoy.", r: "Love for English early" },
      { t: "Conversational", d: "Speak freely on everyday topics.", r: "Natural flow in conversation" },
    ],
  },
  levels: {
    eyebrow: "CEFR scale",
    title: "From zero to ",
    titleAccent: "full fluency",
    subtitle: "What you can actually do at each level — mapped to real-life needs in the US.",
    items: [
      {
        c: "A1",
        e: "Beginner",
        desc: "Introduce yourself, order food, ask for directions, and handle simple errands with help.",
      },
      {
        c: "A2",
        e: "Elementary",
        desc: "Write short work emails, understand slow clear speech, and manage routine tasks at a US job.",
      },
      {
        c: "B1",
        e: "Pre-Intermediate",
        desc: "Join work meetings on familiar topics, make appointments, and navigate daily life independently.",
      },
      {
        c: "B2",
        e: "Intermediate",
        desc: "Lead client calls, discuss projects in detail, and read US news and professional articles.",
      },
      {
        c: "B2+",
        e: "Upper-Intermediate",
        desc: "Negotiate, present ideas confidently, and adapt your tone for US workplace culture.",
      },
      {
        c: "C1",
        e: "Advanced",
        desc: "Fluent professional communication — nuanced discussions, academics, and high-stakes settings.",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Learning at ",
    titleAccent: "Omuzbox",
    subtitle: "50-minute lessons on our platform — nothing to install.",
    steps: [
      { t: "Interactive lessons", d: "Tasks and vocabulary live during class on our platform." },
      { t: "Focus on speaking", d: "You speak from day one — simple phrases, comfortable pace." },
      { t: "Step-by-step progress", d: "Clear program + homework to lock in skills." },
    ],
    timelineTitle: "Lesson structure · 50 minutes",
    timeline: [
      { m: "5 min", t: "Warm-up chat", d: "Easy questions to switch into English mode." },
      { m: "10 min", t: "New words & phrases", d: "Vocabulary in real-life contexts." },
      { m: "25 min", t: "Speaking practice", d: "Up to 80% of class — dialogue and role-plays." },
      { m: "10 min", t: "Wrap-up", d: "Summary and homework for the week." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple plans, ",
    titleAccent: "real results",
    subtitle: "No hidden fees. The more lessons you buy, the lower the price per lesson.",
    perLesson: "/ lesson",
    cta: "Choose plan",
    plans: [
      {
        name: "Start",
        count: "8 lessons",
        price: "$55",
        total: "$440 total",
        perk: "Perfect to try us out",
        features: ["8 live 1-on-1 lessons", "Lesson notes", "Flexible scheduling", "Platform access"],
        dark: false,
      },
      {
        name: "Progress",
        count: "16 lessons",
        price: "$45",
        total: "$720 total",
        perk: "Best for regular learners",
        features: ["16 live 1-on-1 lessons", "Personal study plan", "Telegram speaking bot", "Priority booking"],
        badge: "Popular",
        dark: true,
      },
      {
        name: "Maximum",
        count: "32 lessons",
        price: "$35",
        total: "$1,120 total",
        perk: "Fastest path to fluency",
        features: ["32 live 1-on-1 lessons", "Dedicated teacher match", "Weekly homework feedback", "Speaking clubs"],
        badge: "Best value",
        dark: false,
      },
    ],
  },
  reviews: {
    eyebrow: "Student reviews",
    title: "We're proud of ",
    titleAccent: "our students' results",
    subtitle:
      "Real success stories — not just words, but trust, conversation, and real change. See how our approach helps people speak English with confidence.",
    items: [
      {
        n: "Anna Smirnova",
        p: "Marketing specialist",
        q: "In 6 months I went from A2 to B2. I now negotiate confidently with international clients.",
        badge: "A2 → B2",
      },
      {
        n: "Dmitry Kozlov",
        p: "IT specialist",
        q: "I passed an interview for an international company. My teacher prepared me for technical interviews in English.",
        badge: "New job abroad",
      },
      {
        n: "Maxim Ivanov",
        p: "Student",
        q: "Thanks to IELTS prep I got 7.5 on my first attempt. Clear program and great feedback.",
        badge: "IELTS 7.5",
      },
      {
        n: "Olga Nikolaeva",
        p: "Entrepreneur",
        q: "Speaking clubs changed everything — I overcame the fear of speaking and now talk to partners worldwide.",
        badge: "Speaking clubs",
      },
      {
        n: "Sergey Volkov",
        p: "Project manager",
        q: "After business English I got promoted. I now lead international projects and present in English.",
        badge: "Career growth",
      },
      {
        n: "Maria Kuznetsova",
        p: "Designer",
        q: "I used to avoid foreign clients. Now I message and call in English without stress.",
        badge: "International clients",
      },
      {
        n: "Alexey Morozov",
        p: "Doctor",
        q: "I needed English for medical papers. Now I read research and plan an internship abroad.",
        badge: "Medical English",
      },
      {
        n: "Natalia Sokolova",
        p: "Accountant",
        q: "I traveled across Europe and communicated freely everywhere. An incredible feeling of freedom.",
        badge: "Travel English",
      },
      {
        n: "Artem Fedorov",
        p: "Student",
        q: "Prepared for a European university, passed TOEFL with an excellent score and got a scholarship.",
        badge: "TOEFL success",
      },
    ],
  },
  levelTest: {
    eyebrow: "Free English level test",
    title: "Find your ",
    titleAccent: "level",
    subtitle:
      "Whether you're starting from zero or unsure where you are — our adaptive test shows your CEFR level instantly. No registration stress, results right after you finish.",
    bullets: [
      "Grammar, vocabulary, reading & listening",
      "CEFR result with skill breakdown",
      "Recommendations + optional free trial lesson",
    ],
    cta: "Start free level test",
    note: "Free on this site — no payment required.",
    cards: [
      { level: "⚡", name: "Quick check", desc: "Fast estimate of your level", time: "5 min", questions: "15 Q" },
      { level: "📋", name: "Standard", desc: "Balanced accuracy", time: "15 min", questions: "40 Q" },
      { level: "🎯", name: "Extended", desc: "Most accurate assessment", time: "25 min", questions: "60 Q" },
    ],
  },
  showcase: {
    platform: {
      title: "A platform where everything is simple",
      subtitle: "Lessons, materials, schedule, and progress — all in one place.",
      mockLabel: "Omuzbox classroom",
      items: { lessons: "Lessons", schedule: "Schedule", progress: "Progress" },
      progressHint: "Speaking practice · 80% of class time",
      liveBadge: "Live",
      upcomingLabel: "Next lesson",
      upcomingLesson: "Wed, 6:00 PM · Business English",
      upcomingTeacher: "with Michael C.",
      homeworkLabel: "Homework before next class",
      homework: [
        "Review Unit 4 vocabulary (15 min)",
        "Send a 2-min voice message in Telegram",
      ],
      weekLabel: "This week",
      weekLessons: "2 lessons completed",
      weekSpeaking: "45 min speaking",
      weekStreak: "3-day practice streak",
    },
    ai: {
      title: "AI speaking practice",
      subtitle: "Train between classes — no judgment, just practice.",
      botName: "Omuzbox AI",
      idle: "Tap to practice speaking",
      listening: "Listening… speak now",
      prompt: "Try: “Tell me about your last trip in English.”",
      cta: "Tap to speak",
    },
    telegram: {
      title: "Telegram speaking practice bot",
      subtitle: "Record a voice message between lessons — get AI pronunciation and grammar feedback in Telegram.",
      botName: "@omuzboxss",
      prompt: "🎤 Tell me about your last weekend in English.",
      feedback: "Nice rhythm! Link your ideas with “because” and “so”. Pronunciation of “thought” was clear.",
      stages: {
        record: "Recording your answer…",
        send: "Sent",
        analyze: "Analyzing pronunciation & grammar…",
        feedback: "Voice feedback ready",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Questions? ",
    titleAccent: "We're here",
    subtitle:
      "We make learning simple and clear, focused on real results. Email us or message on WhatsApp or Telegram — we reply on weekdays within a few hours.",
    cta: "Book a free trial",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    whatsappValue: "+1 831 778 1999",
    telegramLabel: "Telegram",
    telegramValue: "@omuzboxss",
    timezone: "We schedule around US time zones — Eastern, Central, Mountain & Pacific.",
  },
  teachers: {
    eyebrow: "Teachers",
    title: "Teachers you'll ",
    titleAccent: "love learning from",
    subtitle: "Not the right fit? We'll help you find another — free, no hassle.",
    years: "years experience",
    items: [
      { n: "Michael Carpenter", spec: "Business English · IELTS", y: "9" },
      { n: "Elena Voronova", spec: "Conversation · Exam prep", y: "12" },
      { n: "David Okafor", spec: "Native speaker · Pronunciation", y: "7" },
      { n: "Maya Tanaka", spec: "Travel · Kids", y: "6" },
    ],
  },
  trial: {
    eyebrow: "Free trial",
    title: "Try a lesson — ",
    titleAccent: "on us",
    subtitle: "One lesson to meet your teacher, check your level, and see how we teach. No pressure.",
    bullets: ["Find your level", "Meet your teacher", "See the format", "Ask anything"],
    adult: "Adults",
    kid: "Kids",
    nameAdult: "Your name",
    nameKid: "Child's name",
    email: "Email",
    phone: "Phone",
    promo: "Promo code (optional)",
    consent: "I agree to data processing and receiving lesson information.",
    submit: "Book my free trial",
    success: "Request sent! We'll reply within 2 hours on weekdays.",
    spam: "No spam. We reply within 2 hours on weekdays.",
    sending: "Sending…",
    errorGeneric: "Something went wrong. Email info@omuzbox.com or WhatsApp us.",
    phoneError: "Enter a valid phone number for the selected country.",
    emailError: "Enter a valid email address (e.g. name@company.com).",
    emailDisposableError: "Please use a permanent email address, not a temporary inbox.",
    consentLabel: "Consent to data processing",
    consentError: "Please agree to data processing before submitting.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Everything to know ",
    titleAccent: "before you start",
    items: [
      {
        q: "How does the trial lesson work?",
        a: "50 minutes with a teacher: level check, platform tour, goals and format. Recommendations after — no hard sell.",
      },
      {
        q: "How long are lessons?",
        a: "Standard lesson is 50 minutes. For kids under 10 we recommend 25 minutes.",
      },
      {
        q: "Do I need to buy textbooks?",
        a: "No. All materials are on Omuzbox — your teacher adapts them to your goals.",
      },
      {
        q: "Can I change teachers?",
        a: "Yes, anytime and for free. We'll match someone who fits your style.",
      },
      {
        q: "How often should I study?",
        a: "2–3 times per week is ideal to see progress without losing momentum.",
      },
      {
        q: "What if I miss a lesson?",
        a: "Reschedule free if you notify us 8+ hours ahead. Paid lessons don't expire.",
      },
    ],
  },
  finalCta: {
    title: "Start speaking from ",
    titleAccent: "your first lesson",
    subtitle: "Free trial to meet the format and your teacher — no commitment.",
    cta: "Book free trial",
  },
  footer: {
    desc: "Online English school for adults and kids. Real teachers, real conversation.",
    courses: "Courses",
    school: "School",
    contacts: "Contact",
    copyright: "Omuzbox © All rights reserved, 2026",
    privacy: "Privacy policy",
    terms: "Offer agreement",
    documents: "Documents & licenses",
    sitemap: "Sitemap",
    addressLabel: "Registered address",
    links: {
      courses: ["Beginners", "Business English", "Travel", "Exam prep"],
      school: ["About", "Reviews"],
      contacts: ["info@omuzbox.com", "WhatsApp", "Telegram"],
    },
  },
  legal: { backHome: "Back to home" },
};

// RU — original Lovable copy (abbreviated structure matches EN)
const RU: Translations = {
  ...EN,
  meta: {
    title: "Omuzbox — Онлайн-школа английского с реальными результатами",
    description: "Индивидуальные занятия и разговорные клубы. Сертифицированные преподаватели. Пробный урок бесплатно.",
  },
  nav: { courses: "Курсы", how: "Как проходит", pricing: "Цены", reviews: "Отзывы", faq: "FAQ", contact: "Контакты", cta: "Пробный урок" },
  hero: {
    badge: "Нам доверяют более 10 000 учеников",
    title: "Учите английский ",
    titleAccent: "с уверенностью и реальными результатами",
    subtitle:
      "Индивидуальные занятия и разговорные клубы. Гибкий график. Сертифицированные преподаватели. Поможем на каждом этапе — от первых слов до свободной речи.",
    cta: "Записаться на пробный урок",
    levelHint: "Планируете работу или жизнь в США?",
    levelLink: "Что даёт каждый уровень",
    social: "89% учеников уверенно говорят уже через 30 уроков",
    handNote: "бесплатно ✦",
    liveName: "Анна на уроке",
    liveStatus: "В эфире · говорит 80%",
    progressTitle: "Ваш прогресс",
    progressSub: "A0 → B2 за 6 мес.",
    ielts: "IELTS 7.5",
    ieltsSub: "с первой попытки ★",
    timezone: "Уроки с 8:00 до 23:00 по восточному времени США — удобно с любого побережья.",
  },
  stickyCta: {
    label: "Пробный урок",
    aria: "Быстрая запись на пробный урок",
  },
  metrics: {
    students: "учеников",
    duration: "длительность урока",
    practice: "занятия — практика речи",
    certified: "сертифицированные преподаватели",
  },
  features: {
    eyebrow: "Для тех, кто хочет большего",
    title: "Всё для уверенного ",
    titleAccent: "английского",
    subtitle: "Индивидуальные занятия, разговорные клубы и живое общение. Программа адаптируется под каждого студента.",
    items: [
      { title: "Выбор преподавателя под вас", text: "Адаптируем под уровень, цели и характер. Не подойдёт — поменяем без вопросов." },
      { title: "Разговорные клубы", text: "Общайтесь с преподавателями и другими студентами вживую." },
      { title: "Уроки один на один", text: "Уроки вокруг вас — ваш ритм, темы и темп." },
      { title: "Telegram-бот для речи", text: "Практика между уроками — голосовое сообщение в Telegram и обратная связь по произношению." },
    ],
  },
  courses: {
    eyebrow: "Английский по целям",
    title: "Выберите курс под ",
    titleAccent: "свою задачу",
    subtitle: "Работа, переезд, экзамены или путешествия — у нас есть программа.",
    more: "Подробнее",
    items: [
      { t: "Для начинающих", d: "Для тех, кто начинает с нуля или всё забыл.", r: "Спокойно начнёте говорить с первых уроков" },
      { t: "Для работы", d: "Встречи, созвоны, переписка с международной командой.", r: "Уверенный рабочий разговор", badge: "Хит" },
      { t: "Деловой английский", d: "Переговоры, презентации, деловая переписка.", r: "Звучите профессионально" },
      { t: "Для путешествий", d: "Аэропорт, отель, кафе — всё для поездки.", r: "Без паники за рубежом" },
      { t: "Для переезда", d: "Бытовые вопросы и документы в новой стране.", r: "Уверенность с первых недель" },
      { t: "Подготовка к экзаменам", d: "IELTS, TOEFL, SAT — формат и стратегии.", r: "Высокий балл с первой попытки", badge: "IELTS · TOEFL" },
      { t: "Для детей 7–14", d: "Игровые уроки, чтобы ребёнок полюбил язык.", r: "Интерес к английскому" },
      { t: "Разговорный", d: "Общение на любые темы без проблем.", r: "Свободная речь" },
    ],
  },
  levels: {
    eyebrow: "Шкала CEFR",
    title: "От нуля до ",
    titleAccent: "свободного владения",
    subtitle: "Что вы сможете делать на каждом уровне — под реальные задачи в США.",
    items: [
      { c: "A1", e: "Beginner", desc: "Представиться, заказать еду, спросить дорогу и решать простые бытовые задачи с помощью." },
      { c: "A2", e: "Elementary", desc: "Писать короткие рабочие письма, понимать медленную речь и справляться с рутиной на работе." },
      { c: "B1", e: "Pre-Inter", desc: "Участвовать в рабочих встречах на знакомые темы и жить в США без постоянной помощи." },
      { c: "B2", e: "Intermediate", desc: "Вести звонки с клиентами, обсуждать проекты и читать новости и статьи на английском." },
      { c: "B2+", e: "Upper-Inter", desc: "Вести переговоры, уверенно презентовать и подстраивать тон под американский офис." },
      { c: "C1", e: "Advanced", desc: "Свободная профессиональная речь — сложные дискуссии, учёба и ответственные ситуации." },
    ],
  },
  how: {
    eyebrow: "Как это работает",
    title: "Обучение в ",
    titleAccent: "Omuzbox",
    subtitle: "Уроки 50 минут на платформе — ничего скачивать не нужно.",
    steps: [
      { t: "Интерактив на уроке", d: "Задания и слова прямо во время урока на платформе." },
      { t: "Фокус на разговоре", d: "Вы говорите с первого занятия — в комфортном темпе." },
      { t: "Прогресс по шагам", d: "Понятная программа + домашняя практика." },
    ],
    timelineTitle: "Структура урока · 50 минут",
    timeline: [
      { m: "5 мин", t: "Разговорный разогрев", d: "Простые вопросы, чтобы включиться." },
      { m: "10 мин", t: "Новые слова и фразы", d: "Лексика в реальных ситуациях." },
      { m: "25 мин", t: "Разговорная практика", d: "До 80% урока — диалог и ролевые сценарии." },
      { m: "10 мин", t: "Итоги и домашка", d: "Подводим итоги и даём задание." },
    ],
  },
  reviews: {
    eyebrow: "Отзывы студентов",
    title: "Мы гордимся ",
    titleAccent: "результатами студентов",
    subtitle:
      "Реальные истории успеха — результат общения, доверия и перемен. Узнайте, как наш подход помогает заговорить на английском.",
    items: [
      { n: "Анна Смирнова", p: "маркетолог", q: "За полгода с A2 до B2. Сейчас уверенно веду переговоры с международными клиентами.", badge: "A2 → B2" },
      { n: "Дмитрий Козлов", p: "IT-специалист", q: "Прошёл собеседование в международной компании. Преподаватель подготовил к техническим интервью.", badge: "Работа abroad" },
      { n: "Максим Иванов", p: "студент", q: "IELTS 7.5 с первой попытки благодаря чёткой программе подготовки.", badge: "IELTS 7.5" },
      { n: "Ольга Николаева", p: "предприниматель", q: "Разговорные клубы — прорыв! Перестала бояться говорить с партнёрами из разных стран.", badge: "Разговорные клубы" },
      { n: "Сергей Волков", p: "менеджер проектов", q: "После бизнес-английского получил повышение. Веду международные проекты.", badge: "Карьера" },
      { n: "Мария Кузнецова", p: "дизайнер", q: "Раньше боялась зарубежных заказов. Теперь спокойно общаюсь на английском.", badge: "Международные клиенты" },
      { n: "Алексей Морозов", p: "врач", q: "Нужен английский для научных статей. Теперь читаю исследования и планирую стажировку.", badge: "Медицинский" },
      { n: "Наталья Соколова", p: "бухгалтер", q: "Путешествовала по Европе и общалась без страха. Невероятная свобода!", badge: "Для путешествий" },
      { n: "Артём Фёдоров", p: "студент", q: "Подготовился к поступлению в Европу, сдал TOEFL и получил стипендию.", badge: "TOEFL" },
    ],
  },
  levelTest: {
    eyebrow: "Бесплатный тест на уровень",
    title: "Узнайте свой ",
    titleAccent: "уровень",
    subtitle:
      "Учите с нуля или не уверены в уровне — адаптивный тест покажет CEFR сразу после прохождения. Без регистрации и ожидания.",
    bullets: [
      "Грамматика, лексика, чтение и аудирование",
      "Результат CEFR с разбивкой по навыкам",
      "Рекомендации + пробный урок при желании",
    ],
    cta: "Начать тест бесплатно",
    note: "Бесплатно на этом сайте — оплата не нужна.",
    cards: [
      { level: "⚡", name: "Быстрый", desc: "Быстрая оценка уровня", time: "5 мин", questions: "15 вопр." },
      { level: "📋", name: "Стандарт", desc: "Сбалансированная точность", time: "15 мин", questions: "40 вопр." },
      { level: "🎯", name: "Расширенный", desc: "Максимальная точность", time: "25 мин", questions: "60 вопр." },
    ],
  },
  showcase: {
    platform: {
      title: "Платформа, где всё просто",
      subtitle: "Уроки, материалы, расписание и прогресс — в одном месте.",
      mockLabel: "Класс Omuzbox",
      items: { lessons: "Уроки", schedule: "Расписание", progress: "Прогресс" },
      progressHint: "Практика речи · до 80% урока",
      liveBadge: "В эфире",
      upcomingLabel: "Следующий урок",
      upcomingLesson: "Ср, 18:00 · Деловой английский",
      upcomingTeacher: "с Майклом К.",
      homeworkLabel: "Домашнее задание",
      homework: [
        "Повторить лексику Unit 4 (15 мин)",
        "Отправить голосовое 2 мин в Telegram",
      ],
      weekLabel: "На этой неделе",
      weekLessons: "2 урока пройдено",
      weekSpeaking: "45 мин речи",
      weekStreak: "3 дня практики подряд",
    },
    ai: {
      title: "ИИ-бот для практики речи",
      subtitle: "Тренируйте речь между занятиями — без стеснения.",
      botName: "Omuzbox AI",
      idle: "Нажмите, чтобы говорить",
      listening: "Слушаю… говорите",
      prompt: "Попробуйте: «Расскажите о последней поездке на английском.»",
      cta: "Нажмите, чтобы говорить",
    },
    telegram: {
      title: "Telegram-бот для практики речи",
      subtitle: "Голосовое сообщение между уроками — обратная связь по произношению и грамматике в Telegram.",
      botName: "@omuzboxss",
      prompt: "🎤 Расскажите о прошлых выходных на английском.",
      feedback: "Хороший ритм! Связывайте мысли через because и so. Произношение thought было понятным.",
      stages: {
        record: "Записываем ответ…",
        send: "Отправлено",
        analyze: "Анализ произношения и грамматики…",
        feedback: "Голосовая обратная связь готова",
      },
    },
  },
  contact: {
    eyebrow: "Контакты",
    title: "Есть вопросы? ",
    titleAccent: "Мы на связи",
    subtitle:
      "Мы делаем обучение простым и понятным. Напишите на email или в WhatsApp / Telegram — ответим в рабочие дни в течение нескольких часов.",
    cta: "Записаться на пробный урок",
    emailLabel: "Почта",
    whatsappLabel: "WhatsApp",
    whatsappValue: "+1 831 778 1999",
    telegramLabel: "Telegram",
    telegramValue: "@omuzboxss",
    timezone: "Подбираем время под ваш часовой пояс — от Восточного до Тихоокеанского.",
  },
  teachers: {
    eyebrow: "Преподаватели",
    title: "Сильные преподаватели со ",
    titleAccent: "строгим отбором",
    subtitle: "Не подойдёт — поможем выбрать другого, бесплатно.",
    years: "лет опыта",
    items: [
      { n: "Майкл Карпентер", spec: "Бизнес-английский · IELTS", y: "9" },
      { n: "Елена Воронова", spec: "Разговорный · Экзамены", y: "12" },
      { n: "Дэвид Окафор", spec: "Носитель · Произношение", y: "7" },
      { n: "Мэй Танака", spec: "Путешествия · Дети", y: "6" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Всё, что нужно знать ",
    titleAccent: "перед началом",
    items: [
      { q: "Как проходит пробный урок?", a: "50 минут с преподавателем: уровень, платформа, цели. Без давления продажами." },
      { q: "Какая длительность уроков?", a: "Стандарт — 50 минут. Для детей до 10 лет — 25 минут." },
      { q: "Нужно ли покупать учебники?", a: "Нет. Все материалы на платформе Omuzbox." },
      { q: "Можно ли поменять преподавателя?", a: "Да, в любой момент и бесплатно." },
      { q: "Как часто стоит заниматься?", a: "Оптимально 2–3 раза в неделю." },
      { q: "Что если я пропущу урок?", a: "Перенесите за 8+ часов — деньги не сгорают." },
    ],
  },
  finalCta: {
    title: "Начните говорить уже с ",
    titleAccent: "первого урока",
    subtitle: "Бесплатный пробный урок — без обязательств.",
    cta: "Записаться на пробный урок",
  },
  footer: {
    desc: "Онлайн-школа английского для взрослых и детей. Живые преподаватели, живое общение.",
    courses: "Курсы",
    school: "Школа",
    contacts: "Контакты",
    copyright: "Omuzbox © Все права защищены, 2026",
    privacy: "Политика конфиденциальности",
    terms: "Договор оферты",
    documents: "Документы и лицензии",
    sitemap: "Карта сайта",
    addressLabel: "Юридический адрес",
    links: {
      courses: ["Для начинающих", "Деловой английский", "Для путешествий", "Подготовка к экзаменам"],
      school: ["О школе", "Отзывы"],
      contacts: ["info@omuzbox.com", "WhatsApp", "Telegram"],
    },
  },
  pricing: {
    eyebrow: "Цены",
    title: "Стоимость и ",
    titleAccent: "форматы обучения",
    subtitle: "Без скрытых платежей. Чем больше уроков — тем выгоднее цена за урок.",
    perLesson: "/ урок",
    cta: "Выбрать тариф",
    plans: [
      {
        name: "Старт",
        count: "8 уроков",
        price: "$55",
        total: "$440",
        perk: "Идеально, чтобы попробовать",
        features: ["Индивидуальные уроки 50 мин", "Личный куратор", "Доступ к платформе", "Гибкое расписание"],
        dark: false,
      },
      {
        name: "Прогресс",
        count: "16 уроков",
        price: "$45",
        total: "$720",
        perk: "Оптимально для регулярных занятий",
        features: ["Всё из «Старт»", "Разговорный клуб 2×/мес", "Telegram-бот для речи", "Отчёт о прогрессе"],
        badge: "Популярный",
        dark: true,
      },
      {
        name: "Максимум",
        count: "32 урока",
        price: "$35",
        total: "$1,120",
        perk: "Максимальный результат за 4 месяца",
        features: ["Всё из «Прогресс»", "Уроки с носителем", "Гарантия результата", "Безлимит клубов"],
        badge: "Выгодный",
        dark: false,
      },
    ],
  },
  trial: {
    ...EN.trial,
    eyebrow: "Пробный урок",
    title: "Пробный урок ",
    titleAccent: "бесплатно",
    subtitle: "За один урок познакомим с платформой и преподавателем, ответим на все вопросы.",
    bullets: ["Определим уровень", "Познакомим с преподавателем", "Расскажем о формате", "Ответим на вопросы"],
    adult: "Взрослым",
    kid: "Детям",
    nameAdult: "Ваше имя",
    nameKid: "Имя ребёнка",
    email: "Почта",
    phone: "Телефон",
    promo: "Промокод (если есть)",
    consent: "Согласен на обработку персональных данных и получение информации об уроках.",
    submit: "Отправить заявку",
    success: "Заявка отправлена! Ответим в течение 2 часов в рабочие дни.",
    spam: "Без спама. Ответим в течение 2 часов в рабочие дни.",
    sending: "Отправляем…",
    errorGeneric: "Ошибка. Напишите на info@omuzbox.com или в WhatsApp.",
    phoneError: "Введите корректный номер для выбранной страны.",
    emailError: "Введите корректный email (например, name@company.com).",
    emailDisposableError: "Используйте постоянный email, временные ящики не принимаются.",
    consentLabel: "Согласие на обработку данных",
    consentError: "Подтвердите согласие на обработку данных перед отправкой.",
  },
};

export const translations: Record<Lang, Translations> = { EN, RU };

export function localeForLang(lang: Lang): string {
  if (lang === "RU") return "ru-RU";
  return "en-US";
}

export function htmlLang(lang: Lang): string {
  if (lang === "RU") return "ru";
  return "en";
}
