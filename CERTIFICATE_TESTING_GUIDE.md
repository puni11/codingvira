# Certificate Verification - Testing Guide

## 🧪 Testing Checklist

### ✅ Pre-Testing Setup

- [ ] Verify MongoDB connection is working
- [ ] Check `.env` has `MONGODB_URI` set
- [ ] Run `npm run dev` (development server running)
- [ ] Seed sample data via `/api/certificates/seed` (optional)

---

## 🔍 Manual Testing

### Test 1: Valid Certificate Lookup ✓

**Test Case**: Search with valid certificate ID

1. Navigate to: `http://localhost:3000/verify-certificate`
2. Enter certificate ID: `20e6fee`
3. Click "Search" button
4. **Expected Result**:
   - ✅ Green success message appears
   - ✅ Table displays certificate details
   - ✅ All fields populated correctly:
     - Student Name: "Tarun Soni"
     - Domain: "Web Development Internship"
     - Duration: "4 weeks"
     - Certificate No: "20e6fee"
     - Starting Date: "20/Jan/2025"
     - Award Date: "20/Feb/2025"
     - Status: "verified" (green badge)
   - ✅ "Search Another Certificate" button visible

---

### Test 2: Invalid Certificate ID ✗

**Test Case**: Search with non-existent certificate

1. Enter certificate ID: `invalid12345xyz`
2. Click "Search" button
3. **Expected Result**:
   - ❌ Red error message appears
   - ❌ Error text: "Certificate not found"
   - ❌ No table displayed
   - ✅ Can try another search

---

### Test 3: Empty Input ⚠️

**Test Case**: Submit search with empty field

1. Leave certificate ID field empty
2. Click "Search" button
3. **Expected Result**:
   - ⚠️ Error message appears
   - ⚠️ Error text: "Please enter a certificate ID"
   - ✅ Button remains enabled for retry

---

### Test 4: Loading State ⏳

**Test Case**: Verify loading indicator appears

1. Enter a valid certificate ID: `20e6fee`
2. Click "Search"
3. **Expected Result**:
   - ⏳ Spinner animation appears
   - ⏳ Button text changes to "Verifying..."
   - ⏳ Button disabled during request
   - ✓ After ~1-2 seconds: Results appear

---

### Test 5: Search Another Certificate 🔄

**Test Case**: Search multiple certificates in sequence

1. Search for first certificate: `20e6fee`
2. Get results (green success)
3. Click "Search Another Certificate" button
4. **Expected Result**:
   - ✅ Input field cleared
   - ✅ Table disappears
   - ✅ Success message disappears
   - ✅ Ready for new search
5. Enter new certificate: `21a7gff`
6. Click "Search"
7. **Expected Result**:
   - ✅ New certificate details displayed (John Doe)

---

### Test 6: UI Responsiveness 📱

**Test Case**: Test on different screen sizes

#### Mobile (375px width)
1. Open DevTools (F12)
2. Set viewport to 375px width
3. Navigate to verify-certificate page
4. **Expected Result**:
   - ✅ Content fits on screen
   - ✅ No horizontal scrolling
   - ✅ Buttons are touch-friendly
   - ✅ Text is readable
   - ✅ Table scrolls horizontally if needed

#### Tablet (768px width)
1. Set viewport to 768px width
2. **Expected Result**:
   - ✅ Optimal padding/margins
   - ✅ All content visible
   - ✅ Table displays nicely

#### Desktop (1920px width)
1. Set viewport to 1920px width
2. **Expected Result**:
   - ✅ Content centered (max-w-4xl)
   - ✅ Consistent spacing
   - ✅ Professional appearance

---

### Test 7: Animation Effects 🎬

**Test Case**: Verify smooth animations

1. Navigate to page
2. **Expected Result**:
   - ✅ Header fades in smoothly
   - ✅ Search card slides up
   - ✅ When results appear: Table fades in
   - ✅ Hover over table rows: Background changes smoothly
   - ✅ No jarring transitions

---

