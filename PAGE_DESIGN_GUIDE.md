# FLORETTA — PAGE DESIGN GUIDE FOR AI AGENTS

> Dokumen ini adalah instruksi tambahan untuk AI coding/design agent yang akan membuat atau mengembangkan halaman storefront Floretta.
>
> **Wajib dibaca bersama:**
> 1. `AGENTS.md`
> 2. `DESIGN.md`
> 3. Dokumen ini
>
> Jika ada konflik:
> - aturan arsitektur dan coding mengikuti `AGENTS.md`
> - aturan visual dan UX mengikuti `DESIGN.md`
> - dokumen ini menjelaskan struktur halaman, navigasi, serta content direction tambahan

---

# 1. Project Context

Floretta adalah platform florist dan gifting modern untuk pasar Indonesia.

Tujuan experience:

```text
Discover
→ Choose
→ Personalize
→ Send
→ Pay
→ Track
```

Customer tidak hanya membeli bunga. Customer sedang memilih hadiah untuk seseorang pada suatu momen tertentu.

Karena itu, desain harus terasa:

```text
Premium
Modern
Warm
Personal
Elegant
Trustworthy
```

Hindari tampilan seperti:

```text
generic marketplace
SaaS dashboard
AI-generated landing page
overdecorated wedding website
traditional flower shop yang terlalu penuh
```

Desain harus tenang, product-first, memiliki whitespace yang cukup, dan memprioritaskan fotografi bunga.

---

# 2. Main Customer Navigation

Gunakan navbar customer berikut sebagai baseline.

## Desktop

```text
[ FLORETTA ]

Bunga
Momen Spesial
Custom Bouquet
Hadiah

                         Search     Account     Cart
```

Semua item utama pada navbar adalah **direct navigation links**.

Jangan gunakan dropdown atau mega-menu pada navbar.

Route:

```text
Bunga            → /products
Momen Spesial    → /occasions
Custom Bouquet   → /custom-bouquet
Hadiah           → /gifts
```

`Lacak Pesanan` tidak perlu menjadi primary navigation item.

Tempatkan sebagai utility action pada:

- top announcement bar
- halaman Account
- footer

Contoh announcement bar:

```text
Pengiriman Hari yang Sama Tersedia                      Lacak Pesanan →
```

## Mobile

```text
☰          FLORETTA                 Search   Cart
```

Isi navigation drawer:

```text
Bunga
Momen Spesial
Custom Bouquet
Hadiah

Lacak Pesanan
Masuk / Akun Saya
```

Item pada drawer juga harus berupa direct links.

Jangan membuat submenu bertingkat untuk navigation customer pada MVP.

---

# 3. Navbar Item — Bunga

Navbar item `Bunga` langsung menuju:

```text
/products
```

Tidak ada dropdown.

Kategori seperti:

```text
Hand Bouquet
Flower Box
Bunga Meja
Standing Flower
Best Seller
```

ditampilkan di dalam halaman `/products` melalui category chips, filter, tabs, atau section yang sesuai.

Kategori harus berasal dari backend jika API category sudah tersedia.

Jangan hardcode kategori permanen di navbar.

---

# 4. Navbar Item — Momen Spesial

## Tujuan

Menu `Momen Spesial` membantu customer memilih berdasarkan **alasan mengirim hadiah**, bukan taxonomy produk.

Route utama:

```text
/occasions
```

Detail route:

```text
/occasions/[slug]
```

Suggested occasion:

```text
Ulang Tahun
Anniversary
Wisuda
Romantis
Ucapan Selamat
Get Well Soon
Belasungkawa
Terima Kasih
Just Because
```

Navbar `Momen Spesial` langsung menuju `/occasions`.

Pilihan occasion ditampilkan **di dalam halaman `/occasions`**, bukan sebagai dropdown navbar.

---

# 5. Page Design — Momen Spesial

## 5.1 Occasion Index

Route:

```text
/occasions
```

### Page goal

Membantu customer menjawab:

```text
"Untuk momen apa saya mengirim hadiah?"
```

### Recommended structure

```text
Header

Page Hero
↓
Occasion Grid
↓
Popular for This Week / Recommended
↓
Featured Bouquets
↓
Custom Bouquet CTA
↓
Trust / Delivery Info
↓
FAQ
↓
Footer
```

