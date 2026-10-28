/**
 * Hotel Data & Default Seed Configuration
 * LuxeHorizon Resort & Hotel - Indian Luxury Sanctuaries & Destinations Edition
 * Currency: Indian Rupee (₹ INR)
 */

const DATA_VERSION = 'v2_inr_indian_resorts';

const DEFAULT_RESORTS = [
  {
    id: "udaipur-lake-palace",
    name: "LuxeHorizon Lake Palace Sanctuary",
    destination: "Udaipur, Rajasthan",
    state: "Rajasthan",
    region: "North & West",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    tag: "Royal Heritage Wonder",
    rating: 4.98,
    priceFrom: 18500,
    address: "Lake Pichola, Old City, Udaipur, Rajasthan 313001",
    description: "Floating like a white marble jewel on Lake Pichola with panoramic Aravalli mountain views, Mewari royal court hospitality, sunset boat cruises, and live sitar concerts."
  },
  {
    id: "goa-beach-resort",
    name: "LuxeHorizon Azure Sands Beachfront Resort",
    destination: "South Goa",
    state: "Goa",
    region: "Coastal West",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    tag: "Oceanfront Haven",
    rating: 4.95,
    priceFrom: 14500,
    address: "Varca Beach Road, South Goa, Goa 403721",
    description: "Sun-drenched private white sands, Portuguese-colonial pool villas, coconut groves, infinity sunsets, beach cabanas, and fresh coastal dining."
  },
  {
    id: "kerala-tea-backwaters",
    name: "LuxeHorizon Misty Tea Hills & Backwaters Retreat",
    destination: "Munnar & Alleppey, Kerala",
    state: "Kerala",
    region: "South India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    tag: "Ayurvedic Eden",
    rating: 4.96,
    priceFrom: 12500,
    address: "Chithirapuram Post, Munnar & Kumarakom Backwaters, Kerala 685565",
    description: "Nestled among emerald tea hills and tranquil palm-fringed backwaters. Features traditional wooden houseboats, organic spice gardens, and Panchakarma wellness therapies."
  },
  {
    id: "jaipur-amber-palace",
    name: "LuxeHorizon Amber Fort Heritage Haveli",
    destination: "Jaipur, Rajasthan",
    state: "Rajasthan",
    region: "North & West",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
    tag: "Maharaja Grandeur",
    rating: 4.93,
    priceFrom: 16000,
    address: "Delhi-Jaipur Highway, Kukas, Jaipur, Rajasthan 302028",
    description: "Regal Rajputana grandeur featuring carved sandstone jharokhas, marble courtyards with fountains, royal thali banquets, and heritage polo lawns."
  },
  {
    id: "rishikesh-ganges-retreat",
    name: "LuxeHorizon Divine Ganges Valley & Yoga Sanctuary",
    destination: "Rishikesh, Uttarakhand",
    state: "Uttarakhand",
    region: "Himalayas",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    tag: "Spiritual Rejuvenation",
    rating: 4.97,
    priceFrom: 13500,
    address: "Tapovan, Badrinath Road, Rishikesh, Uttarakhand 249192",
    description: "Perched along the holy emerald Ganges river with Himalayan mountain views, private Ganga Aarti ceremonies, satvik fine dining, and master-led yoga sessions."
  },
  {
    id: "coorg-plantation-estate",
    name: "LuxeHorizon Coffee Estate & Mountain Mist Resort",
    destination: "Coorg, Karnataka",
    state: "Karnataka",
    region: "South India",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    tag: "Nature & Coffee Bliss",
    rating: 4.91,
    priceFrom: 11500,
    address: "Madikeri Hill Road, Coorg, Karnataka 571201",
    description: "Set across 250 acres of aromatic Arabica coffee plantations, cardamom hills, private cottage fireplaces, Kodava feasts, and natural stream trails."
  },
  {
    id: "andaman-coral-bay",
    name: "LuxeHorizon Havelock Azure Coral Reef Sanctuary",
    destination: "Havelock Island, Andamans",
    state: "Andaman & Nicobar",
    region: "Island Paradises",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tag: "Turquoise Lagoon",
    rating: 4.99,
    priceFrom: 22000,
    address: "Radhanagar Beach No. 7, Havelock Island, Andamans 744211",
    description: "Pristine white coral beaches, bioluminescent nighttime waters, private beach villas under coconut palms, and world-class scuba diving expeditions."
  },
  {
    id: "manali-snow-chalet",
    name: "LuxeHorizon Himalayan Snow Pine Chalets",
    destination: "Solang Valley, Manali",
    state: "Himachal Pradesh",
    region: "Himalayas",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tag: "Alpine Snow Escape",
    rating: 4.94,
    priceFrom: 15500,
    address: "Solang Valley Road, Manali, Himachal Pradesh 175131",
    description: "Cedar wood chalets with heated timber flooring, private hot spring sulfur spa tubs, fireside Kashmiri Kahwa, and spectacular snow-clad mountain peaks."
  }
];