### Test 8: Browser Compatibility 🌐

Test in multiple browsers:

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

For each browser:
1. Perform search
2. **Expected**: All features work identically

---

### Test 9: Error Handling 🛡️

**Test Case**: Various error scenarios

1. **No Internet**:
   - Disable network
   - Try to search
   - Expected: Error message appears

2. **Slow Network**:
   - Throttle network to 3G
   - Search
   - Expected: Loading indicator visible, then results appear

3. **Server Error**:
   - Try to break API (if testing environment allows)
   - Expected: Graceful error message

---

### Test 10: Form Validation 📝

**Test Case**: Input field behavior

1. Click on input field
2. **Expected**: Focus outline appears (blue ring)

3. Type special characters: `@#$%^&*()`
4. **Expected**: Characters accepted (API will validate)

5. Type very long string: `aaa...aaa` (500+ chars)
6. **Expected**: Scrolls in input, API handles gracefully

---

## 🔗 API Testing

### Using cURL Commands

#### Test 1: Valid Certificate
```bash
curl "http://localhost:3000/api/certificates/verify?id=20e6fee"
```

**Expected Response**:
```json
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

#### Test 2: Invalid Certificate
```bash
curl "http://localhost:3000/api/certificates/verify?id=invalid"
```

**Expected Response**:
```json
{
  "message": "Certificate not found"
}
```

#### Test 3: Missing Parameter
```bash
curl "http://localhost:3000/api/certificates/verify"
```

**Expected Response**:
```json
{
  "message": "Certificate ID is required"
}
```

#### Test 4: Seed Sample Data
```bash
curl -X POST http://localhost:3000/api/certificates/seed
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Sample certificates created",
  "insertedIds": {...}
}
```

### Using Postman

1. Create new GET request
2. URL: `http://localhost:3000/api/certificates/verify?id=20e6fee`
3. Click "Send"
4. **Expected**: 200 response with certificate data

---

## 🗄️ Database Testing

### Verify Data in MongoDB

```bash
# Connect to MongoDB
mongo

# Switch to test database
use test

# Check if certificates collection exists
db.getCollectionNames()

# Count certificates
db.certificates.countDocuments({})

# Find specific certificate
db.certificates.findOne({ certificateNo: "20e6fee" })

# View all certificates
db.certificates.find({}).pretty()
```

---

## 📊 Performance Testing

### Test 1: Response Time

1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to verify-certificate page
4. Search for a certificate
5. **Expected**:
   - ✅ API response < 200ms
   - ✅ Page interactive < 1s
   - ✅ No loading jank/stuttering

### Test 2: Multiple Rapid Searches

1. Rapidly click search multiple times
2. **Expected**:
   - ✅ Each request cancels previous (or queues)
   - ✅ Last result displayed
   - ✅ No duplicate requests firing

### Test 3: Large Data Set

1. Seed database with 1000+ certificates
2. Search for certificates
3. **Expected**:
   - ✅ Query still fast (thanks to indexes)
   - ✅ No timeouts
   - ✅ Results accurate

---

## 🔐 Security Testing

### Test 1: XSS Prevention (Cross-Site Scripting)

1. Enter in search field:
```
<script>alert('XSS')</script>
```
2. Click Search
3. **Expected**:
   - ✅ No alert popup
   - ✅ Treated as literal search string
   - ✅ Certificate not found (expected)

### Test 2: SQL Injection Prevention

Not applicable (MongoDB, not SQL), but test:
```
20e6fee' OR '1'='1
```
2. **Expected**:
   - ✅ Treated as literal string
   - ✅ No special behavior
   - ✅ Certificate not found

### Test 3: Input Sanitization

1. Try various special characters:
```
20e6fee!@#$%^&*()
```
2. **Expected**:
   - ✅ API accepts gracefully
   - ✅ Certificate not found (expected)
   - ✅ No errors

---

## 🎯 Component-Specific Testing

### Input Field Tests
- [ ] Placeholder text visible
- [ ] Focus state works
- [ ] Blur state works
- [ ] Value updates on typing
- [ ] Can clear field

