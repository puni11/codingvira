# Certificate Verification Feature

## Overview
This feature allows users to verify the authenticity of certificates issued by the platform. Users can enter a certificate ID and retrieve detailed certificate information displayed in a clean, professional table format.

## File Structure

### Page
- **`/app/verify-certificate/page.tsx`** - Main verification page component
  - Search form for certificate ID input
  - Displays certificate details in a table format
  - Shows verification status with visual feedback
  - Responsive design with Tailwind CSS and Framer Motion animations

### API Routes
- **`/app/api/certificates/verify/route.ts`** - Certificate lookup endpoint
  - Query parameters: `id` (certificate ID or number)
  - Returns certificate details if found
  - Handles both MongoDB ObjectId and custom certificate numbers

- **`/app/api/certificates/seed/route.ts`** - Sample data seeding endpoint (optional)
  - Creates sample certificates for testing
  - POST request only

### Navigation
- Updated `/component/NavBar.tsx` to include "Verify Certificate" link

## Database Schema

The `certificates` collection in MongoDB stores the following fields:

```typescript
{
  _id: ObjectId,
  studentName: string,
  domain: string,
  duration: string,
  certificateNo: string,
  startingDate: string,
  awardDate: string,
  status: string,
  createdAt: Date
}
```

## Usage

### 1. Seed Sample Data (Optional)
To create sample certificate data for testing:

```bash
curl -X POST http://localhost:3000/api/certificates/seed
```

Sample certificate IDs available:
- `20e6fee` - Tarun Soni
- `21a7gff` - John Doe
- `22b8hgg` - Sarah Johnson

### 2. Access the Verification Page
Navigate to: `http://localhost:3000/verify-certificate`

### 3. Verify a Certificate
1. Enter the certificate ID (e.g., "20e6fee")
2. Click the "Search" button
3. View the certificate details in the table

## Features

✅ **Search Functionality**
- Search by certificate ID or certificate number
- Real-time loading state
- Error handling with user-friendly messages

✅ **Certificate Details Display**
- Professional table layout
- All key information displayed:
  - Student Name
  - Domain/Course
  - Duration
  - Certificate Number
  - Starting Date
  - Award Date
  - Status Badge

✅ **User Experience**
- Animated transitions using Framer Motion
- Responsive design (mobile, tablet, desktop)
- Clear verification status with icons
- Info section explaining how to use the feature
- Search another certificate functionality

✅ **Security**
- Server-side certificate lookup
- No sensitive data exposed in frontend
- Proper error messages without revealing database structure

## API Endpoints

### GET /api/certificates/verify?id={certificateId}

**Response (Success):**
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

**Response (Not Found):**
```json
{
  "message": "Certificate not found",
  "status": 404
}
```

**Response (Missing Parameter):**
```json
{
  "message": "Certificate ID is required",
  "status": 400
}
```

## Customization

### Styling
The component uses Tailwind CSS with custom color schemes:
- Primary: Blue gradient (`from-blue-600 to-blue-700`)
- Success: Green (`green-50`, `green-600`)
- Error: Red (`red-50`, `red-600`)
- Info: Blue (`blue-50`, `blue-200`)

### Animations
Uses Framer Motion for:
- Fade-in animations on page load
- Staggered entrance animations
- Hover effects on table rows

### Table Fields
To add or modify fields, update the table structure in `/app/verify-certificate/page.tsx` (lines 217-248).

## Adding New Certificates

To add a new certificate to the database, perform a POST request to `/api/certificates/verify` endpoint or directly insert into the MongoDB collection:

```typescript
db.collection("certificates").insertOne({
  studentName: "Your Name",
  domain: "Course/Domain",
  duration: "Duration",
  certificateNo: "UNIQUE_ID",
  startingDate: "DD/MMM/YYYY",
  awardDate: "DD/MMM/YYYY",
  status: "verified",
  createdAt: new Date()
});
```

## Testing

### Test Cases
1. **Valid Certificate ID**: Enter "20e6fee" - should display certificate details
2. **Invalid Certificate ID**: Enter "invalid123" - should show "Certificate not found"
3. **Empty Search**: Leave field empty and click search - should show error
4. **Search Another**: Click "Search Another Certificate" button - should reset form

## Future Enhancements

- [ ] Add download certificate as PDF
- [ ] Add email verification option
- [ ] Implement certificate expiration tracking
- [ ] Add bulk verification API
- [ ] Create admin dashboard for certificate management
- [ ] Add QR code generation for certificates
- [ ] Implement certificate revocation list
- [ ] Add verification history/logs

## Dependencies

- **Next.js** - Framework
- **React** - UI library
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Tailwind CSS** - Styling
- **MongoDB** - Database

## Environment Variables

Ensure `.env` has:
```
MONGODB_URI=your_mongodb_connection_string
```

## Notes

- The component is client-side rendered with `"use client"` directive
- All certificate lookups are performed server-side via API
- The verification page is publicly accessible
- No authentication required for verification (consider adding rate limiting for production)
