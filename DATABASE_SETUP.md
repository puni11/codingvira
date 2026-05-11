# Database Setup Guide

## ⚠️ Current Issue
The MongoDB connection is failing because the connection string is invalid/incomplete.

---

## ✅ Solution: Choose One Option

### **Option 1: MongoDB Atlas (Cloud) - RECOMMENDED ⭐**

#### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a free cluster (M0)

#### Step 2: Get Your Connection String
1. In MongoDB Atlas dashboard, click **"Connect"**
2. Select **"Drivers"** tab
3. Choose **"Node.js"** driver
4. Copy the connection string
   - Example: `mongodb+srv://myuser:mypassword@mycluster.mongodb.net/mydb?retryWrites=true&w=majority`

#### Step 3: Update `.env.local`
Replace the connection string in `.env.local`:
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/certificate-db?retryWrites=true&w=majority
```

#### Step 4: Restart Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

---

### **Option 2: Local MongoDB**

#### Step 1: Install MongoDB Locally
```bash
# On macOS with Homebrew:
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB:
brew services start mongodb-community
```

#### Step 2: Update `.env.local`
```
MONGODB_URI=mongodb://localhost:27017/certificate-db
```

#### Step 3: Restart Server
```bash
npm run dev
```

---

## 🚀 Quickest Way to Test (Option 1 - Recommended)

If you don't have a MongoDB Atlas account yet:

1. **Create Free Account:** https://www.mongodb.com/cloud/atlas
2. **Create Free Cluster:** Takes ~2 minutes
3. **Get Connection String:** Copy from "Connect" → "Drivers"
4. **Update `.env.local`** with your connection string
5. **Restart server:** `npm run dev`

That's it! Your certificate system will work.

---

## 📝 MongoDB Atlas Free Tier
- ✅ 512 MB storage
- ✅ Perfect for development
- ✅ Always free
- ✅ Cloud hosted (no setup needed)

---

## ✅ Test Database Works
Once connected, the certificate system will:
- ✅ Create certificates collection automatically
- ✅ Store certificates in MongoDB
- ✅ Allow adding/viewing/deleting certificates
- ✅ Support public verification page

---

## 🆘 Need Help?
If you provide me with your MongoDB Atlas connection string, I can:
1. Update `.env.local` automatically
2. Test the connection
3. Add sample data
4. Verify everything works
