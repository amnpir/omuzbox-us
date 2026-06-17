# Omuzbox English Journey (Lovable)

Локальная копия дизайна из Lovable — основной рабочий проект лендинга.

| | |
|---|---|
| **Проект** | Omuzbox English Journey |
| **ID** | `f554ea18-025d-440a-84a2-bdd90eead593` |
| **Редактор** | https://lovable.dev/projects/f554ea18-025d-440a-84a2-bdd90eead593 |
| **Preview** | https://id-preview--f554ea18-025d-440a-84a2-bdd90eead593.lovable.app |
| **Commit** | `5339282965e8eac014fd21e0b37537a73a16e77f` |

## Запуск локально

```bash
bun install   # первый раз
bun run dev   # → http://localhost:8080
```

Сейчас это **основной проект** — Stitch/HTML-версии в `../stitch-export/` оставлены как архив.

## Структура

- `src/routes/index.tsx` — весь лендинг (14 секций, glassmorphism, анимации)
- `src/styles.css` — дизайн-система Omuzbox (#20AAFD → #21EEFC)
- `src/assets/` — фото студентов и преподавателей

## Синхронизация с Lovable

Изменения в Lovable → повторный экспорт через MCP или:

```bash
# Нужен Bearer token из DevTools → Network → api.lovable.dev
export BEARER_TOKEN="your-token"
./scripts/pull-from-lovable.sh
```

## US landing ($55 / $48 / $42)

- EN default, language switcher, USD pricing
- Form → Railway API (`../api/`) — **not Supabase**
- Meta Pixel (browser) + CAPI (server) — see `../docs/deploy-railway.md`

### Env (`cp .env.example .env.local`)

```bash
VITE_SUBMIT_TRIAL_URL=http://localhost:3001/api/submit-trial
VITE_META_PIXEL_ID=your_facebook_pixel_id
```

