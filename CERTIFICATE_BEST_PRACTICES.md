# Certificate Verification - Best Practices & Troubleshooting

## 📚 Best Practices

### 1. Certificate Number Formats

**Recommended Format**:
- Keep certificate numbers short and memorable (6-10 characters)
- Use mix of letters and numbers for uniqueness
- Avoid special characters to simplify sharing

**Good Examples**:
```
20e6fee
CERT2025001
WEB001Q1
DEV-00123
```

**Avoid**:
```
certificate_20_/2025 (special chars)
20e6fee20e6fee20e6fee... (too long)
```

---

### 2. Database Indexing

**For Optimal Performance**, ensure these indexes exist:

```javascript
// In MongoDB, create these indexes:
db.certificates.createIndex({ certificateNo: 1 });
db.certificates.createIndex({ status: 1 });
db.certificates.createIndex({ createdAt: -1 });
```

**Benefits**:
- ✅ Faster searches
- ✅ Better performance with large datasets
- ✅ Reduced server load

---

### 3. Data Consistency

**Always Include These Fields**:
```typescript
{
  studentName: string,      // Required
  domain: string,           // Required
  duration: string,         // Required
  certificateNo: string,    // Required (Unique Index)
  startingDate: string,     // Required
  awardDate: string,        // Required
  status: string,           // Required ("verified", "revoked", etc)
  createdAt: Date          // Always add
}
```

**Optional Fields** (for future use):
```typescript
{
  email?: string,
  phone?: string,
  institutionName?: string,
  instructor?: string,
  description?: string,
  revokedAt?: Date,
  expiryDate?: Date,
  updateAt?: Date
}
```

---

### 4. API Security

**Rate Limiting** (Recommended for Production):
```typescript
// Add rate limiting to prevent abuse
const MAX_REQUESTS = 100;    // Per user
const TIME_WINDOW = 3600;    // Per hour

// In your API route
if (requestCount > MAX_REQUESTS) {
  return NextResponse.json(
    { message: "Too many requests. Please try again later." },
    { status: 429 }
  );
}
```

**Error Messages** (Keep Generic):
```typescript
// ✅ Good - doesn't expose database structure
return NextResponse.json(
  { message: "Certificate not found" },
  { status: 404 }
);

// ❌ Avoid - too specific
return NextResponse.json(
  { message: "No document found in certificates collection with certificateNo: 123" },
  { status: 404 }
);
```

---

### 5. Date Formatting

**Consistent Format Recommended**:
```
DD/MMM/YYYY
Examples: 20/Jan/2025, 01/Feb/2025, 15/Mar/2025
```

**Why This Format**:
- Easy to read internationally
- Unambiguous (avoids MM/DD confusion)
- Consistent appearance in tables

**In Code**:
```typescript
const date = new Date();
const formatted = date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});
// Output: "20/Jan/2025"
```

---

### 6. Performance Optimization

**Caching Strategy**:
```typescript
// Cache frequently searched certificates
const certificateCache = new Map();

export async function GET(req: Request) {
  const certificateId = searchParams.get("id");
  
  // Check cache first
  if (certificateCache.has(certificateId)) {
    return NextResponse.json({
      success: true,
      data: certificateCache.get(certificateId),
      cached: true
    });
  }
  
  // Query database
  const certificate = await db.collection("certificates").findOne({...});
  
  // Cache result
  if (certificate) {
    certificateCache.set(certificateId, certificate);
  }
  
  return NextResponse.json({...});
}
```

---

### 7. Frontend Best Practices

**Component Organization**:
```typescript
// ✅ Good - organized with comments
"use client";

// Imports
import React, { useState } from "react";

// Types
interface CertificateData {
  studentName: string;
  // ...
}

// Component
export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  
  const handleSearch = async (e) => {
    // Implementation
  };
  
  return (
    // JSX
  );
}
```

**Error Handling**:
```typescript
try {
  const response = await fetch(`/api/certificates/verify?id=${id}`);
  
  if (!response.ok) {
    const error = await response.json();
    setError(error.message || "An error occurred");
    return;
  }
  
  const result = await response.json();
  setCertificateData(result.data);
} catch (err) {
  setError("Network error. Please check your connection.");
  console.error("Fetch error:", err);
}
```

---

### 8. Responsive Design

**Mobile-First Approach**:
```typescript
// Start with mobile styles, add larger screens
className="
  px-4 md:px-8         // Padding
  text-sm md:text-base // Font size
  w-full md:max-w-2xl  // Width
  grid grid-cols-1 md:grid-cols-2  // Layout
"
```

---

### 9. Testing Strategy