const DEFAULT_ROOMS = [
  {
    id: "royal-maharaja",
    name: "Royal Maharaja Heritage Suite",
    typeNumber: 1,
    tag: "Royal Heritage Pick",
    category: "Heritage",
    price: 24500,
    originalPrice: 29500,
    quantity: 8,
    capacity: 3,
    bedType: "1 Grand Royal King Bed + Diwan Daybed",
    size: "95 m² / 1,020 sq ft",
    view: "Palace Courtyard & Lake Pichola Panorama",
    image: "assets/ocean.jpg",
    rating: 4.97,
    reviewsCount: 142,
    suitableFor: "Couples & Heritage Connoisseurs",
    description: "Experience the timeless majesty of Rajputana royalty. Decorated with authentic gold leaf frescoes, handcrafted Jharokha window seating, Belgian cut-glass chandeliers, and a hand-carved heritage brass soaking tub. Includes personal Khansama (chef) and round-the-clock royal butler service.",
    amenities: [
      "Traditional Jharokha Balcony with Lake / Garden View",
      "Complimentary Grand Royal Thali Dining for Two",
      "24/7 Dedicated Royal Butler & Concierge",
      "Authentic Heritage Brass Soaking Tub & Steam Shower",
      "Morning Sitar Performance & Evening High-Tea",
      "Ultra High-Speed Wi-Fi 6 & 65\" 4K OLED TV",
      "Complimentary Chauffeur Airport Pick-up & Drop",
      "Pure Forest Essentials® Ayurveda Bath Luxuries"
    ]
  },
  {
    id: "kutumb-family",
    name: "Grand Kutumb Multi-Gen Family Villa",
    typeNumber: 2,
    tag: "Joint Family Favorite",
    category: "Family",
    price: 32000,
    originalPrice: 38500,
    quantity: 6,
    capacity: 6,
    bedType: "2 Master King Bedrooms + 2 Rollaway Beds",
    size: "185 m² / 1,990 sq ft",
    view: "Private Manicured Lawn & Mountain Horizon",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    rating: 4.96,
    reviewsCount: 118,
    suitableFor: "Indian Joint Families & Elders with Children",
    description: "Thoughtfully crafted for Indian multi-generational families traveling with grandparents, children, and parents. Features two interconnected en-suite master bedrooms, a private living courtyard, dedicated pooja/prayer alcove, baby milk warmer and pantry kitchen, wheelchair/elderly-accessible walk-in baths with grab rails, and complimentary driver accommodation.",
    amenities: [
      "Two Interconnected Master Bedrooms & Living Hall",
      "Dedicated In-Suite Pooja Alcove & Meditation Zone",
      "Pantry with Microwave, Milk Warmer & Filter Coffee/Chai Bar",
      "Elderly-Friendly Grab Bars & Walk-in Showers",
      "Complimentary Rollaway Cots & Baby Bedding",
      "Complimentary Driver / Valet Boarding & Meals",
      "Pure Veg / Jain In-Room Dining Available 24x7",
      "Kids Play Kit & Board Games Collection"
    ]
  },
  {
    id: "ayurveda-wellness",
    name: "Ayurvedic Wellness & Satvik Serenity Cottage",
    typeNumber: 3,
    tag: "Holistic Health & Yoga",
    category: "Wellness",
    price: 18500,
    originalPrice: 22000,
    quantity: 10,
    capacity: 2,
    bedType: "1 Organic Cotton Herbal King Bed",
    size: "72 m² / 775 sq ft",
    view: "Fragrant Spice Gardens & Sacred Stream",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    rating: 4.94,
    reviewsCount: 96,
    suitableFor: "Wellness Seekers, Yogis & Health Getaways",
    description: "A sanctuary for deep cellular restoration and mental tranquility. Features an open-air private yoga deck overlooking lotus ponds, herbal steam bath (Swedana chamber), handwoven organic linen bedding, soothing copper water dispensers, and full consultation with our resident Vaidya (Ayurvedic doctor).",
    amenities: [
      "Private Herbal Steam Bath (Swedana Chamber)",
      "Daily Doctor Consultation & Dosha Assessment",
      "All-Inclusive Satvik & Jain Gourmet Dining Menu",
      "Open-Air Yoga & Pranayama Meditation Pavilion",
      "Herbal Foot Massage upon Arrival",
      "Pure Copper Water Dispensers & Organic Tisane Bar",
      "Kama Ayurveda® Bespoke Organic Body Oils",
      "Acoustic Soundproofing & Himalayan Salt Lamps"
    ]
  },
  {
    id: "couple-pool-villa",
    name: "Royal Honeymoon Plunge-Pool Villa",
    typeNumber: 4,
    tag: "Romantic Romance Haven",
    category: "Romance",
    price: 28500,
    originalPrice: 34000,
    quantity: 6,
    capacity: 2,
    bedType: "1 Emperor King Bed with Silk Canopy",
    size: "125 m² / 1,345 sq ft",
    view: "Private Secluded Garden & Coastal Sunset",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
    rating: 4.99,
    reviewsCount: 84,
    suitableFor: "Honeymoon Couples & Anniversaries",
    description: "Designed for unforgettable romantic celebrations. Complete privacy featuring a temperature-controlled private infinity plunge pool, Mogra and fresh rose petal turndown service, candlelit five-course poolside cabana dinner, couple aromatherapy spa session, and champagne breakfast in bed.",
    amenities: [
      "Private Temperature-Controlled Plunge Pool",
      "Fresh Rose & Jasmine Petal Turndown Service",
      "Complimentary Candlelit 5-Course Poolside Dinner",
      "Couple Ayurvedic Aromatherapy Spa Treatment",
      "Chilled Sparkling Wine & Chocolate Dipped Strawberries",
      "B&O® Spatial Bluetooth Surround Sound System",
      "Sunset High-Tea Served on Private Teak Sundeck",
      "Express Private In-Villa Check-in"
    ]
  },
  {
    id: "corporate-executive",
    name: "Corporate Executive Suite with Fiber Workstation",
    typeNumber: 5,
    tag: "Business & Workation",
    category: "Business",
    price: 13500,
    originalPrice: 16500,
    quantity: 12,
    capacity: 2,
    bedType: "1 California King Bed",
    size: "68 m² / 730 sq ft",
    view: "Skyline & Landscaped Golf Greens",
    image: "assets/executive.jpg",
    rating: 4.91,
    reviewsCount: 110,
    suitableFor: "Business Leaders & Tech Workations",
    description: "Tailored for India's corporate leaders, startup founders, and executives. Equipped with ultra-fast 1 Gbps dedicated fiber Wi-Fi, an ergonomic Herman Miller Aeron chair, dual 27\" 4K monitors, soundproof video conference alcove, express 2-hour suit pressing, and complimentary VIP Club Lounge access.",
    amenities: [
      "Dedicated 1 Gbps Fiber Wi-Fi & Multi-Port Hub",
      "Herman Miller Ergonomic Workstation & 4K Monitor",
      "VIP Club Lounge Privileges & Evening Cocktail Hour",
      "Express 2-Hour Laundry & Garment Pressing",
      "Soundproof In-Suite Video Call / Zoom Pod",
      "South Indian Filter Coffee & Nespresso® Station",
      "Complimentary Chauffeur Airport Drop-off",
      "Smart Interactive 55\" OLED Presentation Screen"
    ]
  },
  {
    id: "deluxe-family",
    name: "Deluxe Comfort Family Room",
    typeNumber: 6,
    tag: "Best Value Family Stay",
    category: "Family",
    price: 8500,
    originalPrice: 11000,
    quantity: 18,
    capacity: 4,
    bedType: "2 Queen Plush Beds",
    size: "52 m² / 560 sq ft",
    view: "Botanical Garden & Resort Pool",
    image: "assets/deluxe.jpg",
    rating: 4.88,
    reviewsCount: 195,
    suitableFor: "Families with Children & Leisure Travellers",
    description: "An elegant, highly popular sanctuary offering unbeatable comfort for modern Indian families. Features two plush queen beds, artisanal Masala Chai and Madras filter coffee bar, spacious bathroom with rain shower, and complimentary lavish Indian and continental buffet breakfast for the whole family.",
    amenities: [
      "Two Queen Beds with Hypoallergenic Linens",
      "Complimentary Multi-Cuisine Breakfast Buffet",
      "24/7 Masala Chai, Green Tea & Filter Coffee Bar",
      "55\" Smart LED TV with OTT & Kids Channels",
      "Italian Marble Bathroom with Walk-in Rain Shower",
      "Children's Welcome Treat & Board Game Rental",
      "Complimentary High-Speed Wi-Fi for All Devices",
      "Mini Fridge & In-Room Electronic Safe"
    ]
  },
  {
    id: "bridal-wedding",
    name: "Destination Wedding & Bridal Haven Suite",
    typeNumber: 7,
    tag: "Wedding & Bridal Salon",
    category: "Wedding",
    price: 45000,
    originalPrice: 54000,
    quantity: 4,
    capacity: 5,
    bedType: "1 Grand Bridal King Suite + Daybed",
    size: "165 m² / 1,775 sq ft",
    view: "Grand Palace Lawn & Wedding Mandap View",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    rating: 4.98,
    reviewsCount: 76,
    suitableFor: "Brides, Grooms & Wedding Families",
    description: "Specifically created for Indian weddings, Sangeet parties, and destination celebrations. Features a full-length illuminated tri-fold 360° bridal vanity mirror, professional makeup artist chairs, steam station for heavy bridal lehengas and sherwanis, an adjoining bridesmaids glam salon, and luggage room for wedding trousseaus.",
    amenities: [
      "Illuminated 360° Tri-Fold Bridal Vanity Mirrors",
      "Heavy Wedding Lehenga & Sherwani Garment Steamer",
      "Adjoining Glam Salon for Hair & Makeup Artists",
      "Spacious Wardrobes for 12+ Trousseau Outfits",
      "Dedicated Wedding Butler & Concierge Liaison",
      "Pre-Wedding High-Tea & Finger Foods Platter",
      "Soundproof Music System for Sangeet Rehearsals",
      "In-Suite Ironing & Chauffeur Coordination"
    ]
  },
  {
    id: "presidential-penthouse",
    name: "Presidential Lake & Ocean Palace Penthouse",
    typeNumber: 8,
    tag: "Ultra-Luxury Penthouse",
    category: "Presidential",
    price: 75000,
    originalPrice: 90000,
    quantity: 3,
    capacity: 8,
    bedType: "3 Master King Suites + Grand Living Salon",
    size: "320 m² / 3,450 sq ft",
    view: "360° Panoramic Lake & Mountain Horizon",
    image: "assets/presidential.jpg",
    rating: 5.0,
    reviewsCount: 52,
    suitableFor: "VIP Delegations, Royalty & Grand Celebrations",
    description: "The supreme pinnacle of luxury living in India. A palatial duplex penthouse featuring three master en-suite bedrooms, crystal chandeliers, a private heated rooftop sky jacuzzi, private master chef on demand with tailored Pure Veg/Jain/Mughlai menus, Steinway grand piano, and round-trip Mercedes-Maybach airport transfers.",
    amenities: [
      "Rooftop Sky Terrace with Heated Infinity Jacuzzi",
      "Dedicated Private Master Chef for Custom Gourmet Banquets",
      "Complimentary Mercedes-Maybach Airport Transfers",
      "Round-the-clock Senior Butler & Hospitality Valet",
      "Three Lavish En-Suite Bedrooms with Jacuzzi Tubs",
      "Steinway Grand Piano & Private Cocktail Salon",
      "VIP Fast-Track Check-in & Priority Event Bookings",
      "Unlimited Bespoke Ayurvedic Therapies for Guests"
    ]
  }
];