### Hero

Gunakan copy pendek.

Contoh:

```text
Hadiah untuk setiap momen berarti

Temukan bunga dan hadiah yang tepat
untuk menyampaikan apa yang ingin kamu katakan.
```

Primary CTA tidak diperlukan jika occasion cards langsung terlihat pada viewport.

Hero visual:

- real flower photography
- subtle botanical composition
- tidak menggunakan dekorasi generatif berlebihan
- tidak menggunakan floating glass card

### Occasion Card

Setiap card minimal memiliki:

```text
Image
Occasion name
Short supporting copy
```

Contoh:

```text
Ulang Tahun
Rayakan hari spesial mereka dengan rangkaian yang penuh warna.
```

Card harus clickable secara keseluruhan.

Recommended desktop grid:

```text
3 columns
```

Recommended mobile:

```text
2 columns
```

Jika gambar terasa terlalu sempit di mobile, gunakan single-column editorial card.

### Occasion Visual Direction

Gunakan foto yang membedakan mood secara halus.

```text
Ulang Tahun     → cheerful / bright
Anniversary     → romantic / elegant
Wisuda          → celebratory
Romantis        → intimate / roses
Get Well Soon   → soft / uplifting
Terima Kasih    → warm / thoughtful
Belasungkawa    → calm / respectful
Just Because    → casual / spontaneous
```

Jangan memberi setiap occasion warna UI yang berbeda secara ekstrem.

---

# 6. Occasion Detail Page

Route example:

```text
/occasions/birthday
/occasions/anniversary
/occasions/graduation
```

Recommended structure:

```text
Breadcrumb
↓
Occasion Hero
↓
Product Grid
↓
Optional Filter / Sort
↓
Helpful Content
↓
Related Occasions
↓
FAQ
↓
Footer
```

## Occasion Hero

Contoh:

```text
Bunga Ulang Tahun

Buat hari mereka terasa lebih spesial dengan
rangkaian bunga yang dipilih untuk sebuah perayaan.
```

Jangan membuat hero sangat tinggi.

Tujuannya adalah membawa user ke produk secepat mungkin.

## Product Grid

Desktop:

```text
3–4 columns
```

Mobile:

```text
2 columns
```

Product card minimal:

```text
Product image
Product name
Price / starting price
Optional badge
```

Description panjang tidak ditampilkan pada card.

## Filter

Jika produk masih sedikit:

```text
jangan tampilkan filter kompleks
```

Jika produk sudah banyak, filter yang relevan:

```text
Harga
Jenis Bunga
Warna
Ukuran
Availability
```

Mobile filter menggunakan Sheet/Drawer.

---

# 7. Navbar Item — Hadiah

## Tujuan

`Hadiah` digunakan untuk customer yang ingin menambahkan atau membeli gift item selain rangkaian bunga.

Route utama:

```text
/gifts
```

Suggested categories:

```text
Cokelat
Teddy Bear
Cake
Vas Bunga
Kartu Ucapan
Gift Set
```

Navbar `Hadiah` langsung menuju `/gifts`.

Kategori hadiah ditampilkan **di dalam halaman `/gifts`**, bukan sebagai dropdown navbar.

`Kartu Ucapan` dapat menjadi bagian dari personalization/add-on jika bukan produk standalone.

---

# 8. Page Design — Hadiah

Route:

```text
/gifts
```

## Page goal

Membantu customer menjawab:

```text
"Apa yang ingin saya tambahkan agar hadiah terasa lebih personal?"
```

Recommended structure:

```text
Header
↓
Gift Hero
↓
Gift Categories
↓
Featured Gift Sets
↓
Individual Add-ons
↓
Flowers + Gifts CTA
↓
Trust / Delivery Note
↓
FAQ
↓
Footer
```

## Hero

Contoh copy:

```text
Lengkapi hadiah mereka

Tambahkan sesuatu yang kecil,
personal, dan berarti.
```

Gunakan still-life product photography.

Hindari hero yang terlihat seperti marketplace promo sale.

## Gift Category Card

Card minimal:

```text
Image
Category name
Optional one-line copy
```

