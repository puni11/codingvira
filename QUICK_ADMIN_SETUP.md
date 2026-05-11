# 🔐 Quick Reference: Admin Account Creation

## TL;DR

1. Edit `/scripts/createAdmin.ts` with your admin credentials
2. Run: `npx ts-node scripts/createAdmin.ts`
3. Login with the created credentials

---

## Step-by-Step

### Step 1️⃣: Open the Script
```
File: /scripts/createAdmin.ts
```

### Step 2️⃣: Edit Admin Details (Lines 17-23)
```typescript
const adminData = {
  name: "Your Name",                    // ← Change this
  email: "your-email@example.com",      // ← Change this
  password: "YourPassword123",           // ← Change this (IMPORTANT!)
  role: "admin",                         // Keep as "admin"
  createdAt: new Date(),                 // Keep as is
};
```

### Step 3️⃣: Run the Script
```bash
npx ts-node scripts/createAdmin.ts
```

### Step 4️⃣: Copy the Output
```
✅ Admin user created successfully!
📧 Email: your-email@example.com
🔐 Password: YourPassword123
🆔 User ID: 507f1f77bcf86cd799439011
```

### Step 5️⃣: Login
Go to: `https://codevira.com/login`
- **Email:** your-email@example.com
- **Password:** YourPassword123

### Step 6️⃣: Access Admin Dashboard
Go to: `https://codevira.com/dashboard/certificates`

---

## ✅ What's Secured

| Feature | Status |
|---------|--------|
| Public Registration | ❌ Disabled |
| Self-Registration | ❌ Blocked |
| `/register` endpoint | ❌ Returns 403 |
| `/api/auth/register` | ❌ Disabled |
| `http://localhost:3000/register` | ❌ Can't register |
| Manual account creation | ✅ Allowed (script) |
| `/dashboard/certificates` | ✅ Protected (login required) |
| `/verify-certificate` | ✅ Public (no login needed) |

---

## 🆘 Troubleshooting

### "User already exists"
→ Use a different email in the script

### "MONGODB_URI not set"
→ Check `.env.local` has MongoDB connection

### Script won't run
→ Make sure dependencies are installed: `npm install`

### Can't login with created account
→ Double-check email and password match exactly

---

## 🎯 System Flow

```
Public User:
  visit /verify-certificate → search certificate → view details
  (NO LOGIN NEEDED)

Admin User:
  visit /login → enter created credentials → success ✅
  → access /dashboard/certificates → manage certificates
  → add/view/delete certificates
```

---

## 📚 Full Docs
See: `ADMIN_ACCOUNT_MANAGEMENT.md`

---

**Now your system is secure! 🔒 Only admins you create can access the management page.**