// Helper to get formatted relative dates (YYYY-MM-DD)
function getRelativeDateStr(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

const DEFAULT_BOOKINGS = [
  {
    id: "BK-89210",
    guestName: "Vikramaditya Singhania",
    guestEmail: "vikram.singhania@luxeguest.in",
    guestPhone: "+91 98201 44521",
    resortId: "udaipur-lake-palace",
    resortName: "LuxeHorizon Lake Palace Sanctuary, Udaipur",
    roomTypeId: "royal-maharaja",
    roomName: "Royal Maharaja Heritage Suite",
    checkIn: getRelativeDateStr(6), // 6 days ahead -> modifiable/cancellable!
    checkOut: getRelativeDateStr(9),
    guests: 2,
    nights: 3,
    roomPrice: 24500,
    totalPrice: 73500,
    taxes: 8820, // 12% GST
    grandTotal: 82320,
    mealPlan: "Royal Gourmet Thali & Breakfast (AP)",
    paymentStatus: "Paid (UPI / HDFC Infinia)",
    status: "Confirmed",
    specialRequests: "High floor facing Lake Pichola, evening sitar high-tea setup, Pure Vegetarian food.",
    bookedOn: getRelativeDateStr(-2),
    cancellationDeadline: getRelativeDateStr(3)
  },
  {
    id: "BK-43901",
    guestName: "Vikramaditya Singhania",
    guestEmail: "vikram.singhania@luxeguest.in",
    guestPhone: "+91 98201 44521",
    resortId: "kerala-tea-backwaters",
    resortName: "LuxeHorizon Misty Tea Hills & Backwaters Retreat, Kerala",
    roomTypeId: "ayurveda-wellness",
    roomName: "Ayurvedic Wellness & Satvik Serenity Cottage",
    checkIn: getRelativeDateStr(2), // 2 days ahead -> Locked (< 3 days rule)!
    checkOut: getRelativeDateStr(4),
    guests: 2,
    nights: 2,
    roomPrice: 18500,
    totalPrice: 37000,
    taxes: 4440,
    grandTotal: 41440,
    mealPlan: "Satvik Wellness Meal Plan",
    paymentStatus: "Paid (NetBanking / ICICI)",
    status: "Confirmed",
    specialRequests: "Doctor dosha consultation on arrival day, morning herbal tisane.",
    bookedOn: getRelativeDateStr(-1),
    cancellationDeadline: getRelativeDateStr(-1)
  },
  {
    id: "BK-11048",
    guestName: "Vikramaditya Singhania",
    guestEmail: "vikram.singhania@luxeguest.in",
    guestPhone: "+91 98201 44521",
    resortId: "goa-beach-resort",
    resortName: "LuxeHorizon Azure Sands Beachfront Resort, South Goa",
    roomTypeId: "kutumb-family",
    roomName: "Grand Kutumb Multi-Gen Family Villa",
    checkIn: getRelativeDateStr(-15),
    checkOut: getRelativeDateStr(-11),
    guests: 5,
    nights: 4,
    roomPrice: 32000,
    totalPrice: 128000,
    taxes: 15360,
    grandTotal: 143360,
    mealPlan: "Family Feast Plan (MAP)",
    paymentStatus: "Paid (RuPay Select Credit Card)",
    status: "Completed",
    specialRequests: "Ground floor accessible room for senior grandparents, extra rollaway cots.",
    bookedOn: getRelativeDateStr(-28),
    cancellationDeadline: getRelativeDateStr(-18)
  }
];

const DEFAULT_USER = {
  name: "Vikramaditya Singhania",
  email: "vikram.singhania@luxeguest.in",
  phone: "+91 98201 44521",
  address: "Altamount Road, Cumballa Hill, South Mumbai, Maharashtra 400026",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
  memberTier: "Kohinoor Platinum Elite",
  loyaltyPoints: 48500,
  preferredBed: "Emperor King Bed",
  dietaryPreferences: "Pure Vegetarian, Satvik on Tuesdays, Cardamom Masala Chai",
  passportNumber: "IN88492011",
  emergencyContact: "Ananya Singhania (+91 98201 44522)"
};

const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    roomTypeId: "royal-maharaja",
    guestName: "Maharani Gayatri Rathore",
    rating: 5,
    date: "October 18, 2026",
    comment: "The Jharokha views overlooking Lake Pichola in Udaipur were spellbinding! The authentic Mewari royal thali, sitar performances at dusk, and attentive butler service made our anniversary deeply special."
  },
  {
    id: "rev-2",
    roomTypeId: "kutumb-family",
    guestName: "Rajesh & Sunita Agarwal",
    rating: 5,
    date: "October 08, 2026",
    comment: "Traveling with our 78-year-old parents and two young kids has never been so seamless. The ground floor layout, grab bars in the bath, in-suite pooja corner, and driver accommodation were thoughtful touches."
  },
  {
    id: "rev-3",
    roomTypeId: "ayurveda-wellness",
    guestName: "Dr. Arvind Swaminathan",
    rating: 5,
    date: "September 24, 2026",
    comment: "The Swedana herbal steam room and personalized Satvik dietary menu revived my energy completely. Authentic Kerala Panchakarma therapies conducted by knowledgeable Ayurvedic doctors."
  },
  {
    id: "rev-4",
    roomTypeId: "bridal-wedding",
    guestName: "Pooja Malhotra & Kabir Sethi",
    rating: 5,
    date: "August 30, 2026",
    comment: "The 360° illuminated bridal vanity mirrors and heavy lehenga steaming service saved our wedding day prep! Our bridal party felt like royalty in the private glam lounge."
  }
];

