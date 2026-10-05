# DESIGN.md

## 1. Design Direction

Produk adalah platform florist dan gifting modern untuk pasar Indonesia.

Brand direction:

```text
Premium
Modern
Warm
Personal
Elegant
Trustworthy
```

Desain tidak boleh terasa seperti:

```text
marketplace generik
dashboard SaaS
website wedding yang berlebihan
toko bunga tradisional yang penuh dekorasi
```

Target visual:

> Modern gifting experience dengan sentuhan florist premium.

---

# 2. Design Principles

## Emotion First

Bunga dibeli karena emosi dan occasion.

UI harus membantu user berpikir:

```text
Untuk siapa?
Untuk acara apa?
Kapan dikirim?
Pesan apa yang ingin disampaikan?
```

## Product First

Fotografi bunga adalah visual utama.

UI tidak boleh mengalahkan produk.

## Calm Premium

Gunakan whitespace yang cukup.

Hindari terlalu banyak:

```text
border
badge
gradient
shadow
warna
animation
```

## Mobile First

Sebagian besar customer flow harus sangat nyaman di mobile.

## Trust

Harga, delivery, payment, status order, dan availability harus jelas.

---

# 3. Color System

Gunakan semantic color token.

Baseline palette:

```text
Background
#FFFDFC

Surface
#FFFFFF

Foreground
#24211F

Muted
#F7F3F0

Muted Foreground
#766F69

Border
#E8E1DC
```

Primary:

```text
Primary
#315C4C

Primary Hover
#284C3F

Primary Foreground
#FFFFFF
```

Accent:

```text
Blush
#F4DDD8

Rose
#C97878

Cream
#F7EFE4
```

Status:

```text
Success
#3F7D5A

Warning
#C58A32

Error
#B84A4A

Info
#4F7396
```

Jangan menggunakan hex color langsung di component jika sudah tersedia sebagai token.

---

# 4. Color Usage

Primary green digunakan untuk:

```text
Primary CTA
Selected state
Important interactive state
Brand highlight
```

Blush/cream digunakan untuk:

```text
Background section
Promotional highlight
Occasion cards
Decorative accent
```

Jangan membuat seluruh interface pink.

Premium tidak berarti semuanya gold.

---

# 5. Typography

Gunakan maksimum dua font family.

Direction:

```text
Heading:
Playfair Display

Body:
Inter
```

Jika belum ada keputusan brand final, prioritaskan readability dan performance.

Typography hierarchy:

```text
Display
48–64px desktop
36–44px mobile

H1
40–48px desktop
32–36px mobile

H2
30–36px desktop
26–30px mobile

H3
22–26px

Body Large
18px

Body
16px

Small
14px

Caption
12–13px
```

Body text minimum default:

```text
16px
```

---

# 6. Spacing

Gunakan spacing konsisten berbasis 4px.

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Default page horizontal padding:

```text
Mobile   16px
Tablet   24px
Desktop  32px
```

Maximum content width:

```text
1280px
```

---

# 7. Radius

Baseline:

```text
Small     8px
Medium    12px
Large     16px
XL        24px
Pill      999px
```

Product card:

```text
12–16px
```

Button:

```text
10–12px
```

Jangan membuat semua element berbentuk pill.

---

# 8. Shadows

Gunakan shadow secara minimal.

```text
Card:
subtle

Dropdown:
medium

Modal:
medium/high
```

Hindari heavy shadow pada semua card.

Gunakan border + background terlebih dahulu.

---

# 9. Buttons

Variants:

```text
Primary
Secondary
Outline
Ghost
Destructive
Link
```

Minimum touch height:

```text
44px
```

Primary CTA contoh:

```text
Tambah ke Keranjang
Beli Sekarang
Lanjut ke Pengiriman
Bayar Sekarang
```

Hindari dua primary button dengan visual weight sama dalam satu section.

---

# 10. Form Controls

Input minimum height:

```text
44px
```

Form harus memiliki:

```text
Label
Input
Optional helper text
Error message
```

Jangan hanya menggunakan placeholder sebagai label.

Error muncul dekat field.

---

# 11. Product Photography

Foto produk merupakan elemen paling penting.

Gunakan:

```text
clean background
consistent lighting
natural colors
high resolution
similar framing
```

Product listing disarankan menggunakan aspect ratio:

```text
4:5
```

Product detail dapat menggunakan:

```text
4:5
1:1
```

Jangan stretch image.

