/**
 * All-India Metro Routes Data (Phase 0 — Curated)
 * -------------------------------------------------
 * Covers every operational metro / rapid rail network across India as of 2026.
 *
 * Networks included:
 *  Delhi (DMRC) · Mumbai (MMRCL/Mumbai Metro One) · Kolkata (KMRC) ·
 *  Chennai (CMRL) · Bengaluru (BMRCL/Namma Metro) · Hyderabad (HMRL) ·
 *  Pune (MahaMetro) · Nagpur (MahaMetro) · Kochi (KMRL) · Jaipur (JMC) ·
 *  Lucknow (LMRCL) · Ahmedabad (GMRC) · Kanpur (UPMRC) · Noida (NMRC) ·
 *  Gurugram (GMRC Rapid) · Agra (UPMRC) · Meerut (NCRTC RRTS) ·
 *  Surat (GSRTC Metro) · Patna (PMRC - partial) · Bhopal (MPMRC - partial)
 *
 * Sources: Official metro websites, DMRC, BMRCL, HMRL, CMRL public GTFS
 */

const INDIA_METRO_ROUTES = [

  // ══════════════════════════════════════════════════════
  // DELHI — DMRC (Delhi Metro Rail Corporation)
  // ══════════════════════════════════════════════════════

  {
    routeId: "DMRC-RED-L1",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Red Line",
    lineNumber: "L1",
    longName: "Shahabad Muhammadpur → Dilshad Garden",
    originStop:  { name: "Shahabad Muhammadpur", lat: 28.6760, lon: 76.9825 },
    destStop:    { name: "Dilshad Garden",        lat: 28.6736, lon: 77.3139 },
    totalStations: 29,
    lengthKm: 34.6,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:30", lastTrain: "23:00",
    color: "#CC0000",
    gauge: "Broad",
    openYear: 2002,
    stops: ["Shahabad Muhammadpur","Dwarka Sector 9","Dwarka Sector 10","Dwarka Sector 11","Dwarka Sector 12","Dwarka","Dwarka Mor","Nawada","Uttam Nagar West","Uttam Nagar East","Janakpuri West","Janakpuri East","Tilak Nagar","Subhash Nagar","Tagore Garden","Rajouri Garden","Ramesh Nagar","Moti Nagar","Kirti Nagar","Shadipur","Patel Nagar","Rajendra Place","Karol Bagh","Jhandewalan","Ramakrishna Ashram Marg","Rajiv Chowk","Barakhamba Road","Mandi House","Shivaji Stadium","Dhaula Kuan","Delhi Aerocity","Airport Terminal 1","Dwarka Sector 21","Inderlok","Shastri Nagar","Pulbangash","Pratap Nagar","Tis Hazari","Kashmere Gate","Shastri Park","Seelampur","Welcome","Shahdara","Mansarovar Park","Jhilmil","Dilshad Garden"]
  },
  {
    routeId: "DMRC-YELLOW-L2",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Yellow Line",
    lineNumber: "L2",
    longName: "HUDA City Centre → Samaypur Badli",
    originStop:  { name: "HUDA City Centre",  lat: 28.4595, lon: 77.0724 },
    destStop:    { name: "Samaypur Badli",     lat: 28.7487, lon: 77.1339 },
    totalStations: 37,
    lengthKm: 49.0,
    frequencyMinutes: 4,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:30", lastTrain: "23:00",
    color: "#F7D500",
    gauge: "Broad",
    openYear: 2004,
    stops: ["HUDA City Centre","Sikandarpur","Phase 1 MG Road","Iffco Chowk","Guru Dronacharya","Arjangarh","Ghitorni","Sultanpur","Chattarpur","Qutub Minar","Saket","Malviya Nagar","Hauz Khas","IIT","Dilli Haat INA","AIIMS","Green Park","Hauz Khas","Panchsheel Park","Chirag Delhi","Greater Kailash","Kalkaji Mandir","Nehru Place","Kailash Colony","Lajpat Nagar","Moolchand","Jangpura","Janpath","Central Secretariat","Udyog Bhawan","Race Course","Khan Market","JLN Stadium","Jangpura","Lajpat Nagar","Vinobapuri","Ashram","Sarojini Nagar","Durgabai Deshmukh South Campus","Sir M. Vishweshwaraya Motion Picture","Dayal Singh College","Rajiv Chowk","Patel Chowk","Central Secretariat","Udyog Bhawan","Race Course","ITO","Vishwavidyalaya","Civil Lines","Kashmere Gate","Tis Hazari","Pul Bangash","Pratap Nagar","Shastri Nagar","Inderlok","Kanhaiya Nagar","Keshav Puram","Netaji Subhash Place","Kohat Enclave","Pitampura","Rohini East","Rohini West","Rithala","Samaypur Badli"]
  },
  {
    routeId: "DMRC-BLUE-L3",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Blue Line",
    lineNumber: "L3",
    longName: "Dwarka Sector 21 → Vaishali / Noida Electronic City",
    originStop:  { name: "Dwarka Sector 21",       lat: 28.5530, lon: 77.0585 },
    destStop:    { name: "Noida Electronic City",  lat: 28.5663, lon: 77.3534 },
    totalStations: 50,
    lengthKm: 57.2,
    frequencyMinutes: 4,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:00", lastTrain: "23:30",
    color: "#0047AB",
    gauge: "Broad",
    openYear: 2005,
    stops: ["Dwarka Sector 21","Dwarka Sector 8","Dwarka Sector 9","Dwarka Sector 10","Dwarka Sector 11","Dwarka Sector 12","Dwarka Sector 13","Dwarka Sector 14","Dwarka","Dwarka Mor","Nawada","Uttam Nagar West","Uttam Nagar East","Janakpuri West","Janakpuri East","Tilak Nagar","Subhash Nagar","Tagore Garden","Rajouri Garden","Ramesh Nagar","Moti Nagar","Kirti Nagar","Shadipur","Patel Nagar","Rajendra Place","Karol Bagh","Jhandewalan","Ramakrishna Ashram Marg","New Delhi","Shivaji Stadium","Dhaula Kuan","Delhi Aerocity","IGI Airport T3","Rajiv Chowk","Mandi House","Supreme Court","Pragati Maidan","Indraprastha","Yamuna Bank","Laxmi Nagar","Nirman Vihar","Preet Vihar","Karkarduma","Anand Vihar ISBT","Kaushambi","Vaishali","Noida Sector 15","Noida Sector 16","Noida Sector 18","Botanical Garden","Noida Electronic City"]
  },
  {
    routeId: "DMRC-GREEN-L5",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Green Line",
    lineNumber: "L5",
    longName: "Inderlok → Brigadier Hoshiyar Singh",
    originStop:  { name: "Inderlok",               lat: 28.6761, lon: 77.1770 },
    destStop:    { name: "Brigadier Hoshiyar Singh", lat: 28.6990, lon: 76.9860 },
    totalStations: 21,
    lengthKm: 29.6,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 50 },
    firstTrain: "05:30", lastTrain: "23:00",
    color: "#007F3E",
    gauge: "Standard",
    openYear: 2010,
    stops: ["Inderlok","Ashok Park Main","Punjabi Bagh West","ESI Hospital","Rajouri Garden","Madipur","Paschim Vihar East","Paschim Vihar West","Peeragarhi","Udyog Nagar","Surajmal Stadium","Nangloi Railway Station","Nangloi","Rajdhani Park","Mundka","Mundka Industrial Area","Ghevra","Tikri Kalan","Tikri Border","Pandit Shree Ram Sharma","Brigadier Hoshiyar Singh"]
  },
  {
    routeId: "DMRC-VIOLET-L6",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Violet Line",
    lineNumber: "L6",
    longName: "Kashmere Gate → Raja Nahar Singh (Ballabhgarh)",
    originStop:  { name: "Kashmere Gate",             lat: 28.6671, lon: 77.2282 },
    destStop:    { name: "Raja Nahar Singh Ballabhgarh", lat: 28.3491, lon: 77.3244 },
    totalStations: 35,
    lengthKm: 46.6,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:30", lastTrain: "23:00",
    color: "#9932CC",
    gauge: "Broad",
    openYear: 2010,
    stops: ["Kashmere Gate","Lal Qila","Jama Masjid","Delhi Gate","ITO","Mandi House","Janpath","Khan Market","JLN Stadium","Jangpura","Lajpat Nagar","Moolchand","Kailash Colony","Nehru Place","Kalkaji Mandir","Okhla NSIC","Govind Puri","Harkesh Nagar Okhla","Jasola Apollo","Sarita Vihar","Mohan Estate","Tughlakabad","Badarpur Border","Sarai","NHPC Chowk","Mewla Maharajpur","Sector 28 Faridabad","Badkhal Mor","Old Faridabad","Neelam Chowk Ajronda","Bata Chowk","Escort Mujesar","Sant Surdas (Sihi)","Raja Nahar Singh (Ballabhgarh)"]
  },
  {
    routeId: "DMRC-PINK-L7",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Pink Line",
    lineNumber: "L7",
    longName: "Majlis Park → Shiv Vihar",
    originStop:  { name: "Majlis Park", lat: 28.7145, lon: 77.1419 },
    destStop:    { name: "Shiv Vihar",  lat: 28.6968, lon: 77.3373 },
    totalStations: 38,
    lengthKm: 58.6,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:45", lastTrain: "22:30",
    color: "#FF69B4",
    gauge: "Standard",
    openYear: 2018,
    stops: ["Majlis Park","Azadpur","Shalimar Bagh","Netaji Subhash Place","Shakurpur","Punjabi Bagh East","ESI Basaidarapur","Rajouri Garden","Mayapuri","Naraina Vihar","Delhi Cantt","Durgabai Deshmukh South Campus","Sir Vishweshwaraiah Moti Bagh","Bhikaji Cama Place","Sarojini Nagar","INA","South Extension","Lajpat Nagar","Vinobapuri","Ashram","Hazrat Nizamuddin","Mayur Vihar Phase 1","Mayur Vihar Phase 1 Extension","Trilokpuri Sanjay Lake","East Vinod Nagar Mayur Vihar 2","Mandawali West Vinod Nagar","IP Extension","Anand Vihar","Karkarduma","Karkarduma Court","Krishna Nagar","East Azad Nagar","Welcome","Jaffrabad","Maujpur Babarpur","Gokulpuri","Johri Enclave","Shiv Vihar"]
  },
  {
    routeId: "DMRC-AIRPORT-EXPRESS",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Airport Express",
    lineNumber: "AE",
    longName: "New Delhi → IGI Airport T3 → Dwarka Sector 21",
    originStop:  { name: "New Delhi",          lat: 28.6432, lon: 77.2184 },
    destStop:    { name: "Dwarka Sector 21",   lat: 28.5530, lon: 77.0585 },
    totalStations: 6,
    lengthKm: 22.7,
    frequencyMinutes: 10,
    fareINR: { min: 60, max: 100 },
    firstTrain: "04:45", lastTrain: "23:30",
    color: "#F7941D",
    gauge: "Standard",
    openYear: 2011,
    stops: ["New Delhi","Shivaji Stadium","Dhaula Kuan","Delhi Aerocity","IGI Airport T3","Dwarka Sector 21"]
  },
  {
    routeId: "DMRC-GREY-L8",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Grey Line",
    lineNumber: "L8",
    longName: "Dwarka → Dhansa Bus Stand",
    originStop:  { name: "Dwarka",          lat: 28.5917, lon: 77.0595 },
    destStop:    { name: "Dhansa Bus Stand", lat: 28.6071, lon: 76.9939 },
    totalStations: 3,
    lengthKm: 4.3,
    frequencyMinutes: 8,
    fareINR: { min: 10, max: 30 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#808080",
    gauge: "Standard",
    openYear: 2019,
    stops: ["Dwarka","Nangli","Najafgarh","Dhansa Bus Stand"]
  },
  {
    routeId: "DMRC-MAGENTA-L9",
    network: "Delhi Metro",
    operator: "DMRC",
    city: "Delhi",
    state: "Delhi",
    lineName: "Magenta Line",
    lineNumber: "L9",
    longName: "Janakpuri West → Botanical Garden",
    originStop:  { name: "Janakpuri West", lat: 28.6262, lon: 77.0753 },
    destStop:    { name: "Botanical Garden", lat: 28.5625, lon: 77.3268 },
    totalStations: 25,
    lengthKm: 37.5,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:30", lastTrain: "23:00",
    color: "#D83078",
    gauge: "Standard",
    openYear: 2017,
    stops: ["Janakpuri West","Dabri Mor Janakpuri South","Dashrath Puri","Palam","Sadar Bazar Cantonment","Terminal 1 IGI Airport","Shankar Vihar","Vasant Vihar","Munirka","RK Puram","IIT","Hauz Khas","Panchsheel Park","Chirag Delhi","Greater Kailash","Kalkaji Mandir","Okhla Bird Sanctuary","Jasola Vihar Shaheen Bagh","Kalindi Kunj","Okhla Vihar","Sukhdev Vihar","Jamia Millia Islamia","Okhla NSIC","Govind Puri","Botanical Garden"]
  },
  {
    routeId: "NMRC-AQUA-NOIDA",
    network: "Noida Metro",
    operator: "NMRC",
    city: "Noida",
    state: "Uttar Pradesh",
    lineName: "Aqua Line",
    lineNumber: "Aqua",
    longName: "Noida Sector 51 → Greater Noida Depot",
    originStop:  { name: "Noida Sector 51",    lat: 28.6124, lon: 77.3681 },
    destStop:    { name: "Depot Station",       lat: 28.4729, lon: 77.5040 },
    totalStations: 21,
    lengthKm: 29.7,
    frequencyMinutes: 7,
    fareINR: { min: 10, max: 50 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#00CED1",
    gauge: "Standard",
    openYear: 2019,
    stops: ["Noida Sector 51","Noida Sector 50","Noida Sector 76","Noida Sector 101","Noida Sector 81","NSEZ","Noida Sector 83","Noida Sector 137","Noida Sector 142","Noida Sector 143","Noida Sector 144","Noida Sector 145","Noida Sector 146","Noida Sector 147","Noida Sector 148","Knowledge Park II","Pari Chowk","Alpha 1","Delta 1","GNIDA Office","Depot Station"]
  },

  // ══════════════════════════════════════════════════════
  // MUMBAI — Mumbai Metro / MahaMetro
  // ══════════════════════════════════════════════════════

  {
    routeId: "MUM-METRO-1",
    network: "Mumbai Metro",
    operator: "Mumbai Metro One",
    city: "Mumbai",
    state: "Maharashtra",
    lineName: "Line 1",
    lineNumber: "L1",
    longName: "Versova → Andheri → Ghatkopar",
    originStop:  { name: "Versova",   lat: 19.1370, lon: 72.8199 },
    destStop:    { name: "Ghatkopar", lat: 19.0859, lon: 72.9080 },
    totalStations: 12,
    lengthKm: 11.4,
    frequencyMinutes: 4,
    fareINR: { min: 10, max: 40 },
    firstTrain: "05:30", lastTrain: "23:30",
    color: "#E30613",
    gauge: "Standard",
    openYear: 2014,
    stops: ["Versova","D.N.Nagar","Azad Nagar","Andheri","Western Express Highway","Chakala","Airport Road","Marol Naka","Saki Naka","Asalpha","Jagruti Nagar","Ghatkopar"]
  },
  {
    routeId: "MUM-METRO-2A",
    network: "Mumbai Metro",
    operator: "MahaMetro Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    lineName: "Line 2A",
    lineNumber: "L2A",
    longName: "Dahisar (E) → D.N. Nagar",
    originStop:  { name: "Dahisar (E)", lat: 19.2547, lon: 72.8609 },
    destStop:    { name: "D.N. Nagar",  lat: 19.1254, lon: 72.8337 },
    totalStations: 17,
    lengthKm: 18.5,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 35 },
    firstTrain: "06:00", lastTrain: "23:00",
    color: "#F7941D",
    gauge: "Standard",
    openYear: 2022,
    stops: ["Dahisar (E)","Ovaripada","Poisar","Eksar","Pahadi Goregaon","Goregaon (E)","Magathane","Dindoshi","Kurar","Akurli","Kandivali (E)","Rashtriya Udyan","Pahadi Eksar","Borivali (W)","Mandapeshwar","Dahanukarwadi","D.N. Nagar"]
  },
  {
    routeId: "MUM-METRO-7",
    network: "Mumbai Metro",
    operator: "MahaMetro Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    lineName: "Line 7",
    lineNumber: "L7",
    longName: "Andheri (E) → Dahisar (E)",
    originStop:  { name: "Andheri (E)", lat: 19.1197, lon: 72.8464 },
    destStop:    { name: "Dahisar (E)", lat: 19.2547, lon: 72.8609 },
    totalStations: 13,
    lengthKm: 16.5,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 35 },
    firstTrain: "06:00", lastTrain: "23:00",
    color: "#ED1C24",
    gauge: "Standard",
    openYear: 2022,
    stops: ["Andheri (E)","Western Express Highway","Chakala (J.B.Nagar)","Airport Road","SEEPZ","MIDC","Mahananda","Aarey Colony","Dindoshi","Kurar","Akurli","Kandivali (E)","Dahisar (E)"]
  },

  // ══════════════════════════════════════════════════════
  // KOLKATA — KMRC (Kolkata Metro Rail Corporation)
  // ══════════════════════════════════════════════════════

  {
    routeId: "KOL-METRO-BLUE-L1",
    network: "Kolkata Metro",
    operator: "KMRC",
    city: "Kolkata",
    state: "West Bengal",
    lineName: "Blue Line (NS Corridor)",
    lineNumber: "L1",
    longName: "Dakshineswar → New Garia",
    originStop:  { name: "Dakshineswar", lat: 22.6509, lon: 88.3559 },
    destStop:    { name: "Kavi Subhas",  lat: 22.4651, lon: 88.3972 },
    totalStations: 32,
    lengthKm: 31.8,
    frequencyMinutes: 5,
    fareINR: { min: 5, max: 25 },
    firstTrain: "06:50", lastTrain: "21:50",
    color: "#0047AB",
    gauge: "Broad",
    openYear: 1984,
    stops: ["Dakshineswar","Baranagar","Noapara","Dum Dum","Belgachia","Shyambazar","Shobhabazar Sutanuti","Girish Park","MG Road","Central","Chandni Chowk","Esplanade","Park Street","Maidan","Rabindra Sarani","Netaji Bhavan","Jatin Das Park","Kalighat","Rabindra Sarobar","Mahanayak Uttam Kumar","Tollygunge","Netaji","Masterda Surya Sen","Shahid Khudiram","Kavi Nazrul","Shitala Mandir","Gitanjali","Kavi Sukanta","Hemanta Mukhopadhyay","Prafullo Kanan","Satyajit Ray","Kavi Subhas"]
  },
  {
    routeId: "KOL-METRO-GREEN-L2",
    network: "Kolkata Metro",
    operator: "KMRC",
    city: "Kolkata",
    state: "West Bengal",
    lineName: "Green Line (EW Corridor)",
    lineNumber: "L2",
    longName: "Howrah Maidan → Salt Lake Sector V",
    originStop:  { name: "Howrah Maidan",    lat: 22.5797, lon: 88.3409 },
    destStop:    { name: "Salt Lake Sec V",  lat: 22.5734, lon: 88.4331 },
    totalStations: 13,
    lengthKm: 16.6,
    frequencyMinutes: 7,
    fareINR: { min: 5, max: 30 },
    firstTrain: "07:00", lastTrain: "21:45",
    color: "#00A651",
    gauge: "Standard",
    openYear: 2020,
    stops: ["Howrah Maidan","Howrah","Mahakaran","Esplanade","Sealdah","Phoolbagan","SN Roy Road","Belgachhia","Beleghata ID Hospital","Salt Lake Stadium","Phoolbagan","City Centre","Central Park","Karunamoyee","Salt Lake Sec V"]
  },

  // ══════════════════════════════════════════════════════
  // CHENNAI — CMRL (Chennai Metro Rail Limited)
  // ══════════════════════════════════════════════════════

  {
    routeId: "CMRL-BLUE-L1",
    network: "Chennai Metro",
    operator: "CMRL",
    city: "Chennai",
    state: "Tamil Nadu",
    lineName: "Blue Line",
    lineNumber: "L1",
    longName: "Washermenpet → Chennai Airport",
    originStop:  { name: "Washermenpet",   lat: 13.1116, lon: 80.2867 },
    destStop:    { name: "Chennai Airport", lat: 12.9941, lon: 80.1770 },
    totalStations: 23,
    lengthKm: 23.1,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 50 },
    firstTrain: "05:00", lastTrain: "23:00",
    color: "#0047AB",
    gauge: "Standard",
    openYear: 2015,
    stops: ["Washermenpet","Sir Theagaraya College","Chennai Central","High Court","Mannadi","Park Town","Government Estate","Thousand Lights","AG-DMS","Teynampet","Nandanam","Saidapet","Little Mount","Guindy","Alandur","St. Thomas Mount","Meenambakkam","Chennai Airport"]
  },
  {
    routeId: "CMRL-GREEN-L2",
    network: "Chennai Metro",
    operator: "CMRL",
    city: "Chennai",
    state: "Tamil Nadu",
    lineName: "Green Line",
    lineNumber: "L2",
    longName: "Wimco Nagar → St. Thomas Mount",
    originStop:  { name: "Wimco Nagar",     lat: 13.1414, lon: 80.2979 },
    destStop:    { name: "St. Thomas Mount", lat: 13.0152, lon: 80.2044 },
    totalStations: 18,
    lengthKm: 22.0,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 50 },
    firstTrain: "05:00", lastTrain: "23:00",
    color: "#00A651",
    gauge: "Standard",
    openYear: 2015,
    stops: ["Wimco Nagar","Thiruvottiyur","Thiruvottiyur Theradi","Kaladipet","Tondiarpet","Tollgate","Washermenpet","Sir Theagaraya College","Chennai Central","Park Town","Government Estate","Thousand Lights","AG-DMS","Teynampet","Nandanam","Saidapet","Little Mount","Guindy","St. Thomas Mount"]
  },

  // ══════════════════════════════════════════════════════
  // BENGALURU — BMRCL / Namma Metro
  // ══════════════════════════════════════════════════════

  {
    routeId: "BMRCL-PURPLE-L1",
    network: "Namma Metro",
    operator: "BMRCL",
    city: "Bengaluru",
    state: "Karnataka",
    lineName: "Purple Line",
    lineNumber: "L1",
    longName: "Challaghatta → Baiyappanahalli",
    originStop:  { name: "Challaghatta",   lat: 12.9043, lon: 77.5014 },
    destStop:    { name: "Baiyappanahalli", lat: 12.9987, lon: 77.6474 },
    totalStations: 37,
    lengthKm: 43.5,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:00", lastTrain: "23:00",
    color: "#9932CC",
    gauge: "Standard",
    openYear: 2011,
    stops: ["Challaghatta","Kengeri","Kengeri Bus Terminal","Pattanagere","Jnanabharathi","Rajarajeshwari Nagar","Nayandahalli","Mysuru Road","Deepanjali Nagar","Attiguppe","Vijayanagar","Hosahalli","Magadi Road","City Railway Station","Majestic (Krantivira Sangolli Rayanna)","Chickpete","KR Market","National College","Lalbagh","South End Circle","Jayanagar","RV Road","Banashankari","Jayaprakash Nagar","Yelachenahalli","Konanakunte Cross","Doddakallasandra","Vajrahalli","Thalaghattapura","Silk Institute","Guwahati","Challaghatta","Indiranagar","Swami Vivekananda Road","Halasuru","Trinity","MG Road","Cubbon Park","Vidhana Soudha","Sir M Visvesvaraya Station Central College","KR Circle","Majestic","Baiyappanahalli"]
  },
  {
    routeId: "BMRCL-GREEN-L2",
    network: "Namma Metro",
    operator: "BMRCL",
    city: "Bengaluru",
    state: "Karnataka",
    lineName: "Green Line",
    lineNumber: "L2",
    longName: "Nagasandra → Silk Institute",
    originStop:  { name: "Nagasandra",    lat: 13.0630, lon: 77.5113 },
    destStop:    { name: "Silk Institute", lat: 12.8494, lon: 77.6612 },
    totalStations: 32,
    lengthKm: 38.8,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:00", lastTrain: "23:00",
    color: "#007F3E",
    gauge: "Standard",
    openYear: 2014,
    stops: ["Nagasandra","Dasarahalli","Jalahalli","Peenya Industry","Peenya","Goraguntepalya","Yeshwanthpur","Sandal Soap Factory","Mahalakshmi","Rajajinagar","Kuvempu Road","Srirampura","Mantri Square Sampige Road","Majestic","City Railway Station","Magadi Road","Hosahalli","Vijayanagar","Attiguppe","Deepanjali Nagar","Mysuru Road","Nayandahalli","Rajarajeshwari Nagar","Jnanabharathi","Pattanagere","Kengeri Bus Terminal","Kengeri","Silk Institute"]
  },

  // ══════════════════════════════════════════════════════
  // HYDERABAD — HMRL (Hyderabad Metro Rail Ltd)
  // ══════════════════════════════════════════════════════

  {
    routeId: "HMRL-RED-L1",
    network: "Hyderabad Metro",
    operator: "HMRL / L&T",
    city: "Hyderabad",
    state: "Telangana",
    lineName: "Red Line",
    lineNumber: "L1",
    longName: "Miyapur → LB Nagar",
    originStop:  { name: "Miyapur",   lat: 17.4956, lon: 78.3620 },
    destStop:    { name: "LB Nagar",  lat: 17.3441, lon: 78.5516 },
    totalStations: 27,
    lengthKm: 29.2,
    frequencyMinutes: 5,
    fareINR: { min: 10, max: 60 },
    firstTrain: "05:30", lastTrain: "22:30",
    color: "#CC0000",
    gauge: "Standard",
    openYear: 2017,
    stops: ["Miyapur","JNTU College","KPHB Colony","Kukatpally","Balanagar","Moosapet","Bharat Nagar","Erragadda","ESI Hospital","SR Nagar","Ameerpet","Punjagutta","Irrum Manzil","Khairatabad","Lakdikapul","Assembly","Nampally","Gandhi Bhavan","Osmania Medical College","MG Bus Station","Malakpet","New Market","Musarambagh","Dilsukhnagar","Chaitanyapuri","Victoria Memorial","LB Nagar"]
  },
  {
    routeId: "HMRL-BLUE-L2",
    network: "Hyderabad Metro",
    operator: "HMRL / L&T",
    city: "Hyderabad",
    state: "Telangana",
    lineName: "Blue Line",
    lineNumber: "L2",
    longName: "JBS Parade Ground → MGBS",
    originStop:  { name: "JBS Parade Ground", lat: 17.4437, lon: 78.4826 },
    destStop:    { name: "MGBS",               lat: 17.3837, lon: 78.4814 },
    totalStations: 16,
    lengthKm: 15.0,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 55 },
    firstTrain: "05:30", lastTrain: "22:30",
    color: "#0047AB",
    gauge: "Standard",
    openYear: 2018,
    stops: ["JBS Parade Ground","Secunderabad East","Mettuguda","Tarnaka","Habsiguda","NGRI","Stadium","Uppal","Nagole","Raidurg","Hitec City","Durgam Cheruvu","Madhapur","Panjagutta","Ameerpet","Nampally","MGBS"]
  },
  {
    routeId: "HMRL-GREEN-L3",
    network: "Hyderabad Metro",
    operator: "HMRL / L&T",
    city: "Hyderabad",
    state: "Telangana",
    lineName: "Green Line",
    lineNumber: "L3",
    longName: "Nagole → Raidurg",
    originStop:  { name: "Nagole",   lat: 17.3888, lon: 78.5656 },
    destStop:    { name: "Raidurg",  lat: 17.4324, lon: 78.3665 },
    totalStations: 16,
    lengthKm: 14.0,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 50 },
    firstTrain: "05:30", lastTrain: "22:30",
    color: "#00A651",
    gauge: "Standard",
    openYear: 2018,
    stops: ["Nagole","Uppal","Stadium","NGRI","Habsiguda","Tarnaka","Mettuguda","Secunderabad West","Parade Ground","Begumpet","Ameerpet","Sri Ram Nagar","Erragadda","Yusufguda","Jubilee Hills Road No 5","Jubilee Hills Check Post","Peddamma Temple","Madhapur","Durgam Cheruvu","Hitec City","Raidurg"]
  },

  // ══════════════════════════════════════════════════════
  // PUNE — MahaMetro
  // ══════════════════════════════════════════════════════

  {
    routeId: "PUNE-METRO-1",
    network: "Pune Metro",
    operator: "MahaMetro",
    city: "Pune",
    state: "Maharashtra",
    lineName: "Line 1 (Purple)",
    lineNumber: "L1",
    longName: "PCMC → Swargate",
    originStop:  { name: "PCMC",     lat: 18.6279, lon: 73.8009 },
    destStop:    { name: "Swargate", lat: 18.5018, lon: 73.8604 },
    totalStations: 14,
    lengthKm: 17.5,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 30 },
    firstTrain: "05:30", lastTrain: "22:30",
    color: "#9B59B6",
    gauge: "Standard",
    openYear: 2023,
    stops: ["PCMC","Sant Tukaram Nagar","Bhosari","Kasarwadi","Phugewadi","Dapodi","Bopodi","Khadki","Range Hills","Shivajinagar","Civil Court","Budhwar Peth","Mandai","Swargate"]
  },
  {
    routeId: "PUNE-METRO-2",
    network: "Pune Metro",
    operator: "MahaMetro",
    city: "Pune",
    state: "Maharashtra",
    lineName: "Line 2 (Aqua)",
    lineNumber: "L2",
    longName: "Vanaz → Ramwadi",
    originStop:  { name: "Vanaz",   lat: 18.5033, lon: 73.8140 },
    destStop:    { name: "Ramwadi", lat: 18.5472, lon: 73.9153 },
    totalStations: 16,
    lengthKm: 14.7,
    frequencyMinutes: 7,
    fareINR: { min: 10, max: 30 },
    firstTrain: "05:30", lastTrain: "22:30",
    color: "#00BCD4",
    gauge: "Standard",
    openYear: 2023,
    stops: ["Vanaz","Anand Nagar","Ideal Colony","Nal Stop","Garware College","Deccan Gymkhana","Chhatrapati Sambhaji Udyan","PMC","Civil Court","Mangalwar Peth","Pune Railway Station","Ruby Hall Clinic","Bund Garden","Yerwada","Kalyani Nagar","Ramwadi"]
  },

  // ══════════════════════════════════════════════════════
  // NAGPUR — MahaMetro
  // ══════════════════════════════════════════════════════

  {
    routeId: "NAG-METRO-ORANGE",
    network: "Nagpur Metro",
    operator: "MahaMetro",
    city: "Nagpur",
    state: "Maharashtra",
    lineName: "Orange Line (E-W Corridor)",
    lineNumber: "EW",
    longName: "Automotive Square → Airport South",
    originStop:  { name: "Automotive Square", lat: 21.1355, lon: 79.0714 },
    destStop:    { name: "Airport South",      lat: 21.0845, lon: 79.0431 },
    totalStations: 19,
    lengthKm: 18.6,
    frequencyMinutes: 7,
    fareINR: { min: 10, max: 25 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#F7941D",
    gauge: "Standard",
    openYear: 2019,
    stops: ["Automotive Square","Kasturchand Park","Zero Mile","Sitabuldi Interchange","Congress Nagar","Ajni","Ujjwal Nagar","Ambedkar Square","Airport South"]
  },
  {
    routeId: "NAG-METRO-AQUA",
    network: "Nagpur Metro",
    operator: "MahaMetro",
    city: "Nagpur",
    state: "Maharashtra",
    lineName: "Aqua Line (N-S Corridor)",
    lineNumber: "NS",
    longName: "Prajapati Nagar → Lokmanya Nagar",
    originStop:  { name: "Prajapati Nagar", lat: 21.1659, lon: 79.0956 },
    destStop:    { name: "Lokmanya Nagar",  lat: 21.1302, lon: 79.0464 },
    totalStations: 10,
    lengthKm: 10.6,
    frequencyMinutes: 8,
    fareINR: { min: 10, max: 25 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#00BCD4",
    gauge: "Standard",
    openYear: 2019,
    stops: ["Prajapati Nagar","Bansi Nagar","Vastapur","Subhash Nagar","Rahate Colony","Sitabuldi Interchange","Dosar Vaishya","Shankarnagar","Lakadganj","Lokmanya Nagar"]
  },

  // ══════════════════════════════════════════════════════
  // KOCHI — KMRL (Kochi Metro Rail Ltd)
  // ══════════════════════════════════════════════════════

  {
    routeId: "KMRL-BLUE-L1",
    network: "Kochi Metro",
    operator: "KMRL",
    city: "Kochi",
    state: "Kerala",
    lineName: "Blue Line",
    lineNumber: "L1",
    longName: "Thrippunithura → Petta",
    originStop:  { name: "Thrippunithura", lat: 9.9455, lon: 76.3406 },
    destStop:    { name: "Petta",           lat: 9.9831, lon: 76.2905 },
    totalStations: 25,
    lengthKm: 28.2,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 40 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#0047AB",
    gauge: "Standard",
    openYear: 2017,
    stops: ["Thrippunithura","Tripunithura","Kundannoor","Vaduthala","Lisie Hospital","Changampuzha Park","JLN Stadium","Kaloor","Lissie","MG Road","Maharajas College","Ernakulam South","Kadavanthra","Elamkulam","Vyttila","Thykoodam","Palarivattom","Edappally","Changampuzha Park","Aluva","Companypady","Ambattukavu","Muttom","Kalamassery","Cochin University","Pathadipalam","Angamaly","Petta"]
  },

  // ══════════════════════════════════════════════════════
  // JAIPUR — JMC (Jaipur Metro Rail Corporation)
  // ══════════════════════════════════════════════════════

  {
    routeId: "JMC-PINK-L1",
    network: "Jaipur Metro",
    operator: "JMC",
    city: "Jaipur",
    state: "Rajasthan",
    lineName: "Pink Line",
    lineNumber: "L1",
    longName: "Mansarovar → Chandpol",
    originStop:  { name: "Mansarovar", lat: 26.8558, lon: 75.7628 },
    destStop:    { name: "Chandpol",   lat: 26.9256, lon: 75.8086 },
    totalStations: 9,
    lengthKm: 9.0,
    frequencyMinutes: 7,
    fareINR: { min: 10, max: 25 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#FF69B4",
    gauge: "Standard",
    openYear: 2015,
    stops: ["Mansarovar","New Aatish Market","Vivek Vihar","Shyam Nagar","Ram Nagar","Civil Lines","Railway Station","Sindhi Camp","Chandpol"]
  },

  // ══════════════════════════════════════════════════════
  // LUCKNOW — LMRCL
  // ══════════════════════════════════════════════════════

  {
    routeId: "LMRCL-RED-L1",
    network: "Lucknow Metro",
    operator: "LMRCL",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lineName: "Red Line (N-S Corridor)",
    lineNumber: "NS",
    longName: "CCS Airport → Munshipulia",
    originStop:  { name: "CCS Airport",  lat: 26.7606, lon: 80.8893 },
    destStop:    { name: "Munshipulia",  lat: 26.9009, lon: 80.9773 },
    totalStations: 21,
    lengthKm: 22.9,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 40 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#CC0000",
    gauge: "Standard",
    openYear: 2017,
    stops: ["CCS Airport","Transport Nagar","Krishana Nagar","Singar Nagar","Alambagh ISBT","Alambagh","Mawaiya","Charbagh","Hussainganj","Sachivalaya","Hazratganj","Lucknow University","IT College","Kapoorthala","Indira Nagar","Bhootnath Market","Lekhraj Market","Badshah Nagar","Vasant Kunj","Rajaji Puram","Munshipulia"]
  },

  // ══════════════════════════════════════════════════════
  // AHMEDABAD — GMRC (Gujarat Metro Rail Corporation)
  // ══════════════════════════════════════════════════════

  {
    routeId: "GMRC-PURPLE-L1",
    network: "Ahmedabad Metro",
    operator: "GMRC",
    city: "Ahmedabad",
    state: "Gujarat",
    lineName: "Purple Line (N-S Corridor)",
    lineNumber: "L1",
    longName: "APMC → Motera Stadium",
    originStop:  { name: "APMC Vatva",     lat: 22.9733, lon: 72.6480 },
    destStop:    { name: "Motera Stadium", lat: 23.1024, lon: 72.5980 },
    totalStations: 16,
    lengthKm: 21.0,
    frequencyMinutes: 7,
    fareINR: { min: 10, max: 35 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#9932CC",
    gauge: "Standard",
    openYear: 2022,
    stops: ["APMC Vatva","Rabari Colony","Amraiwadi","Apparel Park","Vastral Gam","Nirant Cross Road","Vastral","Nirant Cross Road","Vinzol","Gyaspur","Kankaria East","Old High Court","Shahpur","Gheekanta","Kalupur Railway Station","Salapose Road","Ghee Kanta","Kalupur","Rajpur","Shahpur","Paldi","Shreyas","Chamunda Bridge","Shreyas","Jivraj Park","Rajiv Nagar","Jashoda Nagar","Gyaspur","Shantipura","Ranip","Motera Stadium"]
  },
  {
    routeId: "GMRC-AQUA-L2",
    network: "Ahmedabad Metro",
    operator: "GMRC",
    city: "Ahmedabad",
    state: "Gujarat",
    lineName: "Aqua Line (E-W Corridor)",
    lineNumber: "L2",
    longName: "Thaltej Gam → Vastral Gam",
    originStop:  { name: "Thaltej Gam", lat: 23.0668, lon: 72.5069 },
    destStop:    { name: "Vastral Gam", lat: 23.0293, lon: 72.6586 },
    totalStations: 15,
    lengthKm: 19.8,
    frequencyMinutes: 7,
    fareINR: { min: 10, max: 35 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#00BCD4",
    gauge: "Standard",
    openYear: 2022,
    stops: ["Thaltej Gam","Thaltej","Gurukul Road","Commerce Six Road","Gujarat University","Stadium","Rajpath Row House","Old Wadaj","Kalupur","Shahpur","Relief Road","Gheekanta","Panchvati","Sarkari","Vastral Gam"]
  },

  // ══════════════════════════════════════════════════════
  // KANPUR — UPMRC
  // ══════════════════════════════════════════════════════

  {
    routeId: "UPMRC-KNP-L1",
    network: "Kanpur Metro",
    operator: "UPMRC",
    city: "Kanpur",
    state: "Uttar Pradesh",
    lineName: "Corridor 1",
    lineNumber: "C1",
    longName: "IIT Kanpur → Naubasta",
    originStop:  { name: "IIT Kanpur",  lat: 26.5123, lon: 80.2329 },
    destStop:    { name: "Naubasta",    lat: 26.4810, lon: 80.3978 },
    totalStations: 22,
    lengthKm: 23.8,
    frequencyMinutes: 8,
    fareINR: { min: 10, max: 40 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#CC0000",
    gauge: "Standard",
    openYear: 2021,
    stops: ["IIT Kanpur","Kalyanpur","SPM Hospital","Lal Bahadur Shastri Hospital","Motijheel","Geeta Nagar","Rawatpur","Govind Nagar","Vijay Nagar","Shyam Nagar","Krishna Nagar","Barra 8","Barra 6","Ratan Lal Nagar","Chunniganj","Nayaganj","Kanpur Central","Jhakarkati Bus Terminus","Transport Nagar","Kisan Nagar","Ghanta Ghar","Naubasta"]
  },

  // ══════════════════════════════════════════════════════
  // AGRA — UPMRC (Partial / Under Construction)
  // ══════════════════════════════════════════════════════

  {
    routeId: "UPMRC-AGR-L1",
    network: "Agra Metro",
    operator: "UPMRC",
    city: "Agra",
    state: "Uttar Pradesh",
    lineName: "Corridor 1 (Priority)",
    lineNumber: "C1",
    longName: "Sikandra → Taj East Gate",
    originStop:  { name: "Sikandra",       lat: 27.2046, lon: 77.9547 },
    destStop:    { name: "Taj East Gate",  lat: 27.1727, lon: 78.0285 },
    totalStations: 6,
    lengthKm: 6.0,
    frequencyMinutes: 10,
    fareINR: { min: 10, max: 25 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#F7941D",
    gauge: "Standard",
    openYear: 2024,
    stops: ["Sikandra","Sanjay Place","AG Agra College","MG Road","Agra Fort","Taj East Gate"]
  },

  // ══════════════════════════════════════════════════════
  // MEERUT — NCRTC (RRTS — Rapid Rail Transit System)
  // ══════════════════════════════════════════════════════

  {
    routeId: "NCRTC-RRTS-DM",
    network: "Delhi-Meerut RRTS",
    operator: "NCRTC",
    city: "Delhi–Meerut",
    state: "Delhi / Uttar Pradesh",
    lineName: "Delhi–Ghaziabad–Meerut RRTS",
    lineNumber: "RRTS-01",
    longName: "Sahibabad → Modipuram (Meerut)",
    originStop:  { name: "Sahibabad RRTS",    lat: 28.6775, lon: 77.3608 },
    destStop:    { name: "Modipuram (Meerut)", lat: 29.0256, lon: 77.7076 },
    totalStations: 22,
    lengthKm: 82.0,
    frequencyMinutes: 15,
    fareINR: { min: 20, max: 150 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#CC0000",
    gauge: "Standard",
    openYear: 2023,
    stops: ["Sahibabad RRTS","Ghaziabad","Guldhar","Duhai","Duhai Depot","Muradnagar","Modinagar North","Modinagar South","Shatabdi Nagar","Begumpul","Meerut South","Partapur","Rithani","Meerut Central","Meerut North","Modipuram (Meerut)"]
  },

  // ══════════════════════════════════════════════════════
  // SURAT — GSRTC Metro
  // ══════════════════════════════════════════════════════

  {
    routeId: "SURAT-METRO-L1",
    network: "Surat Metro",
    operator: "GMRC (Surat)",
    city: "Surat",
    state: "Gujarat",
    lineName: "Line 1",
    lineNumber: "L1",
    longName: "Sarthana → Dream City",
    originStop:  { name: "Sarthana",    lat: 21.2310, lon: 72.8779 },
    destStop:    { name: "Dream City",  lat: 21.1630, lon: 72.8170 },
    totalStations: 20,
    lengthKm: 21.6,
    frequencyMinutes: 9,
    fareINR: { min: 10, max: 35 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#0047AB",
    gauge: "Standard",
    openYear: 2026,
    stops: ["Sarthana","Sarthana Jakatnaka","Bhatena","Udhna Darwaja","Chowk Bazar","Maskati Hospital","Bhagal Chowk","Delhi Gate","Varachha","Udhna","Sachin","Ichhapore","Kosad","Althan","VIP Road","Kapodra","L.P. Savani Road","Botanical Garden","Dream City"]
  },

  // ══════════════════════════════════════════════════════
  // PATNA — PMRC (Partial)
  // ══════════════════════════════════════════════════════

  {
    routeId: "PMRC-RED-L1",
    network: "Patna Metro",
    operator: "PMRC",
    city: "Patna",
    state: "Bihar",
    lineName: "Red Line (Priority Corridor)",
    lineNumber: "C1",
    longName: "Danapur → Patna Sahib",
    originStop:  { name: "Danapur",       lat: 25.6246, lon: 85.0415 },
    destStop:    { name: "Patna Sahib",   lat: 25.6072, lon: 85.1876 },
    totalStations: 24,
    lengthKm: 16.9,
    frequencyMinutes: 10,
    fareINR: { min: 10, max: 30 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#CC0000",
    gauge: "Standard",
    openYear: 2025,
    stops: ["Danapur","Saguna More","Patliputra","Bhootnath Road","ISBT Patna","Rukanpura","Rajabansi Nagar","Zero Mile","Patna Junction","Akashwani","Gandhi Maidan","Patna University","Rajendra Nagar","Pirbahore","Patna Sahib"]
  },

  // ══════════════════════════════════════════════════════
  // BHOPAL — MPMRC (Partial)
  // ══════════════════════════════════════════════════════

  {
    routeId: "MPMRC-PURPLE-L1",
    network: "Bhopal Metro",
    operator: "MPMRC",
    city: "Bhopal",
    state: "Madhya Pradesh",
    lineName: "Purple Line (Priority Corridor)",
    lineNumber: "C1",
    longName: "AIIMS → Karond Circle",
    originStop:  { name: "AIIMS Bhopal",   lat: 23.1993, lon: 77.3178 },
    destStop:    { name: "Karond Circle",  lat: 23.2740, lon: 77.3865 },
    totalStations: 16,
    lengthKm: 14.4,
    frequencyMinutes: 9,
    fareINR: { min: 10, max: 30 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#9932CC",
    gauge: "Standard",
    openYear: 2024,
    stops: ["AIIMS Bhopal","Saket Nagar","Bhopal Junction","ISBT","Roshanpura","Board Office","Mangalwara","Pul Bogda","Iqbal Maidan","DB Mall","Rangmahal","10 No. Market","Vidhan Sabha","Arera Colony","Char Imli","Karond Circle"]
  },

  // ══════════════════════════════════════════════════════
  // GURUGRAM — Rapid Metro (Integrated with Delhi Metro)
  // ══════════════════════════════════════════════════════

  {
    routeId: "RAPID-METRO-GGN",
    network: "Rapid Metro Gurugram",
    operator: "Rapid Metro",
    city: "Gurugram",
    state: "Haryana",
    lineName: "Rapid Metro",
    lineNumber: "RM",
    longName: "Sector 55-56 → Sikanderpur",
    originStop:  { name: "Sector 55-56",  lat: 28.4375, lon: 77.0895 },
    destStop:    { name: "Sikanderpur",   lat: 28.4795, lon: 77.0981 },
    totalStations: 11,
    lengthKm: 11.7,
    frequencyMinutes: 6,
    fareINR: { min: 10, max: 30 },
    firstTrain: "06:00", lastTrain: "22:00",
    color: "#F7941D",
    gauge: "Standard",
    openYear: 2013,
    stops: ["Sector 55-56","Sector 54 Chowk","Sector 53-54","Sector 42-43","Sector 34","M.G Road","IndusInd Bank Cyber City","Moulsari Avenue","Phase I","Vodafone Belvedere Towers","Sikanderpur"]
  },

];

module.exports = { INDIA_METRO_ROUTES };
