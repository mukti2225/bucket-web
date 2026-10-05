# AGENTS.md

## 1. Purpose

Dokumen ini adalah acuan utama untuk AI coding agent dan developer yang mengerjakan repository **frontend** aplikasi e-commerce florist/gifting.

Agent harus membaca file ini sebelum membuat, mengubah, atau melakukan refactor kode.

Frontend dan backend merupakan **dua project/repository terpisah**.

Repository ini hanya bertanggung jawab terhadap:

- Customer-facing web application
- Authentication UI
- Product catalog
- Product detail
- Custom bouquet builder
- Cart
- Checkout
- Payment UI
- Order tracking
- QC photo display
- Customer account
- Recipient management
- Important date/reminder UI
- Admin dashboard
- Integrasi dengan Backend REST API

Business logic yang bersifat authoritative tetap berada di backend.

---

# 2. Technology Stack

Gunakan stack berikut.

```text
Framework       : Next.js
Language        : TypeScript
Router          : Next.js App Router
Styling         : Tailwind CSS
UI Components   : shadcn/ui
State           : Zustand
Server State    : Fetch/API layer
Forms           : React Hook Form
Validation      : Zod
Icons           : Lucide React
Image           : next/image
Authentication  : Backend API
Payment         : Midtrans via Backend
```

Jangan mengganti library utama tanpa alasan teknis yang jelas.

---

# 3. Architecture

Frontend dan backend berada pada repository berbeda.

```text
Browser
   │
   ▼
Frontend
Next.js
   │
   │ HTTPS / REST
   ▼
Backend API
NestJS
   │
   ├── PostgreSQL
   ├── Midtrans
   └── Object Storage
```

Frontend tidak boleh mengakses database secara langsung.

Semua data bisnis berasal dari backend.

Base API:

```text
/api/v1
```

Environment variable:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
```

Contoh:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Jangan hardcode URL backend di component.

---

# 4. Recommended Project Structure

Gunakan struktur berikut sebagai baseline.

```text
frontend/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── placeholders/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── (store)/
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── occasions/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── custom-bouquet/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── payment/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── success/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── track/
│   │   │       └── [orderNumber]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── account/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── orders/
│   │   │   ├── recipients/
│   │   │   ├── reminders/
│   │   │   ├── addresses/
│   │   │   └── profile/
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── inventory/
│   │   │   ├── customers/
│   │   │   └── settings/
│   │   │
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── common/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── order/
│   │   ├── bouquet/
│   │   ├── account/
│   │   └── admin/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── bouquet/
│   │   ├── recipients/
│   │   └── reminders/
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── payment.service.ts
│   │   ├── recipient.service.ts
│   │   └── reminder.service.ts
│   │
│   ├── stores/
│   │   ├── cart.store.ts
│   │   ├── auth.store.ts
│   │   ├── checkout.store.ts
│   │   └── bouquet.store.ts
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-cart.ts
│   │   └── use-debounce.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   └── validation.ts
│   │
│   ├── types/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   └── user.ts
│   │
│   └── config/
│       ├── site.ts
│       └── navigation.ts
│
├── .env.example
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── AGENTS.md
└── DESIGN.md
```

Struktur boleh berkembang, tetapi jangan membuat abstraction baru tanpa kebutuhan nyata.

---

# 5. Route Groups

Gunakan Next.js route groups untuk memisahkan concern.

## Store

```text
(store)
```

Berisi halaman customer-facing.

Contoh:

```text
/
/products
/products/[slug]
/categories/[slug]
/occasions/[slug]
/custom-bouquet
/cart
/checkout
/track/[orderNumber]
```

## Auth

```text
(auth)
```

Contoh:

```text
/login
/register
/forgot-password
```

## Account

```text
/account
```

Hanya untuk customer yang sudah login.

## Admin

```text
/admin
```

Hanya untuk user dengan role yang diizinkan.

---

# 6. Component Rules

Gunakan urutan berikut sebelum membuat component baru:

1. Cek `components/ui`.
2. Cek component domain yang sudah ada.
3. Extend component existing bila masuk akal.
4. Baru buat component baru.

Jangan membuat duplicate component.

Contoh yang salah:

```text
PrimaryButton
SubmitButton
GreenButton
CheckoutButton
```

Jika semuanya hanya variasi tombol, gunakan satu `Button`.

---

# 7. shadcn/ui

`components/ui` digunakan untuk primitive UI.

Contoh:

```text
Button
Input
Textarea
Dialog
Sheet
Drawer
Card
Badge
Tabs
Select
Checkbox
RadioGroup
Form
Skeleton
Alert
Toast
Table
DropdownMenu
```

Jangan meletakkan business logic pada `components/ui`.

---

# 8. Server vs Client Components

Gunakan **Server Component secara default**.

Gunakan `"use client"` hanya jika membutuhkan:

- state browser
- event handler
- Zustand
- React Hook Form
- browser API
- interactive component

Jangan menjadikan seluruh page sebagai Client Component hanya karena satu tombol membutuhkan interaksi.

Pisahkan interactive section menjadi component tersendiri.

---

# 9. API Layer

Semua komunikasi backend harus melalui `services`.

Jangan menulis fetch tersebar di banyak UI component.

Contoh:

```ts
// services/product.service.ts