Contoh:

```text
Cokelat
Pasangan sederhana untuk membuat hadiah terasa lebih lengkap.
```

## Featured Gift Set

Gunakan card lebih besar untuk bundle.

Contoh:

```text
Sweet Celebration Set

Bouquet + Chocolate + Greeting Card

Mulai dari Rp...
```

Harga dan isi bundle harus berasal dari backend.

Jangan mengarang bundle yang belum tersedia pada API.

---

# 9. Relationship Between Flowers, Occasions, and Gifts

Agent harus memahami perbedaan:

```text
Bunga
= user memilih berdasarkan produk

Momen Spesial
= user memilih berdasarkan alasan/acara

Hadiah
= user memilih item tambahan atau gift complement

Custom Bouquet
= user membuat rangkaian yang lebih personal
```

Jangan mencampur semua konsep menjadi satu dropdown besar.

---

# 10. Custom Bouquet

Route:

```text
/custom-bouquet
```

Gunakan step-based builder.

Baseline:

```text
1 Budget
2 Style / Flower Preference
3 Color
4 Size
5 Add-ons
6 Message
7 Review
```

Mobile:

```text
one main decision per screen
```

Desktop boleh menggunakan:

```text
Builder                Summary
Options                Bouquet
Options                Budget
Options                Add-ons
                       Estimated Total
```

Jangan menjanjikan preview bunga 100% identik dengan hasil akhir.

Tampilkan flower substitution note jika diperlukan.

---

# 11. Account Navigation

## Logged Out

Account dropdown:

```text
Masuk
Daftar
```

Routes:

```text
/login
/register
/forgot-password
```

## Logged In

Account dropdown:

```text
Akun Saya
Pesanan Saya
Penerima
Tanggal Penting
Alamat
Profil

Keluar
```

Routes:

```text
/account
/account/orders
/account/recipients
/account/reminders
/account/addresses
/account/profile
```

Authentication source of truth tetap backend.

Menyembunyikan menu admin di frontend bukan security.

---

# 12. Cart

Cart berada di kanan navbar.

Gunakan icon dengan badge quantity.

Example:

```text
Cart icon
      2
```

Cart drawer boleh digunakan sebagai quick preview.

Namun route penuh tetap:

```text
/cart
```

Mini cart tidak boleh menggantikan cart page untuk flow checkout utama.

---

# 13. Search

Search harus mendukung customer intent.

Contoh query:

```text
rose
pink
birthday
graduation
romantic
sunflower
```

Desktop:

- search field ringkas atau expandable search

Mobile:

- search icon membuka full-width search / sheet

Search results harus dapat mencakup:

```text
Products
Occasions
Categories
```

Jika backend baru mendukung product search, jangan mengarang hasil occasion/category.

---

# 14. Homepage Navigation Relationship

Homepage recommended flow:

```text
Header
↓
Hero
↓
Shop by Occasion
↓
Featured Bouquets
↓
Shop by Category
↓
Why Choose Us
↓
Custom Bouquet CTA
↓
How Delivery Works
↓
Testimonials
↓
Important Date / Reminder CTA
↓
FAQ / SEO Content
↓
Footer
```

Jangan menjadikan homepage katalog panjang tanpa hierarchy.

User harus cepat memahami:

```text
apa yang dijual
untuk siapa
kenapa dapat dipercaya
apa tindakan berikutnya
```

---

# 15. Header Behavior

Desktop header:

- sticky diperbolehkan
- gunakan background solid/semi-solid
- shadow sangat subtle atau border bottom
- tinggi nyaman, bukan oversized
- nav label singkat

Scroll state dapat:

```text
slightly reduce header height
add subtle bottom border
```

Hindari:

```text
glassmorphism berat
blur ekstrem
floating navbar
large animated pill nav
```

---

# 16. Navigation Interaction

Customer navbar tidak menggunakan dropdown atau mega-menu.

Desktop:

- setiap nav item adalah direct link
- active state harus jelas tetapi subtle
- hover state sederhana
- focus state wajib terlihat
- jangan gunakan hover panel atau submenu

Mobile:

- hamburger membuka satu navigation drawer
- isi drawer berupa daftar direct links
- jangan gunakan nested accordion untuk menu utama
- setiap navigation item memiliki touch target minimal ~44px

