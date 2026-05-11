# Certificate Verification Flow Diagram

## 🔄 User Interaction Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     VERIFY CERTIFICATE PAGE                     │
│              /app/verify-certificate/page.tsx                   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    USER ENTERS CERT ID                          │
│                  (e.g., "20e6fee")                              │
│                  Input validation triggers                      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  USER CLICKS "SEARCH"                           │
│              Form submission event triggered                    │
│             Loading state set to true                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         API REQUEST SENT TO BACKEND                             │
│  GET /api/certificates/verify?id=20e6fee                        │
│                                                                 │
│  Headers:                                                       │
│  - Authorization (if required)                                 │
│  - Content-Type: application/json                              │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│           SERVER-SIDE VERIFICATION ROUTE                        │
│        /app/api/certificates/verify/route.ts                    │
│                                                                 │
│  1. Extract certificate ID from query params                   │
│  2. Validate certificate ID is provided                        │
│  3. Connect to MongoDB                                         │
│  4. Query certificates collection                              │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│          MONGODB DATABASE SEARCH                                │
│                                                                 │
│  db.certificates.findOne({                                     │
│    $or: [                                                      │
│      { _id: ObjectId(certificateId) },                         │
│      { certificateNo: certificateId }                          │
│    ]                                                           │
│  })                                                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────┐          │
│  │      Certificate Found?                         │          │
│  └─────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
            │                               │
       YES  │                               │ NO
            ▼                               ▼
    ┌───────────────────┐         ┌────────────────────┐
    │ RETURN 200 OK     │         │ RETURN 404         │
    │ + Certificate     │         │ + Error Message    │
    │   Data            │         │                    │
    └───────────────────┘         └────────────────────┘
            │                               │
            ▼                               ▼
    ┌───────────────────────┐     ┌────────────────────────┐
    │ FRONTEND RECEIVES     │     │ FRONTEND RECEIVES      │
    │ SUCCESS RESPONSE      │     │ ERROR RESPONSE         │
    │                       │     │                        │
    │ {                     │     │ {                      │
    │   success: true,      │     │   message: "Cert not   │
    │   data: {             │     │            found"      │
    │     studentName: ..., │     │ }                      │
    │     domain: ...,      │     │                        │
    │     ...               │     │ Loading state: false   │
    │   }                   │     │ Error state: set       │
    │ }                     │     │                        │
    │                       │     │                        │
    │ Loading state: false  │     └────────────────────────┘
    └───────────────────────┘              │
            │                              ▼
            │                    ┌──────────────────────┐
            │                    │ SHOW ERROR MESSAGE   │
            │                    │ AlertCircle Icon     │
            │                    │ "Verification Failed"│
            │                    │ "Certificate not     │
            │                    │  found"              │
            │                    └──────────────────────┘
            │
            ▼
    ┌───────────────────────────────────────┐
    │ RENDER CERTIFICATE DETAILS TABLE      │
    │                                       │
    │  ✓ Verification Status (Green)        │
    │                                       │
    │  ┌─────────────────────────────────┐ │
    │  │ Student Name    │ Tarun Soni    │ │
    │  │ Domain          │ Web Dev...    │ │
    │  │ Duration        │ 4 weeks       │ │
    │  │ Certificate No  │ 20e6fee       │ │
    │  │ Starting Date   │ 20/Jan/2025   │ │
    │  │ Award Date      │ 20/Feb/2025   │ │
    │  │ Status          │ ✓ verified    │ │
    │  └─────────────────────────────────┘ │
    │                                       │
    │  [Search Another Certificate]         │
    └───────────────────────────────────────┘
            │
            ▼
    ┌───────────────────────┐
    │ USER SEES RESULT      │
    │ Certificate verified  │
    │ & details displayed   │
    └───────────────────────┘
```

## 📊 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   VERIFY CERTIFICATE PAGE                   │
│                 (/verify-certificate/page.tsx)              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              HEADER SECTION                         │   │
│  │  - Title: "Verify Certificate"                      │   │
│  │  - Subtitle: "Enter your certificate ID..."        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           SEARCH INPUT SECTION                      │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │ Label: "Certificate ID or Number"            │  │   │
│  │  ├───────────────────────────────────────────────┤  │   │
│  │  │ 🔍 [Input Field for Certificate ID .......]  │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │ [🔍 Search] or [⏳ Verifying...]             │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         STATUS MESSAGE (Conditional)               │   │
│  │                                                     │   │
│  │  IF ERROR:                                         │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │ ⚠️  Verification Failed                     │  │   │
│  │  │ Certificate not found                       │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  │  IF SUCCESS:                                       │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │ ✓ Certificate Verified ✓                    │  │   │
│  │  │ This certificate is authentic and valid.    │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      CERTIFICATE DETAILS TABLE (Conditional)       │   │
│  │  (Only shows when certificate is found)            │   │
│  │                                                     │   │
│  │  CERTIFICATE DETAILS [Header]                      │   │
│  │  ╔═══════════════════════════════════════════╗    │   │
│  │  ║ Student Name        │ Tarun Soni          ║    │   │
│  │  ╟─────────────────────┼─────────────────────╢    │   │
│  │  ║ Domain              │ Web Dev Internship  ║    │   │
│  │  ╟─────────────────────┼─────────────────────╢    │   │
│  │  ║ Duration            │ 4 weeks             ║    │   │
│  │  ╟─────────────────────┼─────────────────────╢    │   │
│  │  ║ Certificate No      │ 20e6fee             ║    │   │
│  │  ╟─────────────────────┼─────────────────────╢    │   │
│  │  ║ Starting Date       │ 20/Jan/2025         ║    │   │
│  │  ╟─────────────────────┼─────────────────────╢    │   │
│  │  ║ Award Date          │ 20/Feb/2025         ║    │   │
│  │  ╚═══════════════════════════════════════════╝    │   │
│  │  Status: ✓ verified [Green Badge]                 │   │
│  │                                                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │ [Search Another Certificate]                │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │     INFO SECTION (When no search made)             │   │
│  │  How to verify your certificate?                   │   │
│  │  1. Enter your unique certificate number...        │   │
│  │  2. Click the "Search" button...                   │   │
│  │  3. View detailed certificate information...       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🗄️ Database Relationship

```
┌──────────────────────────────────────────────────┐
│          MONGODB - "test" Database               │
└──────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    ┌────────┐    ┌──────────┐   ┌─────────────┐
    │  users │    │  blogs   │   │certificates │
    └────────┘    └──────────┘   └─────────────┘
                                        │
                        ┌───────────────┼───────────────┐
                        │               │               │
                    ┌───▼────┐     ┌───▼─────┐    ┌────▼──────┐
                    │  _id   │     │  string  │    │  string   │
                    │  ObjectId    │certificateNo    │studentName│
                    ├────────┤     └──────────┘    ├───────────┤
                    │Index   │        INDEX       │ Web Dev   │
                    └────────┘      (Fast Query)   │Internship │
                                    ┌──────────┐   ├───────────┤
                                    │  Domain  │   │ 4 weeks   │
                                    └──────────┘   ├───────────┤
                                    ┌──────────┐   │20e6fee    │
                                    │ Duration │   ├───────────┤
                                    └──────────┘   │20/Jan/... │
                                    ┌──────────┐   ├───────────┤
                                    │  Status  │   │20/Feb/... │
                                    │VERIFIED  │   └───────────┘
                                    └──────────┘
