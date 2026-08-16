# Handoff: 旅ラボ (Tabi-Lab) — 学問でめぐる日本の旅アプリ

## Overview

**旅ラボ** is a travel-planning mobile app built on a different premise than conventional itinerary apps (じゃらん, Google Travel, etc.). Those apps assume you already know where you're going and help you book. 旅ラボ instead lets you **choose a destination from academic curiosity** — geology, history, food culture, deep-sea science, cultural anthropology, evolution, and more — and explains *why* a place is the way it is.

Core value: for each place, surface a one-line provocative question ("なぜ香川はうどんが名物になったのか?"), and reveal a short scientific/historical explanation on tap. Specialist terms inside the explanation are themselves tappable, revealing a plain-language gloss.

The prototype covers all 47 Japanese prefectures across 12 academic fields, plus an AI consultation feature, an itinerary builder with three semantic sort strategies, and lodging-style recommendations per region.

---

## About the Design Files

**The files in this bundle are design references created in HTML — prototypes showing intended look and behavior, not production code to copy directly.**

The task is to **recreate these designs in the target codebase's existing environment** (React Native, Swift/SwiftUI, Kotlin/Compose, Flutter, etc.) using its established patterns, component library, and navigation stack. If no environment exists yet, choose the most appropriate framework for a content-rich mobile app and implement the designs there.

The HTML prototype uses a bespoke component runtime (`support.js`, `.dc.html` format) that is **not** intended to ship. Read it for structure, layout, copy, and behavior — then rebuild natively.

Note: the user has indicated the **Organic design system** should govern the visual style going forward. The prototype in this bundle predates that decision and uses its own warm palette (see Design Tokens below). When implementing, map the prototype's roles onto Organic's tokens (`--color-bg`, `--color-accent`, `--color-accent-2`, `--radius-*`, `--space-*`, Caprasimo/Figtree) rather than copying the prototype's raw hex values. The two palettes are close in spirit — warm cream ground, terracotta accent, sage second accent — so the mapping is mostly one-to-one.

---

## Fidelity

**High-fidelity (hifi).** The prototype has final layout, spacing, typography, interaction states, transitions, and complete Japanese copy for all 47 prefectures. Recreate the UI faithfully — but re-derive colors and type from the Organic design system rather than the prototype's literal values.

The one deliberate placeholder: **no photography**. The user asked to omit images for now and will supply them later. Leave image slots in the layout where noted.

---

## Screens / Views

The app is a phone-sized experience (design width **402 × 874 px**, iOS frame). Three bottom tabs plus two pushed screens.

### 1. ホーム (Home) — trip basics

**Purpose:** Set the coarse parameters of a trip and jump into discovery.

**Layout:** Single scrolling column, `padding: 58px 20px 24px` (top padding clears the status bar).

**Components, in order:**

1. **Title block**
   - `今日は、どこへ?` — display font, 24px, color `#3A3327`, margin-bottom 4px
   - `まずは旅の基本を、ざっくり決めましょう。` — 13px, `#8A8068`, margin-bottom 22px

2. **Stepper card** — white `#fff`, `border-radius: 16px`, `padding: 18px 20px`, `box-shadow: 0 4px 12px rgba(60,50,30,0.08)`, margin-bottom 14px
   - Two rows: 泊数 (nights) and 人数 (people), separated by a 1px `rgba(60,50,30,0.08)` divider
   - Each row: label left (700 weight, 14.5px, `#3A3327`); right side is a `–` / value / `+` group with `gap: 16px`
   - Stepper buttons: 32×32, `border-radius: 999px`, `border: 1px solid rgba(60,50,30,0.14)`, background `#F5EFE6`, 18px glyph
   - Value: 800 weight, 16px, `min-width: 44px`, centered. Renders as `2泊` / `2人`
   - Bounds: nights 1–30, people 1–10

3. **行き先 (Destination) section**
   - Header row: label left (700, 13.5px), `全47都道府県` right (11px, `#8A8068`)
   - **Search input**: full width, `border: 1px solid rgba(60,50,30,0.16)`, white, `border-radius: 12px`, `padding: 10px 14px`, 13.5px. Placeholder `県名やよみで絞り込む(例:おき)`. Matches against both `name` (漢字) and `reading` (ひらがな).
   - **Chips**: wrapping flex, `gap: 8px`. Each chip `border: 2px solid <region.accent>`, background `<region.soft>`, text `<region.accent>`, 700 weight 13px, `padding: 8px 14px`, `border-radius: 999px`
   - **Limit 12 chips.** If more match, show `ほか{n}件。絞り込むと全部見られます。` at 11.5px `#8A8068`
   - Sort: always あいうえお順 by `reading`, via `localeCompare(..., 'ja')`
   - Tapping a chip pushes the Place screen