import { api } from "@/services/api";

export async function getProducts(params?: ProductQuery) {
  return api.get("/products", { params });
}
```

UI menggunakan service tersebut.

---

# 10. API Response

Frontend harus mengikuti kontrak API backend.

Expected success shape:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Expected error shape:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid",
    "fields": {}
  }
}
```

Jangan bergantung pada raw database structure.

Gunakan type frontend yang eksplisit.

---

# 11. Authentication

Backend merupakan source of truth authentication.

Frontend bertanggung jawab terhadap:

- login form
- register form
- logout action
- authenticated navigation
- protected page experience
- role-based UI

Jangan menganggap menyembunyikan tombol sebagai security.

Backend tetap harus melakukan authorization.

Role minimum:

```text
CUSTOMER
ADMIN
```

UI admin hanya boleh ditampilkan kepada role yang sesuai.

---

# 12. State Management

Gunakan Zustand hanya untuk state global/client yang memang perlu.

Contoh:

```text
cart
checkout draft
custom bouquet draft
temporary auth UI state
```

Jangan memasukkan seluruh API response ke Zustand.

Server data sebaiknya diambil dari API ketika diperlukan.

---

# 13. Cart

Cart harus mendukung:

```text
product
variant
quantity
customization
message card
addons
custom bouquet
```

Cart UI harus selalu menampilkan:

```text
Product image
Product name
Variant
Quantity
Unit price
Subtotal
Customization summary
Remove action
```

Harga final tidak boleh dihitung sebagai authoritative value hanya dari frontend.

Backend harus melakukan kalkulasi ulang saat checkout.

---

# 14. Product Page

Product Detail Page minimal memiliki:

```text
Product gallery
Product name
Price
Short description
Flower composition
Available variants
Add-ons
Occasion tags
Delivery information
Quantity
Add to Cart
Buy Now
```

Jika produk memiliki variant, user wajib memilih variant sebelum Add to Cart.

---

# 15. Custom Bouquet Builder

Custom bouquet builder menggunakan step-based UI.

Baseline:

```text
Step 1 — Budget
Step 2 — Flower / style preference
Step 3 — Color palette
Step 4 — Size
Step 5 — Add-ons
Step 6 — Message
Step 7 — Review
```

State sementara dapat menggunakan:

```text
bouquet.store.ts
```

Jangan menjanjikan preview visual yang identik dengan hasil akhir.

Tampilkan disclaimer bahwa bunga dapat mengalami substitusi berdasarkan availability.

---

# 16. Checkout

Checkout adalah gifting checkout, bukan checkout e-commerce generik.

Flow:

```text
Cart
  ↓
Sender Information
  ↓
Recipient Information
  ↓
Delivery Address
  ↓
Delivery Date / Time
  ↓
Gift Message
  ↓
Order Review
  ↓
Payment
```

Pisahkan:

```text
buyer/sender
recipient
delivery address
```

Recipient tidak selalu sama dengan pembeli.

Jangan menggunakan checkbox "same as billing address" sebagai pola utama.

---

# 17. Payment

Frontend tidak menentukan payment status.

Payment status berasal dari backend.

Possible UI status:

```text
UNPAID
PENDING
PAID
FAILED
EXPIRED
REFUNDED
```

Midtrans integration harus dimulai melalui backend.

Frontend tidak menyimpan Midtrans server key.

---

# 18. Order Tracking

Tracking page:

```text
/track/[orderNumber]
```

Minimum timeline:

```text
Order Received
Payment Confirmed
Preparing
Arrangement in Progress
Quality Check
Ready for Delivery
Out for Delivery
Delivered
```

Status harus berasal dari backend.

---

# 19. QC Photo

Jika backend menyediakan QC photo, tampilkan pada order tracking.

QC section minimal:

```text
Arrangement photo
QC timestamp
Order number
Status
```

