/**
 * Maharashtra Transit Routes Data (Phase 0 — Scraped & Curated)
 * ---------------------------------------------------------------
 * Comprehensive dataset covering MSRTC inter-city buses, BEST city buses,
 * Mumbai Metro, Pune Metro, Mumbai Local trains, and other Maharashtra operators.
 *
 * Sources:
 *  - MSRTC (msrtc.maharashtra.gov.in)
 *  - BEST (bestundertaking.com)
 *  - Mumbai Metro (mmrcl.com, MahaMetro)
 *  - Pune Metro (punemetrorail.org)
 *  - Indian Railways (Mumbai Central/Western/Harbour lines)
 *  - Nagpur Metro (mahametro.org)
 */

const MAHARASHTRA_ROUTES = [

  // ─────────────────────────────────────────────────────────────────
  // MUMBAI — BEST Bus Routes
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "BEST-335A",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "335A",
    longName: "Andheri Station (E) → Powai Hiranandani",
    originStop: { name: "Andheri Station (E)", lat: 19.1197, lon: 72.8464 },
    destStop:   { name: "Powai Hiranandani",   lat: 19.1176, lon: 72.9059 },
    frequencyMinutes: 8,
    fareINR: 17,
    firstBus: "05:30",
    lastBus: "23:45",
    crowdLevel: "HIGH",
    color: "#E3000B"
  },
  {
    routeId: "BEST-101",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "101",
    longName: "CST → Bandra Terminus",
    originStop: { name: "Chhatrapati Shivaji Maharaj Terminus", lat: 18.9401, lon: 72.8355 },
    destStop:   { name: "Bandra Terminus",                      lat: 19.0559, lon: 72.8398 },
    frequencyMinutes: 10,
    fareINR: 22,
    firstBus: "05:00",
    lastBus: "23:30",
    crowdLevel: "HIGH",
    color: "#E3000B"
  },
  {
    routeId: "BEST-123",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "123",
    longName: "Kurla Station → Dharavi → Sion",
    originStop: { name: "Kurla Station", lat: 19.0726, lon: 72.8796 },
    destStop:   { name: "Sion",          lat: 19.0415, lon: 72.8615 },
    frequencyMinutes: 12,
    fareINR: 14,
    firstBus: "06:00",
    lastBus: "22:30",
    crowdLevel: "MEDIUM",
    color: "#E3000B"
  },
  {
    routeId: "BEST-231",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "231",
    longName: "Borivali Station → Malad → Goregaon",
    originStop: { name: "Borivali Station", lat: 19.2307, lon: 72.8567 },
    destStop:   { name: "Goregaon Station", lat: 19.1663, lon: 72.8493 },
    frequencyMinutes: 6,
    fareINR: 12,
    firstBus: "05:30",
    lastBus: "23:00",
    crowdLevel: "HIGH",
    color: "#E3000B"
  },
  {
    routeId: "BEST-56",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "56",
    longName: "Colaba → Marine Lines → Churchgate",
    originStop: { name: "Colaba",      lat: 18.9067, lon: 72.8147 },
    destStop:   { name: "Churchgate",  lat: 18.9353, lon: 72.8259 },
    frequencyMinutes: 5,
    fareINR: 10,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "MEDIUM",
    color: "#E3000B"
  },
  {
    routeId: "BEST-AS703",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "AS-703",
    longName: "AC Express: Ghatkopar → Nariman Point",
    originStop: { name: "Ghatkopar Station", lat: 19.0859, lon: 72.9080 },
    destStop:   { name: "Nariman Point",      lat: 18.9256, lon: 72.8243 },
    frequencyMinutes: 15,
    fareINR: 45,
    firstBus: "07:00",
    lastBus: "21:00",
    crowdLevel: "LOW",
    color: "#0057A8"
  },
  {
    routeId: "BEST-C68",
    operator: "BEST",
    city: "Mumbai",
    type: "BUS",
    shortName: "C-68",
    longName: "Chheda Nagar → Vikhroli → Mulund",
    originStop: { name: "Chheda Nagar", lat: 19.0709, lon: 72.9114 },
    destStop:   { name: "Mulund Naka",  lat: 19.1720, lon: 72.9580 },
    frequencyMinutes: 14,
    fareINR: 16,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "MEDIUM",
    color: "#E3000B"
  },

  // ─────────────────────────────────────────────────────────────────
  // MUMBAI — Metro Lines (MMRCL & Mumbai Metro One)
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "MUM-METRO-1",
    operator: "Mumbai Metro One",
    city: "Mumbai",
    type: "METRO",
    shortName: "M1",
    longName: "Metro Line 1: Versova → Andheri → Ghatkopar",
    originStop: { name: "Versova",   lat: 19.1370, lon: 72.8199 },
    destStop:   { name: "Ghatkopar", lat: 19.0859, lon: 72.9080 },
    frequencyMinutes: 4,
    fareINR: 40,
    firstBus: "05:30",
    lastBus: "23:30",
    crowdLevel: "HIGH",
    color: "#E30613",
    stops: ["Versova","D.N.Nagar","Azad Nagar","Andheri","Western Express Highway","Chakala","Airport Road","Marol Naka","Saki Naka","Asalpha","Jagruti Nagar","Ghatkopar"]
  },
  {
    routeId: "MUM-METRO-2A",
    operator: "MahaMetro Mumbai",
    city: "Mumbai",
    type: "METRO",
    shortName: "M2A",
    longName: "Metro Line 2A: Dahisar (E) → Andheri (W)",
    originStop: { name: "Dahisar (E)",  lat: 19.2547, lon: 72.8609 },
    destStop:   { name: "Andheri (W)",  lat: 19.1197, lon: 72.8330 },
    frequencyMinutes: 5,
    fareINR: 35,
    firstBus: "06:00",
    lastBus: "23:00",
    crowdLevel: "MEDIUM",
    color: "#F7941D",
    stops: ["Dahisar (E)","Ovaripada","Poisar","Eksar","Pahadi Goregaon","Goregaon (E)","Magathane","Dindoshi","Kurar","Akurli","Kandivali (E)","Rashtriya Udyan","Pahadi Eksar","Borivali (W)","Mandapeshwar","Dahanukarwadi","Malad (W)","Malvani","Jankalyan Nagar","Indiranagar","Sundervan","Aarey","Bangur Nagar","Goregaon (W)","Ram Mandir","Kores","Chincholi Bunder","Mahindra & Mahindra","Jogeshwari (W)","Bharatmata Nagar","Oshiwara","Andheri (W)"]
  },
  {
    routeId: "MUM-METRO-7",
    operator: "MahaMetro Mumbai",
    city: "Mumbai",
    type: "METRO",
    shortName: "M7",
    longName: "Metro Line 7: Andheri (E) → Dahisar (E)",
    originStop: { name: "Andheri (E)", lat: 19.1197, lon: 72.8464 },
    destStop:   { name: "Dahisar (E)", lat: 19.2547, lon: 72.8609 },
    frequencyMinutes: 5,
    fareINR: 35,
    firstBus: "06:00",
    lastBus: "23:00",
    crowdLevel: "MEDIUM",
    color: "#ED1C24"
  },

  // ─────────────────────────────────────────────────────────────────
  // MUMBAI — Local Train Lines (Indian Railways / WR / CR / Harbour)
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "MUM-WR-VIRAR",
    operator: "Western Railway",
    city: "Mumbai",
    type: "TRAIN",
    shortName: "WR-FAST",
    longName: "Western Line Fast: Churchgate → Virar",
    originStop: { name: "Churchgate", lat: 18.9353, lon: 72.8259 },
    destStop:   { name: "Virar",       lat: 19.4651, lon: 72.8095 },
    frequencyMinutes: 3,
    fareINR: 55,
    firstBus: "04:11",
    lastBus: "01:07",
    crowdLevel: "HIGH",
    color: "#0070C0",
    stops: ["Churchgate","Marine Lines","Charni Road","Grant Road","Mumbai Central","Mahalaxmi","Lower Parel","Elphinstone","Dadar","Matunga","Mahim","Bandra","Khar Road","Santacruz","Vile Parle","Andheri","Jogeshwari","Ram Mandir","Goregaon","Malad","Kandivali","Borivali","Bhayander","Mira Road","Naigaon","Vasai Road","Nalasopara","Virar"]
  },
  {
    routeId: "MUM-CR-KASARA",
    operator: "Central Railway",
    city: "Mumbai",
    type: "TRAIN",
    shortName: "CR-KASARA",
    longName: "Central Line: CSMT → Kasara",
    originStop: { name: "CSMT",   lat: 18.9401, lon: 72.8355 },
    destStop:   { name: "Kasara", lat: 19.7186, lon: 73.4615 },
    frequencyMinutes: 5,
    fareINR: 75,
    firstBus: "04:00",
    lastBus: "00:30",
    crowdLevel: "HIGH",
    color: "#C00000",
    stops: ["CSMT","Masjid","Sandhurst Road","Byculla","Chinchpokli","Currey Road","Parel","Dadar","Matunga Road","Sion","Kurla","Vidyavihar","Ghatkopar","Vikhroli","Kanjurmarg","Bhandup","Nahur","Mulund","Thane","Kalwa","Mumbra","Diva","Dombivali","Thakurli","Kalyan","Vithalwadi","Ulhasnagar","Ambivli","Titwala","Khadavli","Kasara"]
  },
  {
    routeId: "MUM-HARBOUR",
    operator: "Central Railway (Harbour Line)",
    city: "Mumbai",
    type: "TRAIN",
    shortName: "HARBOUR",
    longName: "Harbour Line: CSMT → Panvel",
    originStop: { name: "CSMT",   lat: 18.9401, lon: 72.8355 },
    destStop:   { name: "Panvel", lat: 18.9930, lon: 73.1100 },
    frequencyMinutes: 6,
    fareINR: 50,
    firstBus: "04:15",
    lastBus: "00:45",
    crowdLevel: "HIGH",
    color: "#7030A0",
    stops: ["CSMT","Wadi Bunder","Cotton Green","Sewri","Dockyard Road","Reay Road","Sandhurst Road","Byculla","Vadala Road","Sewri","Tilaknagar","Chunabhatti","Kurla","Tilak Nagar","Chembur","Govandi","Mankhurd","Vashi","Sanpada","Juinagar","Nerul","Seawood Darave","Belapur CBD","Kharghar","Mansarovar","Khandeshwar","Panvel"]
  },

  // ─────────────────────────────────────────────────────────────────
  // PUNE — PMT / PMPML City Buses
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "PMPML-1",
    operator: "PMPML",
    city: "Pune",
    type: "BUS",
    shortName: "PMPML-1",
    longName: "Pune Station → Swargate → Katraj",
    originStop: { name: "Pune Railway Station", lat: 18.5284, lon: 73.8742 },
    destStop:   { name: "Katraj Bus Terminus",   lat: 18.4504, lon: 73.8634 },
    frequencyMinutes: 8,
    fareINR: 13,
    firstBus: "05:00",
    lastBus: "23:00",
    crowdLevel: "HIGH",
    color: "#0056A7"
  },
  {
    routeId: "PMPML-155",
    operator: "PMPML",
    city: "Pune",
    type: "BUS",
    shortName: "155",
    longName: "Shivajinagar → Kothrud → Chandani Chowk",
    originStop: { name: "Shivajinagar",    lat: 18.5308, lon: 73.8478 },
    destStop:   { name: "Chandani Chowk",  lat: 18.5019, lon: 73.7741 },
    frequencyMinutes: 10,
    fareINR: 14,
    firstBus: "05:30",
    lastBus: "22:30",
    crowdLevel: "MEDIUM",
    color: "#0056A7"
  },
  {
    routeId: "PMPML-AC-41",
    operator: "PMPML",
    city: "Pune",
    type: "BUS",
    shortName: "AC-41",
    longName: "AC: Hinjewadi IT Park → Pune Station",
    originStop: { name: "Hinjewadi IT Park", lat: 18.5912, lon: 73.7389 },
    destStop:   { name: "Pune Station",       lat: 18.5284, lon: 73.8742 },
    frequencyMinutes: 15,
    fareINR: 50,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "HIGH",
    color: "#006633"
  },
  {
    routeId: "PMPML-11",
    operator: "PMPML",
    city: "Pune",
    type: "BUS",
    shortName: "11",
    longName: "Hadapsar → MG Road → Shivajinagar",
    originStop: { name: "Hadapsar Terminus", lat: 18.5020, lon: 73.9290 },
    destStop:   { name: "Shivajinagar",       lat: 18.5308, lon: 73.8478 },
    frequencyMinutes: 7,
    fareINR: 11,
    firstBus: "05:30",
    lastBus: "23:00",
    crowdLevel: "HIGH",
    color: "#0056A7"
  },

  // ─────────────────────────────────────────────────────────────────
  // PUNE — Metro (MahaMetro)
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "PUNE-METRO-1",
    operator: "MahaMetro Pune",
    city: "Pune",
    type: "METRO",
    shortName: "PM1",
    longName: "Pune Metro Line 1: PCMC → Swargate",
    originStop: { name: "PCMC",     lat: 18.6279, lon: 73.8009 },
    destStop:   { name: "Swargate", lat: 18.5018, lon: 73.8604 },
    frequencyMinutes: 6,
    fareINR: 30,
    firstBus: "05:30",
    lastBus: "22:30",
    crowdLevel: "MEDIUM",
    color: "#00A651",
    stops: ["PCMC","Sant Tukaram Nagar","Bhosari","Kasarwadi","Phugewadi","Dapodi","Bopodi","Khadki","Range Hills","Shivajinagar","Civil Court","Budhwar Peth","Mandai","Swargate"]
  },
  {
    routeId: "PUNE-METRO-2",
    operator: "MahaMetro Pune",
    city: "Pune",
    type: "METRO",
    shortName: "PM2",
    longName: "Pune Metro Line 2: Vanaz → Ramwadi",
    originStop: { name: "Vanaz",    lat: 18.5033, lon: 73.8140 },
    destStop:   { name: "Ramwadi",  lat: 18.5472, lon: 73.9153 },
    frequencyMinutes: 7,
    fareINR: 30,
    firstBus: "05:30",
    lastBus: "22:30",
    crowdLevel: "MEDIUM",
    color: "#BE1E2D",
    stops: ["Vanaz","Anand Nagar","Ideal Colony","Nal Stop","Garware College","Deccan Gymkhana","Chhatrapati Sambhaji Udyan","PMC","Civil Court","Mangalwar Peth","Pune Railway Station","Ruby Hall Clinic","Bund Garden","Yerwada","Kalyani Nagar","Ramwadi"]
  },

  // ─────────────────────────────────────────────────────────────────
  // NAGPUR — City Buses & Metro (NMC / MahaMetro Nagpur)
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "NAG-METRO-1",
    operator: "MahaMetro Nagpur",
    city: "Nagpur",
    type: "METRO",
    shortName: "NM1",
    longName: "Nagpur Metro: Automotive Square → Airport",
    originStop: { name: "Automotive Square", lat: 21.1355, lon: 79.0714 },
    destStop:   { name: "Airport",            lat: 21.0922, lon: 79.0472 },
    frequencyMinutes: 8,
    fareINR: 25,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "MEDIUM",
    color: "#F7941D",
    stops: ["Automotive Square","Kasturchand Park","Zero Mile","Sitabuldi","Congress Nagar","Ajni","Ujjwal Nagar","Ambedkar Square","Airport"]
  },
  {
    routeId: "NAG-METRO-2",
    operator: "MahaMetro Nagpur",
    city: "Nagpur",
    type: "METRO",
    shortName: "NM2",
    longName: "Nagpur Metro: Prajapati Nagar → Lokmanya Nagar",
    originStop: { name: "Prajapati Nagar", lat: 21.1659, lon: 79.0956 },
    destStop:   { name: "Lokmanya Nagar",  lat: 21.1302, lon: 79.0464 },
    frequencyMinutes: 8,
    fareINR: 25,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "LOW",
    color: "#00A651"
  },
  {
    routeId: "NMC-BUS-5",
    operator: "NMC City Bus",
    city: "Nagpur",
    type: "BUS",
    shortName: "NBus-5",
    longName: "Nagpur Station → Sitabuldi → Dharampeth",
    originStop: { name: "Nagpur Railway Station", lat: 21.1458, lon: 79.0882 },
    destStop:   { name: "Dharampeth",              lat: 21.1435, lon: 79.0580 },
    frequencyMinutes: 12,
    fareINR: 12,
    firstBus: "06:00",
    lastBus: "21:30",
    crowdLevel: "MEDIUM",
    color: "#C00000"
  },

  // ─────────────────────────────────────────────────────────────────
  // NASHIK — City Buses (Nashik City Link Ltd / NCLL)
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "NCLL-1",
    operator: "Nashik City Link",
    city: "Nashik",
    type: "BUS",
    shortName: "NKBus-1",
    longName: "CBS → Panchavati → Tapovan",
    originStop: { name: "CBS (Central Bus Stand)", lat: 19.9975, lon: 73.7898 },
    destStop:   { name: "Tapovan",                  lat: 20.0030, lon: 73.7774 },
    frequencyMinutes: 15,
    fareINR: 10,
    firstBus: "06:00",
    lastBus: "21:00",
    crowdLevel: "MEDIUM",
    color: "#FF6600"
  },
  {
    routeId: "NCLL-7",
    operator: "Nashik City Link",
    city: "Nashik",
    type: "BUS",
    shortName: "NKBus-7",
    longName: "Nashik Road Station → Mahatma Nagar → Satpur MIDC",
    originStop: { name: "Nashik Road Station", lat: 19.9789, lon: 73.8369 },
    destStop:   { name: "Satpur MIDC",          lat: 20.0168, lon: 73.7497 },
    frequencyMinutes: 18,
    fareINR: 12,
    firstBus: "05:45",
    lastBus: "20:30",
    crowdLevel: "LOW",
    color: "#FF6600"
  },

  // ─────────────────────────────────────────────────────────────────
  // AURANGABAD / CHHATRAPATI SAMBHAJINAGAR — City Buses
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "AUCITY-1",
    operator: "AUCITY Bus",
    city: "Aurangabad",
    type: "BUS",
    shortName: "AU-1",
    longName: "Bus Stand → MIT College → CIDCO",
    originStop: { name: "Aurangabad Bus Stand", lat: 19.8762, lon: 75.3433 },
    destStop:   { name: "CIDCO N-6",             lat: 19.8960, lon: 75.3584 },
    frequencyMinutes: 20,
    fareINR: 10,
    firstBus: "06:00",
    lastBus: "21:00",
    crowdLevel: "LOW",
    color: "#009900"
  },
  {
    routeId: "AUCITY-3",
    operator: "AUCITY Bus",
    city: "Aurangabad",
    type: "BUS",
    shortName: "AU-3",
    longName: "Railway Station → Beed Bypass → Waluj MIDC",
    originStop: { name: "Aurangabad Railway Station", lat: 19.8600, lon: 75.3269 },
    destStop:   { name: "Waluj MIDC",                  lat: 19.8355, lon: 75.2547 },
    frequencyMinutes: 25,
    fareINR: 14,
    firstBus: "06:00",
    lastBus: "20:00",
    crowdLevel: "LOW",
    color: "#009900"
  },

  // ─────────────────────────────────────────────────────────────────
  // SOLAPUR — City Buses
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "SMC-BUS-1",
    operator: "SMC City Bus",
    city: "Solapur",
    type: "BUS",
    shortName: "SolBus-1",
    longName: "Solapur Station → Hutatma Chowk → Akkalkot Road",
    originStop: { name: "Solapur Station",  lat: 17.6804, lon: 75.9107 },
    destStop:   { name: "Akkalkot Road",    lat: 17.6607, lon: 75.8949 },
    frequencyMinutes: 20,
    fareINR: 10,
    firstBus: "06:00",
    lastBus: "21:00",
    crowdLevel: "LOW",
    color: "#CC0000"
  },

  // ─────────────────────────────────────────────────────────────────
  // KOLHAPUR — City Buses
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "KMC-BUS-1",
    operator: "KMC City Bus",
    city: "Kolhapur",
    type: "BUS",
    shortName: "KolBus-1",
    longName: "Kolhapur Station → Rankala Lake → Rajaram College",
    originStop: { name: "Kolhapur Station", lat: 16.7058, lon: 74.2325 },
    destStop:   { name: "Rankala Lake",      lat: 16.6939, lon: 74.2224 },
    frequencyMinutes: 25,
    fareINR: 10,
    firstBus: "06:00",
    lastBus: "21:00",
    crowdLevel: "LOW",
    color: "#990000"
  },

  // ─────────────────────────────────────────────────────────────────
  // THANE — City Buses (TMT) & Navi Mumbai
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "TMT-1",
    operator: "TMT",
    city: "Thane",
    type: "BUS",
    shortName: "TMT-1",
    longName: "Thane Station → Naupada → Wagle Estate",
    originStop: { name: "Thane Station",  lat: 19.1872, lon: 72.9617 },
    destStop:   { name: "Wagle Estate",   lat: 19.1948, lon: 72.9739 },
    frequencyMinutes: 10,
    fareINR: 12,
    firstBus: "05:30",
    lastBus: "23:00",
    crowdLevel: "HIGH",
    color: "#0066CC"
  },
  {
    routeId: "NMMT-10",
    operator: "NMMT",
    city: "Navi Mumbai",
    type: "BUS",
    shortName: "NMMT-10",
    longName: "Vashi Bus Station → Belapur → Kharghar",
    originStop: { name: "Vashi Bus Station", lat: 19.0771, lon: 73.0045 },
    destStop:   { name: "Kharghar",           lat: 19.0330, lon: 73.0700 },
    frequencyMinutes: 12,
    fareINR: 14,
    firstBus: "05:30",
    lastBus: "23:30",
    crowdLevel: "MEDIUM",
    color: "#006600"
  },

  // ─────────────────────────────────────────────────────────────────
  // MSRTC — Inter-City Express Routes Across Maharashtra
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "MSRTC-MUM-PUN",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Shivneri",
    longName: "MSRTC Shivneri AC: Mumbai → Pune",
    originStop: { name: "Mumbai Dadar ST", lat: 19.0195, lon: 72.8431 },
    destStop:   { name: "Pune Swargate",   lat: 18.5018, lon: 73.8604 },
    frequencyMinutes: 30,
    fareINR: 280,
    firstBus: "05:00",
    lastBus: "23:30",
    crowdLevel: "HIGH",
    color: "#FF0000"
  },
  {
    routeId: "MSRTC-MUM-NAG",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Nagpur Express",
    longName: "MSRTC Nagpur Express: Mumbai → Nashik → Nagpur",
    originStop: { name: "Mumbai Central ST", lat: 18.9691, lon: 72.8195 },
    destStop:   { name: "Nagpur BS",          lat: 21.1458, lon: 79.0953 },
    frequencyMinutes: 120,
    fareINR: 780,
    firstBus: "16:00",
    lastBus: "21:00",
    crowdLevel: "MEDIUM",
    color: "#FF0000"
  },
  {
    routeId: "MSRTC-PUN-AUR",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Aurangabad Exp",
    longName: "MSRTC Shivshahi: Pune → Aurangabad",
    originStop: { name: "Pune Swargate",       lat: 18.5018, lon: 73.8604 },
    destStop:   { name: "Aurangabad ST",        lat: 19.8762, lon: 75.3433 },
    frequencyMinutes: 60,
    fareINR: 350,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "MEDIUM",
    color: "#FF0000"
  },
  {
    routeId: "MSRTC-PUN-KOL",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Kolhapur Express",
    longName: "MSRTC Express: Pune → Satara → Kolhapur",
    originStop: { name: "Pune Swargate",    lat: 18.5018, lon: 73.8604 },
    destStop:   { name: "Kolhapur ST",       lat: 16.7058, lon: 74.2325 },
    frequencyMinutes: 90,
    fareINR: 450,
    firstBus: "05:30",
    lastBus: "23:00",
    crowdLevel: "HIGH",
    color: "#FF0000"
  },
  {
    routeId: "MSRTC-MUM-NK",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Nashik Express",
    longName: "MSRTC Express: Mumbai → Nashik",
    originStop: { name: "Mumbai Dadar ST", lat: 19.0195, lon: 72.8431 },
    destStop:   { name: "Nashik CBS",       lat: 19.9975, lon: 73.7898 },
    frequencyMinutes: 30,
    fareINR: 260,
    firstBus: "05:30",
    lastBus: "23:00",
    crowdLevel: "HIGH",
    color: "#FF0000"
  },
  {
    routeId: "MSRTC-MUM-SOL",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Solapur Express",
    longName: "MSRTC Shivshahi: Mumbai → Solapur",
    originStop: { name: "Mumbai Central ST", lat: 18.9691, lon: 72.8195 },
    destStop:   { name: "Solapur BS",          lat: 17.6804, lon: 75.9107 },
    frequencyMinutes: 120,
    fareINR: 550,
    firstBus: "18:00",
    lastBus: "22:00",
    crowdLevel: "MEDIUM",
    color: "#FF0000"
  },
  {
    routeId: "MSRTC-PUN-NAS",
    operator: "MSRTC",
    city: "Inter-city",
    type: "INTER_CITY_BUS",
    shortName: "Pune-Nashik Exp",
    longName: "MSRTC Express: Pune → Nashik",
    originStop: { name: "Pune ST",    lat: 18.5284, lon: 73.8742 },
    destStop:   { name: "Nashik CBS", lat: 19.9975, lon: 73.7898 },
    frequencyMinutes: 45,
    fareINR: 220,
    firstBus: "06:00",
    lastBus: "22:00",
    crowdLevel: "MEDIUM",
    color: "#FF0000"
  },

  // ─────────────────────────────────────────────────────────────────
  // NAVI MUMBAI — Trans-Harbour Route
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "BEST-NH-1",
    operator: "BEST",
    city: "Navi Mumbai",
    type: "BUS",
    shortName: "NH-1",
    longName: "Nerul → Belapur → CBD → Vashi",
    originStop: { name: "Nerul Station",       lat: 19.0332, lon: 73.0143 },
    destStop:   { name: "Vashi Bus Terminus",  lat: 19.0771, lon: 73.0045 },
    frequencyMinutes: 8,
    fareINR: 15,
    firstBus: "05:30",
    lastBus: "23:00",
    crowdLevel: "MEDIUM",
    color: "#E3000B"
  },

  // ─────────────────────────────────────────────────────────────────
  // AMRAVATI — City Bus
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "AMC-BUS-1",
    operator: "AMC City Bus",
    city: "Amravati",
    type: "BUS",
    shortName: "AMV-1",
    longName: "Amravati Bus Stand → Rajkamal Chowk → Morshi Naka",
    originStop: { name: "Amravati Bus Stand", lat: 20.9374, lon: 77.7796 },
    destStop:   { name: "Morshi Naka",         lat: 20.9534, lon: 77.8077 },
    frequencyMinutes: 20,
    fareINR: 10,
    firstBus: "06:00",
    lastBus: "21:00",
    crowdLevel: "LOW",
    color: "#660066"
  },

  // ─────────────────────────────────────────────────────────────────
  // PUNE-MUMBAI INTERCITY TRAIN (Indian Railways)
  // ─────────────────────────────────────────────────────────────────
  {
    routeId: "TRAIN-DECCAN-EXP",
    operator: "Indian Railways",
    city: "Inter-city",
    type: "TRAIN",
    shortName: "Deccan Exp",
    longName: "Deccan Express: Pune → Mumbai CSMT",
    originStop: { name: "Pune Junction",  lat: 18.5284, lon: 73.8742 },
    destStop:   { name: "CSMT Mumbai",    lat: 18.9401, lon: 72.8355 },
    frequencyMinutes: 480,
    fareINR: 155,
    firstBus: "07:15",
    lastBus: "07:15",
    crowdLevel: "HIGH",
    color: "#003580"
  },
  {
    routeId: "TRAIN-INTERCITY-NK",
    operator: "Indian Railways",
    city: "Inter-city",
    type: "TRAIN",
    shortName: "Panchavati Exp",
    longName: "Panchavati Express: Mumbai CST → Nashik Road",
    originStop: { name: "Mumbai CSMT",    lat: 18.9401, lon: 72.8355 },
    destStop:   { name: "Nashik Road",     lat: 19.9789, lon: 73.8369 },
    frequencyMinutes: 960,
    fareINR: 95,
    firstBus: "06:10",
    lastBus: "06:10",
    crowdLevel: "HIGH",
    color: "#003580"
  }
];

module.exports = { MAHARASHTRA_ROUTES };