4. **予算 (Budget) section** — label + three pill chips: `〜3万円` / `3〜6万円` / `6万円〜`
   - Unselected: white bg, `#3A3327` text, `2px solid rgba(60,50,30,0.2)`
   - Selected: `#3A3327` bg, white text, `2px solid #3A3327`
   - Single-select, tapping again deselects

5. **興味から旅先を探す** — full-width CTA, `2px dashed #6B8E4E`, bg `#F1F4E4`, text `#4E6B36`, 900 weight 14.5px, `padding: 16px`, `border-radius: 16px`. Navigates to the Discover tab.

6. **いつもの関心 (Saved interests)** — only rendered when the user has saved interests
   - Label `いつもの関心` (700, 13.5px) + saved field labels joined by `・` (11.5px, `#8A8068`)
   - Up to **4** result cards: white, `border-radius: 16px`, `padding: 14px 16px`, same shadow
     - Line 1: `{県名} ・ {分野名}` — 800 weight, 11px, `letter-spacing: 0.05em`, colored `<region.accent>`
     - Line 2: the hook question — 700 weight, 14px, `#3A3327`, `line-height: 1.5`
   - Tapping opens that Place screen

---

### 2. 探す (Discover) — find a place by field of interest

**Purpose:** The primary discovery surface. Pick one or more academic fields; see matching places across all 47 prefectures.

**Layout:** Single scrolling column, same padding as Home.

**Components:**

1. **Title block** — `気になることから、探す` (24px display) + `興味のある分野を選んでみましょう(複数えらべます)。` (13px `#8A8068`)

2. **Field chips** — wrapping flex `gap: 8px`, margin-bottom 20px. **Multi-select.**
   - Unselected: white bg, `#3A3327` text, `box-shadow: 0 2px 6px rgba(60,50,30,0.08)`
   - Selected: `#3A3327` bg, white text
   - 700 weight, 13.5px, `padding: 9px 16px`, `border-radius: 999px`, no border
   - The 12 fields, in this order: 歴史 / 地質学 / 自然・生き物 / 食文化・酒・水 / 気象・気候 / 深海学 / 進化論 / 文化人類学 / 宗教学(学問) / 科学・物理 / 産業・技術 / 建築
   - The list is derived at runtime from which field ids actually appear in the data — don't hardcode

3. **Saved-interest banner** — shown when interests are saved: `いつもの関心:{labels}(旅程の「おすすめ順」に反映されます)`, 11.5px `#8A8068`

4. **Save toggle** — appears once at least one field is selected. Full width, `border-radius: 12px`, `padding: 10px`, 700 weight 12.5px
   - Not saved: `☆ この分野をいつもの関心として保存` — white bg, `#8A8068` text, `1px solid rgba(60,50,30,0.2)`
   - Saved: `★ いつもの関心として保存ずみ(解除する)` — `#F1F4E4` bg, `#4E6B36` text, `1px solid #6B8E4E`
   - "Saved" means the saved set is exactly equal to the current selection

5. **Result cards** — one per matching prefecture, あいうえお順, `gap: 10px`
   - White, `border-radius: 16px`, `padding: 16px 18px`, `box-shadow: 0 4px 12px rgba(60,50,30,0.08)`
   - Line 1: prefecture name, 800 weight 11px, `letter-spacing: 0.05em`, `<region.accent>`
   - Line 2: hook question, 700 weight 14.5px, `#3A3327`
   - Shows the **first** field on that region matching any selected field

6. **Empty state** — `分野を選ぶと、旅先のヒントが出てきます。` centered, 13.5px `#8A8068`, `margin-top: 40px`

---

### 3. 旅程 (Itinerary)

**Purpose:** Order the chosen places and understand *why* a given order makes sense.

**Layout:** Single scrolling column.

**Components:**

1. **Header row** — `space-between`, `align-items: flex-start`, `gap: 12px`, margin-bottom 18px
   - Left: `旅程` (24px display) + `選んだ場所を、時系列でまとめます。` (13px `#8A8068`)
   - Right (only when itinerary is non-empty): **リセット** button — `1px solid rgba(60,50,30,0.2)`, white, `#8A8068`, 11.5px, `padding: 6px 12px`, `border-radius: 999px`, `margin-top: 4px`. Clears the itinerary and the active sort.

