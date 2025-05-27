# 🏠 Ukost Backend

Ukost Backend adalah sistem berbasis **Microservices** menggunakan **Express.js**, **Prisma ORM**, dan **API Gateway**. Setiap service bertanggung jawab untuk domain bisnis tertentu (seperti users dan products), dan gateway bertindak sebagai entry point untuk seluruh API.

---

## 🚀 Fitur

- Arsitektur Microservices
- API Gateway untuk manajemen routing
- Prisma ORM (PostgreSQL, MySQL, MongoDB support)
- Modular dan scalable

---

## 🛠️ Instalasi

### 1. Clone Repo

```bash
git clone https://github.com/faiqmubarok/ukost-be.git
cd ukost-be
```

---

2. Install Semua Dependency

npm install
cd services/user-service && npm install && npx prisma generate && cd ../..
cd services/product-service && npm install && npx prisma generate && cd ../..

---

3. Setup Environment
   Buat file .env di setiap service:

Contoh isi .env:
DATABASE_URL="mongodb://localhost:27017/ukost"

---

4. Jalankan Project
   Jalankan API Gateway + seluruh service dengan:

npm run dev

---

🧪 Akses Endpoint
| Service | Endpoint | Port |
| --------------- | --------------------------------------- | ---- |
| User Service | `http://localhost:3000/api/v1/users` | 3001 |
| Product Service | `http://localhost:3000/api/v1/products` | 3002 |
| Gateway | `http://localhost:3000/api/v1` | 3000 |

---

🧑‍💻 Cara Berkontribusi

1. Fork repository ini
2. Clone hasil fork ke lokal
3. Buat branch baru

git checkout -b fitur-atau-perbaikan

4. Lakukan perubahan & commit

git commit -m "Menambahkan fitur baru"

5. Push ke branch

git push origin fitur-atau-perbaikan

6. Buka Pull Request ke main

📚 Teknologi yang Digunakan

- Node.js
- Express.js
- Prisma ORM
- MongoDB (dapat diganti PostgreSQL/MySQL)
- http-proxy-middleware
- Concurrently