### Button Tests
- [ ] Normal state (blue)
- [ ] Hover state (darker blue)
- [ ] Loading state (disabled + spinner)
- [ ] Disabled state styling
- [ ] Click triggers search

### Success Message Tests
- [ ] Appears when search succeeds
- [ ] Has green checkmark icon
- [ ] Shows "Certificate Verified ✓"
- [ ] Disappears on new search

### Error Message Tests
- [ ] Appears when search fails
- [ ] Has red alert icon
- [ ] Shows error text
- [ ] Disappears on new search
- [ ] Multiple error types display correctly

### Table Tests
- [ ] All rows display
- [ ] Labels in left column (gray background)
- [ ] Values in right column
- [ ] Responsive on mobile
- [ ] Hover effects work
- [ ] Status badge colored correctly

### Info Section Tests
- [ ] Visible before any search
- [ ] Disappears after search
- [ ] Numbered list displays correctly
- [ ] Styling consistent with design

---

## ✨ User Experience Testing

### Test 1: First-Time User

1. User arrives at page
2. **Expected**:
   - ✅ Clear title: "Verify Certificate"
   - ✅ Clear instruction text
   - ✅ Info section explains how to use
   - ✅ Intuitive search form
   - ✅ User understands what to do

### Test 2: Successful Path

1. User searches successfully
2. **Expected**:
   - ✅ Immediate visual feedback (green ✓)
   - ✅ Clear data presentation
   - ✅ "Search Another" easy to find
   - ✅ Overall positive experience

### Test 3: Failed Search Path

1. User searches for invalid cert
2. **Expected**:
   - ✅ Clear error message
   - ✅ Suggests what might be wrong
   - ✅ Easy to try again
   - ✅ Not frustrating

### Test 4: Mobile User Experience

1. On mobile device
2. **Expected**:
   - ✅ No pinch-to-zoom needed
   - ✅ Buttons easily tappable (>44px)
   - ✅ No horizontal scrolling
   - ✅ Fast load time

---

## 🔍 Accessibility Testing

### Keyboard Navigation
- [ ] Tab through form
- [ ] Enter submits search
- [ ] Can focus all interactive elements

### Screen Reader
- [ ] Title read correctly
- [ ] Input label associated
- [ ] Button purpose clear
- [ ] Table structure understood
- [ ] Error messages announced

### Color Contrast
- [ ] Text readable on backgrounds
- [ ] Success/error colors distinct
- [ ] Not color-dependent only

### Font Sizing
- [ ] Readable at 200% zoom
- [ ] No content cutoff
- [ ] Responsive text scaling

---

## 📋 Test Report Template

```markdown
# Test Report - Certificate Verification Feature
Date: [DATE]
Tester: [NAME]
Environment: [Dev/Staging/Prod]

## Summary
- Total Tests: [X]
- Passed: [X]
- Failed: [X]
- Blocked: [X]

## Test Results

### Functional Tests
- [X] Valid certificate search
- [X] Invalid certificate handling
- [X] Empty input validation
- [X] Loading state display
- [X] Multiple searches

### UI/UX Tests
- [X] Responsive design
- [X] Animation smoothness
- [X] Button interactions
- [X] Color contrast
- [X] Font readability

### Performance Tests
- [X] API response time < 200ms
- [X] Page load < 1s
- [X] No memory leaks

### Security Tests
- [X] XSS prevention
- [X] Input sanitization
- [X] Error messages safe

## Issues Found
1. [Issue 1]
2. [Issue 2]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

## Sign-Off
Tester: _________________ Date: _________
```

---

## 🚀 Deployment Testing

Before going to production:

- [ ] All tests pass locally
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Database indexes created
- [ ] Sample data removed (if needed)
- [ ] Environment variables set
- [ ] Rate limiting configured
- [ ] Error logging enabled
- [ ] Performance metrics acceptable
- [ ] Backup strategy in place

---

**Happy Testing! 🎉**