2. **Sort selector** — only when 2+ stops
   - Caption `並び替えの基準を選べます` (12px `#8A8068`)
   - Three full-width option buttons stacked with `gap: 8px`, each `border-radius: 14px`, `padding: 10px 14px`, laid out as flex with a trailing check badge
     - Title line: 900 weight 13.5px, in the option's `labelColor`
     - Caption line: 11.5px, in the option's `captionColor`, `margin-top: 2px`
     - Check badge: 22×22 circle. Selected → filled with the option's tint, white `✓`. Unselected → `rgba(60,50,30,0.12)`, empty.
     - Selected: `border: 2px solid <tint>`, background `<softBg>`. Unselected: `border: 2px dashed <tint>`, background white.

   | Option | Title | Caption | tint | softBg | labelColor | captionColor |
   |---|---|---|---|---|---|---|
   | `recommended` | おすすめ順 | 移動のラクさと、興味のある分野のバランスで並べます | `#C85C3C` | `#FCE9E3` | `#A84A2F` | `#8A6A5A` |
   | `travel` | 移動がラクな順 | 乗り物での移動時間の合計がいちばん短くなります | `#E0A83C` | `#FBF0D6` | `#8A6A1E` | `#9A8A5A` |
   | `story` | 話がつながる順 | 土地の成り立ちが順番に分かるように並べます | `#6E9FB8` | `#E4EEF4` | `#3E7391` | `#5A7A8A` |

3. **Totals + reason** — `合計移動時間 約{h}時間` centered 12px `#8A8068`; below it, when a sort is active, the reason text on a `#F1F4E4` pill (`border-radius: 10px`, `padding: 8px 12px`, 12px, `#4E6B36`). Reason strings are **generated from the actual itinerary** (see Interactions).

4. **Stop rows** — white cards, `border-radius: 16px`, `padding: 14px 16px`, flex `gap: 10px`
   - Left: a vertical ▲/▼ pair, each 24×22, `border-radius: 6px`, bg `#F5EFE6`, 11px glyph. Disabled at the ends (`opacity: 0.35`).
   - Then an 8×44 accent bar, `border-radius: 6px`, filled `<region.accent>`
   - Then `{n}. {県名}` (700, 14.5px) over `{nights}泊` (12.5px `#8A8068`). Tapping opens the Place screen.
   - Right: **削除** text button, `#8A8068`, 13px

5. **Footer** — `合計 {n}泊の旅程です。` centered 13px `#8A8068`

6. **Empty state** — `まだ旅程がありません。/ 旅先を探してみましょう。` + a `興味から探す` dashed pill button

---

### 4. 場所ページ (Place detail) — pushed screen

**Purpose:** Read the layered explanation of a single prefecture.

**Layout:** Scrolling column. **No bottom-tab suppression** — the tab bar and AI FAB stay visible on this screen (this was an explicit fix; do not hide them).

**Components:**

1. **Header band** — background `<region.soft>`, `padding: 58px 20px 18px`
   - Back button: 36×36 circle, `rgba(255,255,255,0.6)`, chevron-left icon, margin-bottom 14px
   - Prefecture name: display font 26px, `<region.accent>`
   - Tagline: 13px `#3A3327`, `line-height: 1.6`

2. **Knowledge cards** — `padding: 16px 20px 8px`, `gap: 10px`, white cards `border-radius: 16px`
   - **Collapsed (default):** a full-width button row with
     - Field badge: 800 weight 10px, `letter-spacing: 0.05em`, color `<field.color>`, bg `rgba(0,0,0,0.04)`, `border-radius: 999px`, `padding: 3px 9px`
     - Hook question: 700 weight 14.5px, `#3A3327`, `line-height: 1.5`, flex-1
     - Chevron: 12×12, rotates 180° when open, `transition: transform 240ms cubic-bezier(0.2,0.8,0.2,1)`
   - **Expand animation:** `display: grid; grid-template-rows: 0fr → 1fr`, `transition: grid-template-rows 320ms cubic-bezier(0.2,0.8,0.2,1)`. Inner wrapper `overflow: hidden`.
   - **Expanded body:** `margin: 0 16px 16px`, `border-top: 1px dashed rgba(60,50,30,0.14)`, 13px, `line-height: 1.9`
   - Only one card open at a time (accordion)