---

# 17. Footer Navigation

Footer disarankan memiliki:

```text
Belanja
- Semua Bunga
- Momen Spesial
- Custom Bouquet
- Hadiah

Bantuan
- Cara Pemesanan
- Pengiriman
- Lacak Pesanan
- FAQ
- Hubungi Kami

Akun
- Masuk
- Daftar
- Pesanan Saya

Tentang
- Tentang Floretta
- Kebijakan Privasi
- Syarat & Ketentuan
```

Hanya tampilkan route yang benar-benar tersedia.

---

# 18. Visual Rules

Gunakan design system existing.

Baseline:

```text
Background: #FFFDFC
Surface: #FFFFFF
Foreground: #24211F
Muted: #F7F3F0
Muted Foreground: #766F69
Border: #E8E1DC

Primary: #315C4C
Primary Hover: #284C3F

Blush: #F4DDD8
Rose: #C97878
Cream: #F7EFE4
```

Jangan hardcode warna jika token sudah tersedia.

Typography direction:

```text
Heading: Playfair Display
Body: Inter
```

Maximum dua font family.

---

# 19. Avoid “AI-Looking” Design

Agent harus secara aktif menghindari pola visual berikut:

```text
excessive gradients
floating glass cards
random blobs
glowing borders
huge pill buttons everywhere
overuse of rounded cards
generic purple/blue gradient
3D icon packs
decorative elements without purpose
too many badges
over-animated sections
alternating card grids yang terlalu template-like
```

Preferred direction:

```text
editorial
calm
product photography
realistic spacing
strong typography
subtle botanical detail
restrained decorative assets
```

Setiap section tidak harus dibungkus card.

---

# 20. Product Photography

Photography adalah elemen visual utama.

Gunakan:

```text
clean background
consistent lighting
natural colors
high resolution
similar framing
```

Product listing ratio:

```text
4:5
```

Product detail:

```text
4:5 atau 1:1
```

Jangan stretch image.

Hero boleh menggunakan lifestyle photo, tetapi produk harus tetap menjadi focal point.

---

# 21. Responsive Requirements

## Mobile

Prioritaskan:

```text
single-column flow
large touch targets
short hierarchy
drawer / sheet
sticky CTA bila relevan
```

Customer flow harus nyaman pada mobile.

## Tablet

Gunakan:

```text
2–3 column grid
adaptive navigation
```

## Desktop

Gunakan ruang ekstra untuk:

```text
product gallery
product grid
filter toolbar/sidebar
order summary
account sidebar
```

Jangan hanya memperbesar layout mobile.

---

# 22. Accessibility

Minimum:

- semantic HTML
- keyboard navigation
- visible focus state
- accessible labels
- meaningful alt text
- sufficient contrast
- icon-only button memiliki `aria-label`
- touch target sekitar 44px minimum

Navigation navbar harus usable sepenuhnya dengan keyboard.

---

# 23. Loading, Empty, and Error States

Setiap collection page harus memiliki:

```text
Loading
Empty
Error
```

## Loading

Gunakan skeleton yang menyerupai final layout.

Jangan hanya spinner besar.

## Empty Example

```text
Belum ada hadiah di kategori ini.

Lihat koleksi bunga kami untuk menemukan pilihan lainnya.

[Lihat Bunga]
```

## Error Example

```text
Kami belum bisa memuat koleksi ini.

Silakan coba beberapa saat lagi.

[Coba Lagi]
```

Jangan tampilkan technical backend error.

---

# 24. API Rules

Frontend tidak boleh:

```text
mengakses database langsung
hardcode backend URL
mengarang API response
mengarang stock
mengarang price
mengarang payment status
mengarang category
```

Semua komunikasi backend melalui service layer.

Example:

```text
services/
├── product.service.ts
├── order.service.ts
├── auth.service.ts
└── ...
```

Jika API yang dibutuhkan belum tersedia, tuliskan kebutuhan backend secara eksplisit.

Example:

```text
Required backend change:

GET /api/v1/occasions

Need:
id
slug
name
description
imageUrl
```

Jangan mengarang field tersebut sebagai fakta jika kontrak belum disepakati.