---

# 12. Header

Desktop:

```text
Logo

Flowers
Occasions
Custom Bouquet
Gifts

Search

Account
Cart
```

Mobile:

```text
Menu
Logo
Search
Cart
```

Header harus sederhana.

Jangan memenuhi header dengan terlalu banyak menu.

---

# 13. Homepage

Recommended structure:

```text
Header

Hero

Shop by Occasion

Featured Bouquets

Shop by Category

Why Choose Us

Custom Bouquet CTA

How Delivery Works

Customer Trust / Testimonials

Important Date / Reminder CTA

SEO Content

Footer
```

---

# 14. Hero

Hero harus menjawab dalam beberapa detik:

```text
Apa yang dijual?
Untuk siapa?
Kenapa harus percaya?
Apa tindakan berikutnya?
```

Contoh hierarchy:

```text
Thoughtful flowers for every meaningful moment.

Bouquet segar yang dirangkai dengan perhatian
dan dikirim untuk momen terpenting Anda.

[Belanja Bunga]
[Custom Bouquet]
```

Hero visual harus menggunakan fotografi produk nyata jika tersedia.

---

# 15. Shop by Occasion

Occasion lebih penting daripada taxonomy teknis.

Contoh:

```text
Birthday
Anniversary
Romantic
Graduation
Congratulations
Get Well
Sympathy
Thank You
Just Because
```

Gunakan visual card.

---

# 16. Product Card

Product card minimal:

```text
Product image
Product name
Starting price / price
Short variant info
Optional badge
```

Contoh:

```text
Pink Serenity

Mulai dari Rp349.000

[Best Seller]
```

Card tidak perlu terlalu banyak informasi.

Jangan tampilkan description panjang pada grid.

---

# 17. Product Grid

Mobile:

```text
2 columns
```

Desktop:

```text
3–4 columns
```

Gap harus cukup agar produk tidak terasa sesak.

Filter mobile menggunakan:

```text
Sheet / Drawer
```

Desktop dapat menggunakan sidebar atau toolbar.

---

# 18. Product Detail Page

Desktop:

```text
┌────────────────────┬─────────────────────┐
│                    │ Product name        │
│                    │ Rating/metadata     │
│ Product Gallery    │ Price               │
│                    │ Description         │
│                    │ Variant             │
│                    │ Add-ons             │
│                    │ Delivery info       │
│                    │                     │
│                    │ [Add to Cart]       │
└────────────────────┴─────────────────────┘
```

Mobile:

```text
Gallery
Name
Price
Description
Variant
Customization
Add-ons
Delivery
CTA
```

Mobile boleh menggunakan sticky bottom CTA.

---

# 19. Product Variants

Variant harus mudah dibandingkan.

Contoh:

```text
Regular
Rp349.000

Large
Rp449.000

Grand
Rp599.000
```

Selected state harus jelas dengan:

```text
border
background
check icon
```

Jangan hanya menggunakan perubahan warna kecil.

---

# 20. Add-ons

Contoh:

```text
Chocolate
Teddy Bear
Vase
Greeting Card
Cake
```

Gunakan selectable card.

Tampilkan:

```text
image
name
price
selected state
```

---

# 21. Custom Bouquet Builder

Gunakan stepper.

```text
1 Budget
2 Style
3 Color
4 Size
5 Extras
6 Message
7 Review
```

Mobile:

```text
one main decision per screen
```

Desktop dapat menggunakan:

```text
Builder               Summary
──────────────         ──────────────
Options                Bouquet
Options                Budget
Options                Add-ons
                       Estimated total
```

CTA:

```text
Lanjut
Kembali
Tambahkan ke Keranjang
```

Jangan meminta terlalu banyak keputusan sekaligus.

---

# 22. Cart

Desktop:

```text
Items                  Order Summary

Product                Subtotal
Variant                Delivery
Customization          Discount
Quantity               Total

                       [Checkout]
```

Mobile:

```text
Items

Order summary

Sticky checkout CTA
```

Cart harus tetap terasa ringan.

---

# 23. Checkout

Checkout menggunakan progressive sections.

Recommended flow:

```text
1. Sender
2. Recipient
3. Delivery
4. Gift Message
5. Review
6. Payment
```

Progress indicator harus terlihat.

---

# 24. Recipient

Recipient section harus menonjol karena produk dikirim kepada orang lain.

Fields:

```text
Nama penerima
Nomor telepon
Alamat
Relationship — optional
Delivery note — optional
```