3. **Glossary terms (a key feature)** — inside the expanded body, specialist words render as inline spans: color `#3E7391`, `border-bottom: 1px dashed #6E9FB8`, 700 weight, `cursor: pointer`
   - Tapping shows a **small dark tooltip directly beneath the word**: `position: absolute`, `top: calc(100% + 6px)`, width 200px, `max-width: calc(100vw - 40px)`, bg `#3A3327`, `border-radius: 10px`, `padding: 8px 11px`, `box-shadow: 0 8px 20px rgba(60,50,30,0.32)`, text 11.5px `rgba(255,255,255,0.9)`, `line-height: 1.65`, `z-index: 20`
   - **Edge flipping:** if the word sits in the right portion of its line (measured: `word.left - card.left > card.width - 200`), the tooltip anchors `right: 0` instead of `left: 0` so it never clips off-screen. This must be preserved.
   - Tapping the same term again closes it; only one tooltip open at a time
   - The containing card must switch to `overflow: visible` while a tooltip in it is open, otherwise the rounded card clips the tooltip

4. **宿泊スタイルのおすすめ (Lodging)** — `padding: 6px 20px 4px`
   - Label (700, 13.5px), then 1–2 cards: white, `border-radius: 14px`, `padding: 12px 14px`, `box-shadow: 0 3px 10px rgba(60,50,30,0.06)`
   - Style name (700, 13.5px `#3A3327`) over description (12.5px `#8A8068`, `line-height: 1.6`)
   - **Not a booking feature** — it recommends the *kind* of lodging that suits the region (体験型 / 旅館 / 民泊 / 古民家 etc.). Real inventory would come from an API later.

5. **Add-to-itinerary CTA** — `padding: 14px 20px 24px`
   - Not added: `旅程に追加する` — full-width, bg `#C85C3C`, white, 900 weight 14.5px, `padding: 14px`, `border-radius: 999px`, `box-shadow: 0 6px 16px rgba(200,92,60,0.35)`
   - Added: static text block `旅程に追加ずみです` — bg `#6B8E4E`, white, same metrics
   - Uses the current 泊数 value as the stop's nights

---

### 5. 旅ラボAIに相談 (AI chat) — pushed screen

**Purpose:** Ask free-form questions about places, history, geology, food culture.

**Layout:** Full-height flex column. **Bottom tabs and FAB are hidden on this screen only.**

**Components:**

1. **Header** — bg `#F1F4E4`, `padding: 58px 20px 14px`, flex `gap: 10px`
   - Back button: 36×36 circle, `rgba(255,255,255,0.7)`
   - Title `旅ラボAIに相談` (display 18px, `#4E6B36`) + subtitle `歴史・地質・食文化など、気になることを聞いてみましょう。` (11.5px `#8A8068`)

2. **Message list** — flex-1, `padding: 16px 20px`, `gap: 10px`
   - User bubble: right-aligned, bg `#C85C3C`, white text
   - Assistant bubble: left-aligned, bg `#fff`, `#3A3327` text
   - Both: `max-width: 80%`, `border-radius: 16px`, `padding: 10px 14px`, 13.5px, `line-height: 1.65`
   - Loading: a left-aligned `考え中…` bubble, `#8A8068`
   - Empty state: centered 13px `#8A8068` — `例:「なぜ香川はうどんが名物なの?」/「東京の地形はどうやってできたの?」`

3. **Composer** — `padding: 10px 16px 22px`, flex `gap: 8px`
   - Input: flex-1, `border: 1px solid rgba(60,50,30,0.14)`, white, `border-radius: 999px`, `padding: 11px 16px`, 13.5px. Placeholder `質問を入力…`. Enter submits.
   - Send button: 40×40 circle, bg `#6B8E4E`, white paper-plane icon

4. **FAB (on all non-chat screens)** — `position: absolute`, `right: 16px`, `bottom: 88px`, 52×52 circle, bg `#C85C3C`, `box-shadow: 0 8px 20px rgba(200,92,60,0.4)`, `z-index: 30`, speech-bubble icon

---

### Bottom tab bar

Present on Home, Discover, Itinerary, **and Place detail**. Hidden only on the AI chat screen.