---

# 25. Suggested Frontend Routes

Baseline customer routes:

```text
/
/products
/products/[slug]

/categories/[slug]

/occasions
/occasions/[slug]

/gifts
/gifts/[slug]

/custom-bouquet

/cart

/checkout
/checkout/payment
/checkout/success

/track/[orderNumber]

/login
/register
/forgot-password

/account
/account/orders
/account/recipients
/account/reminders
/account/addresses
/account/profile
```

Catatan:

`/gifts` adalah recommendation dari dokumen ini.

Sebelum implementasi, agent harus memastikan apakah route ini sudah ada di project.

Jangan membuat duplikasi jika existing route/category architecture sudah menangani gifts.

---

# 26. Suggested Components

Sebelum membuat component baru, cari existing component.

Potential components:

```text
Header
DesktopNavigation
MobileNavigation
NavLink
SearchTrigger
AccountMenu
CartButton

OccasionCard
OccasionGrid
OccasionHero

GiftCategoryCard
GiftSetCard
GiftGrid

SectionHeading
ProductCard
ProductGrid
EmptyState
ErrorState
```

Jangan membuat:

```text
GreenButton
NavbarButton
GiftButton
OccasionButton
```

jika semua bisa menggunakan shared `Button`.

---

# 27. Page Acceptance Checklist

Sebelum menyatakan halaman selesai, periksa:

```text
[ ] sesuai AGENTS.md
[ ] sesuai DESIGN.md
[ ] mobile-first
[ ] desktop layout tersedia
[ ] menggunakan existing token
[ ] menggunakan existing components jika ada
[ ] CTA hierarchy jelas
[ ] tidak terasa seperti generic marketplace
[ ] tidak terasa seperti AI-generated template
[ ] loading state tersedia
[ ] empty state tersedia
[ ] error state tersedia
[ ] keyboard navigation bekerja
[ ] focus state terlihat
[ ] tidak ada secret
[ ] tidak ada hardcoded backend URL
[ ] tidak ada mock data permanen
[ ] API melalui service layer
[ ] TypeScript tidak error
[ ] lint tidak error
```

---

# 28. AI Agent Execution Order

Ketika diminta membuat salah satu page:

```text
1. Baca AGENTS.md
2. Baca DESIGN.md
3. Baca dokumen ini
4. Inspect struktur project
5. Cari component existing
6. Cari route existing
7. Cari type existing
8. Cari API service existing
9. Pahami API contract
10. Implement mobile layout
11. Implement desktop layout
12. Tambahkan responsive states
13. Tambahkan loading/empty/error states
14. Periksa accessibility
15. Periksa visual consistency
16. Jalankan typecheck/lint/test yang relevan
```

Jangan langsung membuat file baru sebelum memeriksa implementasi existing.

---

# 29. Example Agent Prompt

Prompt berikut dapat digunakan bersama dokumen ini:

```text
Read AGENTS.md, DESIGN.md, and PAGE_DESIGN_GUIDE.md first.

Create the Floretta [PAGE NAME] page.

Before coding:
- inspect the existing route and component structure
- reuse existing components, tokens, types, and services
- do not invent API fields
- do not create backend logic in frontend

Design direction:
- premium modern florist/gifting
- warm, calm, editorial
- product photography first
- generous whitespace
- minimal borders/shadows
- avoid AI-looking gradients, floating glass cards, excessive pills, and decorative clutter

Requirements:
- mobile-first
- responsive desktop layout
- loading state
- empty state where relevant
- error state
- accessible interactions
- clear CTA hierarchy

After implementation:
- verify TypeScript
- verify lint
- report files changed
- report any backend API requirement that is still missing
```

---

# 30. Core Decision Rule

Jika terjadi konflik:

```text
visual beauty
vs
clarity
```

pilih:

```text
clarity
```

Jika:

```text
animation
vs
performance
```

pilih:

```text
performance
```

Jika:

```text
creative interaction
vs
simple purchasing flow
```

pilih:

```text
simple purchasing flow
```

Floretta harus membuat customer merasa:

```text
mudah memilih
mudah mengirim
aman membayar
jelas kapan dikirim
yakin dengan kualitas
tenang setelah checkout
```
