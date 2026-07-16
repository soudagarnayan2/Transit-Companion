/**
 * All-India Bus Routes (Phase 0 — Curated)
 * ------------------------------------------
 * Covers all major State Road Transport Corporations and inter-city routes.
 *
 * Operators:
 *  MSRTC · KSRTC (Karnataka) · KSRTC (Kerala) · TNSTC · TSRTC · APSRTC ·
 *  UPSRTC · GSRTC · RSRTC · HRTC · HPRTC · OSRTC · WBTC · Haryana Roadways ·
 *  BSRTC · PEPSU (Punjab) · ASTC (Assam) · NBSTC · North East State Services
 */

const INDIA_BUS_ROUTES = [

  // ══════════════════════════════════════════════════════
  // MSRTC — Maharashtra State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'MSRTC-MUM-PUN',   operator:'MSRTC', state:'Maharashtra', type:'INTER_STATE_BUS', busClass:'AC Shivneri',   from:'Mumbai (Dadar)',     to:'Pune (Swargate)',       distKm:156, durationHr:3.5, fareINR:280, frequency:'Every 30 min', firstDep:'05:00', lastDep:'23:30', color:'#CC0000' },
  { routeId:'MSRTC-MUM-NAS',   operator:'MSRTC', state:'Maharashtra', type:'INTER_STATE_BUS', busClass:'Semi-Luxury',  from:'Mumbai (CBS)',       to:'Nashik (CBS)',          distKm:165, durationHr:3.0, fareINR:260, frequency:'Every 30 min', firstDep:'05:30', lastDep:'23:00', color:'#CC0000' },
  { routeId:'MSRTC-MUM-NAG',   operator:'MSRTC', state:'Maharashtra', type:'INTER_STATE_BUS', busClass:'Shivneri AC',  from:'Mumbai (Central)',   to:'Nagpur',                distKm:835, durationHr:13.0, fareINR:780, frequency:'Every 2 hr',  firstDep:'16:00', lastDep:'21:00', color:'#CC0000' },
  { routeId:'MSRTC-PUN-KOL',   operator:'MSRTC', state:'Maharashtra', type:'INTER_STATE_BUS', busClass:'Shivshahi AC', from:'Pune (Swargate)',    to:'Kolhapur',              distKm:228, durationHr:4.5, fareINR:450, frequency:'Every 90 min',firstDep:'05:30', lastDep:'23:00', color:'#CC0000' },
  { routeId:'MSRTC-PUN-AUR',   operator:'MSRTC', state:'Maharashtra', type:'INTER_STATE_BUS', busClass:'Shivshahi',    from:'Pune (Swargate)',    to:'Aurangabad',            distKm:235, durationHr:5.0, fareINR:350, frequency:'Every 1 hr',  firstDep:'06:00', lastDep:'22:00', color:'#CC0000' },
  { routeId:'MSRTC-NAG-HYD',   operator:'MSRTC', state:'Maharashtra', type:'INTER_STATE_BUS', busClass:'Sleeper',      from:'Nagpur',             to:'Hyderabad',             distKm:555, durationHr:9.0, fareINR:600, frequency:'3 per day',   firstDep:'19:00', lastDep:'22:00', color:'#CC0000' },

  // ══════════════════════════════════════════════════════
  // KSRTC — Karnataka State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'KSRTC-BLR-MYS',  operator:'KSRTC-KA', state:'Karnataka', type:'INTER_STATE_BUS', busClass:'Airavat AC',  from:'Bengaluru (Majestic)', to:'Mysuru',              distKm:143, durationHr:2.5, fareINR:210, frequency:'Every 15 min',firstDep:'05:00', lastDep:'23:00', color:'#CC0000' },
  { routeId:'KSRTC-BLR-HBL',  operator:'KSRTC-KA', state:'Karnataka', type:'INTER_STATE_BUS', busClass:'Airavat Gold', from:'Bengaluru (Shivajinagar)', to:'Hubli',          distKm:418, durationHr:7.0, fareINR:520, frequency:'Every 1 hr',  firstDep:'06:00', lastDep:'23:00', color:'#CC0000' },
  { routeId:'KSRTC-BLR-MNG',  operator:'KSRTC-KA', state:'Karnataka', type:'INTER_STATE_BUS', busClass:'Airavat Club', from:'Bengaluru',          to:'Mangaluru',             distKm:350, durationHr:7.0, fareINR:600, frequency:'Every 2 hr',  firstDep:'06:00', lastDep:'22:00', color:'#CC0000' },
  { routeId:'KSRTC-BLR-BDM',  operator:'KSRTC-KA', state:'Karnataka', type:'INTER_STATE_BUS', busClass:'Sleeper AC',   from:'Bengaluru',          to:'Bidar',                 distKm:680, durationHr:10.0,fareINR:750, frequency:'2 per day',   firstDep:'20:00', lastDep:'21:00', color:'#CC0000' },
  { routeId:'KSRTC-BLR-GOA',  operator:'KSRTC-KA', state:'Karnataka', type:'INTER_STATE_BUS', busClass:'Volvo AC',     from:'Bengaluru',          to:'Panaji (Goa)',           distKm:570, durationHr:10.0,fareINR:900, frequency:'5 per day',   firstDep:'18:00', lastDep:'21:00', color:'#CC0000' },

  // ══════════════════════════════════════════════════════
  // KSRTC — Kerala State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'KSRTC-KL-TRV-KOC', operator:'KSRTC-KL', state:'Kerala', type:'INTER_STATE_BUS', busClass:'Super Fast',    from:'Thiruvananthapuram', to:'Kochi (Ernakulam)',   distKm:220, durationHr:4.0, fareINR:175, frequency:'Every 30 min',firstDep:'04:30', lastDep:'22:30', color:'#FF6600' },
  { routeId:'KSRTC-KL-KOZ-TRV', operator:'KSRTC-KL', state:'Kerala', type:'INTER_STATE_BUS', busClass:'Super Deluxe',  from:'Kozhikode',          to:'Thiruvananthapuram',   distKm:430, durationHr:8.0, fareINR:360, frequency:'Every 1 hr',  firstDep:'05:00', lastDep:'22:00', color:'#FF6600' },
  { routeId:'KSRTC-KL-MNG-BLR', operator:'KSRTC-KL', state:'Kerala', type:'INTER_STATE_BUS', busClass:'Volvo AC',      from:'Mangaluru',          to:'Bengaluru',             distKm:360, durationHr:7.0, fareINR:580, frequency:'4 per day',   firstDep:'08:00', lastDep:'21:00', color:'#FF6600' },

  // ══════════════════════════════════════════════════════
  // TNSTC — Tamil Nadu State Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'TNSTC-CHN-COI',  operator:'TNSTC', state:'Tamil Nadu', type:'INTER_STATE_BUS', busClass:'Ultra Deluxe', from:'Chennai (CMBT)',     to:'Coimbatore',             distKm:495, durationHr:8.0, fareINR:400, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#003580' },
  { routeId:'TNSTC-CHN-MDR',  operator:'TNSTC', state:'Tamil Nadu', type:'INTER_STATE_BUS', busClass:'AC Sleeper',   from:'Chennai',            to:'Madurai',                distKm:465, durationHr:8.0, fareINR:380, frequency:'Every 45 min',firstDep:'05:30', lastDep:'23:00', color:'#003580' },
  { routeId:'TNSTC-CHN-TRZ',  operator:'TNSTC', state:'Tamil Nadu', type:'INTER_STATE_BUS', busClass:'Ultra Deluxe', from:'Chennai',            to:'Tiruchirappalli',        distKm:330, durationHr:6.0, fareINR:320, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#003580' },
  { routeId:'TNSTC-COI-OTY',  operator:'TNSTC', state:'Tamil Nadu', type:'INTER_STATE_BUS', busClass:'Ordinary',     from:'Coimbatore',         to:'Ooty (Nilgiris)',        distKm:86,  durationHr:2.5, fareINR:65,  frequency:'Every 30 min',firstDep:'06:00', lastDep:'20:00', color:'#003580' },

  // ══════════════════════════════════════════════════════
  // TSRTC — Telangana State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'TSRTC-HYD-VJA',  operator:'TSRTC', state:'Telangana', type:'INTER_STATE_BUS', busClass:'Volvo AC',     from:'Hyderabad (Mahatma Gandhi)',  to:'Vijayawada',       distKm:273, durationHr:5.0, fareINR:380, frequency:'Every 20 min',firstDep:'05:00', lastDep:'23:30', color:'#CC3300' },
  { routeId:'TSRTC-HYD-BLR',  operator:'TSRTC', state:'Telangana', type:'INTER_STATE_BUS', busClass:'Garuda AC',    from:'Hyderabad',          to:'Bengaluru',              distKm:575, durationHr:9.5, fareINR:700, frequency:'Every 30 min',firstDep:'06:00', lastDep:'23:00', color:'#CC3300' },
  { routeId:'TSRTC-HYD-MUM',  operator:'TSRTC', state:'Telangana', type:'INTER_STATE_BUS', busClass:'Sleeper AC',   from:'Hyderabad',          to:'Mumbai',                 distKm:711, durationHr:12.0,fareINR:900, frequency:'3 per day',   firstDep:'18:00', lastDep:'21:00', color:'#CC3300' },

  // ══════════════════════════════════════════════════════
  // APSRTC — Andhra Pradesh State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'APSRTC-VJA-VSK', operator:'APSRTC', state:'Andhra Pradesh', type:'INTER_STATE_BUS', busClass:'Volvo AC', from:'Vijayawada',  to:'Visakhapatnam',             distKm:365, durationHr:6.0, fareINR:450, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#006600' },
  { routeId:'APSRTC-VJA-TIR', operator:'APSRTC', state:'Andhra Pradesh', type:'INTER_STATE_BUS', busClass:'Super Luxury', from:'Vijayawada', to:'Tirupati',               distKm:366, durationHr:6.5, fareINR:420, frequency:'Every 1 hr',  firstDep:'05:30', lastDep:'22:00', color:'#006600' },
  { routeId:'APSRTC-VSK-HYD', operator:'APSRTC', state:'Andhra Pradesh', type:'INTER_STATE_BUS', busClass:'Sleeper AC', from:'Visakhapatnam', to:'Hyderabad',             distKm:620, durationHr:10.0,fareINR:650, frequency:'Every 2 hr',  firstDep:'17:00', lastDep:'22:00', color:'#006600' },

  // ══════════════════════════════════════════════════════
  // UPSRTC — Uttar Pradesh State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'UPSRTC-LKO-DEL',  operator:'UPSRTC', state:'Uttar Pradesh', type:'INTER_STATE_BUS', busClass:'Jan Rath AC',  from:'Lucknow (Alambagh)', to:'Delhi (ISBT Kashmere Gate)', distKm:577, durationHr:9.0, fareINR:550, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#006633' },
  { routeId:'UPSRTC-AGR-DEL',  operator:'UPSRTC', state:'Uttar Pradesh', type:'INTER_STATE_BUS', busClass:'Volvo AC',     from:'Agra (ISBT)',         to:'Delhi (ISBT)',               distKm:200, durationHr:3.5, fareINR:280, frequency:'Every 20 min',firstDep:'05:00', lastDep:'23:00', color:'#006633' },
  { routeId:'UPSRTC-VNS-ALH',  operator:'UPSRTC', state:'Uttar Pradesh', type:'INTER_STATE_BUS', busClass:'Super Fast',   from:'Varanasi',            to:'Allahabad (Prayagraj)',      distKm:126, durationHr:2.5, fareINR:120, frequency:'Every 30 min',firstDep:'06:00', lastDep:'22:00', color:'#006633' },
  { routeId:'UPSRTC-LKO-VNS',  operator:'UPSRTC', state:'Uttar Pradesh', type:'INTER_STATE_BUS', busClass:'AC Sleeper',   from:'Lucknow',             to:'Varanasi',                   distKm:340, durationHr:6.0, fareINR:320, frequency:'Every 1 hr',  firstDep:'06:00', lastDep:'23:00', color:'#006633' },

  // ══════════════════════════════════════════════════════
  // GSRTC — Gujarat State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'GSRTC-AMD-SUR',  operator:'GSRTC', state:'Gujarat', type:'INTER_STATE_BUS', busClass:'Volvo AC',    from:'Ahmedabad (Lal Darwaja)', to:'Surat',             distKm:270, durationHr:5.0, fareINR:300, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#003580' },
  { routeId:'GSRTC-AMD-VDR',  operator:'GSRTC', state:'Gujarat', type:'INTER_STATE_BUS', busClass:'Semi-Deluxe', from:'Ahmedabad',               to:'Vadodara',          distKm:110, durationHr:2.0, fareINR:130, frequency:'Every 20 min',firstDep:'05:30', lastDep:'23:00', color:'#003580' },
  { routeId:'GSRTC-AMD-RAJ',  operator:'GSRTC', state:'Gujarat', type:'INTER_STATE_BUS', busClass:'Volvo AC',    from:'Ahmedabad',               to:'Rajkot',            distKm:215, durationHr:3.5, fareINR:250, frequency:'Every 30 min',firstDep:'06:00', lastDep:'22:00', color:'#003580' },
  { routeId:'GSRTC-AMD-MUM',  operator:'GSRTC', state:'Gujarat', type:'INTER_STATE_BUS', busClass:'Sleeper AC',  from:'Ahmedabad',               to:'Mumbai',            distKm:530, durationHr:9.0, fareINR:600, frequency:'Every 1 hr',  firstDep:'18:00', lastDep:'22:30', color:'#003580' },

  // ══════════════════════════════════════════════════════
  // RSRTC — Rajasthan State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'RSRTC-JPR-DEL',  operator:'RSRTC', state:'Rajasthan', type:'INTER_STATE_BUS', busClass:'Volvo AC',   from:'Jaipur (Sindhi Camp)', to:'Delhi (ISBT)',      distKm:280, durationHr:5.0, fareINR:380, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#FF9900' },
  { routeId:'RSRTC-JPR-JDH',  operator:'RSRTC', state:'Rajasthan', type:'INTER_STATE_BUS', busClass:'Super Deluxe', from:'Jaipur',             to:'Jodhpur',           distKm:338, durationHr:5.5, fareINR:350, frequency:'Every 1 hr',  firstDep:'06:00', lastDep:'22:00', color:'#FF9900' },
  { routeId:'RSRTC-JPR-UDR',  operator:'RSRTC', state:'Rajasthan', type:'INTER_STATE_BUS', busClass:'Volvo AC',   from:'Jaipur',             to:'Udaipur',           distKm:395, durationHr:7.0, fareINR:450, frequency:'Every 2 hr',  firstDep:'06:00', lastDep:'22:00', color:'#FF9900' },

  // ══════════════════════════════════════════════════════
  // HRTC — Himachal Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'HRTC-SML-DEL',   operator:'HRTC', state:'Himachal Pradesh', type:'INTER_STATE_BUS', busClass:'Volvo AC',  from:'Shimla',          to:'Delhi (ISBT)',      distKm:370, durationHr:8.0, fareINR:680, frequency:'Every 2 hr',  firstDep:'07:00', lastDep:'23:00', color:'#990000' },
  { routeId:'HRTC-SML-CHD',   operator:'HRTC', state:'Himachal Pradesh', type:'INTER_STATE_BUS', busClass:'Ordinary',  from:'Shimla',          to:'Chandigarh',        distKm:113, durationHr:3.0, fareINR:110, frequency:'Every 1 hr',  firstDep:'06:00', lastDep:'21:00', color:'#990000' },
  { routeId:'HRTC-MNL-CHD',   operator:'HRTC', state:'Himachal Pradesh', type:'INTER_STATE_BUS', busClass:'Semi-Luxury', from:'Manali',        to:'Chandigarh',        distKm:310, durationHr:10.0,fareINR:650, frequency:'3 per day',   firstDep:'07:00', lastDep:'19:00', color:'#990000' },
  { routeId:'HRTC-DHM-DEL',   operator:'HRTC', state:'Himachal Pradesh', type:'INTER_STATE_BUS', busClass:'Volvo AC',  from:'Dharamsala/McLeod Ganj', to:'Delhi',        distKm:485, durationHr:11.0',fareINR:850, frequency:'3 per day',  firstDep:'18:00', lastDep:'21:00', color:'#990000' },

  // ══════════════════════════════════════════════════════
  // OSRTC — Odisha State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'OSRTC-BBN-KLK',  operator:'OSRTC', state:'Odisha', type:'INTER_STATE_BUS', busClass:'Volvo AC',   from:'Bhubaneswar',     to:'Kolkata',           distKm:465, durationHr:9.0, fareINR:550, frequency:'Every 2 hr',  firstDep:'06:00', lastDep:'23:00', color:'#006666' },
  { routeId:'OSRTC-BBN-VIS',  operator:'OSRTC', state:'Odisha', type:'INTER_STATE_BUS', busClass:'Super Deluxe', from:'Bhubaneswar',   to:'Visakhapatnam',     distKm:435, durationHr:8.0, fareINR:500, frequency:'Every 3 hr',  firstDep:'07:00', lastDep:'23:00', color:'#006666' },

  // ══════════════════════════════════════════════════════
  // WBTC — West Bengal Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'WBTC-KOL-SIL',   operator:'WBTC', state:'West Bengal', type:'INTER_STATE_BUS', busClass:'Rocket AC', from:'Kolkata (Esplanade)', to:'Siliguri',         distKm:592, durationHr:10.0,fareINR:600, frequency:'Every 1 hr',  firstDep:'18:00', lastDep:'22:00', color:'#003366' },
  { routeId:'WBTC-KOL-DIG',   operator:'WBTC', state:'West Bengal', type:'INTER_STATE_BUS', busClass:'Rocket',    from:'Kolkata',         to:'Digha',             distKm:187, durationHr:4.0, fareINR:180, frequency:'Every 45 min',firstDep:'06:00', lastDep:'22:00', color:'#003366' },

  // ══════════════════════════════════════════════════════
  // PEPSU / Punjab Roadways
  // ══════════════════════════════════════════════════════
  { routeId:'PRTC-CHD-DEL',   operator:'PEPSU', state:'Punjab', type:'INTER_STATE_BUS', busClass:'Volvo AC',   from:'Chandigarh',      to:'Delhi',             distKm:248, durationHr:4.5, fareINR:350, frequency:'Every 20 min',firstDep:'05:00', lastDep:'23:00', color:'#003399' },
  { routeId:'PRTC-CHD-AMR',   operator:'PEPSU', state:'Punjab', type:'INTER_STATE_BUS', busClass:'AC Deluxe',  from:'Chandigarh',      to:'Amritsar',          distKm:230, durationHr:4.0, fareINR:280, frequency:'Every 30 min',firstDep:'05:00', lastDep:'22:00', color:'#003399' },
  { routeId:'PRTC-LDH-DEL',   operator:'PEPSU', state:'Punjab', type:'INTER_STATE_BUS', busClass:'Volvo AC',   from:'Ludhiana',        to:'Delhi',             distKm:310, durationHr:5.5, fareINR:380, frequency:'Every 30 min',firstDep:'05:00', lastDep:'23:00', color:'#003399' },

  // ══════════════════════════════════════════════════════
  // BSRTC — Bihar State Road Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'BSRTC-PAT-DEL',  operator:'BSRTC', state:'Bihar', type:'INTER_STATE_BUS', busClass:'Volvo AC',   from:'Patna (Mithapur)', to:'Delhi',              distKm:1060,durationHr:16.0,fareINR:950, frequency:'2 per day',   firstDep:'17:00', lastDep:'19:00', color:'#990099' },
  { routeId:'BSRTC-PAT-RNC',  operator:'BSRTC', state:'Bihar', type:'INTER_STATE_BUS', busClass:'Ordinary',   from:'Patna',            to:'Ranchi',             distKm:337, durationHr:7.0, fareINR:280, frequency:'Every 2 hr',  firstDep:'06:00', lastDep:'22:00', color:'#990099' },

  // ══════════════════════════════════════════════════════
  // ASTC — Assam State Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'ASTC-GUW-KOM',   operator:'ASTC', state:'Assam', type:'INTER_STATE_BUS', busClass:'Ordinary',   from:'Guwahati (ISBT)',  to:'Kohima (Nagaland)',  distKm:295, durationHr:7.0, fareINR:280, frequency:'3 per day',   firstDep:'06:00', lastDep:'14:00', color:'#660033' },
  { routeId:'ASTC-GUW-SIL',   operator:'ASTC', state:'Assam', type:'INTER_STATE_BUS', busClass:'AC Express',  from:'Guwahati',         to:'Silchar',            distKm:315, durationHr:8.0, fareINR:350, frequency:'Every 2 hr',  firstDep:'06:00', lastDep:'22:00', color:'#660033' },

  // ══════════════════════════════════════════════════════
  // HARYANA ROADWAYS
  // ══════════════════════════════════════════════════════
  { routeId:'HRRW-CHD-DEL',   operator:'Haryana Roadways', state:'Haryana', type:'INTER_STATE_BUS', busClass:'AC Volvo', from:'Chandigarh', to:'Delhi', distKm:250, durationHr:4.5, fareINR:300, frequency:'Every 20 min',firstDep:'05:00', lastDep:'23:00', color:'#006600' },
  { routeId:'HRRW-GGN-DEL',   operator:'Haryana Roadways', state:'Haryana', type:'INTER_STATE_BUS', busClass:'Ordinary', from:'Gurugram', to:'Delhi', distKm:32, durationHr:1.5, fareINR:40, frequency:'Every 10 min',firstDep:'05:00', lastDep:'23:00', color:'#006600' },

  // ══════════════════════════════════════════════════════
  // J&K Road Transport / Himachal HRTC Mountain Routes
  // ══════════════════════════════════════════════════════
  { routeId:'JK-SRTC-SRG-LEH', operator:'J&K SRTC', state:'Jammu & Kashmir', type:'INTER_STATE_BUS', busClass:'Ordinary (seasonal)', from:'Srinagar', to:'Leh (via Zoji La)', distKm:434, durationHr:12.0,fareINR:500, frequency:'Daily (summer only)', firstDep:'04:00', lastDep:'04:00', color:'#336699' },
  { routeId:'JK-SRTC-JAM-SRG', operator:'J&K SRTC', state:'Jammu & Kashmir', type:'INTER_STATE_BUS', busClass:'Deluxe AC', from:'Jammu', to:'Srinagar (via Jawahar Tunnel)', distKm:293, durationHr:8.0, fareINR:550, frequency:'Every 2 hr',  firstDep:'04:00', lastDep:'11:00', color:'#336699' },

  // ══════════════════════════════════════════════════════
  // GOA KTCL — Kadamba Transport Corporation
  // ══════════════════════════════════════════════════════
  { routeId:'KTCL-PNJ-MUM',   operator:'KTCL (Goa)', state:'Goa', type:'INTER_STATE_BUS', busClass:'Semi-Luxury', from:'Panaji (Kadamba)', to:'Mumbai', distKm:590, durationHr:10.0,fareINR:700, frequency:'3 per day', firstDep:'08:00', lastDep:'22:00', color:'#006633' },
  { routeId:'KTCL-PNJ-BLR',   operator:'KTCL (Goa)', state:'Goa', type:'INTER_STATE_BUS', busClass:'Volvo AC', from:'Panaji', to:'Bengaluru', distKm:560, durationHr:10.0,fareINR:850, frequency:'2 per day', firstDep:'19:00', lastDep:'21:00', color:'#006633' },
];

module.exports = { INDIA_BUS_ROUTES };