- `padding: 10px 8px 22px`, bg `rgba(255,255,255,0.9)`, `backdrop-filter: blur(16px)`, `border-top: 1px solid rgba(60,50,30,0.08)`, `justify-content: space-around`
- Three tabs: **ホーム** (home icon), **探す** (magnifier), **旅程** (list lines)
- Each: icon 22×22 over a 10px 700-weight label, `gap: 4px`
- Active color `#C85C3C`; inactive `#B7AE9C`. While on the Place detail screen, no tab reads as active.

> A fourth **マイ関心** tab existed earlier and was **deliberately removed** — it duplicated Discover. Its saving function now lives inside Discover. Do not reintroduce it.

---

## Interactions & Behavior

### Navigation
- Three tabs; Place and Chat are pushed screens over the tab content
- Back from Place returns to the tab you came from
- Back from Chat returns to whichever screen opened it (`returnScreen`)
- Opening a Place resets the expanded-card state

### Card expansion
Accordion — opening one closes the other. `grid-template-rows` 0fr↔1fr over **320ms** `cubic-bezier(0.2,0.8,0.2,1)`; chevron rotates over **240ms** with the same easing.

### Glossary tooltip
Toggle on tap. Only one open globally. Position flips left/right based on measured geometry at tap time (see Place detail above). Closing happens by tapping the same term again.

### Itinerary sorting

**`travel` — shortest total travel time.** Nearest-neighbour from every possible starting city, keeping the best total. This avoids the factorial blow-up of brute-force permutation once the itinerary grows past a handful of stops. Skip entirely for fewer than 3 stops.

**`recommended`** — currently runs the same optimizer as `travel`, but its reason text additionally names the user's saved interests. In production this should genuinely weight the saved fields (e.g., front-load stops whose strongest field matches an interest) rather than being an alias.

**`story` — narrative order.** Sorts by each region's `storyRank` (1–5), taking the reader from places defined by raw natural formation (rank 1: 沖縄, 熊本, 鹿児島, 大分, 北海道) through to places defined by accumulated human activity (rank 5: 東京). This replaced an earlier "north to south" option, which was rejected as meaningless to a traveler.

**Manual reorder** — ▲/▼ swap adjacent stops; disabled at the ends.

### Sort reason text
Generated per-itinerary, never static. With `first`/`last` = the first and last stop names and `hours` = total travel hours:

- `travel` → `乗り物での移動が合計 約{hours}時間と、いちばん短くなる順番です。`
- `story` → `{first}の自然の成り立ちから、{last}の人が暮らしてきた土地へ。土地のでき方を順にたどれます。`
- `recommended`, with saved interests → `移動を約{hours}時間におさえつつ、登録した興味({labels})を楽しめる{first}から回る順番にしました。`
- `recommended`, without → `移動を約{hours}時間におさえつつ、{first}から{last}へ無理なく回れる順番にしました。`

### Travel time estimation
Haversine great-circle distance from each region's `lat`/`lng`, then a piecewise conversion approximating Japanese transport:

```
km < 150  → km / 60           (local rail / car)
km < 600  → km / 130          (shinkansen)
km >= 600 → 1.5 + km / 700    (flight, plus fixed airport overhead)
```

Result rounded to the nearest 0.5 h. **Replace with a real routing/transit API in production** — the user considers 移動 something they'll look up themselves, so this is a rough planning aid only.

### AI chat
Calls an LLM with the full conversation history plus a system prompt. The system prompt constrains scope to academic/background explanation in polite Japanese, 2–4 sentences, no emoji, and injects the current region as context when the user opened chat from a Place screen:

```
あなたは旅行アプリ「旅ラボ」のAIアシスタントです。歴史・地質学・自然・食文化など
学問的な視点から、旅先選びやその土地の背景知識について、やさしい丁寧語で2〜4文程度の
簡潔な回答をしてください。絵文字は使いません。{ユーザーは現在「{region}」のページを見ています。}
```

Note this prompt currently makes the AI **decline** specific lodging recommendations — that behavior was confirmed as intended for the knowledge assistant. Since lodging is now an in-app feature, consider either broadening the prompt or routing lodging questions to the lodging data.

On failure, append `うまく応答できませんでした。もう一度お試しください。` as an assistant message. Handle unmount during the in-flight request.

### Save-interests semantics
"Saved" = the persisted interest set is exactly equal to the current Discover selection. Tapping the toggle when already saved clears the set entirely; otherwise it overwrites with the current selection. Saved interests drive: the Home saved-interest cards, the Discover banner, and the `recommended` sort's reason text.