**Unit Tests** (For API):
```typescript
describe('Certificate Verification API', () => {
  it('should return certificate for valid ID', async () => {
    const res = await GET(new Request('?id=20e6fee'));
    expect(res.status).toBe(200);
  });
  
  it('should return 404 for invalid ID', async () => {
    const res = await GET(new Request('?id=invalid'));
    expect(res.status).toBe(404);
  });
});
```

**Integration Tests** (For Component):
```typescript
describe('Certificate Verification Page', () => {
  it('should display results on successful search', async () => {
    // Render component
    // Type certificate ID
    // Click search
    // Assert results appear
  });
});
```

---

### 10. Monitoring & Logging

**Add Logging to API**:
```typescript
export async function GET(req: Request) {
  const certificateId = searchParams.get("id");
  
  console.log(`[CERT_VERIFY] Searching for: ${certificateId}`);
  
  try {
    const certificate = await db.collection("certificates").findOne({...});
    
    if (!certificate) {
      console.warn(`[CERT_VERIFY] Not found: ${certificateId}`);
      return NextResponse.json({...}, { status: 404 });
    }
    
    console.log(`[CERT_VERIFY] Found: ${certificate.studentName}`);
    return NextResponse.json({...});
  } catch (err) {
    console.error(`[CERT_VERIFY] Error:`, err);
    return NextResponse.json({...}, { status: 500 });
  }
}
```

---

## 🔧 Troubleshooting Guide

### Problem 1: Certificate Not Found

**Symptoms**: Always returns "Certificate not found" even with valid ID

**Solutions**:
1. **Check MongoDB Connection**:
   ```bash
   # Verify connection string in .env
   echo $MONGODB_URI
   ```

2. **Verify Data Exists**:
   ```javascript
   // In MongoDB
   db.certificates.countDocuments({});
   db.certificates.findOne({ certificateNo: "20e6fee" });
   ```

3. **Check Collection Name**:
   - Ensure it's exactly `certificates` (lowercase)
   - MongoDB is case-sensitive

4. **Try Seeding Data**:
   ```bash
   curl -X POST http://localhost:3000/api/certificates/seed
   ```

---

### Problem 2: API Endpoint Not Working

**Symptoms**: 404 error when accessing `/api/certificates/verify`

**Solutions**:
1. **Check File Path**:
   - Must be: `/app/api/certificates/verify/route.ts`
   - Must be: `/app/api/certificates/seed/route.ts`

2. **Restart Dev Server**:
   ```bash
   # Stop: Ctrl+C
   # Start: npm run dev
   ```

3. **Check Imports**:
   ```typescript
   // Verify these imports exist
   import { NextResponse } from "next/server";
   import clientPromise from "@/lib/mongodb";
   ```

---

### Problem 3: Page Shows Blank/White Screen

**Symptoms**: Verify certificate page shows nothing

**Solutions**:
1. **Check Browser Console**:
   - Open DevTools (F12)
   - Check for errors
   - Report error in console

2. **Verify Page Path**:
   - Must be: `/app/verify-certificate/page.tsx`
   - Check if it's under wrong directory

3. **Check Dependencies**:
   ```bash
   npm list react framer-motion lucide-react
   ```

4. **Clear Build Cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Problem 4: Styling Issues (No Colors/Layout)

**Symptoms**: Page appears unstyled

**Solutions**:
1. **Check Tailwind Setup**:
   ```bash
   # Verify tailwind config exists
   cat tailwind.config.ts
   ```

2. **Check CSS Import**:
   - Verify `globals.css` is imported in layout
   - Check for Tailwind directives

3. **Rebuild Styles**:
   ```bash
   npm run build
   npm run dev
   ```

---

### Problem 5: Loading Spinner Never Stops

**Symptoms**: Loading state persists forever

**Solutions**:
1. **Check API Response**:
   - Open DevTools → Network
   - Check if API request completes
   - Look for errors in response

2. **Check Error Handling**:
   ```typescript
   // Ensure loading is set to false in catch block
   finally {
     setLoading(false);
   }
   ```

3. **Test API Directly**:
   ```bash
   curl "http://localhost:3000/api/certificates/verify?id=20e6fee"
   ```

---

### Problem 6: Table Not Displaying Results

**Symptoms**: Search succeeds but table is empty

**Solutions**:
1. **Check State Update**:
   ```typescript
   // Verify certificateData is being set
   console.log("certificateData:", certificateData);
   ```

2. **Check API Response**:
   - Verify `result.data` has correct structure
   - All required fields present

3. **Check Conditional Rendering**:
   ```typescript
   // Verify condition is correct
   {certificateData && (
     // Table renders here
   )}
   ```