Jika login:

```text
Pilih penerima tersimpan
atau
Tambah penerima baru
```

---

# 25. Delivery Date

Delivery date merupakan keputusan penting.

Jangan menyembunyikannya di akhir checkout.

Tampilkan:

```text
Date picker
Available delivery slot
Delivery fee
Availability information
```

Unavailable date harus disabled dengan jelas.

---

# 26. Gift Message

Berikan textarea yang nyaman.

Contoh:

```text
Pesan untuk penerima

"Tulis pesan yang ingin disertakan bersama bunga..."
```

Tampilkan character limit jika backend memiliki batas.

---

# 27. Order Review

Sebelum payment tampilkan:

```text
Product
Variant
Add-ons
Recipient
Address
Delivery date
Delivery slot
Gift message
Subtotal
Delivery
Discount
Total
```

User harus bisa mengedit bagian sebelumnya tanpa kehilangan semua data.

---

# 28. Payment

Payment screen harus sederhana.

Fokus:

```text
Order number
Total
Payment method
Payment status
Payment CTA
```

Jangan menampilkan informasi teknis Midtrans kepada customer.

---

# 29. Payment States

Pending:

```text
Menunggu pembayaran
```

Success:

```text
Pembayaran berhasil
```

Failed:

```text
Pembayaran belum berhasil
```

Expired:

```text
Waktu pembayaran telah berakhir
```

Berikan next action yang jelas.

---

# 30. Order Success

Order success harus terasa reassuring.

Tampilkan:

```text
Success indicator

Terima kasih.
Pesananmu sudah kami terima.

Order number
Recipient
Delivery date
Payment status

[Lacak Pesanan]
[Lihat Detail Pesanan]
```

Jangan membuat confetti/animation berlebihan.

---

# 31. Order Tracking

Tracking merupakan trust feature.

Gunakan vertical timeline di mobile.

```text
✓ Order Received

✓ Payment Confirmed

✓ Preparing

● Quality Check

○ Ready for Delivery

○ Out for Delivery

○ Delivered
```

Current state harus paling jelas.

---

# 32. QC Photo

Jika tersedia:

```text
Quality Check

[Arrangement Image]

Bouquet kamu sudah selesai dirangkai
dan telah melewati pengecekan kualitas.
```

QC photo harus menjadi trust moment.

Gunakan visual yang cukup besar.

---

# 33. Account

Account navigation:

```text
Overview
Orders
Recipients
Important Dates
Addresses
Profile
Logout
```

Mobile dapat menggunakan cards/menu list.

Desktop dapat menggunakan sidebar.

---

# 34. Recipient Management

Recipient card:

```text
Mother

Siti Aminah
0812••••••
Jakarta Selatan

Birthday · 12 October

[Edit]
```

Relationship dapat menjadi label utama yang mudah dikenali.

---

# 35. Important Dates

Important date card:

```text
12 OCT

Mom's Birthday

Siti Aminah

7 days remaining

[Kirim Bunga]
```

CTA harus mengarah langsung ke shopping flow yang relevan.

---

# 36. Admin Design

Admin tidak perlu mengikuti visual storefront secara penuh.

Admin direction:

```text
Clean
Dense enough for operations
Readable
Fast
Functional
```

Navigation:

```text
Dashboard
Orders
Products
Categories
Inventory
Customers
Settings
```

Desktop-first boleh digunakan untuk admin, tetapi basic mobile/tablet usability tetap dijaga.

---

# 37. Admin Dashboard

Prioritas metric:

```text
Orders Today
Revenue Today
Orders to Prepare
Orders for Delivery
Pending Payments
Low Stock
```

Hindari vanity metrics pada MVP.

---

# 38. Admin Orders

Order table minimum:

```text
Order
Customer
Recipient
Delivery
Total
Payment
Order Status
Action
```

Status gunakan badge dengan text + color.

Contoh:

```text
Paid
Preparing
QC
Ready
Delivering
Delivered
Cancelled
```

---

# 39. Admin Order Detail

Admin order detail adalah operational page.

Prioritaskan:

```text
Order information
Customer
Recipient
Products
Gift message
Delivery
Payment
Status
Internal notes
QC photo
Status update actions
```

Critical action harus mudah ditemukan.

---

# 40. Loading State

Gunakan skeleton yang mengikuti layout.

Product card:

```text
Image skeleton
Text skeleton
Price skeleton
```