Jangan menampilkan internal note florist kepada customer.

Gunakan `next/image`.

---

# 20. Important Dates

Customer dapat menyimpan tanggal penting recipient.

Contoh:

```text
Birthday
Anniversary
Graduation
Mother's Day
Custom Event
```

Frontend bertanggung jawab terhadap CRUD UI.

Backend bertanggung jawab terhadap penyimpanan dan reminder logic.

---

# 21. Recipient Management

Recipient merupakan entity terpisah dari user.

Minimum fields:

```text
name
phone
relationship
address
notes
important dates
```

User dapat memilih recipient existing ketika checkout.

---

# 22. Admin

Admin tetap berada pada project Next.js yang sama.

Route:

```text
/admin
```

Jangan membuat project admin terpisah untuk MVP.

Minimum admin pages:

```text
Dashboard
Orders
Products
Categories
Inventory
Customers
Settings
```

Prioritas admin MVP adalah operational usability, bukan visual complexity.

---

# 23. Forms

Gunakan:

```text
React Hook Form
+
Zod
```

Validasi frontend hanya untuk UX.

Backend tetap source of truth validation.

Tampilkan error sedekat mungkin dengan field terkait.

Jangan hanya menampilkan:

```text
Something went wrong
```

jika backend memberikan error yang lebih spesifik.

---

# 24. Loading State

Setiap async operation harus memiliki loading state.

Gunakan:

```text
Skeleton
Spinner
Button loading state
```

Hindari layout shift besar.

Untuk product listing gunakan skeleton yang menyerupai product card.

---

# 25. Empty State

Setiap collection page harus menangani empty state.

Contoh:

```text
Cart kosong
Belum ada order
Belum ada recipient
Belum ada reminder
Produk tidak ditemukan
Search tanpa hasil
```

Empty state harus memiliki CTA yang relevan.

---

# 26. Error State

Error state harus:

- menjelaskan masalah secara sederhana
- tidak mengekspos stack trace
- menyediakan retry jika memungkinkan
- menyediakan navigation fallback

---

# 27. Images

Gunakan:

```tsx
import Image from "next/image";
```

Jangan gunakan `<img>` biasa kecuali ada alasan khusus.

Product image wajib memiliki:

```text
alt
width/height atau fill
responsive sizes
fallback
```

---

# 28. Currency

Semua harga menggunakan Indonesian Rupiah.

Gunakan helper:

```ts
formatCurrency(250000)
```

Output:

```text
Rp250.000
```

Jangan format currency manual di setiap component.

---

# 29. Date & Time

Gunakan timezone bisnis yang disepakati backend.

Jangan melakukan parsing tanggal dengan asumsi timezone browser tanpa pertimbangan.

Gunakan helper di:

```text
lib/date.ts
```

---

# 30. TypeScript

Hindari:

```ts
any
```

Gunakan type/interface yang jelas.

Contoh:

```ts
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: ProductImage[];
}
```

Jangan menduplikasi type yang sama di banyak file.

---

# 31. Responsive Design

Mobile-first.

Baseline:

```text
Mobile      < 640px
Tablet      >= 640px
Desktop     >= 1024px
Wide        >= 1280px
```

Semua fitur customer harus usable pada layar mobile.

Checkout terutama harus dioptimalkan untuk mobile.

---

# 32. Accessibility

Minimum requirement:

- semantic HTML
- keyboard navigation
- visible focus state
- proper label
- sufficient contrast
- alt text
- aria attributes jika diperlukan
- minimum practical touch target sekitar 44px

Jangan menggunakan warna sebagai satu-satunya indikator status.

---

# 33. SEO

Halaman berikut harus SEO-friendly:

```text
Homepage
Product listing
Product detail
Category
Occasion landing page
```

Gunakan Next.js metadata.

Product URL harus readable.

Benar:

```text
/products/pink-rose-bouquet
```

Hindari:

```text
/products/12389123
```

jika slug tersedia.

---

# 34. Performance

Prioritaskan:

```text
LCP
CLS
INP
image optimization
bundle size
```

Jangan meng-import library besar hanya untuk fungsi kecil.

Gunakan dynamic import jika relevan.

Hero image harus dioptimalkan.

Product grid tidak boleh memuat image resolusi penuh secara tidak perlu.

---

# 35. Security

Frontend tidak boleh menyimpan:

```text
database credentials
Midtrans server key
object storage secret
backend secret
private API keys
```

Environment variable dengan prefix:

```text
NEXT_PUBLIC_
```

harus dianggap dapat dibaca publik.