---

## State Management

Single component's state in the prototype; split as appropriate in production.

| Key | Type | Notes |
|---|---|---|
| `tab` | `'home' \| 'discover' \| 'itinerary'` | active bottom tab |
| `screen` | `'tabs' \| 'place' \| 'chat'` | pushed-screen layer |
| `returnScreen` | same | where chat returns to |
| `regions` | `Region[]` | loaded async from the data module |
| `fieldOrder` | `{id,label}[]` | derived from data at load |
| `nights` | number 1–30 | default 2 |
| `people` | number 1–10 | default 2 |
| `budgetId` | `'low'\|'mid'\|'high'\|null` | |
| `destQuery` | string | Home destination filter |
| `selectedFieldIds` | string[] | Discover multi-select |
| `interests` | string[] | persisted "usual interests" |
| `activePlaceId` | string \| null | |
| `expandedCardId` | string \| null | accordion |
| `activeTerm` | `{term, desc, alignRight} \| null` | glossary tooltip |
| `itinerary` | `{placeId, nights}[]` | ordered |
| `sortMethod` | `'recommended'\|'travel'\|'story'\|null` | |
| `chatMessages` | `{role, content}[]` | |
| `chatInput` | string | |
| `chatLoading` | boolean | |

**Persistence:** the prototype keeps everything in memory. In production, persist `interests`, `itinerary`, `nights`, `people`, and `budgetId` locally.

**Data fetching:** the prototype imports static JS modules. Production should back this with an API. See Data Model.

---

## Data Model

```ts
type Region = {
  id: string;            // 'tokyo'
  name: string;          // '東京'
  reading: string;       // 'とうきょう'  — drives あいうえお sorting & search
  lat: number;
  lng: number;
  storyRank: 1|2|3|4|5;  // 1 = shaped by nature, 5 = shaped by human activity
  accent: string;        // hex, per-region accent
  soft: string;          // hex, per-region tinted background
  tagline: string;
  lodging: { style: string; desc: string }[];
  fields: Field[];       // 3–4 per region
};

type Field = {
  id: string;            // 'geology'
  label: string;         // '地質学'
  color: string;         // hex
  hook: string;          // the one-line question shown collapsed
  detail: DetailPart[];  // the expanded explanation
};

// A detail is an array of parts. Strings render as plain text;
// objects render as tappable glossary terms.
type DetailPart = string | { term: string; desc: string };
```

Example:

```js
detail: [
  '瀬戸内は',
  { term: '花崗岩', desc: 'マグマが地下でゆっくり固まってできた硬い岩石。風化すると白っぽい砂になります。' },
  'でできた古い山地が沈降し、谷だった部分が海になった地形です。',
]
```

This array-of-parts shape is what makes the inline glossary work. Preserve it (or an equivalent rich-text representation) in the API schema.

**Field ids in use:** `history`, `geology`, `nature`, `food`, `climate`, `deepsea`, `evolution`, `anthropology`, `religion`, `science`, `industry`, `architecture`.

**Coverage:** all 47 prefectures, 3–4 fields each, ~150 explanations, each with 1–3 glossary terms.

**On the API strategy (unresolved):** the user's planning doc weighed three options — (A) LLM generation at runtime, (B) primary sources (Wikipedia/Wikidata/government open data) summarized by an LLM, (C) hand-curated database. The working recommendation was **B as the base, with A filling gaps**, since it keeps citations possible while scaling. The prototype's static data stands in for whichever is chosen. Accuracy target is "balanced" — academically sound but written for interest, with sources shown at the end of a detail view.

---

## Design Tokens (prototype)

Map these onto Organic's tokens rather than using them literally.

**Ground & text**

| Role | Hex | Organic equivalent |
|---|---|---|
| Page background | `#F5EFE6` | `--color-bg` |
| Card surface | `#FFFFFF` | surface |
| Primary text | `#3A3327` | `--color-text` |
| Secondary text | `#8A8068` | neutral-600 |
| Muted / inactive | `#B7AE9C` | neutral-400 |
| Tooltip surface | `#3A3327` | neutral-900 |

**Accents** (also used as per-region accents)