Jangan hanya menampilkan spinner besar untuk seluruh halaman jika skeleton lebih sesuai.

---

# 41. Empty State

Empty state harus actionable.

Cart:

```text
Keranjangmu masih kosong.

Temukan bunga untuk momen spesial seseorang.

[Belanja Bunga]
```

Orders:

```text
Belum ada pesanan.

Saat kamu melakukan pemesanan, statusnya akan muncul di sini.

[Lihat Koleksi]
```

---

# 42. Error State

Contoh:

```text
Kami belum bisa memuat produk.

Silakan coba beberapa saat lagi.

[Coba Lagi]
```

Hindari technical message:

```text
HTTP 500
Internal Server Error
AxiosError
```

---

# 43. Success State

Success state harus menjelaskan:

```text
Apa yang berhasil
Apa yang terjadi berikutnya
Apa tindakan user berikutnya
```

Jangan hanya menampilkan toast `"Success"`.

---

# 44. Toast

Gunakan toast untuk feedback singkat:

```text
Produk ditambahkan ke keranjang.
Alamat berhasil disimpan.
Recipient berhasil diperbarui.
```

Jangan gunakan toast untuk informasi yang sangat penting dan harus tetap terlihat.

---

# 45. Microcopy

Tone:

```text
Warm
Clear
Human
Calm
Helpful
```

Gunakan:

```text
Kirim bunga
Pilih tanggal pengiriman
Pesan untuk penerima
Lacak pesanan
```

Hindari:

```text
Execute order
Submit transaction
Input recipient data
Process request
```

---

# 46. Language

Bahasa utama MVP:

```text
Bahasa Indonesia
```

Gunakan istilah yang familiar.

Beberapa istilah umum seperti:

```text
Checkout
Best Seller
Custom Bouquet
```

boleh digunakan jika lebih natural untuk target market.

Tetap konsisten.

---

# 47. Responsive Rules

## Mobile

Prioritaskan:

```text
single column
large touch targets
sticky primary CTA jika relevan
bottom sheet untuk filters/actions
shorter content hierarchy
```

## Tablet

Gunakan:

```text
2–3 column grids
adaptive navigation
```

## Desktop

Gunakan ruang tambahan untuk:

```text
product gallery
filter sidebar
order summary
admin tables
account sidebar
```

Jangan hanya memperbesar mobile layout.

---

# 48. Accessibility

Interactive element harus memiliki visible focus.

Contrast minimum harus memenuhi accessibility standard yang layak.

Icon-only button wajib memiliki accessible label.

Contoh:

```tsx
<Button
  variant="ghost"
  size="icon"
  aria-label="Hapus produk dari keranjang"
>
  <Trash2 />
</Button>
```

---

# 49. Motion

Animation:

```text
150–300ms
```

Gunakan untuk:

```text
hover
drawer
dialog
accordion
state transition
```

Jangan menggunakan animation hanya untuk membuat halaman terlihat "canggih".

Hormati:

```text
prefers-reduced-motion
```

---

# 50. SEO Landing Pages

Landing page occasion:

```text
/occasions/birthday
/occasions/anniversary
/occasions/graduation
```

Structure:

```text
H1
Short intro
Relevant products
Occasion categories
Helpful content
FAQ
Internal links
```

Jangan membuat SEO page yang hanya berisi keyword stuffing.

---

# 51. Design Tokens

Gunakan CSS variables / Tailwind theme.

Contoh konsep:

```css
--background
--foreground

--card
--card-foreground

--primary
--primary-foreground

--secondary
--secondary-foreground

--muted
--muted-foreground

--accent
--accent-foreground

--destructive

--border
--input
--ring

--radius
```

Component tidak boleh memiliki design language sendiri-sendiri.

---

# 52. Core Components

Prioritaskan reusable components berikut:

```text
Header
Footer

Container
SectionHeading

ProductCard
ProductGrid
ProductGallery
ProductVariantSelector
AddonSelector

Price
Currency

QuantitySelector

CartItem
CartSummary

RecipientCard
RecipientSelector

DeliveryDatePicker
DeliverySlotSelector

CheckoutStepper
CheckoutSummary

OrderStatusBadge
OrderTimeline
QCPhoto

EmptyState
ErrorState

AdminSidebar
AdminHeader
AdminDataTable
```

---

# 53. Product Card States

Harus menangani:

```text
Default
Hover
Out of stock
Discount
Best seller
Unavailable
Loading
```