Jangan menaruh secret di sana.

---

# 36. Coding Style

Prioritaskan:

```text
Readable
Predictable
Typed
Reusable
Simple
Testable
```

Hindari premature abstraction.

Jika code hanya digunakan satu kali dan sederhana, tidak harus langsung dibuat abstraction kompleks.

---

# 37. Naming

Component:

```text
ProductCard.tsx
OrderTimeline.tsx
RecipientForm.tsx
```

Hooks:

```text
useAuth.ts
useCart.ts
```

Store:

```text
cart.store.ts
checkout.store.ts
```

Service:

```text
product.service.ts
order.service.ts
```

Types:

```text
product.ts
order.ts
```

Gunakan naming yang menggambarkan domain, bukan implementation detail.

---

# 38. Testing

Prioritas test frontend:

### High Priority

```text
Login
Add to cart
Cart calculation display
Checkout validation
Recipient selection
Payment initiation
Order tracking
Admin order update
```

### Medium Priority

```text
Product filters
Search
Reminder form
Profile update
Custom bouquet builder
```

Test business-critical flow lebih penting daripada mengejar coverage percentage.

---

# 39. Agent Rules

Sebelum coding:

1. Baca `AGENTS.md`.
2. Baca `DESIGN.md`.
3. Periksa struktur project.
4. Cari component existing.
5. Cari type existing.
6. Cari service existing.
7. Pahami API contract.
8. Baru implementasi.

Agent tidak boleh langsung membuat file baru sebelum mengecek implementasi existing.

---

# 40. Agent Must Not

Agent tidak boleh:

```text
Mengubah stack tanpa instruksi
Membuat backend logic di frontend
Mengakses database langsung
Menghardcode API URL
Menghardcode secret
Menduplikasi component
Menduplikasi type
Menggunakan any tanpa alasan
Menggunakan random warna
Mengabaikan responsive state
Mengabaikan loading/error/empty state
Membuat admin project baru
Membuat mock API permanen
Mengubah API contract sepihak
Melakukan overengineering
```

---

# 41. API Contract Changes

Jika frontend membutuhkan data yang belum tersedia dari backend:

JANGAN mengarang field API.

Dokumentasikan kebutuhan.

Contoh:

```text
Required backend change:

GET /api/v1/orders/:id

Need additional field:

qcPhotoUrl: string | null
```

Frontend dan backend contract harus tetap eksplisit.

---

# 42. Git Workflow

Branch utama:

```text
main
develop
```

Feature branch:

```text
feature/product-detail
feature/custom-bouquet
feature/checkout
feature/order-tracking
feature/admin-orders
```

Fix:

```text
fix/cart-total
fix/mobile-navigation
```

Refactor:

```text
refactor/product-card
```

---

# 43. Commit Convention

Gunakan conventional commit.

```text
feat: add custom bouquet builder
feat: add recipient selector to checkout
fix: prevent duplicate checkout submission
fix: improve mobile product gallery
refactor: extract order timeline component
style: update product card spacing
test: add checkout validation tests
chore: update dependencies
```

Commit harus fokus pada satu perubahan logis.

---

# 44. Definition of Done

Feature dianggap selesai jika:

- functionality bekerja
- TypeScript tidak error
- lint tidak error
- responsive
- loading state tersedia
- error state tersedia
- empty state tersedia jika relevan
- form validation bekerja
- API error ditangani
- tidak ada secret
- tidak ada obvious duplicated code
- accessibility dasar terpenuhi
- sesuai `DESIGN.md`
- critical flow sudah diuji

---

# 45. MVP Priority

Urutan prioritas implementasi:

```text
P0
Authentication
Product catalog
Product detail
Cart
Checkout
Payment
Order creation
Order tracking
Admin order management

P1
QC photo
Recipient management
Important dates
Reminder
Inventory visibility
Custom bouquet

P2
Advanced personalization
Advanced recommendation
Loyalty
Complex analytics
Advanced animation
```

Jika terjadi konflik antara fitur P0 dan cosmetic improvement, prioritaskan P0.

---

# 46. Core Principle

Frontend harus membuat proses:

```text
Discover
→ Choose
→ Personalize
→ Send
→ Pay
→ Track
```

sesederhana mungkin.

Ini adalah **gifting experience**, bukan sekadar katalog bunga.

Setiap keputusan UI harus membantu customer:

```text
memilih hadiah yang tepat
mengirimkannya kepada orang yang tepat
pada waktu yang tepat
dengan rasa percaya bahwa pesanan akan sampai dengan baik
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