| Role | accent | soft bg | deep text |
|---|---|---|---|
| Terracotta (primary) | `#C85C3C` | `#FCE9E3` | `#A84A2F` |
| Sage (secondary) | `#6B8E4E` | `#F1F4E4` | `#4E6B36` |
| Ochre | `#E0A83C` | `#FBF0D6` | `#8A6A1E` |
| Slate blue | `#6E9FB8` | `#E4EEF4` | `#3E7391` |
| Warm brown | — | — | `#8A6A5A` |

**Borders:** `rgba(60,50,30,0.08)` hairline · `rgba(60,50,30,0.14)` control · `rgba(60,50,30,0.2)` emphasis

**Radius:** 10 (tooltip) · 12 (input, small control) · 14 (option button, lodging card) · 16 (card, CTA) · 999 (pill, circle)

**Shadow:** `0 2px 6px rgba(60,50,30,0.08)` chip · `0 3px 10px rgba(60,50,30,0.06)` small card · `0 4px 12px rgba(60,50,30,0.08)` card · `0 6px 16px rgba(200,92,60,0.35)` primary CTA · `0 8px 20px rgba(200,92,60,0.4)` FAB · `0 8px 20px rgba(60,50,30,0.32)` tooltip

**Spacing:** 20px screen gutter · 58px top padding (status bar) · 8/10/14/16/18/22px stacking rhythm

**Type (prototype):** display = Yomogi (a crayon-like hand); body = Zen Maru Gothic; heavy labels = Zen Kaku Gothic New; latin numerals/labels = Nunito. **Under Organic these become Caprasimo (display) + Figtree (body)** — but Figtree has no Japanese coverage, so pair it with a Japanese body face (Zen Maru Gothic is a good match for Organic's rounded warmth) and keep Caprasimo for latin display only, substituting a rounded Japanese display face for Japanese headings.

Sizes in use: 24 (screen title) · 26 (place name) · 18 (chat title) · 14.5 (card title, CTA) · 13.5 (chip, body emphasis) · 13 (body) · 12.5 (secondary) · 11.5 (caption) · 11 (badge) · 10 (tab label). Line-heights: 1.9 (expanded body) · 1.65–1.75 (paragraphs) · 1.5–1.6 (titles).

**Motion:** 320ms `cubic-bezier(0.2,0.8,0.2,1)` (card expand) · 240ms same easing (chevron)

---

## Assets

**None bundled.** The user deliberately deferred photography and will supply real images later. Leave slots for:
- A hero image per prefecture, in the Place header band
- Optional inline figures inside expanded knowledge cards (diagrams for geology/evolution topics would help a lot)
- Optional thumbnails on Discover result cards

Icons are inline SVG in the prototype (home, magnifier, list, chevron, speech bubble, paper plane). Under Organic, replace with **Lucide at `stroke-width: 2.75`**.

---

## Files

Design references, in this bundle:

| File | What it is |
|---|---|
| `旅ラボ プロトタイプ.dc.html` | The full interactive prototype — all screens, logic, styling |
| `trip-data.js` | Data aggregator; field list derivation; Haversine + travel-time estimation |
| `regions-1.js` | 北海道・東北・北関東 (12 prefectures) |
| `regions-2.js` | 首都圏・中部 (12) |
| `regions-3.js` | 近畿・中国 (11) |
| `regions-4.js` | 四国・九州・沖縄 (12) |
| `旅行アプリ構想メモ.dc.html` | The original concept/planning document — problem framing, competitive positioning, IA, API strategy options |
| `ios-frame.jsx` | The phone bezel used to present the prototype — **presentation only, not part of the app** |
| `support.js` | The prototype's component runtime — **not for production** |

To view the prototype, open `旅ラボ プロトタイプ.dc.html` in a browser (it needs the sibling JS files present).

---

## Notes for the implementer

- **Layered disclosure is the whole product.** One-line question → tap → short explanation → tap a term → gloss. Don't collapse these into a single dense text block.
- **Copy is deliberate.** Hooks are written as *questions* ("なぜ〜のか?"), not statements, to create curiosity. Keep this voice if you write new content.
- **The prototype has been through several correction rounds.** Notable decisions the user pushed for, which should survive: tabs stay visible on the Place screen; sort options must be self-explanatory to a traveler (no "north to south"); the selected sort must be visibly selected; saved interests must be visible somewhere, not write-only; the glossary tooltip must appear right under the word, not in a bottom sheet.
- **Not a booking app.** Transport is explicitly out of scope. Lodging is *style* recommendation, not inventory.
- **Scale beyond Japan** is the eventual direction — Japan is phase one. Keep the data model country-agnostic.