Jangan menggunakan badge untuk semuanya sekaligus.

Maksimum prioritaskan satu atau dua badge yang benar-benar penting.

---

# 54. CTA Hierarchy

Dalam satu viewport, tentukan satu tindakan utama.

Contoh PDP:

```text
Primary:
Tambah ke Keranjang

Secondary:
Beli Sekarang / Wishlist jika nantinya diperlukan
```

Checkout:

```text
Primary:
Lanjut ke Pengiriman

Secondary:
Kembali
```

Admin:

```text
Primary:
Update Status
```

---

# 55. Mobile Sticky CTA

Boleh digunakan pada:

```text
Product detail
Custom bouquet
Cart
Checkout
```

Sticky CTA tidak boleh menutupi content.

Pertimbangkan mobile safe area.

---

# 56. Trust Elements

Gunakan secara kontekstual:

```text
Secure payment
Delivery information
Freshness statement
QC photo
Order tracking
Customer support
Substitution policy
```

Jangan memenuhi semua halaman dengan trust badge.

---

# 57. Flower Substitution

Karena bunga bersifat seasonal/perishable, UI harus mampu menyampaikan kemungkinan substitusi.

Contoh:

```text
Beberapa jenis bunga dapat disesuaikan berdasarkan
ketersediaan harian. Kami akan menjaga warna, nilai,
dan karakter rangkaian tetap setara.
```

Informasi ini sebaiknya tersedia sebelum checkout.

---

# 58. Price Display

Gunakan:

```text
Rp349.000
```

Jika memiliki range:

```text
Mulai dari Rp349.000
```

Jika discount:

```text
Rp399.000
Rp349.000
```

Harga final harus paling menonjol.

---

# 59. Search

Search harus fokus pada intent customer.

Contoh searchable:

```text
rose
birthday
pink
graduation
romantic
sunflower
```

Search empty state dapat memberikan occasion suggestion.

---

# 60. Anti-Patterns

Jangan:

```text
menggunakan carousel berlebihan
menggunakan autoplay video besar
menggunakan terlalu banyak gradient
menggunakan terlalu banyak font
menggunakan banyak warna CTA
menggunakan glassmorphism di seluruh UI
menggunakan animation berlebihan
menggunakan modal untuk semua interaksi
menyembunyikan delivery fee sampai akhir
menyembunyikan unavailable state
membuat checkout satu form raksasa
menampilkan technical backend errors
menggunakan desktop table pada mobile customer flow
membuat card untuk setiap elemen tanpa alasan
membuat UI terlalu padat
```

---

# 61. Agent Design Rules

Saat diminta membuat halaman baru, agent harus:

1. Baca `DESIGN.md`.
2. Gunakan token existing.
3. Gunakan shadcn/ui bila tersedia.
4. Cari reusable component existing.
5. Implementasikan mobile terlebih dahulu.
6. Tambahkan desktop layout.
7. Tambahkan loading state.
8. Tambahkan empty state jika relevan.
9. Tambahkan error state.
10. Periksa accessibility.
11. Periksa CTA hierarchy.
12. Pastikan design konsisten dengan halaman lain.

Jangan membuat design system baru untuk satu halaman.

---

# 62. UX Priority

Jika ada konflik antara:

```text
visual beauty
vs
clarity
```

pilih clarity.

Jika ada konflik antara:

```text
animation
vs
performance
```

pilih performance.

Jika ada konflik antara:

```text
creative interaction
vs
checkout simplicity
```

pilih checkout simplicity.

Jika ada konflik antara:

```text
more information
vs
clear decision
```

prioritaskan informasi yang membantu keputusan user.

---

# 63. Final Experience

Customer journey ideal:

```text
Homepage
   ↓
Occasion / Product Discovery
   ↓
Product Detail
   ↓
Personalization
   ↓
Cart
   ↓
Recipient
   ↓
Delivery
   ↓
Gift Message
   ↓
Payment
   ↓
Order Confirmation
   ↓
Tracking
   ↓
QC Photo
   ↓
Delivered
```

Design harus membuat customer merasa:

```text
mudah memilih
mudah mengirim
aman membayar
jelas kapan dikirim
yakin dengan kualitas bunga
tenang setelah melakukan pembayaran
```

Tujuan akhirnya bukan hanya menyelesaikan transaksi.

Tujuannya adalah membuat customer percaya bahwa momen penting mereka ditangani dengan baik.