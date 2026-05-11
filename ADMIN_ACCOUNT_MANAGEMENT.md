# 🔐 Admin Account Management - Manual Registration Disabled

## Overview

Registration has been **completely disabled** for security. Only you can create admin accounts manually using the provided script.

---

## ✅ What Changed

| Feature | Before | After |
|---------|--------|-------|
| Public Registration | ✅ Enabled | ❌ **Disabled** |
| "Create one" Link | ✅ Visible | ❌ **Removed** |
| `/api/auth/register` | ✅ Active | ❌ **Returns 403 Forbidden** |
| Manual Admin Creation | ❌ No | ✅ **Available** |

---

## 🚀 How to Create Admin Accounts

### Step 1: Update the Script
Edit `/scripts/createAdmin.ts` and set your admin details:

```typescript
const adminData = {
  name: "Your Name",
  email: "youremail@example.com",
  password: "YourSecurePassword123", // Change this!
  role: "admin",
  createdAt: new Date(),
};
```

### Step 2: Run the Script

#### Local Development (with npm):
```bash
npx ts-node scripts/createAdmin.ts
```

#### Or compile and run:
```bash
npm run build
node scripts/createAdmin.js
```

### Step 3: Use the Credentials

Once the script succeeds, you'll see:
```
✅ Admin user created successfully!
📧 Email: youremail@example.com
🔐 Password: YourSecurePassword123
🆔 User ID: 507f1f77bcf86cd799439011
```

Use these credentials to login at:
- **Local:** `http://localhost:3000/login`
- **Live:** `https://codevira.com/login`

---

## 📊 Login Pages

### Login Page
- **URL (Local):** `http://localhost:3000/login`
- **URL (Live):** `https://codevira.com/login`
- **"Create one" Link:** Removed ❌
- **Message:** "For admin access, contact support"

### Registration Page
- **URL:** `/register`
- **Status:** ❌ **Disabled & Unreachable**
- **Returns:** 403 Forbidden

---

## 🔐 Security Features

✅ **Public Registration Disabled**
- No one can self-register
- Only you create accounts

✅ **Protected Admin Area**
- `/dashboard/certificates` requires login
- Only authenticated users can manage certificates

✅ **Public Verification Allowed**
- `/verify-certificate` is still public
- Anyone can verify certificates by ID

---

## 🔑 Multiple Admin Accounts

You can create multiple admin users by running the script multiple times with different credentials:

```bash
# Run 1: Create first admin
npx ts-node scripts/createAdmin.ts
# Edit script with first admin details

# Run 2: Create second admin  
npx ts-node scripts/createAdmin.ts
# Edit script with second admin details
```

---

## 📝 Database Structure

Users are stored in MongoDB with this structure:

```json
{
  "_id": ObjectId("..."),
  "name": "Admin User",
  "email": "admin@codevira.com",
  "password": "hashed_bcrypt_password",
  "role": "admin",
  "createdAt": ISODate("2026-05-11T...")
}
```

---

## 🆘 If Script Fails

**Error: User already exists**
```
Edit the script with a different email address
```

**Error: MONGODB_URI not set**
```
Make sure .env.local has MONGODB_URI configured
```

**Error: Connection failed**
```
Verify MongoDB Atlas credentials are correct
Ensure network connectivity
```

---

## 🚨 Important Notes

1. **Change Default Password:** The script has example password. Always change it!
2. **Secure Password:** Use strong passwords for production
3. **Keep Script Private:** Don't share this script or credentials
4. **Backup:** Save your admin email/password securely
5. **Multiple Admins:** You can create as many admins as needed

---

## 📋 Checklist

- ✅ Registration disabled
- ✅ Public cannot create accounts
- ✅ Script created for manual account creation
- ✅ Login page updated ("Create one" removed)
- ✅ Only authenticated users access `/dashboard/certificates`
- ✅ Public still access `/verify-certificate`

Your system is now **secure**! 🔒
