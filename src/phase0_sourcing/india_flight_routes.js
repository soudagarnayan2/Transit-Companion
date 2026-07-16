/**
 * All-India Domestic Flight Routes (Phase 0 — Curated)
 * -------------------------------------------------------
 * Major domestic airline routes across all Indian airports.
 *
 * Airports & IATA Codes:
 *  DEL – Delhi (IGI)       BOM – Mumbai (CSIA)      BLR – Bengaluru (KIAL)
 *  MAA – Chennai (MIAL)    CCU – Kolkata (NSCBIA)    HYD – Hyderabad (RGIA)
 *  COK – Kochi (CIAL)      AMD – Ahmedabad (SVPIA)   PNQ – Pune (LB Shastri)
 *  JAI – Jaipur (SVAI)     LKO – Lucknow (CSAI)      PAT – Patna (LBSNAA)
 *  IXC – Chandigarh        IXA – Agartala             GAU – Guwahati (LGBI)
 *  BBI – Bhubaneswar       VTZ – Visakhapatnam        GOI – Goa (VMIA)
 *  UDR – Udaipur (MHAI)    JDH – Jodhpur (CSVAI)     SXR – Srinagar
 *  LEH – Leh (KLH)         IXB – Bagdogra             STV – Surat
 *  NAG – Nagpur (DMIA)     VNS – Varanasi (LBS)       ATQ – Amritsar
 *
 * Airlines: IndiGo · Air India · SpiceJet · Vistara · Air India Express ·
 *           AirAsia India · Star Air · Blue Dart (cargo)
 */

