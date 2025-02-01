const scholarshipData = {
  scholarshipTypes: [
    {
      title: "মেধা বৃত্তি",
      coverage: "১০০%",
      requirements: ["জিপিএ ৫.০০", "স্কুলের নিয়মিত ছাত্র", "ভালো আচরণ"],
      duration: "বাৎসরিক",
    },
    {
      title: "অর্ধ-মেধা বৃত্তি",
      coverage: "৫০%",
      requirements: ["জিপিএ ৪.৫০+", "স্কুলের নিয়মিত ছাত্র", "ভালো আচরণ"],
      duration: "বাৎসরিক",
    },
    {
      title: "বিশেষ বৃত্তি",
      coverage: "৭৫%",
      requirements: ["প্রতিভাবান শিক্ষার্থী", "বিশেষ প্রতিভা", "স্কুল প্রতিনিধিত্ব"],
      duration: "বাৎসরিক",
    }
  ],
  requiredDocuments: [
    {
      name: "শিক্ষাগত সনদ",
      description: "সর্বশেষ শিক্ষাবর্ষের মার্কশীট",
    },
    {
      name: "আয়ের প্রমাণপত্র",
      description: "পিতা-মাতার আয়ের প্রমাণপত্র",
    },
    {
      name: "প্রত্যয়নপত্র",
      description: "বর্তমান শিক্ষা প্রতিষ্ঠানের প্রত্যয়নপত্র",
    },
    {
      name: "অন্যান্য কাগজপত্র",
      description: "জাতীয় পরিচয়পত্র/জন্মনিবন্ধন",
    }
  ],
  deadlines: [
    {
      title: "আবেদনের শুরু",
      description: "১ জুন, ২০২৪",
      icon: "Calendar"
    },
    {
      title: "শেষ তারিখ",
      description: "৩০ জুন, ২০২৪",
      icon: "FileText"
    },
    {
      title: "ফলাফল",
      description: "১৫ জুলাই, ২০২৪",
      icon: "File"
    }
  ],
  pdfUrl: "/assets/files/Profile-AP5-06.12.24-new-address.pdf",
  academicYear: "2024-2025"
};

module.exports = scholarshipData; 