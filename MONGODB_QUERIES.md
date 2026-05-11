// MongoDB Queries for Certificate Verification Feature

// ========================================
// 1. CREATE COLLECTION
// ========================================
db.createCollection("certificates");

// ========================================
// 2. INSERT SAMPLE CERTIFICATES
// ========================================
db.certificates.insertMany([
  {
    studentName: "Tarun Soni",
    domain: "Web Development Internship",
    duration: "4 weeks",
    certificateNo: "20e6fee",
    startingDate: "20/Jan/2025",
    awardDate: "20/Feb/2025",
    status: "verified",
    createdAt: new Date()
  },
  {
    studentName: "John Doe",
    domain: "Cloud Computing",
    duration: "6 weeks",
    certificateNo: "21a7gff",
    startingDate: "01/Feb/2025",
    awardDate: "15/Mar/2025",
    status: "verified",
    createdAt: new Date()
  },
  {
    studentName: "Sarah Johnson",
    domain: "Full Stack Development",
    duration: "8 weeks",
    certificateNo: "22b8hgg",
    startingDate: "15/Jan/2025",
    awardDate: "10/Mar/2025",
    status: "verified",
    createdAt: new Date()
  },
  {
    studentName: "Michael Chen",
    domain: "Mobile App Development",
    duration: "5 weeks",
    certificateNo: "23c9ihh",
    startingDate: "25/Jan/2025",
    awardDate: "01/Mar/2025",
    status: "verified",
    createdAt: new Date()
  },
  {
    studentName: "Emily Davis",
    domain: "Data Science & AI",
    duration: "10 weeks",
    certificateNo: "24d0jii",
    startingDate: "01/Jan/2025",
    awardDate: "15/Mar/2025",
    status: "verified",
    createdAt: new Date()
  }
]);

// ========================================
// 3. CREATE INDEXES FOR BETTER PERFORMANCE
// ========================================
// Index for certificate number (fast searches)
db.certificates.createIndex({ certificateNo: 1 });

// Index for student name (for admin purposes)
db.certificates.createIndex({ studentName: 1 });

// Index for status (for filtering)
db.certificates.createIndex({ status: 1 });

// Index for creation date (for sorting)
db.certificates.createIndex({ createdAt: -1 });

// ========================================
// 4. VERIFY SEARCHES WORK
// ========================================
// Search by certificate number
db.certificates.findOne({ certificateNo: "20e6fee" });

// Search by student name
db.certificates.findOne({ studentName: "Tarun Soni" });

// Find all verified certificates
db.certificates.find({ status: "verified" });

// ========================================
// 5. UPDATE CERTIFICATE (if needed)
// ========================================
// Update status of a certificate
db.certificates.updateOne(
  { certificateNo: "20e6fee" },
  { $set: { status: "verified", updatedAt: new Date() } }
);

// Update certificate details
db.certificates.updateOne(
  { certificateNo: "20e6fee" },
  { $set: { awardDate: "25/Feb/2025" } }
);

// ========================================
// 6. ADD NEW CERTIFICATE (Template)
// ========================================
db.certificates.insertOne({
  studentName: "Your Name",
  domain: "Course/Domain Name",
  duration: "Duration in weeks",
  certificateNo: "unique_code_here",
  startingDate: "DD/MMM/YYYY",
  awardDate: "DD/MMM/YYYY",
  status: "verified",
  createdAt: new Date()
});

// ========================================
// 7. REVOKE CERTIFICATE (Set status)
// ========================================
db.certificates.updateOne(
  { certificateNo: "20e6fee" },
  { $set: { status: "revoked", revokedAt: new Date() } }
);

// ========================================
// 8. VIEW ALL CERTIFICATES
// ========================================
db.certificates.find({}).pretty();

// ========================================
// 9. COUNT TOTAL CERTIFICATES
// ========================================
db.certificates.countDocuments({});

// ========================================
// 10. GET STATISTICS
// ========================================
// Count by status
db.certificates.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
]);

// Certificates per domain
db.certificates.aggregate([
  { $group: { _id: "$domain", count: { $sum: 1 } } }
]);

// ========================================
// 11. SEARCH QUERIES (Frontend API equivalents)
// ========================================
// Search by certificate ID (as used in verify API)
db.certificates.findOne({
  $or: [
    { _id: ObjectId("507f1f77bcf86cd799439011") },
    { certificateNo: "20e6fee" }
  ]
});

// ========================================
// 12. BATCH INSERT FOR TESTING
// ========================================
const generateCertificates = (count) => {
  const domains = ["Web Development", "Cloud Computing", "Mobile Development", "Data Science", "DevOps"];
  const names = ["John", "Sarah", "Michael", "Emily", "David", "Lisa", "Robert", "Jennifer"];
  const certificates = [];
  
  for (let i = 0; i < count; i++) {
    certificates.push({
      studentName: names[Math.floor(Math.random() * names.length)] + " " + Math.random().toString(36).substring(7),
      domain: domains[Math.floor(Math.random() * domains.length)],
      duration: Math.floor(Math.random() * 10 + 2) + " weeks",
      certificateNo: "cert" + Date.now() + i,
      startingDate: "01/Jan/2025",
      awardDate: "01/Feb/2025",
      status: "verified",
      createdAt: new Date()
    });
  }
  
  return certificates;
};

// Insert 50 sample certificates
db.certificates.insertMany(generateCertificates(50));

// ========================================
// 13. PAGINATION QUERY (for admin dashboard)
// ========================================
// Get page 1 (10 per page)
db.certificates.find({}).sort({ createdAt: -1 }).limit(10).skip(0);

// Get page 2 (10 per page)
db.certificates.find({}).sort({ createdAt: -1 }).limit(10).skip(10);

// ========================================
// 14. SEARCH BY DATE RANGE
// ========================================
// Certificates awarded in a specific date range
db.certificates.find({
  awardDate: {
    $gte: "01/Jan/2025",
    $lte: "28/Feb/2025"
  }
});

// ========================================
// 15. EXPORT CERTIFICATES
// ========================================
// Get all data for backup
db.certificates.find({}).toArray();

// ========================================
// NOTES FOR MONGODB ATLAS USERS:
// ========================================
/*
1. Use MongoDB Compass to run these queries visually
2. Or use MongoDB Shell in your project
3. Or use the Atlas web UI query editor

To use in Node.js:
const result = await db.collection("certificates").findOne({
  certificateNo: "20e6fee"
});
*/