---

### Problem 7: Mobile Layout Broken

**Symptoms**: Content overflows on mobile

**Solutions**:
1. **Check Responsive Classes**:
   ```typescript
   // Should have md: prefixes
   className="px-4 md:px-8"
   className="text-sm md:text-base"
   ```

2. **Test in DevTools**:
   - F12 → Toggle device toolbar
   - Test at 375px width

3. **Check Max Widths**:
   ```typescript
   // Table should have scrollable wrapper on mobile
   className="overflow-x-auto"
   ```

---

### Problem 8: Search Always Returns 404

**Symptoms**: Valid certificates return not found

**Solutions**:
1. **Check Search Logic**:
   ```typescript
   // Verify query uses correct field names
   db.collection("certificates").findOne({
     $or: [
       { _id: new ObjectId(certificateId) },
       { certificateNo: certificateId }
     ]
   })
   ```

2. **Check Field Name Consistency**:
   - Database uses `certificateNo`
   - Verify data matches exactly
   - Case-sensitive search

3. **Debug Database Data**:
   ```javascript
   // Check actual field names
   db.certificates.findOne({}).keys()
   ```

---

### Problem 9: Animation Stuttering

**Symptoms**: Animations are jittery or laggy

**Solutions**:
1. **Check Browser Performance**:
   - Open DevTools → Performance tab
   - Record while searching
   - Look for long tasks

2. **Reduce Animation Complexity**:
   ```typescript
   // Simplify transitions if needed
   transition={{ duration: 0.3 }}
   ```

3. **Check Device Performance**:
   - Test on different devices
   - May be client-side performance issue

---

### Problem 10: CORS Errors

**Symptoms**: API calls blocked with CORS error

**Solutions**:
1. **Check Same-Origin**:
   - API and frontend on same origin
   - Using relative URL `/api/certificates/verify`

2. **If External API**:
   ```typescript
   // Add CORS headers in next.config.ts
   headers: async () => {
     return [
       {
         source: '/api/:path*',
         headers: [
           { key: 'Access-Control-Allow-Credentials', value: 'true' },
           { key: 'Access-Control-Allow-Origin', value: '*' },
         ]
       }
     ]
   }
   ```

---

## 🐛 Debug Commands

```bash
# Check Node/npm versions
node --version
npm --version

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check MongoDB connection
mongodb --version
mongo --version

# Restart dev server with verbose logging
DEBUG=* npm run dev

# Check if port 3000 is in use
lsof -i :3000

# Build for production to check for errors
npm run build

# Run linter to find code issues
npm run lint

# Check TypeScript for errors
npx tsc --noEmit
```

---

## 📞 Quick Help

| Issue | Quick Fix |
|-------|-----------|
| Page blank | Clear `.next`, restart dev server |
| Styles missing | Check Tailwind config, rebuild |
| Certificate not found | Verify data in MongoDB, check field names |
| API 404 | Check file path matches `/app/api/certificates/verify/route.ts` |
| Loading forever | Check API response in DevTools Network |
| Mobile broken | Add responsive classes with `md:` prefix |
| Animations laggy | Reduce animation complexity |
| CORS error | Use relative URLs, not absolute |
| Search empty result | Check state update logic |
| Database error | Verify MongoDB connection in `.env` |

---

## 🚀 Performance Optimization Tips

### 1. **Database Query Optimization**
```typescript
// ✅ Good - specific fields
await db.collection("certificates").findOne(
  { certificateNo: id },
  { projection: { studentName: 1, domain: 1, ... } }
);

// ❌ Avoid - returns all fields
await db.collection("certificates").findOne({...});
```

### 2. **Frontend Optimization**
```typescript
// ✅ Use useCallback to prevent unnecessary renders
const handleSearch = useCallback(async (e) => {
  // Implementation
}, []);

// ✅ Memoize data if rendering lists
import { memo } from 'react';
export const TableRow = memo(({data}) => {...});
```

### 3. **API Caching**
```typescript
// Set cache headers for GET requests
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, max-age=3600' // 1 hour
  }
});
```

---

## 📈 Monitoring Checklist

- [ ] Log all search requests
- [ ] Track response times
- [ ] Monitor error rates
- [ ] Alert on API failures
- [ ] Track database query performance
- [ ] Monitor server resources

---

**Need more help? Check the other documentation files!** 📚
- `CERTIFICATE_VERIFICATION_README.md` - Full documentation
- `CERTIFICATE_FEATURE_SUMMARY.md` - Feature overview
- `CERTIFICATE_TESTING_GUIDE.md` - Testing procedures
- `MONGODB_QUERIES.md` - Database queries
