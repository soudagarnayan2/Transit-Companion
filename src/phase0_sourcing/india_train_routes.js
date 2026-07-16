/**
 * All-India Train Routes (Phase 0 — Curated)
 * --------------------------------------------
 * Major Indian Railways express, superfast, and premium services.
 * Covers: Rajdhani · Shatabdi · Vande Bharat · Duronto · Garib Rath ·
 *         Sampark Kranti · Jan Shatabdi · Superfast Express · Tejas ·
 *         Humsafar · Antyodaya · and key regional Mail/Express trains.
 *
 * Source: Indian Railways — NTES / National Train Enquiry System
 */

const INDIA_TRAIN_ROUTES = [

  // ══════════════════════════════════════════════════════
  // VANDE BHARAT EXPRESS (Semi-High Speed — 160 km/h)
  // ══════════════════════════════════════════════════════
  { trainNo:'22436', name:'New Delhi–Varanasi Vande Bharat', type:'VANDE_BHARAT', from:'New Delhi',       to:'Varanasi',            distKm:759, durationHr:8.5,  fareINR:{chair:1400, exec:2600}, zone:'NCR', color:'#003580', frequency:'Daily',    dep:'06:00', arr:'14:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'22439', name:'New Delhi–Amb Andaura Vande Bharat', type:'VANDE_BHARAT', from:'New Delhi',    to:'Amb Andaura (HP)',     distKm:435, durationHr:5.5,  fareINR:{chair:1200, exec:2200}, zone:'NR', color:'#003580', frequency:'Daily',    dep:'05:30', arr:'11:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'20901', name:'Mumbai Central–Gandhinagar Vande Bharat', type:'VANDE_BHARAT', from:'Mumbai Central', to:'Gandhinagar Capital', distKm:490, durationHr:5.5,  fareINR:{chair:1200, exec:2300}, zone:'WR', color:'#003580', frequency:'Daily',    dep:'06:10', arr:'11:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'20631', name:'Chennai–Mysuru Vande Bharat', type:'VANDE_BHARAT', from:'Chennai Central',  to:'Mysuru',              distKm:498, durationHr:6.0,  fareINR:{chair:1250, exec:2300}, zone:'SR', color:'#003580', frequency:'Daily',    dep:'05:50', arr:'11:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'20634', name:'Bengaluru–Chennai Vande Bharat', type:'VANDE_BHARAT', from:'Bengaluru Cy Jn',  to:'Chennai Central',     distKm:362, durationHr:5.0,  fareINR:{chair:1150, exec:2100}, zone:'SWR', color:'#003580', frequency:'Daily',    dep:'06:00', arr:'11:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'20947', name:'Gandhinagar–Mumbai Vande Bharat', type:'VANDE_BHARAT', from:'Gandhinagar Capital', to:'Mumbai Central', distKm:490, durationHr:5.5, fareINR:{chair:1200, exec:2300}, zone:'WR', color:'#003580', frequency:'Daily',    dep:'15:05', arr:'20:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'22413', name:'Hazrat Nizamuddin–Agra Vande Bharat', type:'VANDE_BHARAT', from:'Hazrat Nizamuddin', to:'Agra Cantt',    distKm:196, durationHr:2.5,  fareINR:{chair:900, exec:1700},  zone:'NCR', color:'#003580', frequency:'Daily',    dep:'06:00', arr:'08:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'20648', name:'Thiruvananthapuram–Kasaragod Vande Bharat', type:'VANDE_BHARAT', from:'Thiruvananthapuram', to:'Kasaragod', distKm:598, durationHr:7.5, fareINR:{chair:1300, exec:2400}, zone:'SR', color:'#003580', frequency:'Daily', dep:'05:45', arr:'13:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'22473', name:'Bikaner–Delhi Vande Bharat', type:'VANDE_BHARAT', from:'Bikaner',          to:'Delhi Sarai Rohilla',  distKm:450, durationHr:6.0,  fareINR:{chair:1200, exec:2200}, zone:'NWR', color:'#003580', frequency:'Daily',    dep:'05:55', arr:'11:55', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'20945', name:'Bilaspur–Nagpur Vande Bharat', type:'VANDE_BHARAT', from:'Bilaspur',         to:'Nagpur',              distKm:270, durationHr:3.5,  fareINR:{chair:1000, exec:1900}, zone:'SECR', color:'#003580', frequency:'Daily',   dep:'05:00', arr:'08:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },

  // ══════════════════════════════════════════════════════
  // RAJDHANI EXPRESS (Premium – AC Only)
  // ══════════════════════════════════════════════════════
  { trainNo:'12301', name:'Howrah Rajdhani', type:'RAJDHANI', from:'Howrah',          to:'New Delhi',           distKm:1450, durationHr:17.0, fareINR:{3AC:2300, 2AC:3400, 1AC:5800}, zone:'ER', color:'#003580', frequency:'Daily',    dep:'14:05', arr:'10:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12951', name:'Mumbai Central Rajdhani', type:'RAJDHANI', from:'Mumbai Central',  to:'New Delhi',           distKm:1384, durationHr:15.5, fareINR:{3AC:2200, 2AC:3300, 1AC:5500}, zone:'WR', color:'#003580', frequency:'Daily',    dep:'17:00', arr:'08:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12431', name:'Thiruvananthapuram Rajdhani', type:'RAJDHANI', from:'Thiruvananthapuram', to:'Hazrat Nizamuddin',  distKm:2820, durationHr:46.5, fareINR:{3AC:3800, 2AC:5500, 1AC:9800}, zone:'SR', color:'#003580', frequency:'3/week',   dep:'10:25', arr:'08:55', days:['Mon','Thu','Sat'] },
  { trainNo:'12423', name:'Dibrugarh Rajdhani', type:'RAJDHANI', from:'Dibrugarh',        to:'New Delhi',           distKm:2424, durationHr:36.5, fareINR:{3AC:3500, 2AC:5000, 1AC:9200}, zone:'NFR', color:'#003580', frequency:'Daily',    dep:'09:30', arr:'10:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'22691', name:'Bengaluru Rajdhani', type:'RAJDHANI', from:'Bengaluru City Jn', to:'Hazrat Nizamuddin',  distKm:2350, durationHr:33.0, fareINR:{3AC:3400, 2AC:5000, 1AC:9000}, zone:'SWR', color:'#003580', frequency:'Daily',    dep:'20:00', arr:'05:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12957', name:'Swarna Jayanti Rajdhani (Ahmedabad)', type:'RAJDHANI', from:'Ahmedabad',      to:'New Delhi',           distKm:934, durationHr:12.5, fareINR:{3AC:1800, 2AC:2700, 1AC:4800}, zone:'WR', color:'#003580', frequency:'Daily',    dep:'17:25', arr:'05:55', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12309', name:'Rajendra Nagar Rajdhani (Patna)', type:'RAJDHANI', from:'Rajendra Nagar T', to:'New Delhi',           distKm:1015, durationHr:12.5, fareINR:{3AC:1900, 2AC:2800, 1AC:5000}, zone:'ECR', color:'#003580', frequency:'Daily',   dep:'21:20', arr:'09:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12841', name:'Howrah–Puri Rajdhani', type:'RAJDHANI', from:'Howrah',          to:'Puri',                distKm:500, durationHr:7.0,  fareINR:{3AC:1500, 2AC:2200, 1AC:3800}, zone:'SER', color:'#003580', frequency:'Daily',    dep:'22:20', arr:'05:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },

  // ══════════════════════════════════════════════════════
  // SHATABDI EXPRESS (Day Service – Chair Car)
  // ══════════════════════════════════════════════════════
  { trainNo:'12001', name:'Bhopal Shatabdi', type:'SHATABDI', from:'New Delhi',         to:'Bhopal Jn',           distKm:706, durationHr:8.0,  fareINR:{CC:1300, EC:2500}, zone:'NCR', color:'#E3000B', frequency:'Daily',    dep:'06:00', arr:'14:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12007', name:'Chennai Shatabdi', type:'SHATABDI', from:'Chennai Central',   to:'Mysuru',              distKm:497, durationHr:6.0,  fareINR:{CC:1200, EC:2300}, zone:'SR',  color:'#E3000B', frequency:'Daily',    dep:'06:00', arr:'12:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12015', name:'Ajmer Shatabdi', type:'SHATABDI', from:'New Delhi',          to:'Ajmer',               distKm:441, durationHr:5.5,  fareINR:{CC:1050, EC:2000}, zone:'NWR', color:'#E3000B', frequency:'Daily',    dep:'06:05', arr:'11:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12021', name:'Howrah–New Jalpaiguri Shatabdi', type:'SHATABDI', from:'Howrah',         to:'New Jalpaiguri',       distKm:568, durationHr:7.5,  fareINR:{CC:1100, EC:2100}, zone:'ER',  color:'#E3000B', frequency:'Daily',    dep:'06:00', arr:'13:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12031', name:'Amritsar Shatabdi', type:'SHATABDI', from:'New Delhi',        to:'Amritsar Jn',         distKm:449, durationHr:5.5,  fareINR:{CC:1080, EC:2100}, zone:'NR',  color:'#E3000B', frequency:'Daily',    dep:'07:20', arr:'13:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12025', name:'Pune Shatabdi', type:'SHATABDI', from:'Mumbai CSMT',         to:'Pune Jn',             distKm:192, durationHr:3.5,  fareINR:{CC:800, EC:1500},  zone:'CR',  color:'#E3000B', frequency:'Daily',    dep:'07:10', arr:'10:40', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12027', name:'Mumbai–Ahmedabad Shatabdi', type:'SHATABDI', from:'Mumbai Central',  to:'Ahmedabad Jn',        distKm:492, durationHr:6.0,  fareINR:{CC:1100, EC:2100}, zone:'WR',  color:'#E3000B', frequency:'Daily',    dep:'06:25', arr:'12:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },

  // ══════════════════════════════════════════════════════
  // DURONTO EXPRESS (Non-stop AC)
  // ══════════════════════════════════════════════════════
  { trainNo:'12213', name:'Mumbai CSMT–Delhi Duronto', type:'DURONTO', from:'Mumbai CSMT',        to:'Hazrat Nizamuddin',   distKm:1386, durationHr:16.5, fareINR:{3AC:2100, 2AC:3100, 1AC:5400}, zone:'CR', color:'#9932CC', frequency:'Daily',    dep:'23:25', arr:'15:55', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12219', name:'Mumbai LTT–Secunderabad Duronto', type:'DURONTO', from:'Mumbai LTT',        to:'Secunderabad Jn',     distKm:794, durationHr:13.0, fareINR:{3AC:1900, 2AC:2900, 1AC:5000}, zone:'CR', color:'#9932CC', frequency:'4/week',   dep:'21:05', arr:'10:05', days:['Mon','Wed','Thu','Sat'] },
  { trainNo:'12223', name:'Mumbai LTT–Ernakulam Duronto', type:'DURONTO', from:'Mumbai LTT',         to:'Ernakulam Jn',        distKm:1280, durationHr:25.0, fareINR:{3AC:2400, 2AC:3600, 1AC:6300}, zone:'CR', color:'#9932CC', frequency:'2/week',   dep:'11:25', arr:'12:25', days:['Mon','Fri'] },
  { trainNo:'12259', name:'Sealdah–New Delhi Duronto', type:'DURONTO', from:'Sealdah',            to:'New Delhi',           distKm:1453, durationHr:17.5, fareINR:{3AC:2300, 2AC:3400, 1AC:5800}, zone:'ER', color:'#9932CC', frequency:'Daily',    dep:'20:05', arr:'13:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },

  // ══════════════════════════════════════════════════════
  // TEJAS EXPRESS (Corporate Premium)
  // ══════════════════════════════════════════════════════
  { trainNo:'82501', name:'Mumbai–Ahmedabad Tejas', type:'TEJAS', from:'Mumbai Central',   to:'Ahmedabad Jn',        distKm:492, durationHr:5.5,  fareINR:{CC:1500, EC:2700}, zone:'WR',  color:'#F7941D', frequency:'6/week',   dep:'06:40', arr:'12:25', days:['Mon','Tue','Wed','Thu','Fri','Sat'] },
  { trainNo:'82901', name:'Lucknow–Delhi Tejas', type:'TEJAS', from:'Lucknow Charbagh',  to:'New Delhi',           distKm:554, durationHr:6.0,  fareINR:{CC:1350, EC:2500}, zone:'NR',  color:'#F7941D', frequency:'6/week',   dep:'06:10', arr:'12:25', days:['Mon','Tue','Wed','Thu','Fri','Sat'] },
  { trainNo:'20901', name:'Mumbai–Goa Tejas', type:'TEJAS', from:'Dadar',              to:'Madgaon (Goa)',        distKm:582, durationHr:8.0,  fareINR:{CC:1700, EC:3100}, zone:'CR',  color:'#F7941D', frequency:'6/week',   dep:'05:00', arr:'13:00', days:['Mon','Tue','Wed','Thu','Fri','Sat'] },

  // ══════════════════════════════════════════════════════
  // GARIB RATH EXPRESS (Budget AC)
  // ══════════════════════════════════════════════════════
  { trainNo:'12909', name:'Mumbai Bandra–Hazrat Nizamuddin Garib Rath', type:'GARIB_RATH', from:'Mumbai Bandra',  to:'Hazrat Nizamuddin',   distKm:1390, durationHr:19.0, fareINR:{3AC:1050}, zone:'WR', color:'#006600', frequency:'3/week',   dep:'21:25', arr:'16:25', days:['Mon','Wed','Fri'] },
  { trainNo:'12217', name:'Secunderabad Garib Rath', type:'GARIB_RATH', from:'Secunderabad',       to:'Hazrat Nizamuddin',   distKm:1750, durationHr:24.0, fareINR:{3AC:1200}, zone:'SCR', color:'#006600', frequency:'2/week',  dep:'06:00', arr:'06:00', days:['Mon','Thu'] },

  // ══════════════════════════════════════════════════════
  // SUPERFAST / MAIL EXPRESS (Major Routes)
  // ══════════════════════════════════════════════════════
  { trainNo:'11301', name:'Udyan Express – Mumbai to Bengaluru', type:'SUPERFAST', from:'Mumbai CSMT',       to:'Bengaluru City Jn',   distKm:1279, durationHr:24.5, fareINR:{SL:500, 3AC:1600, 2AC:2400}, zone:'CR', color:'#666699', frequency:'Daily',    dep:'08:05', arr:'08:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12627', name:'Karnataka Express', type:'SUPERFAST', from:'New Delhi',         to:'Bengaluru City Jn',   distKm:2444, durationHr:40.0, fareINR:{SL:600, 3AC:1800, 2AC:2600}, zone:'NR',  color:'#666699', frequency:'Daily',    dep:'22:30', arr:'14:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12621', name:'Tamil Nadu Express', type:'SUPERFAST', from:'New Delhi',         to:'Chennai Central',     distKm:2182, durationHr:33.0, fareINR:{SL:600, 3AC:1800, 2AC:2600}, zone:'NR',  color:'#666699', frequency:'Daily',    dep:'22:30', arr:'07:40', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12649', name:'Sampark Kranti (Karnataka)', type:'SUPERFAST', from:'Hazrat Nizamuddin',  to:'Bengaluru City Jn',   distKm:2461, durationHr:38.0, fareINR:{SL:570, 3AC:1750, 2AC:2550}, zone:'SWR', color:'#666699', frequency:'3/week',  dep:'06:30', arr:'20:30', days:['Mon','Wed','Fri'] },
  { trainNo:'12051', name:'Dadar–Madgaon Jan Shatabdi', type:'JAN_SHATABDI', from:'Dadar',             to:'Madgaon',             distKm:582, durationHr:9.0,  fareINR:{CC:760},  zone:'CR',  color:'#009900', frequency:'Daily',    dep:'05:20', arr:'14:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12123', name:'Deccan Queen – Pune to Mumbai', type:'SUPERFAST', from:'Pune Jn',            to:'Mumbai CSMT',         distKm:192, durationHr:3.5,  fareINR:{CC:275, FC:525}, zone:'CR', color:'#666699', frequency:'Daily',    dep:'07:15', arr:'10:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12201', name:'Mumbai–Howrah Yuva Express', type:'SUPERFAST', from:'LTT Mumbai',          to:'Howrah',              distKm:1968, durationHr:30.0, fareINR:{SL:420, 3AC:1400, 2AC:2100}, zone:'CR', color:'#666699', frequency:'Daily',    dep:'05:00', arr:'11:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12615', name:'Grand Trunk Express', type:'SUPERFAST', from:'Chennai Central',   to:'New Delhi',           distKm:2182, durationHr:33.0, fareINR:{SL:550, 3AC:1700, 2AC:2500}, zone:'SR',  color:'#666699', frequency:'Daily',    dep:'19:15', arr:'04:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12802', name:'Purushottam Express – Puri to Delhi', type:'SUPERFAST', from:'Puri',               to:'New Delhi',           distKm:1796, durationHr:27.0, fareINR:{SL:530, 3AC:1600, 2AC:2400}, zone:'ECoR', color:'#666699', frequency:'Daily',    dep:'22:20', arr:'01:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12839', name:'Howrah–Chennai Mail', type:'MAIL', from:'Howrah',            to:'Chennai Central',     distKm:1663, durationHr:26.5, fareINR:{SL:500, 3AC:1600, 2AC:2400}, zone:'SER', color:'#888888', frequency:'Daily',    dep:'23:50', arr:'02:25', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12244', name:'Coromandel Express', type:'SUPERFAST', from:'Howrah',            to:'Chennai Central',     distKm:1663, durationHr:26.0, fareINR:{SL:520, 3AC:1650, 2AC:2450}, zone:'SER', color:'#666699', frequency:'Daily',    dep:'08:45', arr:'10:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  { trainNo:'12653', name:'Rock Fort Express – Chennai to Tiruchirappalli', type:'SUPERFAST', from:'Chennai Central', to:'Tiruchirappalli',    distKm:338, durationHr:4.5,  fareINR:{SL:200, 3AC:800, 2AC:1200}, zone:'SR', color:'#666699', frequency:'Daily',    dep:'22:05', arr:'02:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },

  // ══════════════════════════════════════════════════════
  // HUMSAFAR (3AC Only Full AC)
  // ══════════════════════════════════════════════════════
  { trainNo:'82901', name:'Anand Vihar–Darbhanga Humsafar', type:'HUMSAFAR', from:'Anand Vihar Terminal', to:'Darbhanga',          distKm:1100, durationHr:17.0, fareINR:{3AC:1400}, zone:'ECR', color:'#FF6600', frequency:'2/week',   dep:'11:35', arr:'04:35', days:['Mon','Thu'] },
  { trainNo:'20805', name:'Visakhapatnam–New Delhi Humsafar', type:'HUMSAFAR', from:'Visakhapatnam',       to:'Hazrat Nizamuddin',  distKm:2265, durationHr:34.0, fareINR:{3AC:2100}, zone:'ECoR', color:'#FF6600', frequency:'2/week',   dep:'13:35', arr:'23:35', days:['Tue','Fri'] },

  // ══════════════════════════════════════════════════════
  // ANTYODAYA (Unreserved Superfast)
  // ══════════════════════════════════════════════════════
  { trainNo:'22929', name:'Bandra–Bhagalpur Antyodaya', type:'ANTYODAYA', from:'Mumbai Bandra',      to:'Bhagalpur',           distKm:2119, durationHr:33.0, fareINR:{GEN:380}, zone:'WR', color:'#003333', frequency:'2/week',   dep:'12:30', arr:'21:30', days:['Mon','Thu'] },
];

module.exports = { INDIA_TRAIN_ROUTES };