const INDIA_FLIGHT_ROUTES = [

  // ══════════════════════════════════════════════════════
  // IndiGo (6E)
  // ══════════════════════════════════════════════════════
  { flightNo:'6E-101',  airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'BOM', toCity:'Mumbai',        distKm:1148, durationMin:130, fareINR:{eco:3500,  bus:null},  frequency:'Every 30–45 min', firstDep:'05:00', lastDep:'23:59', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-201',  airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'BLR', toCity:'Bengaluru',     distKm:1740, durationMin:165, fareINR:{eco:4200,  bus:null},  frequency:'Every 45 min',    firstDep:'05:30', lastDep:'23:30', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-305',  airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'MAA', toCity:'Chennai',       distKm:2180, durationMin:190, fareINR:{eco:4800,  bus:null},  frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'22:30', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-401',  airline:'IndiGo', from:'BOM', fromCity:'Mumbai',         to:'BLR', toCity:'Bengaluru',     distKm:841,  durationMin:110, fareINR:{eco:3200,  bus:null},  frequency:'Every 45 min',    firstDep:'05:30', lastDep:'23:30', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-501',  airline:'IndiGo', from:'BOM', fromCity:'Mumbai',         to:'HYD', toCity:'Hyderabad',     distKm:711,  durationMin:100, fareINR:{eco:3000,  bus:null},  frequency:'Every 1 hr',      firstDep:'05:00', lastDep:'23:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-601',  airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'CCU', toCity:'Kolkata',       distKm:1305, durationMin:135, fareINR:{eco:3800,  bus:null},  frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'22:30', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-701',  airline:'IndiGo', from:'BLR', fromCity:'Bengaluru',      to:'MAA', toCity:'Chennai',       distKm:346,  durationMin:60,  fareINR:{eco:2500,  bus:null},  frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-801',  airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'HYD', toCity:'Hyderabad',     distKm:1253, durationMin:130, fareINR:{eco:3800,  bus:null},  frequency:'Every 45 min',    firstDep:'05:30', lastDep:'23:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-901',  airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'GOI', toCity:'Goa',           distKm:1887, durationMin:170, fareINR:{eco:4200,  bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'21:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1001', airline:'IndiGo', from:'BOM', fromCity:'Mumbai',         to:'GOI', toCity:'Goa',           distKm:451,  durationMin:65,  fareINR:{eco:2800,  bus:null},  frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'22:30', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1101', airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'GAU', toCity:'Guwahati',      distKm:1576, durationMin:155, fareINR:{eco:4000,  bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'21:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1201', airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'SXR', toCity:'Srinagar',      distKm:756,  durationMin:100, fareINR:{eco:3500,  bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'20:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1301', airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'LEH', toCity:'Leh',           distKm:615,  durationMin:70,  fareINR:{eco:4500,  bus:null},  frequency:'2/day',           firstDep:'06:00', lastDep:'12:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1401', airline:'IndiGo', from:'BOM', fromCity:'Mumbai',         to:'COK', toCity:'Kochi',         distKm:1100, durationMin:120, fareINR:{eco:3200,  bus:null},  frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'23:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1501', airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'VNS', toCity:'Varanasi',      distKm:821,  durationMin:95,  fareINR:{eco:3200,  bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'21:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1601', airline:'IndiGo', from:'BOM', fromCity:'Mumbai',         to:'AMD', toCity:'Ahmedabad',     distKm:524,  durationMin:80,  fareINR:{eco:2800,  bus:null},  frequency:'Every 45 min',    firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1701', airline:'IndiGo', from:'DEL', fromCity:'Delhi',          to:'JAI', toCity:'Jaipur',        distKm:282,  durationMin:55,  fareINR:{eco:2500,  bus:null},  frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#0A0082' },
  { flightNo:'6E-1801', airline:'IndiGo', from:'HYD', fromCity:'Hyderabad',      to:'BLR', toCity:'Bengaluru',     distKm:500,  durationMin:75,  fareINR:{eco:2800,  bus:null},  frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#0A0082' },

  // ══════════════════════════════════════════════════════
  // Air India (AI) — Full Service
  // ══════════════════════════════════════════════════════
  { flightNo:'AI-101',  airline:'Air India', from:'DEL', fromCity:'Delhi',       to:'BOM', toCity:'Mumbai',        distKm:1148, durationMin:130, fareINR:{eco:5200, bus:18000}, frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'23:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-201',  airline:'Air India', from:'DEL', fromCity:'Delhi',       to:'BLR', toCity:'Bengaluru',     distKm:1740, durationMin:165, fareINR:{eco:6000, bus:22000}, frequency:'Every 1.5 hr',    firstDep:'05:00', lastDep:'22:30', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-301',  airline:'Air India', from:'DEL', fromCity:'Delhi',       to:'MAA', toCity:'Chennai',       distKm:2180, durationMin:190, fareINR:{eco:6500, bus:24000}, frequency:'Every 2 hr',      firstDep:'05:30', lastDep:'22:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-401',  airline:'Air India', from:'BOM', fromCity:'Mumbai',      to:'BLR', toCity:'Bengaluru',     distKm:841,  durationMin:110, fareINR:{eco:4800, bus:17000}, frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-501',  airline:'Air India', from:'DEL', fromCity:'Delhi',       to:'HYD', toCity:'Hyderabad',     distKm:1253, durationMin:130, fareINR:{eco:5500, bus:20000}, frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'22:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-601',  airline:'Air India', from:'DEL', fromCity:'Delhi',       to:'ATQ', toCity:'Amritsar',      distKm:450,  durationMin:75,  fareINR:{eco:4000, bus:15000}, frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'20:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-701',  airline:'Air India', from:'BOM', fromCity:'Mumbai',      to:'HYD', toCity:'Hyderabad',     distKm:711,  durationMin:100, fareINR:{eco:4500, bus:16000}, frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'22:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-801',  airline:'Air India', from:'DEL', fromCity:'Delhi',       to:'GAU', toCity:'Guwahati',      distKm:1576, durationMin:155, fareINR:{eco:5800, bus:21000}, frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'20:00', alliance:'Star Alliance', color:'#CC0000' },
  { flightNo:'AI-901',  airline:'Air India', from:'CCU', fromCity:'Kolkata',     to:'DEL', toCity:'Delhi',         distKm:1305, durationMin:135, fareINR:{eco:5200, bus:19000}, frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'21:00', alliance:'Star Alliance', color:'#CC0000' },

  // ══════════════════════════════════════════════════════
  // SpiceJet (SG)
  // ══════════════════════════════════════════════════════
  { flightNo:'SG-101',  airline:'SpiceJet', from:'DEL', fromCity:'Delhi',        to:'BOM', toCity:'Mumbai',        distKm:1148, durationMin:130, fareINR:{eco:3800, bus:null},  frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'23:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'SG-201',  airline:'SpiceJet', from:'DEL', fromCity:'Delhi',        to:'BLR', toCity:'Bengaluru',     distKm:1740, durationMin:165, fareINR:{eco:4400, bus:null},  frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'SG-301',  airline:'SpiceJet', from:'BOM', fromCity:'Mumbai',       to:'GOI', toCity:'Goa',           distKm:451,  durationMin:65,  fareINR:{eco:2900, bus:null},  frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'SG-401',  airline:'SpiceJet', from:'DEL', fromCity:'Delhi',        to:'SXR', toCity:'Srinagar',      distKm:756,  durationMin:100, fareINR:{eco:3800, bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'19:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'SG-501',  airline:'SpiceJet', from:'DEL', fromCity:'Delhi',        to:'IXB', toCity:'Bagdogra',      distKm:1547, durationMin:150, fareINR:{eco:4200, bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'21:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'SG-601',  airline:'SpiceJet', from:'BOM', fromCity:'Mumbai',       to:'MAA', toCity:'Chennai',       distKm:1068, durationMin:120, fareINR:{eco:3500, bus:null},  frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF0000' },

  // ══════════════════════════════════════════════════════
  // Vistara (UK) — now merged into Air India
  // ══════════════════════════════════════════════════════
  { flightNo:'UK-101',  airline:'Vistara',  from:'DEL', fromCity:'Delhi',        to:'BOM', toCity:'Mumbai',        distKm:1148, durationMin:130, fareINR:{eco:5800, bus:21000}, frequency:'Every 1 hr',      firstDep:'05:30', lastDep:'23:00', alliance:'Star Alliance', color:'#8B0000' },
  { flightNo:'UK-201',  airline:'Vistara',  from:'DEL', fromCity:'Delhi',        to:'BLR', toCity:'Bengaluru',     distKm:1740, durationMin:165, fareINR:{eco:6200, bus:23000}, frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'22:00', alliance:'Star Alliance', color:'#8B0000' },
  { flightNo:'UK-301',  airline:'Vistara',  from:'DEL', fromCity:'Delhi',        to:'MAA', toCity:'Chennai',       distKm:2180, durationMin:190, fareINR:{eco:6800, bus:25000}, frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'21:00', alliance:'Star Alliance', color:'#8B0000' },
  { flightNo:'UK-401',  airline:'Vistara',  from:'BOM', fromCity:'Mumbai',       to:'BLR', toCity:'Bengaluru',     distKm:841,  durationMin:110, fareINR:{eco:5200, bus:18000}, frequency:'Every 1 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'Star Alliance', color:'#8B0000' },
  { flightNo:'UK-501',  airline:'Vistara',  from:'DEL', fromCity:'Delhi',        to:'HYD', toCity:'Hyderabad',     distKm:1253, durationMin:130, fareINR:{eco:6000, bus:22000}, frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'21:00', alliance:'Star Alliance', color:'#8B0000' },
  { flightNo:'UK-601',  airline:'Vistara',  from:'BOM', fromCity:'Mumbai',       to:'GOI', toCity:'Goa',           distKm:451,  durationMin:65,  fareINR:{eco:4200, bus:16000}, frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'21:00', alliance:'Star Alliance', color:'#8B0000' },
  { flightNo:'UK-701',  airline:'Vistara',  from:'DEL', fromCity:'Delhi',        to:'GAU', toCity:'Guwahati',      distKm:1576, durationMin:155, fareINR:{eco:6200, bus:23000}, frequency:'3/day',           firstDep:'07:00', lastDep:'18:00', alliance:'Star Alliance', color:'#8B0000' },

  // ══════════════════════════════════════════════════════
  // Air India Express (IX) — Budget international + domestic
  // ══════════════════════════════════════════════════════
  { flightNo:'IX-101',  airline:'Air India Express', from:'COK', fromCity:'Kochi',     to:'DEL', toCity:'Delhi',         distKm:2083, durationMin:195, fareINR:{eco:4200, bus:null},  frequency:'4/day',           firstDep:'05:30', lastDep:'21:00', alliance:'LCC', color:'#FF6600' },
  { flightNo:'IX-201',  airline:'Air India Express', from:'BOM', fromCity:'Mumbai',    to:'COK', toCity:'Kochi',         distKm:1100, durationMin:120, fareINR:{eco:3400, bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF6600' },
  { flightNo:'IX-301',  airline:'Air India Express', from:'BLR', fromCity:'Bengaluru', to:'COK', toCity:'Kochi',         distKm:360,  durationMin:60,  fareINR:{eco:2800, bus:null},  frequency:'Every 2 hr',      firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF6600' },
  { flightNo:'IX-401',  airline:'Air India Express', from:'DEL', fromCity:'Delhi',     to:'VTZ', toCity:'Visakhapatnam', distKm:1554, durationMin:150, fareINR:{eco:4000, bus:null},  frequency:'3/day',           firstDep:'07:00', lastDep:'19:00', alliance:'LCC', color:'#FF6600' },

  // ══════════════════════════════════════════════════════
  // AirAsia India (I5)
  // ══════════════════════════════════════════════════════
  { flightNo:'I5-101',  airline:'AirAsia India', from:'BLR', fromCity:'Bengaluru', to:'DEL', toCity:'Delhi',          distKm:1740, durationMin:165, fareINR:{eco:3600, bus:null},  frequency:'Every 2 hr',      firstDep:'05:30', lastDep:'22:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'I5-201',  airline:'AirAsia India', from:'BLR', fromCity:'Bengaluru', to:'BOM', toCity:'Mumbai',         distKm:841,  durationMin:110, fareINR:{eco:3000, bus:null},  frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'I5-301',  airline:'AirAsia India', from:'BLR', fromCity:'Bengaluru', to:'HYD', toCity:'Hyderabad',      distKm:500,  durationMin:75,  fareINR:{eco:2700, bus:null},  frequency:'Every 1.5 hr',    firstDep:'06:00', lastDep:'22:00', alliance:'LCC', color:'#FF0000' },
  { flightNo:'I5-401',  airline:'AirAsia India', from:'DEL', fromCity:'Delhi',     to:'GOI', toCity:'Goa',            distKm:1887, durationMin:170, fareINR:{eco:4000, bus:null},  frequency:'3/day',           firstDep:'06:00', lastDep:'21:00', alliance:'LCC', color:'#FF0000' },

  // ══════════════════════════════════════════════════════
  // Star Air (S5) — Regional
  // ══════════════════════════════════════════════════════
  { flightNo:'S5-101',  airline:'Star Air', from:'BLR', fromCity:'Bengaluru',    to:'HBX', toCity:'Hubli',           distKm:412,  durationMin:60,  fareINR:{eco:2500, bus:null},  frequency:'3/day',           firstDep:'07:00', lastDep:'18:00', alliance:'Regional', color:'#FF8C00' },
  { flightNo:'S5-201',  airline:'Star Air', from:'BLR', fromCity:'Bengaluru',    to:'BHJ', toCity:'Bhuj',            distKm:1250, durationMin:130, fareINR:{eco:3800, bus:null},  frequency:'2/day',           firstDep:'07:30', lastDep:'16:00', alliance:'Regional', color:'#FF8C00' },
  { flightNo:'S5-301',  airline:'Star Air', from:'BLR', fromCity:'Bengaluru',    to:'JGA', toCity:'Jamnagar',        distKm:1150, durationMin:125, fareINR:{eco:3500, bus:null},  frequency:'1/day',           firstDep:'09:00', lastDep:'09:00', alliance:'Regional', color:'#FF8C00' },

  // ══════════════════════════════════════════════════════
  // Regional/UDAN Routes (IndiGo / SpiceJet / Alliance Air)
  // ══════════════════════════════════════════════════════
  { flightNo:'9I-101',  airline:'Alliance Air', from:'DEL', fromCity:'Delhi',    to:'KUU', toCity:'Kullu-Manali',    distKm:400,  durationMin:65,  fareINR:{eco:3500, bus:null},  frequency:'2/day',           firstDep:'07:30', lastDep:'14:00', alliance:'Regional', color:'#666666' },
  { flightNo:'9I-201',  airline:'Alliance Air', from:'DEL', fromCity:'Delhi',    to:'DHM', toCity:'Dharamsala',      distKm:472,  durationMin:65,  fareINR:{eco:3500, bus:null},  frequency:'2/day',           firstDep:'07:30', lastDep:'14:00', alliance:'Regional', color:'#666666' },
  { flightNo:'9I-301',  airline:'Alliance Air', from:'DEL', fromCity:'Delhi',    to:'LKO', toCity:'Lucknow',         distKm:566,  durationMin:70,  fareINR:{eco:3000, bus:null},  frequency:'4/day',           firstDep:'07:00', lastDep:'20:00', alliance:'Regional', color:'#666666' },
  { flightNo:'6E-UDAN', airline:'IndiGo (UDAN)', from:'STV', fromCity:'Surat',  to:'DEL', toCity:'Delhi',           distKm:1100, durationMin:115, fareINR:{eco:2500, bus:null},  frequency:'2/day',           firstDep:'06:00', lastDep:'14:00', alliance:'UDAN', color:'#0A0082' },
  { flightNo:'SG-UDAN', airline:'SpiceJet (UDAN)', from:'BBI', fromCity:'Bhubaneswar', to:'BLR', toCity:'Bengaluru', distKm:1350, durationMin:145, fareINR:{eco:2500, bus:null},  frequency:'3/day', firstDep:'06:00', lastDep:'18:00', alliance:'UDAN', color:'#FF0000' },
];

module.exports = { INDIA_FLIGHT_ROUTES };
