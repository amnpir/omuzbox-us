import type { Lang } from "@/lib/lang";
import { COMPANY, companyAddressOneLine } from "@/lib/company";

export type LegalSection = { heading: string; paragraphs: string[] };

export type LegalPageContent = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

function addr(lang: Lang) {
  return companyAddressOneLine(lang);
}

export const LEGAL_PAGES: Record<
  "privacy" | "offer" | "documents",
  Record<Lang, LegalPageContent>
> = {
  privacy: {
    EN: {
      title: "Privacy Policy",
      updated: "Last updated: June 17, 2026",
      sections: [
        {
          heading: "1. Introduction",
          paragraphs: [
            `This Privacy Policy describes how ${COMPANY.name} ("we", "us", "our") collects, uses, stores, and protects personal information when you visit our website, submit a trial lesson request, or use our online English learning services.`,
            "By using our website or submitting your data, you acknowledge that you have read this Policy.",
          ],
        },
        {
          heading: "2. Data controller",
          paragraphs: [
            `${COMPANY.name}`,
            `Registered address: ${addr("EN")}`,
            `Email: ${COMPANY.email}`,
            `WhatsApp: ${COMPANY.whatsapp} · Telegram: ${COMPANY.telegram}`,
          ],
        },
        {
          heading: "3. Information we collect",
          paragraphs: [
            "Information you provide: name, email address, phone number, optional promo code, and any message you send us when booking a trial lesson or contacting support.",
            "Automatically collected data: browser type, device information, IP address, pages visited, referral URL, language preference, and cookie identifiers.",
            "Marketing data: when enabled, we use Meta Pixel and related technologies to measure ad performance. This may include event data such as page views and form submissions.",
          ],
        },
        {
          heading: "4. How we use your information",
          paragraphs: [
            "To respond to trial lesson requests and schedule lessons.",
            "To communicate about your account, lessons, payments, and support requests.",
            "To improve our website, services, and customer experience.",
            "To measure and optimize marketing campaigns, where permitted by law and your settings.",
            "To comply with legal obligations and protect our rights.",
          ],
        },
        {
          heading: "5. Legal bases for processing",
          paragraphs: [
            "We process personal data based on: (a) your consent (e.g. marketing, trial form submission); (b) performance of a contract or steps prior to entering a contract; (c) our legitimate interests in operating and improving our business; and (d) compliance with legal obligations.",
          ],
        },
        {
          heading: "6. Cookies and analytics",
          paragraphs: [
            "We use cookies and similar technologies for essential site functionality, language preference, and analytics.",
            "You can control cookies through your browser settings. Disabling cookies may affect some features.",
            "When Meta Pixel is active, Meta may receive event data according to Meta's own privacy policy.",
          ],
        },
        {
          heading: "7. Sharing with third parties",
          paragraphs: [
            "We do not sell your personal data.",
            "We may share data with service providers who help us operate the website, send emails, process forms, host infrastructure, or run analytics — only as needed and under appropriate safeguards.",
            "We may disclose information if required by law, court order, or to protect the safety and rights of users and our company.",
          ],
        },
        {
          heading: "8. Data retention",
          paragraphs: [
            "We retain personal data for as long as necessary to provide services, handle inquiries, meet accounting and legal requirements, and resolve disputes.",
            "Trial form data is typically retained while you remain a prospect or active student, unless you request deletion earlier.",
          ],
        },
        {
          heading: "9. Your rights",
          paragraphs: [
            "Depending on your location, you may have the right to access, correct, delete, restrict, or object to certain processing of your personal data, and to withdraw consent where processing is consent-based.",
            `To exercise your rights, contact ${COMPANY.email}. We will respond within a reasonable time as required by applicable law.`,
          ],
        },
        {
          heading: "10. Children's privacy",
          paragraphs: [
            "Our services may be used by minors only with involvement and consent of a parent or legal guardian.",
            "If you believe we collected a child's data without proper consent, contact us and we will take appropriate steps.",
          ],
        },
        {
          heading: "11. International users",
          paragraphs: [
            "If you access our services from outside the United States, your information may be processed in the United States or other countries where our providers operate.",
            "We take reasonable steps to protect data in accordance with this Policy.",
          ],
        },
        {
          heading: "12. Changes to this Policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised date.",
            "Continued use of the website after changes constitutes acceptance of the updated Policy.",
          ],
        },
        {
          heading: "13. Contact",
          paragraphs: [
            `Questions about this Privacy Policy: ${COMPANY.email}`,
            `Mailing address: ${addr("EN")}`,
          ],
        },
      ],
    },
    RU: {
      title: "Политика конфиденциальности",
      updated: "Обновлено: 17 июня 2026",
      sections: [
        {
          heading: "1. Введение",
          paragraphs: [
            `Настоящая Политика конфиденциальности описывает, как ${COMPANY.name} («мы») собирает, использует, хранит и защищает персональные данные при посещении сайта, отправке заявки на пробный урок и использовании услуг онлайн-обучения английскому языку.`,
            "Используя сайт или отправляя данные, вы подтверждаете, что ознакомились с этой Политикой.",
          ],
        },
        {
          heading: "2. Оператор данных",
          paragraphs: [
            `${COMPANY.name}`,
            `Юридический адрес: ${addr("RU")}`,
            `Email: ${COMPANY.email}`,
            `WhatsApp: ${COMPANY.whatsapp} · Telegram: ${COMPANY.telegram}`,
          ],
        },
        {
          heading: "3. Какие данные собираем",
          paragraphs: [
            "Данные, которые вы предоставляете: имя, email, телефон, промокод (если указан), сообщения при обращении в поддержку.",
            "Автоматически: тип браузера, устройство, IP-адрес, посещённые страницы, источник перехода, язык интерфейса, идентификаторы cookies.",
            "Маркетинг: при включении Meta Pixel и аналогичных технологий — события (просмотры страниц, отправка форм) для оценки рекламы.",
          ],
        },
        {
          heading: "4. Как используем данные",
          paragraphs: [
            "Для обработки заявок на пробный урок и организации занятий.",
            "Для связи по урокам, оплате и поддержке.",
            "Для улучшения сайта и качества услуг.",
            "Для анализа и оптимизации рекламы — в рамках закона и ваших настроек.",
            "Для соблюдения юридических обязательств и защиты прав компании.",
          ],
        },
        {
          heading: "5. Правовые основания обработки",
          paragraphs: [
            "Согласие (например, маркетинг, отправка формы), исполнение договора или подготовка к нему, законный интерес в развитии бизнеса, выполнение требований закона.",
          ],
        },
        {
          heading: "6. Cookies и аналитика",
          paragraphs: [
            "Cookies используются для работы сайта, сохранения языка и аналитики.",
            "Вы можете отключить cookies в браузере; часть функций может стать недоступной.",
            "При активном Meta Pixel данные событий могут передаваться Meta согласно политике Meta.",
          ],
        },
        {
          heading: "7. Передача третьим лицам",
          paragraphs: [
            "Мы не продаём персональные данные.",
            "Данные могут передаваться подрядчикам (хостинг, email, формы, аналитика) — только в объёме, необходимом для услуг, с мерами защиты.",
            "Раскрытие возможно по требованию закона или для защиты прав и безопасности.",
          ],
        },
        {
          heading: "8. Срок хранения",
          paragraphs: [
            "Данные хранятся столько, сколько нужно для оказания услуг, учёта, соблюдения закона и разрешения споров.",
            "Заявки на пробный урок обычно хранятся, пока вы остаётесь потенциальным или активным учеником, если не запросите удаление раньше.",
          ],
        },
        {
          heading: "9. Ваши права",
          paragraphs: [
            "В зависимости от юрисдикции вы можете запросить доступ, исправление, удаление, ограничение обработки или отозвать согласие.",
            `Запросы направляйте на ${COMPANY.email}. Ответим в разумный срок согласно применимому законодательству.`,
          ],
        },
        {
          heading: "10. Данные детей",
          paragraphs: [
            "Услуги для несовершеннолетних — только с участием и согласия родителя или законного представителя.",
            "Если вы считаете, что данные ребёнка собраны без согласия, свяжитесь с нами.",
          ],
        },
        {
          heading: "11. Международная обработка",
          paragraphs: [
            "При доступе из других стран данные могут обрабатываться в США или в странах расположения наших провайдеров.",
            "Мы принимаем разумные меры защиты в соответствии с этой Политикой.",
          ],
        },
        {
          heading: "12. Изменения Политики",
          paragraphs: [
            "Мы можем обновлять Политику. Актуальная версия публикуется на этой странице с новой датой.",
            "Продолжение использования сайта после изменений означает согласие с обновлённой Политикой.",
          ],
        },
        {
          heading: "13. Контакты",
          paragraphs: [
            `По вопросам Политики: ${COMPANY.email}`,
            `Почтовый адрес: ${addr("RU")}`,
          ],
        },
      ],
    },
  },
  offer: {
    EN: {
      title: "Public Offer Agreement",
      updated: "Last updated: June 17, 2026",
      sections: [
        {
          heading: "1. General provisions",
          paragraphs: [
            `This Public Offer Agreement ("Agreement") is a binding offer by ${COMPANY.name} to provide online English language education services to individuals who accept these terms.`,
            `Service provider: ${COMPANY.name}, ${addr("EN")}. Contact: ${COMPANY.email}.`,
            "By booking a lesson, submitting a trial request, or paying for a lesson package, you accept this Agreement.",
          ],
        },
        {
          heading: "2. Definitions",
          paragraphs: [
            '"Services" — live online English lessons, speaking clubs, digital learning materials, and related support via the Omuzbox platform.',
            '"Student" — an individual who registers for or attends lessons.',
            '"Lesson package" — a prepaid bundle of live 1-on-1 lessons as described on the pricing page.',
          ],
        },
        {
          heading: "3. Services",
          paragraphs: [
            "Lessons are conducted online in real time with a qualified teacher through the Omuzbox platform.",
            "Standard lesson duration is 50 minutes unless otherwise agreed (e.g. 25 minutes for young children).",
            "Lesson content, pace, and materials are adapted to the Student's level and goals.",
          ],
        },
        {
          heading: "4. Pricing and payment",
          paragraphs: [
            "Prices on this website are shown in United States dollars (USD) unless stated otherwise.",
            "Lesson packages must be paid according to the invoice or payment link provided by Omuzbox before or at the time of purchase.",
            "Omuzbox may update prices on the website; purchased packages remain subject to the price confirmed at checkout.",
          ],
        },
        {
          heading: "5. Free trial lesson",
          paragraphs: [
            "When offered on this page, the first trial lesson is free. No payment card is required to submit a request.",
            "Omuzbox may decline or reschedule a trial if contact details are invalid, if the Student is unreachable, or if a minor participates without verified guardian consent.",
          ],
        },
        {
          heading: "6. Scheduling, cancellation, and rescheduling",
          paragraphs: [
            "Lessons are scheduled by agreement between the Student and Omuzbox support or the assigned teacher.",
            "A lesson may be rescheduled or cancelled without charge if Omuzbox is notified at least 8 hours before the scheduled start time.",
            "Late cancellation or no-show may result in the lesson being counted as completed and deducted from the package balance.",
          ],
        },
        {
          heading: "7. Refunds",
          paragraphs: [
            "Paid lesson packages are generally non-refundable once lessons have begun, except where a refund is required by applicable consumer protection law.",
            "Unused prepaid lessons remain on the Student's balance according to the terms of the purchased package and do not expire unless otherwise stated in writing.",
          ],
        },
        {
          heading: "8. Student obligations",
          paragraphs: [
            "Provide accurate contact information and attend lessons on time with a stable internet connection.",
            "Treat teachers and staff respectfully. Omuzbox may suspend services in case of abuse or repeated violations.",
          ],
        },
        {
          heading: "9. Intellectual property",
          paragraphs: [
            "All course materials, platform content, and branding are owned by Omuzbox or its licensors.",
            "Students may use materials only for personal learning. Redistribution or commercial use without written permission is prohibited.",
          ],
        },
        {
          heading: "10. Limitation of liability",
          paragraphs: [
            "Omuzbox is not liable for interruptions caused by third-party networks, equipment failure, or force majeure.",
            "To the maximum extent permitted by law, Omuzbox's total liability arising from the Services is limited to the amount paid by the Student for the package giving rise to the claim.",
          ],
        },
        {
          heading: "11. Governing law",
          paragraphs: [
            "This Agreement is governed by the laws of the State of Delaware, United States, without regard to conflict-of-law principles.",
            "Disputes shall first be addressed through good-faith negotiation. If unresolved, disputes may be submitted to the competent courts of Delaware, USA.",
          ],
        },
        {
          heading: "12. Contact",
          paragraphs: [
            `Questions about this Agreement: ${COMPANY.email}`,
            `WhatsApp: ${COMPANY.whatsapp} · Telegram: ${COMPANY.telegram}`,
            `Registered address: ${addr("EN")}`,
          ],
        },
      ],
    },
    RU: {
      title: "Договор публичной оферты",
      updated: "Обновлено: 17 июня 2026",
      sections: [
        {
          heading: "1. Общие положения",
          paragraphs: [
            `Настоящий договор публичной оферты («Договор») является предложением ${COMPANY.name} заключить договор на оказание услуг онлайн-обучения английскому языку на изложенных условиях.`,
            `Исполнитель: ${COMPANY.name}, ${addr("RU")}. Контакты: ${COMPANY.email}.`,
            "Запись на урок, отправка заявки на пробное занятие или оплата пакета означает принятие условий Договора.",
          ],
        },
        {
          heading: "2. Термины",
          paragraphs: [
            "«Услуги» — индивидуальные онлайн-уроки, разговорные клубы, цифровые материалы и сопутствующая поддержка на платформе Omuzbox.",
            "«Ученик» — физическое лицо, записывающееся на занятия.",
            "«Пакет уроков» — предоплаченный набор живых уроков 1-на-1 согласно странице с ценами.",
          ],
        },
        {
          heading: "3. Услуги",
          paragraphs: [
            "Занятия проходят онлайн в реальном времени с преподавателем на платформе Omuzbox.",
            "Стандартная длительность — 50 минут, если не согласовано иное (например, 25 минут для детей).",
            "Содержание, темп и материалы адаптируются под уровень и цели ученика.",
          ],
        },
        {
          heading: "4. Цены и оплата",
          paragraphs: [
            "Цены на сайте указаны в долларах США (USD), если не указано иное.",
            "Оплата пакета производится по счёту или ссылке, предоставленной Omuzbox.",
            "Цены на сайте могут обновляться; оплаченные пакеты сохраняют цену, подтверждённую при покупке.",
          ],
        },
        {
          heading: "5. Пробный урок",
          paragraphs: [
            "При предложении на этой странице первый пробный урок бесплатен. Банковская карта для заявки не требуется.",
            "Omuzbox может отклонить или перенести пробный урок при некорректных контактах, недоступности ученика или без согласия родителя для несовершеннолетнего.",
          ],
        },
        {
          heading: "6. Расписание, отмена и перенос",
          paragraphs: [
            "Уроки назначаются по согласованию с поддержкой Omuzbox или преподавателем.",
            "Бесплатный перенос или отмена — при уведомлении не менее чем за 8 часов до начала.",
            "Поздняя отмена или неявка могут привести к списанию урока с баланса пакета.",
          ],
        },
        {
          heading: "7. Возвраты",
          paragraphs: [
            "Оплаченные пакеты, как правило, не подлежат возврату после начала занятий, кроме случаев, предусмотренных законом о защите прав потребителей.",
            "Неиспользованные предоплаченные уроки остаются на балансе согласно условиям пакета и не сгорают, если иное не указано письменно.",
          ],
        },
        {
          heading: "8. Обязанности ученика",
          paragraphs: [
            "Указывать достоверные контакты, своевременно подключаться к уроку при стабильном интернете.",
            "Соблюдать уважительное общение с преподавателями и сотрудниками. При нарушениях доступ к услугам может быть ограничен.",
          ],
        },
        {
          heading: "9. Интеллектуальная собственность",
          paragraphs: [
            "Материалы курсов, контент платформы и брендинг принадлежат Omuzbox или правообладателям.",
            "Материалы предназначены только для личного обучения. Распространение без письменного разрешения запрещено.",
          ],
        },
        {
          heading: "10. Ограничение ответственности",
          paragraphs: [
            "Omuzbox не отвечает за сбои сетей третьих лиц, оборудования или форс-мажор.",
            "В пределах, допускаемых законом, совокупная ответственность Omuzbox ограничена суммой, уплаченной учеником за соответствующий пакет.",
          ],
        },
        {
          heading: "11. Применимое право",
          paragraphs: [
            "Договор регулируется законодательством штата Делавэр, США.",
            "Споры сначала решаются путём переговоров; при недостижении согласия — в компетентном суде Делавэра, США.",
          ],
        },
        {
          heading: "12. Контакты",
          paragraphs: [
            `По вопросам Договора: ${COMPANY.email}`,
            `WhatsApp: ${COMPANY.whatsapp} · Telegram: ${COMPANY.telegram}`,
            `Юридический адрес: ${addr("RU")}`,
          ],
        },
      ],
    },
  },
  documents: {
    EN: {
      title: "Documents & Licenses",
      updated: "Last updated: June 17, 2026",
      sections: [
        {
          heading: "Company information",
          paragraphs: [
            `${COMPANY.name} — online English language school providing live lessons for adults and children.`,
            `Registered address: ${addr("EN")}`,
            `Email: ${COMPANY.email} · WhatsApp: ${COMPANY.whatsapp} · Telegram: ${COMPANY.telegram}`,
          ],
        },
        {
          heading: "Educational services",
          paragraphs: [
            "Live 1-on-1 English lessons (standard duration 50 minutes).",
            "Speaking clubs and conversation practice.",
            "Digital learning materials and progress tracking on the Omuzbox platform.",
            "Telegram speaking practice bot for pronunciation feedback between lessons (where included in the plan).",
          ],
        },
        {
          heading: "Quality standards",
          paragraphs: [
            "Teachers are selected, interviewed, and trained according to Omuzbox internal quality guidelines.",
            "Lesson programs follow CEFR-aligned progression from beginner to advanced levels.",
            "Students may request a teacher change at no additional charge if the match is not suitable.",
          ],
        },
        {
          heading: "Licenses and compliance",
          paragraphs: [
            "Omuzbox operates as an online education provider. Specific state or federal teaching licenses may not be required for private online language instruction; however, our teachers hold relevant qualifications and/or professional teaching experience as described during onboarding.",
            "We comply with applicable U.S. consumer protection and data privacy requirements. See our Privacy Policy for details on personal data.",
          ],
        },
        {
          heading: "Related documents",
          paragraphs: [
            "Privacy Policy — /privacy-policy",
            "Public Offer Agreement — /offer",
            "Sitemap — /sitemap",
          ],
        },
        {
          heading: "Copyright and trademarks",
          paragraphs: [
            "The Omuzbox name, logo, website design, course materials, and platform content are protected by copyright and applicable intellectual property laws.",
            "Unauthorized copying, scraping, or commercial use of materials is prohibited without prior written consent from Omuzbox.",
          ],
        },
      ],
    },
    RU: {
      title: "Документы и лицензии",
      updated: "Обновлено: 17 июня 2026",
      sections: [
        {
          heading: "Сведения о компании",
          paragraphs: [
            `${COMPANY.name} — онлайн-школа английского языка для взрослых и детей.`,
            `Юридический адрес: ${addr("RU")}`,
            `Email: ${COMPANY.email} · WhatsApp: ${COMPANY.whatsapp} · Telegram: ${COMPANY.telegram}`,
          ],
        },
        {
          heading: "Образовательные услуги",
          paragraphs: [
            "Индивидуальные онлайн-уроки (стандарт — 50 минут).",
            "Разговорные клубы и практика речи.",
            "Цифровые материалы и отслеживание прогресса на платформе Omuzbox.",
            "Telegram-бот для практики произношения между уроками (при включении в тариф).",
          ],
        },
        {
          heading: "Стандарты качества",
          paragraphs: [
            "Преподаватели проходят отбор, собеседование и обучение по внутренним стандартам Omuzbox.",
            "Программы выстроены по уровням CEFR — от начального до продвинутого.",
            "Смена преподавателя возможна бесплатно, если подбор не подошёл.",
          ],
        },
        {
          heading: "Лицензии и соответствие",
          paragraphs: [
            "Omuzbox оказывает услуги дистанционного обучения языку. Для частного онлайн-обучения могут не требоваться отдельные государственные лицензии; при этом преподаватели имеют соответствующую квалификацию и/или опыт, подтверждаемый при отборе.",
            "Мы соблюдаем применимые требования законодательства США в части защиты потребителей и персональных данных. Подробности — в Политике конфиденциальности.",
          ],
        },
        {
          heading: "Связанные документы",
          paragraphs: [
            "Политика конфиденциальности — /privacy-policy",
            "Договор публичной оферты — /offer",
            "Карта сайта — /sitemap",
          ],
        },
        {
          heading: "Авторские права и товарные знаки",
          paragraphs: [
            "Название Omuzbox, логотип, дизайн сайта, материалы курсов и контент платформы защищены авторским правом и нормами интеллектуальной собственности.",
            "Копирование, парсинг или коммерческое использование материалов без письменного согласия Omuzbox запрещено.",
          ],
        },
      ],
    },
  },
};