const DEFAULT_STATIC_PAGES = {
  roomIntro: {
    title: "Curated Indian Sanctuaries & Accommodation Guide",
    subtitle: "Eight Distinct Categories Tailored for Modern Indian Families, Royal Heritage & Wellness",
    content: "LuxeHorizon presents eight carefully calibrated sanctuary categories designed to cater to Indian travelers seeking royal heritage, multi-generational family comfort, pure-vegetarian and satvik dining, sacred wellness retreats, high-productivity business, and grand destination wedding celebrations across premier Indian destinations.",
    types: [
      {
        name: "1. Royal Maharaja Heritage Suite",
        idealFor: "Heritage Connoisseurs & Romantic Escapes",
        summary: "95 m² royal suite with handcrafted Jharokhas, antique brass soaking tub, authentic Royal Thali dinners, and 24/7 dedicated Khansama & royal butler service."
      },
      {
        name: "2. Grand Kutumb Multi-Gen Family Villa",
        idealFor: "Indian Joint Families (Parents, Grandparents & Kids)",
        summary: "185 m² villa with two interconnected master suites, pooja/meditation corner, baby milk pantry, elderly-accessible bathrooms, and complimentary driver accommodation."
      },
      {
        name: "3. Ayurvedic Wellness & Satvik Serenity Cottage",
        idealFor: "Yoga, Detox & Health Conscious Guests",
        summary: "72 m² haven featuring private Swedana herbal steam bath, open-air yoga deck, resident Ayurvedic Vaidya consultations, and custom Satvik/Jain culinary programs."
      },
      {
        name: "4. Royal Honeymoon Plunge-Pool Villa",
        idealFor: "Newlyweds & Romantic Anniversaries",
        summary: "125 m² private sanctuary with heated infinity plunge pool, Mogra & rose petal turndown, candlelight cabana dinners, and couple aroma spa therapies."
      },
      {
        name: "5. Corporate Executive Suite with Fiber Workstation",
        idealFor: "CXOs, Founders & Workations",
        summary: "68 m² ergonomic executive hub with 1 Gbps fiber Wi-Fi, Herman Miller chair, Zoom conference pod, 2-hour suit pressing, and airport chauffeur transfer."
      },
      {
        name: "6. Deluxe Comfort Family Room",
        idealFor: "Small Families & Leisure Travelers",
        summary: "52 m² room with dual Queen beds, morning Masala Chai and Madras filter coffee bar, 55\" Smart TV, and complimentary lavish Indian breakfast buffet."
      },
      {
        name: "7. Destination Wedding & Bridal Haven Suite",
        idealFor: "Brides, Grooms & Wedding Families",
        summary: "165 m² suite featuring 360° illuminated bridal vanity mirrors, lehenga/sherwani steam station, adjoining glam salon, and dedicated wedding butler."
      },
      {
        name: "8. Presidential Lake & Ocean Palace Penthouse",
        idealFor: "VIP Dignitaries & Grand Celebrations",
        summary: "320 m² duplex penthouse with private rooftop heated jacuzzi, dedicated master chef, Steinway grand piano, and luxury Mercedes-Maybach airport transit."
      }
    ]
  },
  about: {
    title: "About LuxeHorizon Resort & Hotel India",
    tagline: "Atithi Devo Bhava — A Legacy of Timeless Hospitality Across India",
    story: "Founded on the eternal Indian philosophy of 'Atithi Devo Bhava' (Guest is Divine), LuxeHorizon curates landmark luxury sanctuaries across India's most breathtaking landscapes—from the palatial waters of Udaipur and golden beaches of Goa, to the misty tea valleys of Munnar and sacred peaks of Rishikesh.",
    mission: "Our mission is to orchestrate unforgettable moments of peace, cultural pride, and sensory delight, while upholding the highest standards of authentic Indian warmth, sustainable architecture, and culinary excellence.",
    highlights: [
      { stat: "8", label: "Premier Luxury Destinations Across India" },
      { stat: "8", label: "Specialized Accommodation Categories" },
      { stat: "99.6%", label: "Guest Satisfaction & Return Loyalty Rate" },
      { stat: "100%", label: "Solar-Powered, Single-Use Plastic Free & Green Globe Certified" }
    ],
    values: [
      "Authentic Indian Hospitality: Anticipatory care with respectful warmth rooted in Atithi Devo Bhava.",
      "Pure Vegetarian & Regional Culinary Art: Specialized master chefs for Rajasthani, Mughlai, South Indian, Jain, and Coastal delicacies.",
      "Multi-Generational Harmony: Complete comfort for all age groups, from senior grandparents to toddlers.",
      "Cultural & Ecological Stewardship: Preserving Indian royal heritage, local handicrafts, and regional ecology."
    ]
  },
  contact: {
    title: "Central Concierge & Indian Reservations Desk",
    subtitle: "Our 24/7 dedicated concierge is at your service for room bookings, customized thali menus, and airport transfers.",
    address: "LuxeHorizon Lake Palace Sanctuary, Lake Pichola, Udaipur, Rajasthan 313001, India",
    phone: "Toll-Free (India): 1800 258 8900 / Direct: +91 (294) 243 8900",
    email: "concierge@luxehorizon.in",
    reservationsEmail: "reservations@luxehorizon.in",
    receptionHours: "Open 24 Hours Daily (365 Days a Year)",
    conciergeDesk: "Lobby Heritage Pavilion — Dedicated assistance for Udaipur boat charters, temple visits, and luxury chauffeur fleet.",
    emergencyLine: "+91 98200 99888"
  },
  faq: {
    title: "Frequently Asked Questions (Guest Helpdesk)",
    subtitle: "Everything You Need to Know Regarding Bookings, Policies, GST Invoices, and Amenities",
    items: [
      {
        q: "What is the policy for modifying or cancelling a hotel room reservation?",
        a: "Guests can modify or cancel any room booking without any penalty up to 3 days (72 hours) prior to their scheduled check-in date. Inside the 3-day window, reservations become guaranteed and locked to preserve room allocations. Hotel administrators possess system override capabilities for emergency modifications."
      },
      {
        q: "Are all prices displayed in Indian Rupees (₹ INR) including GST?",
        a: "Yes! All rates are quoted in Indian Rupees (₹). During booking, you will see the exact room base tariff and the applicable hospitality GST (12% for luxury stays). An official GST tax invoice with our GSTIN is generated for your accounts and business tax input credit."
      },
      {
        q: "Do you cater to Pure Vegetarian and Jain dietary requirements?",
        a: "Absolutely. Every LuxeHorizon resort features a dedicated pure-vegetarian kitchen section overseen by master chefs. We prepare customized Jain food (strictly no onion, garlic, or root vegetables) and Satvik fasting meals upon request without extra charge."
      },
      {
        q: "Is driver accommodation and food provided?",
        a: "Yes, complimentary clean driver dormitory accommodation and nutritious staff meals are available on-site at all our resort properties for guests traveling with their personal chauffeurs."
      },
      {
        q: "Can we request extra beds and cots for children or senior grandparents?",
        a: "Yes! Children under 10 years stay complimentary with existing bedding. For extra adults or seniors, comfortable rollaway beds and hypoallergenic bedding can be added easily during booking or via the concierge desk."
      },
      {
        q: "What payment methods are supported on the booking platform?",
        a: "We accept all Indian UPI apps (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, Mastercard, American Express cards, NetBanking across all major Indian banks (HDFC, ICICI, SBI, Axis), and instant bank wire."
      }
    ]
  },
  travelShipping: {
    title: "Indian Travel, Sightseeing & Luggage Guide",
    subtitle: "Chauffeur Airport Transfers, Curated Indian Heritage Tours, and Doorstep Luggage Courier Services",
    airportTransfers: {
      title: "Chauffeur Fleet & Airport Pick-Up Services",
      description: "Our private fleet operates round-the-clock transfers from all nearest airports (Udaipur UDR, Goa GOI/GOX, Cochin COK, Jaipur JAI, Dehradun DED).",
      options: [
        "Mercedes-Benz / Audi Luxury Sedan: ₹3,500 one-way (Complimentary for Presidential & Royal Suites)",
        "Premium Toyota Innova Crysta / Hycross: ₹2,800 one-way (Ideal for families & luggage)",
        "Direct Cliffside / Island Helicopter Transfer: ₹45,000 per charter"
      ]
    },
    localAttractions: {
      title: "Curated Local Excursions & Cultural Experiences",
      description: "Immerse in India's richest cultural, natural, and spiritual wonders:",
      places: [
        "Royal Lake Pichola Sunset Shikara Boat Cruise with Live Sitar (Udaipur)",
        "Private Evening Ganga Aarti & Sacred Vedic Blessing with High Priest (Rishikesh)",
        "Spice Plantation Walk & Kalaripayattu Martial Art Performance (Munnar/Kerala)",
        "Heritage Amber Fort Royal Elephant & Jeep Safari with Historian (Jaipur)",
        "Scuba Diving & Coral Reef Snorkeling at Elephant Beach (Havelock Island)"
      ]
    },
    luggageShipping: {
      title: "Doorstep Luggage Forwarding & Blue Dart Courier",
      description: "Travel light and stress-free across India. LuxeHorizon partners with Blue Dart Express and DHL to securely transport your heavy wedding trousseaus and suitcases directly from your home to your suite prior to arrival.",
      guidelines: [
        "Doorstep Pick-Up: Arrange pick-up with our concierge desk at least 4 business days before your scheduled check-in.",
        "Secure Storage: Your luggage is stored in our monitored climate-controlled vault and placed in your suite before you arrive.",
        "Post-Stay Shipping: We securely pack, weigh, and courier your acquired handicrafts, teas, spices, and souvenirs directly to your home address upon check-out."
      ]
    }
  },
  privacy: {
    title: "Privacy Policy, Data Protection & Guest Rights",
    lastUpdated: "October 24, 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "When you register an account, book a room, or communicate with LuxeHorizon, we collect personal information including your full name, email address, mobile number, government ID identification (Aadhaar / Voter ID / Passport as mandated by Indian hospitality law), and stay preferences."
      },
      {
        heading: "2. How We Use Your Data",
        body: "Your information is used strictly to process room reservations, securely execute payments, provide personalized concierge assistance, dispatch digital booking vouchers and GST tax invoices, and maintain regulatory hotel guest registers (Form F)."
      },
      {
        heading: "3. 3-Day Modification & Cancellation Rule",
        body: "Reservations may be modified or cancelled free of charge up to 72 hours (3 days) before your scheduled arrival date. Within 72 hours, room allocations are locked to ensure operational readiness, unless authorized by Hotel Administration."
      },
      {
        heading: "4. Data Security & Payment Gateway Encryption",
        body: "All online transactions through UPI, cards, and NetBanking are protected using 256-bit SSL encryption and RBI-compliant payment gateway tokenization. LuxeHorizon does not store unencrypted credit card numbers or banking PINs."
      },
      {
        heading: "5. Guest Rights & Data Export",
        body: "You hold the right to access, update, export, or request deletion of your personal profile data at any time via your user dashboard."
      }
    ]
  }
};
