export type HistoryRecord = {
  id: number;
  businessName: string;
  businessOwner: string;
  amount: string;
  paymentPeriod: string;
  date: string;
  category: string;
  status: "approved" | "pending" | "declined"; // Restrict status to specific values
};

export const historyData: HistoryRecord[] = [
  {
    id: 1,
    businessName: "Janna's Gourmet Bistro",
    businessOwner: "Janna Almuqaisib",
    amount: "2,400 KWD",
    paymentPeriod: "3 months",
    date: "Jan 22, 2025",
    category: "Restaurant",
    status: "approved",
  },
  {
    id: 2,
    businessName: "Fajr's Fashion Finds",
    businessOwner: "Fajr Alhusaini",
    amount: "1,500 KWD",
    paymentPeriod: "2 years",
    date: "Jan 21, 2025",
    category: "E-commerce",
    status: "pending",
  },
  {
    id: 3,
    businessName: "Crafts by Mohammad",
    businessOwner: "Mohammad Baqer",
    amount: "3,100 KWD",
    paymentPeriod: "1 year",
    date: "Jan 21, 2025",
    category: "Handmade Crafts",
    status: "declined",
  },
  {
    id: 4,
    businessName: "Tech Solutions Co.",
    businessOwner: "Ahmed Alshaya",
    amount: "5,200 KWD",
    paymentPeriod: "6 months",
    date: "Feb 10, 2025",
    category: "Technology",
    status: "approved",
  },
  {
    id: 5,
    businessName: "Green Earth Landscaping",
    businessOwner: "Sara Almutairi",
    amount: "1,800 KWD",
    paymentPeriod: "1 year",
    date: "Feb 5, 2025",
    category: "Landscaping",
    status: "pending",
  },
  {
    id: 6,
    businessName: "Skyline Architects",
    businessOwner: "Ali Alhajeri",
    amount: "7,500 KWD",
    paymentPeriod: "3 years",
    date: "Mar 2, 2025",
    category: "Architecture",
    status: "approved",
  },
  {
    id: 7,
    businessName: "Fashion Forward",
    businessOwner: "Layla Hassan",
    amount: "3,300 KWD",
    paymentPeriod: "6 months",
    date: "Mar 5, 2025",
    category: "E-commerce",
    status: "approved",
  },
  {
    id: 8,
    businessName: "Smart Tech Innovations",
    businessOwner: "Hamad Al Khalid",
    amount: "9,000 KWD",
    paymentPeriod: "2 years",
    date: "Apr 15, 2025",
    category: "Technology",
    status: "pending",
  },
  {
    id: 9,
    businessName: "Gourmet Delights",
    businessOwner: "Reem Al Sabah",
    amount: "4,500 KWD",
    paymentPeriod: "1 year",
    date: "May 1, 2025",
    category: "Restaurant",
    status: "approved",
  },
  {
    id: 10,
    businessName: "Artisan Wonders",
    businessOwner: "Zainab Al Najjar",
    amount: "2,200 KWD",
    paymentPeriod: "8 months",
    date: "Jun 10, 2025",
    category: "Handmade Crafts",
    status: "declined",
  },

  // Additional 20+ records
  {
    id: 11,
    businessName: "TechFix Solutions",
    businessOwner: "Omar Al Rashid",
    amount: "6,800 KWD",
    paymentPeriod: "2 years",
    date: "Jul 5, 2025",
    category: "Technology",
    status: "approved",
  },
  {
    id: 12,
    businessName: "Luxury Home Decor",
    businessOwner: "Hessa Al Mutawa",
    amount: "2,900 KWD",
    paymentPeriod: "10 months",
    date: "Aug 12, 2025",
    category: "Home Decor",
    status: "pending",
  },
  {
    id: 13,
    businessName: "Modern Auto Repairs",
    businessOwner: "Bader Al Kanderi",
    amount: "7,100 KWD",
    paymentPeriod: "3 years",
    date: "Sep 8, 2025",
    category: "Automotive",
    status: "declined",
  },
  {
    id: 14,
    businessName: "NextGen Robotics",
    businessOwner: "Fatima Al Zayani",
    amount: "12,000 KWD",
    paymentPeriod: "5 years",
    date: "Oct 1, 2025",
    category: "Technology",
    status: "approved",
  },
  {
    id: 15,
    businessName: "Trendsetters Boutique",
    businessOwner: "Aisha Al Fayez",
    amount: "4,700 KWD",
    paymentPeriod: "1.5 years",
    date: "Nov 17, 2025",
    category: "E-commerce",
    status: "pending",
  },
  {
    id: 16,
    businessName: "Fast Courier Services",
    businessOwner: "Saleh Al Awadhi",
    amount: "5,500 KWD",
    paymentPeriod: "2 years",
    date: "Dec 5, 2025",
    category: "Logistics",
    status: "approved",
  },
  {
    id: 17,
    businessName: "Organic Farms Co.",
    businessOwner: "Khaled Al Essa",
    amount: "3,400 KWD",
    paymentPeriod: "1 year",
    date: "Jan 9, 2026",
    category: "Agriculture",
    status: "declined",
  },
  {
    id: 18,
    businessName: "The Artisan Bakery",
    businessOwner: "Rana Al Majed",
    amount: "1,900 KWD",
    paymentPeriod: "6 months",
    date: "Feb 20, 2026",
    category: "Restaurant",
    status: "approved",
  },
  {
    id: 19,
    businessName: "Elite Gym & Fitness",
    businessOwner: "Hadi Al Mubarak",
    amount: "4,300 KWD",
    paymentPeriod: "2 years",
    date: "Mar 11, 2026",
    category: "Fitness",
    status: "pending",
  },
  {
    id: 20,
    businessName: "Smart Pet Supplies",
    businessOwner: "Dana Al Fadhel",
    amount: "3,800 KWD",
    paymentPeriod: "1 year",
    date: "Apr 8, 2026",
    category: "Pet Care",
    status: "approved",
  },
  {
    id: 21,
    businessName: "Digital Marketing Pros",
    businessOwner: "Samer Al Sayegh",
    amount: "6,600 KWD",
    paymentPeriod: "2.5 years",
    date: "May 21, 2026",
    category: "Marketing",
    status: "declined",
  },
  {
    id: 22,
    businessName: "Modern Living Furniture",
    businessOwner: "Yasmine Al Bahar",
    amount: "5,200 KWD",
    paymentPeriod: "2 years",
    date: "Jun 13, 2026",
    category: "Home Decor",
    status: "approved",
  },
  {
    id: 23,
    businessName: "GameHub Esports",
    businessOwner: "Nasser Al Musallam",
    amount: "8,500 KWD",
    paymentPeriod: "3 years",
    date: "Jul 19, 2026",
    category: "Gaming",
    status: "pending",
  },
  {
    id: 24,
    businessName: "Cityscape Real Estate",
    businessOwner: "Faisal Al Harbi",
    amount: "9,800 KWD",
    paymentPeriod: "5 years",
    date: "Aug 10, 2026",
    category: "Real Estate",
    status: "approved",
  },
  {
    id: 25,
    businessName: "Medical Innovations Lab",
    businessOwner: "Laila Al Mutairi",
    amount: "11,000 KWD",
    paymentPeriod: "4 years",
    date: "Sep 7, 2026",
    category: "Healthcare",
    status: "approved",
  },
  // 60+ Additional Entries
  {
    id: 26,
    businessName: "Artisan Woodworks",
    businessOwner: "Hassan Al Mubarak",
    amount: "10,829 KWD",
    paymentPeriod: "36 months",
    date: "Dec 18, 2025",
    category: "Marketing",
    status: "pending",
  },
  {
    id: 27,
    businessName: "Speedy Auto Repairs",
    businessOwner: "Nasser Al Bahar",
    amount: "9,169 KWD",
    paymentPeriod: "48 months",
    date: "Sep 10, 2025",
    category: "Technology",
    status: "pending",
  },
  {
    id: 28,
    businessName: "Fashion Express",
    businessOwner: "Dana Al Mutawa",
    amount: "6,898 KWD",
    paymentPeriod: "50 months",
    date: "May 26, 2025",
    category: "Handmade Crafts",
    status: "approved",
  },
  {
    id: 29,
    businessName: "Green Tech Solutions",
    businessOwner: "Mohammad Al Salim",
    amount: "8,008 KWD",
    paymentPeriod: "58 months",
    date: "Dec 25, 2025",
    category: "Healthcare",
    status: "approved",
  },
  {
    id: 30,
    businessName: "Smart IT Solutions",
    businessOwner: "Hadi Al Fayez",
    amount: "10,306 KWD",
    paymentPeriod: "34 months",
    date: "Sep 10, 2025",
    category: "Fitness",
    status: "approved",
  },
  {
    id: 31,
    businessName: "Luxury Watches",
    businessOwner: "Fatima Al Harbi",
    amount: "4,909 KWD",
    paymentPeriod: "12 months",
    date: "Nov 1, 2025",
    category: "Retail",
    status: "declined",
  },
  {
    id: 32,
    businessName: "Solar Power Inc.",
    businessOwner: "Ahmed Al Rashid",
    amount: "11,500 KWD",
    paymentPeriod: "60 months",
    date: "Aug 15, 2025",
    category: "Technology",
    status: "approved",
  },
  {
    id: 33,
    businessName: "Book Haven",
    businessOwner: "Yasmine Al Sabah",
    amount: "2,300 KWD",
    paymentPeriod: "9 months",
    date: "Jul 18, 2025",
    category: "Retail",
    status: "pending",
  },
  {
    id: 34,
    businessName: "Digital Wizards",
    businessOwner: "Sara Al Majed",
    amount: "7,700 KWD",
    paymentPeriod: "24 months",
    date: "Mar 30, 2025",
    category: "Marketing",
    status: "approved",
  },
  {
    id: 35,
    businessName: "Gaming Universe",
    businessOwner: "Omar Al Fadhel",
    amount: "9,900 KWD",
    paymentPeriod: "36 months",
    date: "Feb 14, 2025",
    category: "Gaming",
    status: "declined",
  },
  {
    id: 36,
    businessName: "Urban Coffee Hub",
    businessOwner: "Layla Al Hadi",
    amount: "5,400 KWD",
    paymentPeriod: "18 months",
    date: "Jan 7, 2026",
    category: "Restaurant",
    status: "approved",
  },
  {
    id: 37,
    businessName: "Wellness & Spa Center",
    businessOwner: "Bader Al Khalid",
    amount: "6,300 KWD",
    paymentPeriod: "24 months",
    date: "Apr 25, 2025",
    category: "Healthcare",
    status: "pending",
  },
  {
    id: 38,
    businessName: "Home Appliance Experts",
    businessOwner: "Aisha Al Musallam",
    amount: "4,200 KWD",
    paymentPeriod: "16 months",
    date: "May 3, 2025",
    category: "Retail",
    status: "approved",
  },
  {
    id: 39,
    businessName: "Organic Food Mart",
    businessOwner: "Rana Al Sayegh",
    amount: "3,900 KWD",
    paymentPeriod: "14 months",
    date: "Aug 9, 2025",
    category: "E-commerce",
    status: "approved",
  },
  {
    id: 40,
    businessName: "Luxury Interior Designs",
    businessOwner: "Hassan Al Mubarak",
    amount: "7,500 KWD",
    paymentPeriod: "30 months",
    date: "Jun 27, 2025",
    category: "Home Decor",
    status: "declined",
  },
  {
    id: 41,
    businessName: "Modern Auto Repairs",
    businessOwner: "Zainab Al Essa",
    amount: "9,700 KWD",
    paymentPeriod: "40 months",
    date: "Jul 21, 2025",
    category: "Automotive",
    status: "approved",
  },
  {
    id: 42,
    businessName: "Tech Repair Hub",
    businessOwner: "Fatima Al Harbi",
    amount: "5,800 KWD",
    paymentPeriod: "20 months",
    date: "Dec 5, 2025",
    category: "Technology",
    status: "pending",
  },
  {
    id: 43,
    businessName: "Smart Home Innovations",
    businessOwner: "Nasser Al Bahar",
    amount: "8,200 KWD",
    paymentPeriod: "48 months",
    date: "Feb 2, 2026",
    category: "Technology",
    status: "approved",
  },
  {
    id: 44,
    businessName: "Elite Catering",
    businessOwner: "Ahmed Al Rashid",
    amount: "4,100 KWD",
    paymentPeriod: "12 months",
    date: "Nov 19, 2025",
    category: "Restaurant",
    status: "pending",
  },
];

export default historyData;