```

## 🔐 Security Flow

```
┌──────────────────────────────────────────────────────┐
│  USER REQUEST (Frontend)                             │
│  GET /api/certificates/verify?id=20e6fee            │
└──────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  VALIDATION (Backend - route.ts)                     │
│  ✓ Check if ID is provided                          │
│  ✓ Sanitize input (URL encoding)                    │
│  ✗ Reject if empty or suspicious                    │
└──────────────────────────────────────────────────────┘
                       │
                       ▼ (If validation passes)
┌──────────────────────────────────────────────────────┐
│  DATABASE QUERY                                      │
│  ✓ Use MongoDB query safely                         │
│  ✓ No SQL injection possible (not SQL)              │
│  ✓ Search only public fields                        │
└──────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  RESPONSE PREPARATION (Backend)                      │
│  ✓ Remove sensitive fields (if any)                 │
│  ✓ Return only necessary data                       │
│  ✓ Set proper HTTP status codes                     │
│  ✗ Don't expose database structure                  │
└──────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  USER RECEIVES RESPONSE (Frontend)                   │
│  ✓ Parse JSON safely (React handles it)            │
│  ✓ Display data in safe context (JSX escaping)     │
│  ✓ Handle errors gracefully                        │
└──────────────────────────────────────────────────────┘
```

## 🚀 API Request/Response Examples

### ✅ Successful Request
```
REQUEST:
GET /api/certificates/verify?id=20e6fee

RESPONSE (200 OK):
{
  "success": true,
  "data": {
    "studentName": "Tarun Soni",
    "domain": "Web Development Internship",
    "duration": "4 weeks",
    "certificateNo": "20e6fee",
    "startingDate": "20/Jan/2025",
    "awardDate": "20/Feb/2025",
    "status": "verified"
  }
}
```

### ❌ Certificate Not Found
```
REQUEST:
GET /api/certificates/verify?id=invalid123

RESPONSE (404 NOT FOUND):
{
  "message": "Certificate not found"
}
```

### ⚠️ Missing Parameter
```
REQUEST:
GET /api/certificates/verify

RESPONSE (400 BAD REQUEST):
{
  "message": "Certificate ID is required"
}
```

### 💥 Server Error
```
REQUEST:
GET /api/certificates/verify?id=20e6fee

RESPONSE (500 INTERNAL SERVER ERROR):
{
  "message": "Failed to verify certificate"
}
```

## 🎨 State Management Flow

```
Component State:
┌─────────────────────────────────┐
│ certificateId (string)          │
│ → Stores user input             │
└─────────────────────────────────┘
              │
              ├──► onChange listener updates state
              
┌─────────────────────────────────┐
│ certificateData (CertificateData)
│ → Stores API response           │
└─────────────────────────────────┘
              │
              ├──► Set when API succeeds
              ├──► Reset on new search
              
┌─────────────────────────────────┐
│ loading (boolean)               │
│ → Indicates API request pending │
└─────────────────────────────────┘
              │
              ├──► Set true on submit
              ├──► Set false when response received
              
┌─────────────────────────────────┐
│ error (string)                  │
│ → Stores error messages         │
└─────────────────────────────────┘
              │
              ├──► Set on API error
              ├──► Reset on new search
              
┌─────────────────────────────────┐
│ searched (boolean)              │
│ → Indicates user performed search
└─────────────────────────────────┘
              │
              ├──► Set true on submit
              ├──► Reset when searching again
```

## 📱 Responsive Breakpoints

```
Mobile (< 640px):
  - Single column layout
  - Full-width buttons
  - Stacked input/button
  - Small font sizes

Tablet (640px - 1024px):
  - Medium spacing
  - 80% width max
  - Readable font sizes
  - Touch-friendly buttons

Desktop (> 1024px):
  - Max-width: 1024px (max-w-4xl)
  - Centered content
  - Full table display
  - Large hover effects
```

---

This comprehensive flow ensures a smooth user experience with proper error handling and feedback at each step!
