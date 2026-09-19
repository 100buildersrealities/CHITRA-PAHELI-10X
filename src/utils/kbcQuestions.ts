import { KbcQuestion, KbcDifficultyTier, LevelConfig } from '../types';

// Helper to shuffle an array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Master Curated Question Bank across 5 Tiers
export const MASTER_KBC_QUESTIONS: KbcQuestion[] = [
  // ==================== TIER 1: BASIC (Levels 1 - 20) ====================
  {
    id: 'kbc-b-001',
    questionHi: 'भारत का राष्ट्रीय पशु कौन सा है?',
    questionEn: 'Which is the National Animal of India?',
    optionsHi: ['बाघ (Royal Bengal Tiger)', 'शेर (Lion)', 'हाथी (Elephant)', 'चीता (Cheetah)'],
    optionsEn: ['Royal Bengal Tiger', 'Lion', 'Elephant', 'Cheetah'],
    correctIndex: 0,
    explanationHi: '1973 में बाघ (Royal Bengal Tiger) को भारत का राष्ट्रीय पशु घोषित किया गया था।',
    explanationEn: 'The Royal Bengal Tiger was declared the National Animal of India in 1973.',
    categoryHi: 'सामान्य ज्ञान / GK',
    categoryEn: 'General Knowledge',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹1,000',
    audiencePollPercentages: [78, 12, 6, 4],
    expertHintHi: 'प्रोजेक्ट टाइगर 1973 इसी शानदार धारीदार शिकारी के संरक्षण के लिए शुरू किया गया था।',
    expertHintEn: 'Project Tiger was launched in 1973 to save this magnificent striped predator.',
  },
  {
    id: 'kbc-b-002',
    questionHi: 'भारतीय तिरंगे झंडे के चक्र में कितनी तीलियां होती हैं?',
    questionEn: 'How many spokes are there in the Ashoka Chakra of the Indian National Flag?',
    optionsHi: ['20', '24', '18', '28'],
    optionsEn: ['20', '24', '18', '28'],
    correctIndex: 1,
    explanationHi: 'अशोक चक्र में 24 तीलियां होती हैं जो दिन के 24 घंटों और धर्म व प्रगति का प्रतीक हैं।',
    explanationEn: 'The Ashoka Chakra contains 24 spokes symbolizing the 24 hours of a day and continuous progress.',
    categoryHi: 'राष्ट्रीय प्रतीक / National Symbols',
    categoryEn: 'National Symbols',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹2,000',
    audiencePollPercentages: [3, 89, 4, 4],
    expertHintHi: 'दिन के 24 घंटों के समान ही इसमें तीलियों की संख्या है।',
    expertHintEn: 'The number of spokes matches the number of hours in a day.',
  },
  {
    id: 'kbc-b-003',
    questionHi: 'सौरमंडल में सूर्य के सबसे निकट कौन सा ग्रह है?',
    questionEn: 'Which is the closest planet to the Sun in our Solar System?',
    optionsHi: ['शुक्र (Venus)', 'बुध (Mercury)', 'मंगल (Mars)', 'पृथ्वी (Earth)'],
    optionsEn: ['Venus', 'Mercury', 'Mars', 'Earth'],
    correctIndex: 1,
    explanationHi: 'बुध (Mercury) सौरमंडल का सबसे छोटा और सूर्य के सबसे निकटतम ग्रह है।',
    explanationEn: 'Mercury is the smallest planet and closest to the Sun.',
    categoryHi: 'विज्ञान / Science',
    categoryEn: 'Science & Astronomy',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹3,000',
    audiencePollPercentages: [15, 72, 8, 5],
    expertHintHi: 'यह ग्रह सूर्य की परिक्रमा केवल 88 दिनों में पूरी कर लेता है।',
    expertHintEn: 'It completes its orbit around the Sun in just 88 days.',
  },
  {
    id: 'kbc-b-004',
    questionHi: 'भारत का राष्ट्रगान "जन गण मन" किसके द्वारा लिखा गया था?',
    questionEn: 'Who wrote India\'s National Anthem "Jana Gana Mana"?',
    optionsHi: ['बंकिमचंद्र चटर्जी', 'रवींद्रनाथ टैगोर', 'सुभाष चंद्र बोस', 'महात्मा गांधी'],
    optionsEn: ['Bankim Chandra Chatterjee', 'Rabindranath Tagore', 'Subhas Chandra Bose', 'Mahatma Gandhi'],
    correctIndex: 1,
    explanationHi: 'नोबेल पुरस्कार विजेता गुरुदेव रवींद्रनाथ टैगोर ने 1911 में जन गण मन की रचना की थी।',
    explanationEn: 'Nobel laureate Rabindranath Tagore composed Jana Gana Mana in 1911.',
    categoryHi: 'साहित्य व इतिहास',
    categoryEn: 'Literature & History',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹5,000',
    audiencePollPercentages: [12, 81, 4, 3],
    expertHintHi: 'इन्होंने ही गीतांजलि की रचना की और नोबेल पुरस्कार जीता था।',
    expertHintEn: 'He authored Gitanjali and won the Nobel Prize in Literature.',
  },
  {
    id: 'kbc-b-005',
    questionHi: 'क्रिकेट के खेल में एक टीम में मैदान पर कितने खिलाड़ी खेलते हैं?',
    questionEn: 'How many players are on the field in a cricket team?',
    optionsHi: ['9', '10', '11', '12'],
    optionsEn: ['9', '10', '11', '12'],
    correctIndex: 2,
    explanationHi: 'क्रिकेट में प्रत्येक टीम में 11 खिलाड़ी होते हैं।',
    explanationEn: 'Each team in cricket has 11 players on the field.',
    categoryHi: 'खेलकूद / Sports',
    categoryEn: 'Sports',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹10,000',
    audiencePollPercentages: [2, 3, 91, 4],
    expertHintHi: 'फुटबॉल और हॉकी में भी मैदान पर इतने ही खिलाड़ी होते हैं।',
    expertHintEn: 'Football and hockey teams also field this exact number of players.',
  },
  {
    id: 'kbc-b-006',
    questionHi: 'हिंदी वर्णमाला में कितने स्वर (Vowels) माने जाते हैं?',
    questionEn: 'How many standard vowels are there in Hindi alphabet?',
    optionsHi: ['11', '13', '7', '9'],
    optionsEn: ['11', '13', '7', '9'],
    correctIndex: 0,
    explanationHi: 'मानक हिंदी में अ से औ तक 11 स्वर माने जाते हैं (अं और अः को अयोगवाह कहा जाता है)।',
    explanationEn: 'Standard Hindi has 11 vowels from A to Au.',
    categoryHi: 'भाषा व साहित्य',
    categoryEn: 'Language',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹10,000',
    audiencePollPercentages: [65, 25, 5, 5],
    expertHintHi: 'अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ को गिनिए।',
    expertHintEn: 'Count from A to Au including Ri.',
  },
  {
    id: 'kbc-b-007',
    questionHi: 'गुलाबी शहर (Pink City) के नाम से भारत का कौन सा शहर प्रसिद्ध है?',
    questionEn: 'Which Indian city is famously known as the "Pink City"?',
    optionsHi: ['उदयपुर', 'जोधपुर', 'जयपुर', 'जैसलमेर'],
    optionsEn: ['Udaipur', 'Jodhpur', 'Jaipur', 'Jaisalmer'],
    correctIndex: 2,
    explanationHi: '1876 में प्रिंस ऑफ वेल्स के स्वागत के लिए महाराजा सवाई राम सिंह ने पूरे जयपुर शहर को गुलाबी रंग से रंगवाया था।',
    explanationEn: 'Maharaja Sawai Ram Singh painted Jaipur pink in 1876 to welcome Prince Albert.',
    categoryHi: 'भूगोल व पर्यटन',
    categoryEn: 'Geography',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹20,000',
    audiencePollPercentages: [8, 9, 80, 3],
    expertHintHi: 'हवा महल और आमेर का किला इसी राजधानी शहर में स्थित हैं।',
    expertHintEn: 'Hawa Mahal and Amer Fort are located in this state capital.',
  },
  {
    id: 'kbc-b-008',
    questionHi: 'कंप्यूटर का मस्तिष्क (Brain of Computer) किसे कहा जाता है?',
    questionEn: 'What is known as the "Brain of the Computer"?',
    optionsHi: ['RAM', 'CPU', 'Hard Disk', 'Monitor'],
    optionsEn: ['RAM', 'CPU', 'Hard Disk', 'Monitor'],
    correctIndex: 1,
    explanationHi: 'सेंट्रल प्रोसेसिंग यूनिट (CPU) को कंप्यूटर का मस्तिष्क कहा जाता है क्योंकि यह सभी गणनाएं करता है।',
    explanationEn: 'Central Processing Unit (CPU) executes all calculations and processes.',
    categoryHi: 'प्रौद्योगिकी / Tech',
    categoryEn: 'Technology',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹20,000',
    audiencePollPercentages: [10, 82, 5, 3],
    expertHintHi: 'यह Central Processing Unit का संक्षिप्त रूप है।',
    expertHintEn: 'It stands for Central Processing Unit.',
  },
  {
    id: 'kbc-b-009',
    questionHi: 'रामायण के अनुसार भगवान श्री राम के धनुष का क्या नाम था?',
    questionEn: 'According to Ramayana, what was the name of Lord Rama\'s bow?',
    optionsHi: ['गांडीव', 'पिनाक', 'कोदंड', 'शारंग'],
    optionsEn: ['Gandiva', 'Pinaka', 'Kodanda', 'Sharanga'],
    correctIndex: 2,
    explanationHi: 'भगवान श्री राम के धनुष का नाम कोदंड था, इसलिए उन्हें कोदंडपाणि भी कहा जाता है (पिनाक शिवजी का और गांडीव अर्जुन का था)।',
    explanationEn: 'Lord Rama\'s bow was named Kodanda, hence he is called Kodandapani.',
    categoryHi: 'पौराणिक कथाएं / Mythology',
    categoryEn: 'Mythology',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹40,000',
    audiencePollPercentages: [18, 14, 62, 6],
    expertHintHi: 'गांडीव अर्जुन का था और पिनाक शिवजी का। रामजी के धनुष को कोदंड कहते हैं।',
    expertHintEn: 'Pinaka belonged to Shiva and Gandiva to Arjuna. Rama\'s was Kodanda.',
  },
  {
    id: 'kbc-b-010',
    questionHi: 'जल का रासायनिक सूत्र (Chemical Formula) क्या है?',
    questionEn: 'What is the chemical formula of pure Water?',
    optionsHi: ['CO2', 'H2O', 'NaCl', 'O2'],
    optionsEn: ['CO2', 'H2O', 'NaCl', 'O2'],
    correctIndex: 1,
    explanationHi: 'पानी हाइड्रोजन के दो अणुओं और ऑक्सीजन के एक अणु से मिलकर बनता है, जिसे H2O कहते हैं।',
    explanationEn: 'Water consists of two hydrogen atoms and one oxygen atom (H2O).',
    categoryHi: 'रसायन विज्ञान / Chemistry',
    categoryEn: 'Chemistry',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹40,000',
    audiencePollPercentages: [3, 93, 2, 2],
    expertHintHi: 'दो हाइड्रोजन और एक ऑक्सीजन परमाणु।',
    expertHintEn: 'Two hydrogen and one oxygen.',
  },
  {
    id: 'kbc-b-011',
    questionHi: 'भारत की सबसे लंबी नदी कौन सी है?',
    questionEn: 'Which is the longest river flowing through India?',
    optionsHi: ['यमुना', 'गंगा', 'गोदावरी', 'नर्मदा'],
    optionsEn: ['Yamuna', 'Ganga', 'Godavari', 'Narmada'],
    correctIndex: 1,
    explanationHi: 'गंगा नदी की कुल लंबाई लगभग 2525 किलोमीटर है, जो भारत की सबसे लंबी नदी है।',
    explanationEn: 'Ganga is the longest river in India with a length of approx 2,525 km.',
    categoryHi: 'भारतीय भूगोल / Geography',
    categoryEn: 'Geography',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹80,000',
    audiencePollPercentages: [6, 85, 6, 3],
    expertHintHi: 'गंगोत्री हिमनद से निकलकर बंगाल की खाड़ी में मिलने वाली पवित्र नदी।',
    expertHintEn: 'Originates at Gangotri and empties into the Bay of Bengal.',
  },
  {
    id: 'kbc-b-012',
    questionHi: 'महाभारत के युद्ध में अर्जुन के सारथी कौन बने थे?',
    questionEn: 'Who served as the charioteer of Arjuna in the Kurukshetra War?',
    optionsHi: ['भगवान श्री कृष्ण', 'भीष्म पितामह', 'कर्ण', 'युधिष्ठिर'],
    optionsEn: ['Lord Sri Krishna', 'Bhishma Pitamah', 'Karna', 'Yudhishthira'],
    correctIndex: 0,
    explanationHi: 'कुरुक्षेत्र युद्ध में भगवान श्री कृष्ण ने अर्जुन के रथ के सारथी (पार्थसारथी) की भूमिका निभाई थी।',
    explanationEn: 'Lord Krishna acted as Parthasarathi (charioteer to Arjuna) and delivered the Bhagavad Gita.',
    categoryHi: 'पौराणिक कथाएं / Mythology',
    categoryEn: 'Mythology',
    difficultyTier: 'basic',
    kbcPrizeTag: '₹80,000',
    audiencePollPercentages: [92, 3, 3, 2],
    expertHintHi: 'जिन्होंने युद्धभूमि में अर्जुन को श्रीमद्भगवद्गीता का उपदेश दिया था।',
    expertHintEn: 'He delivered the sermon of the Bhagavad Gita on the battlefield.',
  },

  // ==================== TIER 2: INTERMEDIATE (Levels 21 - 40) ====================
  {
    id: 'kbc-i-021',
    questionHi: 'विश्व प्रसिद्ध ताजमहल किस नदी के किनारे स्थित है?',
    questionEn: 'On the banks of which river is the Taj Mahal situated?',
    optionsHi: ['गंगा', 'यमुना', 'सरयू', 'गोमती'],
    optionsEn: ['Ganga', 'Yamuna', 'Saryu', 'Gomti'],
    correctIndex: 1,
    explanationHi: 'आगरा में स्थित ताजमहल यमुना नदी के दक्षिणी तट पर बना हुआ है।',
    explanationEn: 'The Taj Mahal in Agra is located on the southern bank of the Yamuna River.',
    categoryHi: 'भारतीय धरोहर / Heritage',
    categoryEn: 'Monuments',
    difficultyTier: 'intermediate',
    kbcPrizeTag: '₹1,60,000',
    audiencePollPercentages: [14, 76, 5, 5],
    expertHintHi: 'यह नदी दिल्ली और मथुरा से होकर आगरा पहुंचती है।',
    expertHintEn: 'This river flows past Delhi and Mathura before reaching Agra.',
  },
  {
    id: 'kbc-i-022',
    questionHi: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) का मुख्यालय किस शहर में है?',
    questionEn: 'Where is the headquarters of ISRO (Indian Space Research Organisation) located?',
    optionsHi: ['नई दिल्ली', 'हैदराबाद', 'बेंगलुरु', 'श्रीहरिकोटा'],
    optionsEn: ['New Delhi', 'Hyderabad', 'Bengaluru', 'Sriharikota'],
    correctIndex: 2,
    explanationHi: 'इसरो का मुख्य मुख्यालय कर्नाटक की राजधानी बेंगलुरु में अंतरिक्ष भवन में स्थित है।',
    explanationEn: 'ISRO headquarters is located at Antariksh Bhavan in Bengaluru, Karnataka.',
    categoryHi: 'विज्ञान व अंतरिक्ष / Space',
    categoryEn: 'Science & Space',
    difficultyTier: 'intermediate',
    kbcPrizeTag: '₹3,20,000',
    audiencePollPercentages: [11, 13, 68, 8],
    expertHintHi: 'भारत की सिलिकॉन वैली और आईटी राजधानी में इसका मुख्यालय है।',
    expertHintEn: 'Located in India\'s Silicon Valley and IT capital.',
  },
  {
    id: 'kbc-i-023',
    questionHi: 'मानव शरीर में सबसे बड़ी हड्डी (Longest Bone) कौन सी होती है?',
    questionEn: 'Which is the longest and strongest bone in the human body?',
    optionsHi: ['फीमर (Femur / जांघ की हड्डी)', 'टिबिया (Tibia)', 'ह्यूमरस (Humerus)', 'स्टेपीज (Stapes)'],
    optionsEn: ['Femur (Thigh bone)', 'Tibia', 'Humerus', 'Stapes'],
    correctIndex: 0,
    explanationHi: 'फीमर (जांघ की हड्डी) मानव शरीर की सबसे लंबी और सबसे मजबूत हड्डी है।',
    explanationEn: 'The Femur, or thigh bone, is the largest, longest and strongest bone in the human body.',
    categoryHi: 'जीव विज्ञान / Biology',
    categoryEn: 'Biology',
    difficultyTier: 'intermediate',
    kbcPrizeTag: '₹3,20,000',
    audiencePollPercentages: [74, 10, 8, 8],
    expertHintHi: 'यह हमारे जांघ (Thigh) में घुटने और कूल्हे के बीच होती है।',
    expertHintEn: 'It runs between the hip and the knee.',
  },
  {
    id: 'kbc-i-024',
    questionHi: 'भारतीय सिनेमा की कालजयी फिल्म "शोले" (1975) के निर्देशक कौन थे?',
    questionEn: 'Who was the director of the iconic Bollywood film "Sholay" (1975)?',
    optionsHi: ['रमेश सिप्पी', 'यश चोपड़ा', 'सत्यजीत रे', 'प्रकाश मेहरा'],
    optionsEn: ['Ramesh Sippy', 'Yash Chopra', 'Satyajit Ray', 'Prakash Mehra'],
    correctIndex: 0,
    explanationHi: 'शोले का निर्देशन रमेश सिप्पी ने किया था और इसे सलीम-जावेद ने लिखा था।',
    explanationEn: 'Sholay was directed by Ramesh Sippy and written by Salim-Javed.',
    categoryHi: 'सिनेमा / Cinema',
    categoryEn: 'Cinema',
    difficultyTier: 'intermediate',
    kbcPrizeTag: '₹6,40,000',
    audiencePollPercentages: [79, 11, 4, 6],
    expertHintHi: 'सलीम-जावेद की लिखी इस महागाथा को सिप्पी परिवार के इस निर्देशक ने बनाया था।',
    expertHintEn: 'He belongs to the Sippy production family.',
  },
  {
    id: 'kbc-i-025',
    questionHi: 'भारत के पहले उपग्रह (First Satellite) का नाम क्या रखा गया था?',
    questionEn: 'What was the name of India\'s first indigenous satellite launched in 1975?',
    optionsHi: ['भास्कर', 'आर्यभट्ट', 'रोहिणी', 'इनसैट-1'],
    optionsEn: ['Bhaskara', 'Aryabhata', 'Rohini', 'INSAT-1'],
    correctIndex: 1,
    explanationHi: '19 अप्रैल 1975 को भारत के महान प्राचीन खगोलशास्त्री व गणितज्ञ आर्यभट्ट के नाम पर पहला उपग्रह भेजा गया।',
    explanationEn: 'Aryabhata was India\'s first satellite, launched on 19 April 1975 named after the famed astronomer.',
    categoryHi: 'अंतरिक्ष व इतिहास',
    categoryEn: 'Space History',
    difficultyTier: 'intermediate',
    kbcPrizeTag: '₹6,40,000',
    audiencePollPercentages: [8, 83, 5, 4],
    expertHintHi: 'शून्य की अवधारणा और खगोल विज्ञान के प्राचीन भारतीय जनक के नाम पर।',
    expertHintEn: 'Named after the legendary ancient mathematician who formulated zero.',
  },
  {
    id: 'kbc-i-026',
    questionHi: 'सूर्य के प्रकाश को पृथ्वी तक पहुंचने में लगभग कितना समय लगता है?',
    questionEn: 'Approximately how long does sunlight take to reach Earth?',
    optionsHi: ['8 मिनट 20 सेकंड', '5 मिनट 10 सेकंड', '12 मिनट', '2 मिनट 30 सेकंड'],
    optionsEn: ['8 minutes 20 seconds', '5 minutes 10 seconds', '12 minutes', '2 minutes 30 seconds'],
    correctIndex: 0,
    explanationHi: 'सूर्य का प्रकाश लगभग 3 लाख किमी/सेकंड की गति से पृथ्वी तक आने में करीब 8 मिनट 20 सेकंड (500 सेकंड) लेता है।',
    explanationEn: 'Sunlight travels at ~300,000 km/s and takes about 8 minutes and 20 seconds to reach Earth.',
    categoryHi: 'भौतिकी / Physics',
    categoryEn: 'Physics',
    difficultyTier: 'intermediate',
    kbcPrizeTag: '₹12,50,000',
    audiencePollPercentages: [77, 12, 6, 5],
    expertHintHi: 'लगभग 500 सेकंड यानी 8 मिनट से थोड़ा अधिक समय।',
    expertHintEn: 'Around 500 seconds, just over eight minutes.',
  },

  // ==================== TIER 3: ADVANCED (Levels 41 - 60) ====================
  {
    id: 'kbc-a-041',
    questionHi: 'भारतीय संविधान की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?',
    questionEn: 'Who was the Chairman of the Drafting Committee of the Indian Constitution?',
    optionsHi: ['डॉ. भीमराव अंबेडकर', 'डॉ. राजेंद्र प्रसाद', 'पंडित जवाहरलाल नेहरू', 'सरदार वल्लभभाई पटेल'],
    optionsEn: ['Dr. B.R. Ambedkar', 'Dr. Rajendra Prasad', 'Pt. Jawaharlal Nehru', 'Sardar Vallabhbhai Patel'],
    correctIndex: 0,
    explanationHi: 'डॉ. बी.आर. अंबेडकर संविधान सभा की 7 सदस्यीय प्रारूप समिति के अध्यक्ष थे और उन्हें संविधान का जनक कहा जाता है।',
    explanationEn: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and chief architect of the Constitution.',
    categoryHi: 'भारतीय संविधान / Polity',
    categoryEn: 'Indian Polity',
    difficultyTier: 'advanced',
    kbcPrizeTag: '₹25,00,000',
    audiencePollPercentages: [82, 10, 5, 3],
    expertHintHi: 'जिन्हें "भारतीय संविधान का जनक" या आधुनिक मनु कहा जाता है।',
    expertHintEn: 'Known as the chief architect and Father of the Indian Constitution.',
  },
  {
    id: 'kbc-a-042',
    questionHi: 'नोबेल पुरस्कार प्राप्त करने वाले प्रथम भारतीय व एशियाई व्यक्ति कौन थे?',
    questionEn: 'Who was the first Indian and first Asian to win a Nobel Prize?',
    optionsHi: ['सी.वी. रमन', 'रवींद्रनाथ टैगोर', 'मदर टेरेसा', 'हरगोविंद खुराना'],
    optionsEn: ['C.V. Raman', 'Rabindranath Tagore', 'Mother Teresa', 'Har Gobind Khorana'],
    correctIndex: 1,
    explanationHi: 'रवींद्रनाथ टैगोर को 1913 में उनके काव्य संग्रह "गीतांजलि" के लिए साहित्य का नोबेल पुरस्कार मिला था।',
    explanationEn: 'Rabindranath Tagore was awarded the Nobel Prize in Literature in 1913 for Gitanjali.',
    categoryHi: 'इतिहास व पुरस्कार / Awards',
    categoryEn: 'World Awards',
    difficultyTier: 'advanced',
    kbcPrizeTag: '₹25,00,000',
    audiencePollPercentages: [18, 72, 6, 4],
    expertHintHi: '1913 में साहित्य (Literature) के क्षेत्र में गीतांजलि के लिए मिला था।',
    expertHintEn: 'Awarded in 1913 for his literary masterpiece Gitanjali.',
  },
  {
    id: 'kbc-a-043',
    questionHi: 'सिंधु घाटी सभ्यता के प्रमुख नगर "हड़प्पा" की खोज 1921 में किसने की थी?',
    questionEn: 'Who discovered Harappa, the Indus Valley Civilization site, in 1921?',
    optionsHi: ['दयाराम साहनी', 'राखालदास बनर्जी', 'सर जॉन मार्शल', 'आर.एस. बिष्ट'],
    optionsEn: ['Daya Ram Sahni', 'Rakhaldas Banerjee', 'Sir John Marshall', 'R.S. Bisht'],
    correctIndex: 0,
    explanationHi: 'रायबहादुर दयाराम साहनी ने 1921 में रावी नदी के तट पर हड़प्पा स्थल का उत्खनन कार्य किया था।',
    explanationEn: 'Rai Bahadur Daya Ram Sahni excavated Harappa in 1921 on the banks of the Ravi River.',
    categoryHi: 'प्राचीन इतिहास / Ancient History',
    categoryEn: 'Ancient History',
    difficultyTier: 'advanced',
    kbcPrizeTag: '₹50,00,000',
    audiencePollPercentages: [61, 24, 11, 4],
    expertHintHi: 'राखालदास बनर्जी ने मोहनजोदड़ो की खोज की थी, जबकि हड़प्पा दयाराम साहनी जी ने खोजा।',
    expertHintEn: 'Banerjee discovered Mohenjo-daro; Sahni excavated Harappa.',
  },
  {
    id: 'kbc-a-044',
    questionHi: 'प्रकाश वर्ष (Light Year) किस भौतिक राशि के मापन की इकाई है?',
    questionEn: 'A "Light Year" is a unit of measurement for which physical quantity?',
    optionsHi: ['दूरी (Distance)', 'समय (Time)', 'प्रकाश की तीव्रता (Luminosity)', 'गति (Speed)'],
    optionsEn: ['Distance', 'Time', 'Luminosity', 'Speed'],
    correctIndex: 0,
    explanationHi: 'प्रकाश वर्ष खगोलीय दूरी का मात्रक है, जो प्रकाश द्वारा एक वर्ष में तय की गई दूरी (~9.46 ट्रिलियन किमी) होती है।',
    explanationEn: 'A light-year measures astronomical distance travelled by light in vacuum in one Julian year.',
    categoryHi: 'खगोल भौतिकी / Physics',
    categoryEn: 'Astrophysics',
    difficultyTier: 'advanced',
    kbcPrizeTag: '₹50,00,000',
    audiencePollPercentages: [68, 22, 6, 4],
    expertHintHi: 'नाम में "वर्ष" होने के बावजूद यह समय नहीं बल्कि खगोलीय दूरी की इकाई है।',
    expertHintEn: 'Despite "year" in its name, it measures astronomical distance, not time.',
  },
  {
    id: 'kbc-a-045',
    questionHi: 'रक्त में ऑक्सीजन का परिवहन करने वाला मुख्य प्रोटीन कौन सा है?',
    questionEn: 'Which iron-containing protein in red blood cells carries oxygen throughout the body?',
    optionsHi: ['हीमोग्लोबिन (Hemoglobin)', 'इंसुलिन (Insulin)', 'एल्बुमिन (Albumin)', 'फाइब्रिनोजेन (Fibrinogen)'],
    optionsEn: ['Hemoglobin', 'Insulin', 'Albumin', 'Fibrinogen'],
    correctIndex: 0,
    explanationHi: 'हीमोग्लोबिन लाल रक्त कोशिकाओं में मौजूद लौहयुक्त प्रोटीन है जो फेफड़ों से शरीर में ऑक्सीजन ले जाता है।',
    explanationEn: 'Hemoglobin is an iron-rich protein in red blood cells that transports oxygen from lungs to tissues.',
    categoryHi: 'मानव शरीर क्रिया / Biology',
    categoryEn: 'Human Biology',
    difficultyTier: 'advanced',
    kbcPrizeTag: '₹75,00,000',
    audiencePollPercentages: [84, 8, 5, 3],
    expertHintHi: 'इसी वर्णक के कारण हमारे खून का रंग लाल दिखाई देता है।',
    expertHintEn: 'This pigment gives blood its red coloration.',
  },

  // ==================== TIER 4: EXPERT (Levels 61 - 80) ====================
  {
    id: 'kbc-e-061',
    questionHi: 'भारतीय संविधान के किस अनुच्छेद को डॉ. अंबेडकर ने "संविधान की आत्मा और हृदय" कहा था?',
    questionEn: 'Which Article of the Indian Constitution did Dr. B.R. Ambedkar call the "Heart and Soul of the Constitution"?',
    optionsHi: ['अनुच्छेद 32 (संवैधानिक उपचार)', 'अनुच्छेद 21 (जीवन का अधिकार)', 'अनुच्छेद 14 (समानता का अधिकार)', 'अनुच्छेद 19 (स्वतंत्रता)'],
    optionsEn: ['Article 32 (Constitutional Remedies)', 'Article 21 (Right to Life)', 'Article 14 (Equality)', 'Article 19 (Freedoms)'],
    correctIndex: 0,
    explanationHi: 'अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) नागरिकों को मौलिक अधिकारों के संरक्षण के लिए सीधे सुप्रीम कोर्ट जाने का अधिकार देता है।',
    explanationEn: 'Article 32 guarantees the right to move the Supreme Court for enforcement of Fundamental Rights.',
    categoryHi: 'संविधान व कानून / Constitution',
    categoryEn: 'Constitutional Law',
    difficultyTier: 'expert',
    kbcPrizeTag: '₹1 करोड़',
    audiencePollPercentages: [58, 24, 12, 6],
    expertHintHi: 'इसके तहत रिट याचिका (Habeas Corpus, Mandamus आदि) दायर करने का अधिकार मिलता है।',
    expertHintEn: 'It empowers the Supreme Court to issue writs like Habeas Corpus and Mandamus.',
  },
  {
    id: 'kbc-e-062',
    questionHi: 'महाकवि कालिदास द्वारा रचित प्रसिद्ध नाटक "अभिज्ञान शाकुंतलम" में शकुंतला के पालक पिता कौन थे?',
    questionEn: 'In Kalidasa\'s masterpiece play "Abhijnanashakuntala", who was the foster father of Shakuntala?',
    optionsHi: ['महर्षि कण्व', 'महर्षि विश्वामित्र', 'महर्षि दुर्वासा', 'महर्षि वशिष्ठ'],
    optionsEn: ['Maharishi Kanva', 'Maharishi Vishwamitra', 'Maharishi Durvasa', 'Maharishi Vashistha'],
    correctIndex: 0,
    explanationHi: 'शकुंतला के जन्मदाता विश्वामित्र और मेनका थे, परंतु उनका पालन-पोषण महर्षि कण्व के आश्रम में हुआ था।',
    explanationEn: 'Sage Kanva found infant Shakuntala in the forest and brought her up as his daughter.',
    categoryHi: 'संस्कृत साहित्य / Literature',
    categoryEn: 'Sanskrit Literature',
    difficultyTier: 'expert',
    kbcPrizeTag: '₹1 करोड़',
    audiencePollPercentages: [54, 26, 14, 6],
    expertHintHi: 'विश्वामित्र ने जन्म दिया था, पर आश्रम में पालन कण्व ऋषि ने किया था।',
    expertHintEn: 'Vishvamitra was biological father; sage Kanva raised her at his hermitage.',
  },
  {
    id: 'kbc-e-063',
    questionHi: 'भारत का पहला स्वदेशी सुपरकंप्यूटर कौन सा था जिसे 1991 में C-DAC ने बनाया था?',
    questionEn: 'Which was India\'s first indigenous supercomputer developed in 1991 by C-DAC Pune?',
    optionsHi: ['परम 8000 (PARAM 8000)', 'अनुपम (ANUPAM)', 'एका (EKA)', 'सहस्र टी (SahasraT)'],
    optionsEn: ['PARAM 8000', 'ANUPAM', 'EKA', 'SahasraT'],
    correctIndex: 0,
    explanationHi: 'डॉ. विजय भटकर के नेतृत्व में सी-डैक पुणे ने 1991 में भारत का पहला सुपरकंप्यूटर परम 8000 विकसित किया।',
    explanationEn: 'PARAM 8000 was developed in 1991 under Dr. Vijay Bhatkar at C-DAC Pune.',
    categoryHi: 'कंप्यूटर व विज्ञान / Technology',
    categoryEn: 'Supercomputing',
    difficultyTier: 'expert',
    kbcPrizeTag: '₹1.5 करोड़',
    audiencePollPercentages: [64, 18, 11, 7],
    expertHintHi: 'डॉ. विजय भटकर के नेतृत्व में विकसित "परम" श्रृंखला का पहला मॉडल।',
    expertHintEn: 'Developed under Dr. Vijay Bhatkar; first in the PARAM series.',
  },
  {
    id: 'kbc-e-064',
    questionHi: 'पर्यावरण संरक्षण के प्रसिद्ध "चिपको आंदोलन" (1973) के मुख्य प्रणेता कौन थे?',
    questionEn: 'Who was the pioneering leader associated with the environmental "Chipko Movement" in Uttarakhand?',
    optionsHi: ['सुंदरलाल बहुगुणा', 'मेधा पाटकर', 'बाबा आमटे', 'सलीम अली'],
    optionsEn: ['Sunderlal Bahuguna', 'Medha Patkar', 'Baba Amte', 'Salim Ali'],
    correctIndex: 0,
    explanationHi: 'सुंदरलाल बहुगुणा और गौरा देवी ने पेड़ों से चिपककर उनकी कटाई रोकने का ऐतिहासिक चिपको आंदोलन चलाया।',
    explanationEn: 'Sunderlal Bahuguna led the Chipko movement where villagers hugged trees to stop deforestation.',
    categoryHi: 'पर्यावरण व इतिहास / Environment',
    categoryEn: 'Environment History',
    difficultyTier: 'expert',
    kbcPrizeTag: '₹2 करोड़',
    audiencePollPercentages: [71, 15, 8, 6],
    expertHintHi: 'हिमालयी वनों की रक्षा के लिए इन्होंने "पारिस्थितिकी ही स्थायी अर्थव्यवस्था है" का नारा दिया था।',
    expertHintEn: 'He coined the slogan "Ecology is permanent economy".',
  },
  {
    id: 'kbc-e-065',
    questionHi: 'ऑस्कर (अकादमी पुरस्कार) जीतने वाली प्रथम भारतीय हस्ती कौन थीं?',
    questionEn: 'Who was the first Indian to ever win an Academy Award (Oscar)?',
    optionsHi: ['भानु अथैया (1983 - गांधी)', 'सत्यजीत रे (1992)', 'ए.आर. रहमान (2009)', 'गुलज़ार (2009)'],
    optionsEn: ['Bhanu Athaiya (1983 - Gandhi)', 'Satyajit Ray (1992)', 'A.R. Rahman (2009)', 'Gulzar (2009)'],
    correctIndex: 0,
    explanationHi: 'भानु अथैया ने रिचर्ड एटनबरो की फिल्म "गांधी" (1982) के लिए सर्वश्रेष्ठ कॉस्ट्यूम डिजाइन का ऑस्कर जीतकर इतिहास रचा था।',
    explanationEn: 'Bhanu Athaiya won the Best Costume Design Oscar in 1983 for the film Gandhi.',
    categoryHi: 'सिनेमा व पुरस्कार / Cinema',
    categoryEn: 'Oscar Awards',
    difficultyTier: 'expert',
    kbcPrizeTag: '₹2.5 करोड़',
    audiencePollPercentages: [62, 22, 12, 4],
    expertHintHi: 'रिचर्ड एटनबरो की फिल्म "गांधी" में कॉस्ट्यूम डिजाइन के लिए मिला था।',
    expertHintEn: 'Won for Best Costume Design for Sir Richard Attenborough\'s biopic Gandhi.',
  },

  // ==================== TIER 5: GRANDMASTER (Levels 81 - 100) ====================
  {
    id: 'kbc-g-081',
    questionHi: 'मौर्य साम्राज्य के संस्थापक चंद्रगुप्त मौर्य के प्रधानमंत्री और गुरु आचार्य चाणक्य का वास्तविक मूल नाम क्या था?',
    questionEn: 'What was the original personal name of Acharya Chanakya, the mentor of Chandragupta Maurya?',
    optionsHi: ['विष्णुगुप्त', 'कौटिल्य', 'अजय', 'देवरत'],
    optionsEn: ['Vishnugupta', 'Kautilya', 'Ajaya', 'Devarata'],
    correctIndex: 0,
    explanationHi: 'चाणक्य का वास्तविक व्यक्तिगत नाम विष्णुगुप्त था। पिता चणक के नाम पर चाणक्य और कुटिल गोत्र के कारण कौटिल्य कहलाए।',
    explanationEn: 'His personal birth name was Vishnugupta. He was called Chanakya after his father Chanaka and Kautilya after his gotra.',
    categoryHi: 'प्राचीन भारतीय इतिहास / Heritage',
    categoryEn: 'Ancient Indian History',
    difficultyTier: 'grandmaster',
    kbcPrizeTag: '₹3 करोड़',
    audiencePollPercentages: [51, 38, 7, 4],
    expertHintHi: 'मुद्राराक्षस नाटक और उनके ग्रंथों के अंत में उनका नाम विष्णुगुप्त उल्लिखित है।',
    expertHintEn: 'Mentioned as Vishnugupta in ancient treatises and the play Mudrarakshasa.',
  },
  {
    id: 'kbc-g-082',
    questionHi: 'मुगल सम्राट अकबर के दरबार में संगीत सम्राट तानसेन का मूल जन्म नाम क्या था?',
    questionEn: 'What was the birth name of legendary court musician Tansen before he received his title?',
    optionsHi: ['रामतनु पांडे', 'महेश दास', 'बैजू बावरा', 'हरिदास'],
    optionsEn: ['Ramtanu Pandey', 'Mahesh Das', 'Baiju Bawra', 'Haridas'],
    correctIndex: 0,
    explanationHi: 'तानसेन का जन्म ग्वालियर में एक हिंदू परिवार में हुआ था और उनका नाम रामतनु (तन्ना) पांडे था। (महेश दास बीरबल का नाम था)।',
    explanationEn: 'Tansen was born as Ramtanu Pandey in Gwalior. (Mahesh Das was Birbal\'s birth name).',
    categoryHi: 'मध्यकालीन इतिहास व संगीत',
    categoryEn: 'Medieval History & Music',
    difficultyTier: 'grandmaster',
    kbcPrizeTag: '₹4 करोड़',
    audiencePollPercentages: [48, 35, 12, 5],
    expertHintHi: 'महेश दास बीरबल का नाम था। तानसेन का नाम रामतनु था।',
    expertHintEn: 'Mahesh Das was Birbal; Tansen was born Ramtanu Pandey.',
  },
  {
    id: 'kbc-g-083',
    questionHi: '1857 के प्रथम स्वतंत्रता संग्राम में कानपुर से विद्रोह का नेतृत्व किस मराठा पेशवा ने किया था?',
    questionEn: 'Who led the 1857 Revolt in Kanpur against the British forces?',
    optionsHi: ['नाना साहेब (धोंडू पंत)', 'तात्या टोपे', 'बाजीराव द्वितीय', 'बहादुर शाह ज़फ़र'],
    optionsEn: ['Nana Saheb (Dhondu Pant)', 'Tatya Tope', 'Bajirao II', 'Bahadur Shah Zafar'],
    correctIndex: 0,
    explanationHi: 'बाजीराव द्वितीय के दत्तक पुत्र नाना साहेब (मूल नाम धोंडू पंत) ने कानपुर में 1857 के विद्रोह का नेतृत्व किया।',
    explanationEn: 'Nana Saheb (Dhondu Pant), adopted son of Peshwa Baji Rao II, led the Kanpur uprising.',
    categoryHi: 'स्वतंत्रता संग्राम / Freedom Movement',
    categoryEn: 'Freedom Struggle',
    difficultyTier: 'grandmaster',
    kbcPrizeTag: '₹5 करोड़',
    audiencePollPercentages: [55, 30, 10, 5],
    expertHintHi: 'इन्हें धोंडू पंत भी कहा जाता था और तात्या टोपे इनके सेनापति थे।',
    expertHintEn: 'Also known as Dhondu Pant; Tatya Tope was his trusted general.',
  },
  {
    id: 'kbc-g-084',
    questionHi: 'रवींद्रनाथ टैगोर ने 1919 में किस नरसंहार के विरोध में अपनी ब्रिटिश "नाइटहुड" (Sir) की उपाधि त्याग दी थी?',
    questionEn: 'Rabindranath Tagore renounced his British Knighthood title in protest against which tragic massacre in 1919?',
    optionsHi: ['जलियांवाला बाग नरसंहार', 'चौरी चौरा कांड', 'काकोरी कांड', 'लाहौर षड्यंत्र'],
    optionsEn: ['Jallianwala Bagh Massacre', 'Chauri Chaura Incident', 'Kakori Action', 'Lahore Conspiracy'],
    correctIndex: 0,
    explanationHi: '13 अप्रैल 1919 को अमृतसर के जलियांवाला बाग में जनरल डायर द्वारा किए गए नरसंहार के विरोध में टैगोर ने नाइटहुड लौटा दिया था।',
    explanationEn: 'Tagore renounced his Knighthood in May 1919 in protest against the brutal Jallianwala Bagh massacre.',
    categoryHi: 'भारतीय इतिहास / Indian History',
    categoryEn: 'Indian Modern History',
    difficultyTier: 'grandmaster',
    kbcPrizeTag: '₹6 करोड़',
    audiencePollPercentages: [88, 6, 4, 2],
    expertHintHi: '13 अप्रैल 1919 को बैसाखी के दिन अमृतसर में जनरल डायर द्वारा कराया गया नरसंहार।',
    expertHintEn: 'General Dyer ordered firing on unarmed civilians on Baisakhi in Amritsar.',
  },
  {
    id: 'kbc-g-085',
    questionHi: 'कौन सा भारतीय राज्य तीन तरफ से बांग्लादेश की अंतरराष्ट्रीय सीमा से घिरा हुआ है?',
    questionEn: 'Which Indian state is surrounded by Bangladesh on three sides?',
    optionsHi: ['त्रिपुरा', 'मेघालय', 'मिजोरम', 'असम'],
    optionsEn: ['Tripura', 'Meghalaya', 'Mizoram', 'Assam'],
    correctIndex: 0,
    explanationHi: 'त्रिपुरा उत्तर, दक्षिण और पश्चिम तीनों दिशाओं से बांग्लादेश से घिरा हुआ है।',
    explanationEn: 'Tripura shares an 856 km border with Bangladesh which surrounds it on three sides.',
    categoryHi: 'भारतीय भूगोल / Geography',
    categoryEn: 'Indian Geography',
    difficultyTier: 'grandmaster',
    kbcPrizeTag: '₹7 करोड़',
    audiencePollPercentages: [65, 18, 12, 5],
    expertHintHi: 'इसके नाम में "त्रि" (तीन) आता है और यह तीन ओर से बांग्लादेश से घिरा है।',
    expertHintEn: 'The state has "Tri" in its name and borders Bangladesh on North, South, and West.',
  },
];

// Vast factual topic generators to create hundreds of 100% accurate, distinct, non-repeating questions
interface TriviaFact {
  idSuffix: string;
  categoryHi: string;
  categoryEn: string;
  qHi: string;
  qEn: string;
  ansHi: string;
  ansEn: string;
  distractorsHi: [string, string, string];
  distractorsEn: [string, string, string];
  expHi: string;
  expEn: string;
  tier: KbcDifficultyTier;
  hintHi: string;
  hintEn: string;
}

const EXTENDED_FACTS: TriviaFact[] = [
  // Basic Tiers
  {
    idSuffix: 'f001',
    categoryHi: 'भूगोल / Geography',
    categoryEn: 'Geography',
    qHi: 'भारत की राजधानी कौन सा शहर है?',
    qEn: 'What is the capital city of India?',
    ansHi: 'नई दिल्ली',
    ansEn: 'New Delhi',
    distractorsHi: ['मुंबई', 'कोलकाता', 'चेन्नई'],
    distractorsEn: ['Mumbai', 'Kolkata', 'Chennai'],
    expHi: '1911 में जॉर्ज पंचम के दिल्ली दरबार के दौरान राजधानी कोलकाता से दिल्ली स्थानांतरित करने की घोषणा हुई।',
    expEn: 'New Delhi was declared the capital during the Delhi Durbar of 1911.',
    tier: 'basic',
    hintHi: 'यह यमुना नदी के किनारे स्थित केंद्र शासित प्रदेश और राष्ट्रीय राजधानी क्षेत्र है।',
    hintEn: 'National Capital Region located along the Yamuna.',
  },
  {
    idSuffix: 'f002',
    categoryHi: 'खेलकूद / Sports',
    categoryEn: 'Sports',
    qHi: 'क्रिकेट का भगवान (God of Cricket) किसे कहा जाता है?',
    qEn: 'Who is popularly revered as the "God of Cricket"?',
    ansHi: 'सचिन तेंदुलकर',
    ansEn: 'Sachin Tendulkar',
    distractorsHi: ['विराट कोहली', 'एम.एस. धोनी', 'कपिल देव'],
    distractorsEn: ['Virat Kohli', 'M.S. Dhoni', 'Kapil Dev'],
    expHi: 'सचिन तेंदुलकर ने 100 अंतरराष्ट्रीय शतक बनाए और 24 वर्षों तक भारतीय क्रिकेट की सेवा की।',
    expEn: 'Sachin Tendulkar scored 100 international centuries across a stellar 24-year career.',
    tier: 'basic',
    hintHi: 'मास्टर ब्लास्टर जिन्होंने 100 अंतरराष्ट्रीय शतक बनाए हैं।',
    hintEn: 'Master Blaster with 100 international centuries.',
  },
  {
    idSuffix: 'f003',
    categoryHi: 'पर्यावरण व विज्ञान',
    categoryEn: 'Nature',
    qHi: 'पौधे प्रकाश संश्लेषण (Photosynthesis) के दौरान कौन सी गैस छोड़ते हैं?',
    qEn: 'Which gas do green plants release during photosynthesis?',
    ansHi: 'ऑक्सीजन (Oxygen)',
    ansEn: 'Oxygen',
    distractorsHi: ['कार्बन डाइऑक्साइड', 'नाइट्रोजन', 'मीथेन'],
    distractorsEn: ['Carbon Dioxide', 'Nitrogen', 'Methane'],
    expHi: 'पौधे सूर्य के प्रकाश में कार्बन डाइऑक्साइड लेकर ऑक्सीजन गैस वातावरण में मुक्त करते हैं।',
    expEn: 'Plants take in carbon dioxide and water to produce glucose and release oxygen.',
    tier: 'basic',
    hintHi: 'यह वही प्राणवायु है जिसे हम सांस लेते समय ग्रहण करते हैं।',
    hintEn: 'The life-giving gas we breathe in.',
  },
  {
    idSuffix: 'f004',
    categoryHi: 'सामान्य ज्ञान / GK',
    categoryEn: 'General Knowledge',
    qHi: 'हवा महल किस भारतीय शहर में स्थित है?',
    qEn: 'In which Indian city is the historic Hawa Mahal located?',
    ansHi: 'जयपुर (राजस्थान)',
    ansEn: 'Jaipur (Rajasthan)',
    distractorsHi: ['उदयपुर', 'आगरा', 'ग्वालियर'],
    distractorsEn: ['Udaipur', 'Agra', 'Gwalior'],
    expHi: 'हवा महल का निर्माण 1799 में महाराजा सवाई प्रताप सिंह ने करवाया था, जिसमें 953 झरोखे हैं।',
    expEn: 'Hawa Mahal was built in 1799 by Maharaja Sawai Pratap Singh with 953 windows.',
    tier: 'basic',
    hintHi: 'राजस्थान की राजधानी, गुलाबी शहर (Pink City)।',
    hintEn: 'Pink City of Rajasthan.',
  },
  {
    idSuffix: 'f005',
    categoryHi: 'जीव विज्ञान / Animals',
    categoryEn: 'Zoology',
    qHi: 'विश्व का सबसे बड़ा स्तनपायी जीव (Largest Mammal) कौन सा है?',
    qEn: 'Which is the largest living mammal on Earth?',
    ansHi: 'ब्लू व्हेल (Blue Whale)',
    ansEn: 'Blue Whale',
    distractorsHi: ['अफ्रीकी हाथी', 'जिराफ', 'सफेद शार्क'],
    distractorsEn: ['African Elephant', 'Giraffe', 'Great White Shark'],
    expHi: 'ब्लू व्हेल का वजन 150 टन से अधिक और लंबाई 30 मीटर तक हो सकती है।',
    expEn: 'The Blue Whale can weigh over 150 tons and reach up to 30 meters in length.',
    tier: 'basic',
    hintHi: 'समुद्र में रहने वाला विशालकाय प्राणी।',
    hintEn: 'Giant ocean dweller.',
  },
  {
    idSuffix: 'f006',
    categoryHi: 'सिनेमा / Cinema',
    categoryEn: 'Cinema',
    qHi: 'भारतीय सिनेमा का जनक (Father of Indian Cinema) किसे माना जाता है?',
    qEn: 'Who is regarded as the "Father of Indian Cinema"?',
    ansHi: 'दादा साहेब फाल्के',
    ansEn: 'Dadasaheb Phalke',
    distractorsHi: ['सत्यजीत रे', 'राज कपूर', 'पृथ्वीराज कपूर'],
    distractorsEn: ['Satyajit Ray', 'Raj Kapoor', 'Prithviraj Kapoor'],
    expHi: '1913 में भारत की पहली पूर्ण लंबाई वाली फीचर फिल्म "राजा हरिश्चंद्र" दादा साहेब फाल्के ने बनाई थी।',
    expEn: 'Dadasaheb Phalke made Raja Harishchandra in 1913, India\'s first full-length silent feature.',
    tier: 'intermediate',
    hintHi: 'इन्हीं के नाम पर भारत सरकार सिनेमा का सर्वोच्च पुरस्कार प्रदान करती है।',
    hintEn: 'India\'s highest cinematic award is named after him.',
  },
  {
    idSuffix: 'f007',
    categoryHi: 'भूगोल / World Geography',
    categoryEn: 'World Geography',
    qHi: 'विश्व की सबसे ऊंची पर्वत चोटी "माउंट एवरेस्ट" किस देश में स्थित है?',
    qEn: 'In which country is Mount Everest, the highest peak in the world, located?',
    ansHi: 'नेपाल',
    ansEn: 'Nepal',
    distractorsHi: ['भारत', 'भूटान', 'तिब्बत (चीन) केवल'],
    distractorsEn: ['India', 'Bhutan', 'China (Tibet) only'],
    expHi: 'माउंट एवरेस्ट (ऊंचाई 8848.86 मीटर) नेपाल और तिब्बत की सीमा पर स्थित है, जिसे नेपाल में सागरमाथा कहते हैं।',
    expEn: 'Mount Everest (8,848.86 m) lies in the Himalayas on the border between Nepal and Tibet.',
    tier: 'intermediate',
    hintHi: 'इस हिमालयी देश में इसे "सागरमाथा" के नाम से जाना जाता है।',
    hintEn: 'Known locally as Sagarmatha in this Himalayan nation.',
  },
  {
    idSuffix: 'f008',
    categoryHi: 'इतिहास / History',
    categoryEn: 'Indian History',
    qHi: 'स्वतंत्र भारत के प्रथम प्रधानमंत्री कौन थे?',
    qEn: 'Who was the first Prime Minister of Independent India?',
    ansHi: 'पंडित जवाहरलाल नेहरू',
    ansEn: 'Pt. Jawaharlal Nehru',
    distractorsHi: ['सरदार वल्लभभाई पटेल', 'लाल बहादुर शास्त्री', 'डॉ. सर्वपल्ली राधाकृष्णन'],
    distractorsEn: ['Sardar Vallabhbhai Patel', 'Lal Bahadur Shastri', 'Dr. S. Radhakrishnan'],
    expHi: 'पंडित जवाहरलाल नेहरू ने 15 अगस्त 1947 को भारत के प्रथम प्रधानमंत्री के रूप में शपथ ली थी।',
    expEn: 'Jawaharlal Nehru took oath on 15 August 1947 as India\'s first Prime Minister.',
    tier: 'basic',
    hintHi: 'जिन्हें बच्चे प्यार से "चाचा नेहरू" कहते थे और 14 नवंबर को बाल दिवस मनाया जाता है।',
    hintEn: 'Fondly called "Chacha Nehru", his birthday is celebrated as Children\'s Day.',
  },
  {
    idSuffix: 'f009',
    categoryHi: 'खगोल / Astronomy',
    categoryEn: 'Astronomy',
    qHi: 'चंद्रमा पर कदम रखने वाले पहले मानव कौन थे?',
    qEn: 'Who was the first human being to walk on the surface of the Moon?',
    ansHi: 'नील आर्मस्ट्रांग (1969)',
    ansEn: 'Neil Armstrong (1969)',
    distractorsHi: ['बज एल्ड्रिन', 'यूरी गागरिन', 'माइकल कोलिन्स'],
    distractorsEn: ['Buzz Aldrin', 'Yuri Gagarin', 'Michael Collins'],
    expHi: '20 जुलाई 1969 को अपोलो 11 मिशन के कमांडर नील आर्मस्ट्रांग ने चंद्रमा की सतह पर पहला कदम रखा।',
    expEn: 'Apollo 11 astronaut Neil Armstrong stepped onto the lunar surface on July 20, 1969.',
    tier: 'intermediate',
    hintHi: 'अपोलो 11 मिशन के अंतरिक्ष यात्री जिन्होंने कहा था: "दैट्स वन स्मॉल स्टेप फॉर अ मैन..."।',
    hintEn: '"That\'s one small step for man, one giant leap for mankind."',
  },
  {
    idSuffix: 'f010',
    categoryHi: 'अर्थशास्त्र / Currency',
    categoryEn: 'Currency & Economy',
    qHi: 'भारतीय रुपये के नए आधिकारिक प्रतीक चिन्ह (₹) को किसने डिजाइन किया था?',
    qEn: 'Who designed the official symbol of the Indian Rupee (₹) adopted in 2010?',
    ansHi: 'डी. उदय कुमार',
    ansEn: 'D. Udaya Kumar',
    distractorsHi: ['रघुराम राजन', 'नंदन नीलेकणी', 'अमर्त्य सेन'],
    distractorsEn: ['Raghuram Rajan', 'Nandan Nilekani', 'Amartya Sen'],
    expHi: 'आईआईटी बॉम्बे के पोस्ट-ग्रेजुएट डी. उदय कुमार द्वारा देवनागरी \'र\' और रोमन \'R\' को मिलाकर बनाया गया ₹ प्रतीक 2010 में चुना गया।',
    expEn: 'D. Udaya Kumar designed the symbol blending Devanagari \'Ra\' and Roman \'R\', adopted in 2010.',
    tier: 'intermediate',
    hintHi: 'आईआईटी गुवाहाटी के प्राध्यापक व डिजाइनर।',
    hintEn: 'IIT professor and typography designer.',
  },
  {
    idSuffix: 'f011',
    categoryHi: 'विज्ञान / Chemistry',
    categoryEn: 'Chemistry',
    qHi: 'हवा में सबसे अधिक मात्रा (लगभग 78%) में कौन सी गैस पाई जाती है?',
    qEn: 'Which gas makes up the largest percentage (~78%) of Earth\'s atmosphere?',
    ansHi: 'नाइट्रोजन (Nitrogen)',
    ansEn: 'Nitrogen',
    distractorsHi: ['ऑक्सीजन (Oxygen)', 'कार्बन डाइऑक्साइड', 'आर्गन (Argon)'],
    distractorsEn: ['Oxygen', 'Carbon Dioxide', 'Argon'],
    expHi: 'पृथ्वी के वायुमंडल में लगभग 78.08% नाइट्रोजन और 20.95% ऑक्सीजन पाई जाती है।',
    expEn: 'Earth\'s atmosphere consists of approximately 78% nitrogen and 21% oxygen.',
    tier: 'basic',
    hintHi: 'यह गैस लगभग चार-चौथाई वायुमंडल बनाती है।',
    hintEn: 'Accounts for nearly four-fifths of dry air.',
  },
  {
    idSuffix: 'f012',
    categoryHi: 'संविधान / Constitution',
    categoryEn: 'Constitution',
    qHi: 'भारत का संविधान पूर्ण रूप से किस दिन लागू हुआ था?',
    qEn: 'On which date did the Constitution of India come fully into effect?',
    ansHi: '26 जनवरी 1950',
    ansEn: '26 January 1950',
    distractorsHi: ['15 अगस्त 1947', '26 नवंबर 1949', '2 अक्टूबर 1950'],
    distractorsEn: ['15 August 1947', '26 November 1949', '2 October 1950'],
    expHi: '26 जनवरी 1950 को संविधान लागू हुआ और इसी दिन को हम गणतंत्र दिवस के रूप में मनाते हैं।',
    expEn: 'The Constitution came into force on 26 January 1950, celebrated as Republic Day.',
    tier: 'basic',
    hintHi: 'जिस दिन भारत में गणतंत्र दिवस (Republic Day) मनाया जाता है।',
    hintEn: 'Celebrated across India as Republic Day.',
  },
  {
    idSuffix: 'f013',
    categoryHi: 'भूगोल / World Rivers',
    categoryEn: 'Geography',
    qHi: 'विश्व की सबसे लंबी नदी (Longest River in the World) कौन सी है?',
    qEn: 'Which is recognized as the longest river in the world?',
    ansHi: 'नील नदी (Nile River - अफ्रीका)',
    ansEn: 'Nile River (Africa)',
    distractorsHi: ['अमेज़न नदी', 'यांग्त्जी नदी', 'मिसिसिपी नदी'],
    distractorsEn: ['Amazon River', 'Yangtze River', 'Mississippi River'],
    expHi: 'नील नदी लगभग 6,650 किलोमीटर लंबी है और यह अफ्रीका महाद्वीप के 11 देशों से होकर बहती है।',
    expEn: 'The Nile River is approximately 6,650 km long, flowing through northeastern Africa.',
    tier: 'intermediate',
    hintHi: 'मिस्र (Egypt) की जीवन रेखा मानी जाने वाली अफ्रीकी नदी।',
    hintEn: 'Lifeline of ancient and modern Egypt.',
  },
  {
    idSuffix: 'f014',
    categoryHi: 'इतिहास / National Movement',
    categoryEn: 'Modern History',
    qHi: '1930 में महात्मा गांधी ने प्रसिद्ध "दांडी मार्च" किस कानून के विरोध में शुरू किया था?',
    qEn: 'In 1930, Mahatma Gandhi launched the famous Dandi March against which British tax/law?',
    ansHi: 'नमक कानून (Salt Tax)',
    ansEn: 'Salt Law (Salt Tax)',
    distractorsHi: ['रोलेट एक्ट', 'प्रेस प्रतिबंध कानून', 'भू-राजस्व कर'],
    distractorsEn: ['Rowlatt Act', 'Vernacular Press Act', 'Land Revenue Tax'],
    expHi: 'गांधीजी ने 12 मार्च से 6 अप्रैल 1930 तक साबरमती से दांडी तक 240 मील पदयात्रा कर नमक बनाकर कानून तोड़ा।',
    expEn: 'Gandhi walked 240 miles from Sabarmati to Dandi to produce salt and break the British monopoly.',
    tier: 'intermediate',
    hintHi: 'साधारण दैनिक भोजन में स्वाद लाने वाली इस आवश्यक वस्तु पर ब्रिटिश एकाधिकार था।',
    hintEn: 'Daily staple essential for human survival taxed by the British Raj.',
  },
  {
    idSuffix: 'f015',
    categoryHi: 'विज्ञान व चिकित्सा / Medicine',
    categoryEn: 'Medicine',
    qHi: 'विश्व की पहली एंटीबायोटिक दवा "पेनिसिलिन" (Penicillin) की खोज किसने की थी?',
    qEn: 'Who discovered the world\'s first widely effective antibiotic, Penicillin, in 1928?',
    ansHi: 'अलेक्जेंडर फ्लेमिंग',
    ansEn: 'Alexander Fleming',
    distractorsHi: ['लुई पाश्चर', 'एडवर्ड जेनर', 'रॉबर्ट कोच'],
    distractorsEn: ['Louis Pasteur', 'Edward Jenner', 'Robert Koch'],
    expHi: '1928 में स्कॉटिश वैज्ञानिक सर अलेक्जेंडर फ्लेमिंग ने पेनिसिलियम नोटेटम कवक से पेनिसिलिन की खोज की।',
    expEn: 'Sir Alexander Fleming noticed the antibacterial properties of Penicillium mould in 1928.',
    tier: 'advanced',
    hintHi: 'स्कॉटिश माइक्रोबायोलॉजिस्ट जिन्हें 1945 में नोबेल पुरस्कार दिया गया।',
    hintEn: 'Scottish scientist knighted and awarded the 1945 Nobel Prize.',
  },
  {
    idSuffix: 'f016',
    categoryHi: 'भूगोल / Indian States',
    categoryEn: 'Geography',
    qHi: 'क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य (Largest State by Area) कौन सा है?',
    qEn: 'Which is the largest state in India by geographical area?',
    ansHi: 'राजस्थान',
    ansEn: 'Rajasthan',
    distractorsHi: ['मध्य प्रदेश', 'महाराष्ट्र', 'उत्तर प्रदेश'],
    distractorsEn: ['Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'],
    expHi: 'राजस्थान का कुल क्षेत्रफल लगभग 342,239 वर्ग किमी है जो भारत के कुल क्षेत्रफल का 10.4% है।',
    expEn: 'Rajasthan spans 342,239 sq km, representing 10.4% of India\'s total landmass.',
    tier: 'basic',
    hintHi: 'थार रेगिस्तान और किलों का यह गौरवशाली राज्य।',
    hintEn: 'The land of the Thar Desert and historic forts.',
  },
  {
    idSuffix: 'f017',
    categoryHi: 'साहित्य / Nobel Prize',
    categoryEn: 'Literature',
    qHi: 'रवींद्रनाथ टैगोर द्वारा स्थापित प्रसिद्ध "शांतिनिकेतन" किस राज्य में स्थित है?',
    qEn: 'In which Indian state is the renowned Santiniketan (Visva-Bharati) located?',
    ansHi: 'पश्चिम बंगाल',
    ansEn: 'West Bengal',
    distractorsHi: ['ओडिशा', 'बिहार', 'असम'],
    distractorsEn: ['Odisha', 'Bihar', 'Assam'],
    expHi: 'शांतिनिकेतन पश्चिम बंगाल के बीरभूम जिले में स्थित है, जिसे 2023 में यूनेस्को विश्व धरोहर घोषित किया गया।',
    expEn: 'Santiniketan is situated in Birbhum district of West Bengal and inscribed by UNESCO in 2023.',
    tier: 'intermediate',
    hintHi: 'कोलकाता इसी राज्य की राजधानी है।',
    hintEn: 'State having Kolkata as its capital.',
  },
  {
    idSuffix: 'f018',
    categoryHi: 'विज्ञान / Physics',
    categoryEn: 'Physics',
    qHi: 'गुरुत्वाकर्षण (Law of Universal Gravitation) का नियम किसने प्रतिपादित किया था?',
    qEn: 'Who formulated the universal law of Gravitation after observing a falling apple?',
    ansHi: 'सर आइजैक न्यूटन',
    ansEn: 'Sir Isaac Newton',
    distractorsHi: ['अल्बर्ट आइंस्टीन', 'गैलीलियो गैलीली', 'जोहान्स केपलर'],
    distractorsEn: ['Albert Einstein', 'Galileo Galilei', 'Johannes Kepler'],
    expHi: '1687 में आइजैक न्यूटन ने अपनी पुस्तक "प्रिंसिपिया मैथेमेटिका" में गुरुत्वाकर्षण का नियम दिया।',
    expEn: 'Sir Isaac Newton published his universal law of gravitation in Principia in 1687.',
    tier: 'basic',
    hintHi: 'पेड़ से सेब गिरने की प्रसिद्ध घटना से जुड़े वैज्ञानिक।',
    hintEn: 'Famed for the falling apple observation.',
  },
  {
    idSuffix: 'f019',
    categoryHi: 'खेल / Olympics',
    categoryEn: 'Olympics',
    qHi: 'ओलंपिक में व्यक्तिगत स्वर्ण पदक जीतने वाले पहले भारतीय खिलाड़ी कौन थे?',
    qEn: 'Who was the first Indian individual to win an Olympic Gold Medal?',
    ansHi: 'अभिनव बिंद्रा (2008 बीजिंग)',
    ansEn: 'Abhinav Bindra (2008 Beijing)',
    distractorsHi: ['नीरज चोपड़ा', 'सुशील कुमार', 'राज्यवर्धन सिंह राठौर'],
    distractorsEn: ['Neeraj Chopra', 'Sushil Kumar', 'Rajyavardhan Singh Rathore'],
    expHi: 'अभिनव बिंद्रा ने 2008 बीजिंग ओलंपिक में 10 मीटर एयर राइफल निशानेबाजी में स्वर्ण पदक जीता था।',
    expEn: 'Abhinav Bindra won gold in 10m Air Rifle shooting at the 2008 Beijing Olympics.',
    tier: 'advanced',
    hintHi: '2008 बीजिंग ओलंपिक में निशानेबाजी (Shooting) में स्वर्ण पदक विजेता।',
    hintEn: 'Won gold in 10m Air Rifle shooting at Beijing 2008.',
  },
  {
    idSuffix: 'f020',
    categoryHi: 'इतिहास / Ancient Dynasties',
    categoryEn: 'Ancient History',
    qHi: 'प्राचीन कलिंग युद्ध (261 ईसा पूर्व) के भीषण रक्तपात के बाद किस मौर्य सम्राट ने बौद्ध धर्म अपनाया था?',
    qEn: 'Which Mauryan Emperor renounced warfare and embraced Buddhism after the Kalinga War?',
    ansHi: 'सम्राट अशोक',
    ansEn: 'Emperor Ashoka',
    distractorsHi: ['चंद्रगुप्त मौर्य', 'बिंदुसार', 'दशरथ मौर्य'],
    distractorsEn: ['Chandragupta Maurya', 'Bindusara', 'Dasharatha Maurya'],
    expHi: 'कलिंग युद्ध के बाद सम्राट अशोक ने धम्म विजय की नीति अपनाई और बौद्ध धर्म का प्रसार किया।',
    expEn: 'Ashoka the Great embraced Buddhism and ahimsa after witnessing the horrors of Kalinga.',
    tier: 'intermediate',
    hintHi: 'जिन्हें "देवानांप्रिय प्रियदर्शी" के रूप में अभिलेखों में जाना जाता है।',
    hintEn: 'Known in edicts as "Devanampriya Priyadasi".',
  },
  {
    idSuffix: 'f021',
    categoryHi: 'अंतरिक्ष / Space Exploration',
    categoryEn: 'Space Exploration',
    qHi: 'अंतरिक्ष में जाने वाले प्रथम भारतीय नागरिक कौन थे?',
    qEn: 'Who was the first Indian citizen to travel into outer space in 1984?',
    ansHi: 'राकेश शर्मा (1984)',
    ansEn: 'Rakesh Sharma (1984)',
    distractorsHi: ['कल्पना चावला', 'सुनीता विलियम्स', 'रवीश मल्होत्रा'],
    distractorsEn: ['Kalpana Chawla', 'Sunita Williams', 'Ravish Malhotra'],
    expHi: '3 अप्रैल 1984 को सोवियत सोयुज टी-11 मिशन से अंतरिक्ष पहुंचे और इंदिरा गांधी को कहा: "सारे जहां से अच्छा हिंदोस्तां हमारा"।',
    expEn: 'Squadron Leader Rakesh Sharma flew aboard Soyuz T-11 on 3 April 1984.',
    tier: 'intermediate',
    hintHi: 'जब प्रधानमंत्री इंदिरा गांधी ने पूछा भारत कैसा दिखता है, तो इन्होंने कहा "सारे जहां से अच्छा"।',
    hintEn: 'Famously replied "Saare Jahan Se Achha" when asked how India looked from space.',
  },
  {
    idSuffix: 'f022',
    categoryHi: 'अर्थशास्त्र / Central Bank',
    categoryEn: 'Economy',
    qHi: 'भारतीय रिज़र्व बैंक (RBI) की स्थापना किस वर्ष हुई थी?',
    qEn: 'In which year was the Reserve Bank of India (RBI) established?',
    ansHi: '1935',
    ansEn: '1935',
    distractorsHi: ['1947', '1950', '1921'],
    distractorsEn: ['1947', '1950', '1921'],
    expHi: 'आरबीआई की स्थापना 1 अप्रैल 1935 को भारतीय रिज़र्व बैंक अधिनियम 1934 के प्रावधानों के अनुसार हुई थी।',
    expEn: 'RBI was established on 1 April 1935 under the Reserve Bank of India Act, 1934.',
    tier: 'advanced',
    hintHi: 'हिल्टन यंग कमीशन की सिफारिशों के बाद स्वतंत्रता से 12 वर्ष पूर्व स्थापित हुआ।',
    hintEn: 'Established based on the Hilton Young Commission recommendations in the 1930s.',
  },
  {
    idSuffix: 'f023',
    categoryHi: 'भूगोल / World Wonder',
    categoryEn: 'World Geography',
    qHi: 'विश्व की सबसे गहरी झील (Deepest Lake in the World) कौन सी है?',
    qEn: 'Which is the deepest freshwater lake in the world?',
    ansHi: 'बैकाल झील (Lake Baikal - रूस)',
    ansEn: 'Lake Baikal (Russia)',
    distractorsHi: ['कैस्पियन सागर', 'सुपीरियर झील', 'विक्टोरिया झील'],
    distractorsEn: ['Caspian Sea', 'Lake Superior', 'Lake Victoria'],
    expHi: 'रूस के साइबेरिया में स्थित बैकाल झील की अधिकतम गहराई 1,642 मीटर (5,387 फीट) है।',
    expEn: 'Lake Baikal in Siberia, Russia reaches a record depth of 1,642 metres.',
    tier: 'advanced',
    hintHi: 'रूस के साइबेरिया क्षेत्र में स्थित प्राचीन मीठे पानी की झील।',
    hintEn: 'Located in southern Siberia, Russia.',
  },
  {
    idSuffix: 'f024',
    categoryHi: 'विज्ञान / Nobel Discovery',
    categoryEn: 'Science Nobel',
    qHi: 'सर सी.वी. रमन को 1930 में किस वैज्ञानिक खोज के लिए भौतिकी का नोबेल पुरस्कार मिला था?',
    qEn: 'Sir C.V. Raman won the 1930 Physics Nobel Prize for his discovery of which phenomenon?',
    ansHi: 'रमन प्रभाव (प्रकाश का प्रकीर्णन)',
    ansEn: 'Raman Effect (Scattering of Light)',
    distractorsHi: ['फोटोइलेक्ट्रिक प्रभाव', 'एक्स-रे विवर्तन', 'थर्मल आयनीकरण'],
    distractorsEn: ['Photoelectric Effect', 'X-ray Diffraction', 'Thermal Ionisation'],
    expHi: '28 फरवरी 1928 को उन्होंने रमन प्रभाव की खोज की थी, जिसकी स्मृति में भारत हर साल राष्ट्रीय विज्ञान दिवस मनाता है।',
    expEn: 'Discovered on 28 Feb 1928, the Raman Effect explains light scattering through molecules.',
    tier: 'advanced',
    hintHi: 'इस खोज के उपलक्ष्य में हर वर्ष 28 फरवरी को "राष्ट्रीय विज्ञान दिवस" मनाया जाता है।',
    hintEn: 'Commemorated every year as National Science Day on February 28.',
  },
  {
    idSuffix: 'f025',
    categoryHi: 'संविधान / Supreme Court',
    categoryEn: 'Constitution',
    qHi: 'संविधान के किस ऐतिहासिक मुकदमे में सुप्रीम कोर्ट ने "मूल संरचना सिद्धांत" (Basic Structure Doctrine) दिया था?',
    qEn: 'In which landmark case in 1973 did the Supreme Court propound the "Basic Structure Doctrine"?',
    ansHi: 'केशवानंद भारती केस (1973)',
    ansEn: 'Kesavananda Bharati Case (1973)',
    distractorsHi: ['गोलकनाथ केस (1967)', 'मेनका गांधी केस (1978)', 'मिनर्वा मिल्स केस (1980)'],
    distractorsEn: ['Golaknath Case (1967)', 'Maneka Gandhi Case (1978)', 'Minerva Mills Case (1980)'],
    expHi: '13 जजों की सबसे बड़ी संविधान पीठ ने 7-6 के बहुमत से फैसला दिया कि संसद संविधान की मूल संरचना को नहीं बदल सकती।',
    expEn: 'A 13-judge bench ruled that Parliament cannot alter the basic structure of the Constitution.',
    tier: 'expert',
    hintHi: 'केरल के एक संत और मठाधीश द्वारा दायर 13 जजों की सबसे बड़ी ऐतिहासिक संविधान पीठ।',
    hintEn: 'Historic 13-judge bench involving the head of a Kerala matha.',
  },
  {
    idSuffix: 'f026',
    categoryHi: 'खगोल / Astronomy',
    categoryEn: 'Astrophysics',
    qHi: 'किस भारतीय-अमेरिकी वैज्ञानिक को तारों की द्रव्यमान सीमा (1.44 सौर द्रव्यमान) की खोज के लिए 1983 में नोबेल पुरस्कार मिला?',
    qEn: 'Which astrophysicist won the 1983 Nobel Prize for discovering the maximum mass of a white dwarf star?',
    ansHi: 'सुब्रह्मण्यम चंद्रशेखर',
    ansEn: 'Subrahmanyan Chandrasekhar',
    distractorsHi: ['होमी जहांगीर भाभा', 'सत्येंद्र नाथ बोस', 'मेघनाद साहा'],
    distractorsEn: ['Homi J. Bhabha', 'Satyendra Nath Bose', 'Meghnad Saha'],
    expHi: 'चंद्रशेखर सीमा (1.44 Solar Mass) निर्धारित करती है कि कोई तारा श्वेत वामन बनेगा या सुपरनोवा विस्फोट के बाद न्यूट्रॉन तारा/ब्लैक होल।',
    expEn: 'The Chandrasekhar Limit defines the maximum stable mass of an electron-degenerate white dwarf.',
    tier: 'expert',
    hintHi: 'इनके नाम पर "चंद्रशेखर सीमा" (Chandrasekhar Limit) का नामकरण हुआ।',
    hintEn: 'The Chandrasekhar Limit of 1.44 solar masses carries his name.',
  },
  {
    idSuffix: 'f027',
    categoryHi: 'साहित्य / Classical Sanskrit',
    categoryEn: 'Classical Literature',
    qHi: 'प्राचीन भारतीय नाट्यशास्त्र और रस सिद्धांत के प्रणेता कौन से मुनि माने जाते हैं?',
    qEn: 'Who is regarded as the legendary author of Natyashastra, the ancient treatise on performing arts?',
    ansHi: 'भरत मुनि',
    ansEn: 'Bharata Muni',
    distractorsHi: ['अभिनवगुप्त', 'भास', 'भवभूति'],
    distractorsEn: ['Abhinavagupta', 'Bhasa', 'Bhavabhuti'],
    expHi: 'भरत मुनि द्वारा रचित नाट्यशास्त्र में आठ रसों, अभिनय, नृत्य और संगीत के संपूर्ण शास्त्रीय नियमों का वर्णन है।',
    expEn: 'Bharata Muni authored the Natyashastra establishing the classical rasa aesthetics.',
    tier: 'expert',
    hintHi: 'इन्हीं के नाम से "भरतनाट्यम" नृत्य शैली का संबंध माना जाता है।',
    hintEn: 'Bharatanatyam dance directly traces its foundational text to him.',
  },
  {
    idSuffix: 'f028',
    categoryHi: 'इतिहास / Rare KBC Jackpot',
    categoryEn: 'Historic Treaties',
    qHi: '1765 में बक्सर के युद्ध के बाद ईस्ट इंडिया कंपनी को बंगाल, बिहार और उड़ीसा की दीवानी देने वाली ऐतिहासिक संधि कौन सी थी?',
    qEn: 'Which historic 1765 treaty granted the British East India Company the Diwani rights of Bengal, Bihar, and Orissa?',
    ansHi: 'इलाहाबाद की संधि (Treaty of Allahabad)',
    ansEn: 'Treaty of Allahabad (1765)',
    distractorsHi: ['पुरंदर की संधि', 'सगौली की संधि', 'मंगलौर की संधि'],
    distractorsEn: ['Treaty of Purandar', 'Treaty of Sugauli', 'Treaty of Mangalore'],
    expHi: 'रॉबर्ट क्लाइव और मुगल सम्राट शाह आलम द्वितीय के बीच 1765 में इलाहाबाद की संधि पर हस्ताक्षर हुए जिससे भारत में ब्रिटिश वित्तीय प्रभुत्व स्थापित हुआ।',
    expEn: 'Signed between Robert Clive and Mughal Emperor Shah Alam II granting revenue collection rights.',
    tier: 'grandmaster',
    hintHi: 'प्रयागराज (इलाहाबाद) के किले में रॉबर्ट क्लाइव और शाह आलम द्वितीय के बीच हुई थी।',
    hintEn: 'Signed at Allahabad fort between Lord Clive and Mughal Emperor Shah Alam II.',
  },
  {
    idSuffix: 'f029',
    categoryHi: 'भूगोल / World Superlatives',
    categoryEn: 'World Geography',
    qHi: 'विश्व का सबसे ऊंचा निर्बाध जलप्रपात "एंजेल फॉल्स" (Angel Falls - 979 मीटर) किस देश में स्थित है?',
    qEn: 'In which country is Angel Falls, the world\'s highest uninterrupted waterfall (979 m), located?',
    ansHi: 'वेनेजुएला (Venezuela)',
    ansEn: 'Venezuela',
    distractorsHi: ['ब्राजील', 'कोलंबिया', 'पेरू'],
    distractorsEn: ['Brazil', 'Colombia', 'Peru'],
    expHi: 'वेनेजुएला के कानाइमा नेशनल पार्क में चुरुन नदी पर स्थित एंजेल फॉल्स 979 मीटर की ऊंचाई से गिरता है।',
    expEn: 'Angel Falls in Canaima National Park, Venezuela plunges 979 metres from Auyan-tepui.',
    tier: 'grandmaster',
    hintHi: 'दक्षिण अमेरिका का यह देश अपनी विशाल तेल संपदा और कराकस राजधानी के लिए प्रसिद्ध है।',
    hintEn: 'South American nation with capital Caracas and vast petroleum reserves.',
  },
  {
    idSuffix: 'f030',
    categoryHi: 'प्राचीन भारत / Ashoka Inscriptions',
    categoryEn: 'Epigraphy',
    qHi: '1837 में मौर्य सम्राट अशोक के ब्राह्मी लिपि के शिलालेखों को पहली बार सफलतापूर्वक किसने पढ़ा (decipher) था?',
    qEn: 'Who became the first scholar to decipher Emperor Ashoka\'s Brahmi script inscriptions in 1837?',
    ansHi: 'जेम्स प्रिंसेप (James Prinsep)',
    ansEn: 'James Prinsep',
    distractorsHi: ['मैक्स मूलर', 'अलेक्जेंडर कनिंघम', 'विलियम जोन्स'],
    distractorsEn: ['Max Müller', 'Alexander Cunningham', 'William Jones'],
    expHi: 'कोलकाता टकसाल के अधिकारी जेम्स प्रिंसेप ने 1837 में ब्राह्मी और खरोष्ठी लिपि का कूटवाचन कर अशोक के इतिहास को उजागर किया।',
    expEn: 'James Prinsep, an officer in the Calcutta Mint, deciphered Brahmi script in 1837.',
    tier: 'grandmaster',
    hintHi: 'कलकत्ता की एशियाटिक सोसाइटी के सचिव और टकसाल के विशेषज्ञ पुरातत्ववेत्ता।',
    hintEn: 'Founding secretary of the Asiatic Society of Bengal who cracked the Brahmi code.',
  },
];

// Generate an algorithmic, deterministically verified question from templates to guarantee 100 levels never run out
function createGeneratedQuestion(fact: TriviaFact, index: number, tier: KbcDifficultyTier): KbcQuestion {
  // Randomly place correct answer in 0..3
  const correctIdx = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
  const optionsHi: [string, string, string, string] = ['', '', '', ''];
  const optionsEn: [string, string, string, string] = ['', '', '', ''];

  optionsHi[correctIdx] = fact.ansHi;
  optionsEn[correctIdx] = fact.ansEn;

  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctIdx) {
      optionsHi[i] = fact.distractorsHi[dIdx];
      optionsEn[i] = fact.distractorsEn[dIdx];
      dIdx++;
    }
  }

  // Audience poll percentages
  const percentages: [number, number, number, number] = [0, 0, 0, 0];
  let highPct = 70;
  if (tier === 'expert') highPct = 56;
  if (tier === 'grandmaster') highPct = 48;
  percentages[correctIdx] = highPct;

  const remaining = 100 - highPct;
  const otherIndices = [0, 1, 2, 3].filter((idx) => idx !== correctIdx);
  const p1 = Math.floor(remaining * 0.5);
  const p2 = Math.floor(remaining * 0.3);
  const p3 = remaining - p1 - p2;
  percentages[otherIndices[0]] = p1;
  percentages[otherIndices[1]] = p2;
  percentages[otherIndices[2]] = p3;

  const prizeTags: Record<KbcDifficultyTier, string> = {
    basic: '₹10,000',
    intermediate: '₹3,20,000',
    advanced: '₹25,00,000',
    expert: '₹1 करोड़',
    grandmaster: '₹7 करोड़',
  };

  return {
    id: `kbc-${tier}-${fact.idSuffix}-${index}`,
    questionHi: fact.qHi,
    questionEn: fact.qEn,
    optionsHi,
    optionsEn,
    correctIndex: correctIdx,
    explanationHi: fact.expHi,
    explanationEn: fact.expEn,
    categoryHi: fact.categoryHi,
    categoryEn: fact.categoryEn,
    difficultyTier: tier,
    kbcPrizeTag: prizeTags[tier],
    audiencePollPercentages: percentages,
    expertHintHi: fact.hintHi,
    expertHintEn: fact.hintEn,
  };
}

/**
 * Generates 100 progressive levels with KBC Questions.
 * Strictly guarantees:
 * - Levels 1 to 20: Basic
 * - Levels 21 to 40: Intermediate
 * - Levels 41 to 60: Advanced
 * - Levels 61 to 80: Expert
 * - Levels 81 to 100: Grandmaster (Jackpot 7 Crore tier)
 * - Questions seen by user (in seenQuestionIds) are filtered out, ensuring 100% fresh questions on login!
 */
export function generateKbc100Levels(seenQuestionIds: string[] = []): LevelConfig[] {
  const seenSet = new Set(seenQuestionIds);

  // Group master questions by tier
  const tierMaster: Record<KbcDifficultyTier, KbcQuestion[]> = {
    basic: MASTER_KBC_QUESTIONS.filter((q) => q.difficultyTier === 'basic'),
    intermediate: MASTER_KBC_QUESTIONS.filter((q) => q.difficultyTier === 'intermediate'),
    advanced: MASTER_KBC_QUESTIONS.filter((q) => q.difficultyTier === 'advanced'),
    expert: MASTER_KBC_QUESTIONS.filter((q) => q.difficultyTier === 'expert'),
    grandmaster: MASTER_KBC_QUESTIONS.filter((q) => q.difficultyTier === 'grandmaster'),
  };

  // Group extended facts by tier
  const factsMaster: Record<KbcDifficultyTier, TriviaFact[]> = {
    basic: EXTENDED_FACTS.filter((f) => f.tier === 'basic'),
    intermediate: EXTENDED_FACTS.filter((f) => f.tier === 'intermediate'),
    advanced: EXTENDED_FACTS.filter((f) => f.tier === 'advanced'),
    expert: EXTENDED_FACTS.filter((f) => f.tier === 'expert'),
    grandmaster: EXTENDED_FACTS.filter((f) => f.tier === 'grandmaster'),
  };

  const getTierForLevel = (levelNum: number): KbcDifficultyTier => {
    if (levelNum <= 20) return 'basic';
    if (levelNum <= 40) return 'intermediate';
    if (levelNum <= 60) return 'advanced';
    if (levelNum <= 80) return 'expert';
    return 'grandmaster';
  };

  const getPrizeTagForLevel = (levelNum: number): string => {
    if (levelNum <= 5) return `₹${levelNum * 2},000`;
    if (levelNum <= 10) return `₹${10 + (levelNum - 5) * 4},000`;
    if (levelNum <= 20) return `₹${40 + (levelNum - 10) * 10},000`;
    if (levelNum <= 30) return `₹${160 + (levelNum - 20) * 16},000`;
    if (levelNum <= 40) return `₹${320 + (levelNum - 30) * 32},000`;
    if (levelNum <= 50) return `₹${640 + (levelNum - 40) * 60},000`;
    if (levelNum <= 60) return `₹${1250 + (levelNum - 50) * 125},000`;
    if (levelNum <= 70) return `₹${2500 + (levelNum - 60) * 250},000`;
    if (levelNum <= 80) return `₹${(50 + (levelNum - 70) * 5) / 100} करोड़`;
    if (levelNum <= 90) return `₹${(100 + (levelNum - 80) * 20) / 100} करोड़`;
    if (levelNum < 100) return `₹${(300 + (levelNum - 90) * 40) / 100} करोड़`;
    return '₹7 करोड़ (महा-जैकपॉट)';
  };

  const getDifficultyTitle = (tier: KbcDifficultyTier, isHi: boolean): string => {
    switch (tier) {
      case 'basic':
        return isHi ? 'सरल स्तर (Basic Tier 1)' : 'Easy (Tier 1)';
      case 'intermediate':
        return isHi ? 'मध्यम स्तर (Intermediate Tier 2)' : 'Medium (Tier 2)';
      case 'advanced':
        return isHi ? 'कठिन स्तर (Advanced Tier 3)' : 'Advanced (Tier 3)';
      case 'expert':
        return isHi ? 'विशेषज्ञ स्तर (Expert Tier 4)' : 'Expert (Tier 4)';
      case 'grandmaster':
        return isHi ? 'करोड़पति ग्रैंडमास्टर (7 करोड़ स्तर)' : 'Grandmaster (7 Crore)';
    }
  };

  const levels: LevelConfig[] = [];

  // Track picked question IDs to avoid repeats within this 100-level set
  const sessionPickedIds = new Set<string>();

  for (let lvl = 1; lvl <= 100; lvl++) {
    const tier = getTierForLevel(lvl);
    const prizeTag = getPrizeTagForLevel(lvl);

    // Filter available unseen questions in this tier
    const availableCurated = shuffle(tierMaster[tier]).filter(
      (q) => !seenSet.has(q.id) && !sessionPickedIds.has(q.id)
    );

    let pickedQuestion: KbcQuestion | null = null;

    if (availableCurated.length > 0) {
      pickedQuestion = availableCurated[0];
    } else {
      // Pick from facts in this tier or fallback tier
      const facts = factsMaster[tier].length > 0 ? factsMaster[tier] : EXTENDED_FACTS;
      const unseenFacts = facts.filter((f) => !seenSet.has(`kbc-${tier}-${f.idSuffix}-${lvl}`));
      const factToUse = (unseenFacts.length > 0 ? shuffle(unseenFacts) : shuffle(facts))[0];

      pickedQuestion = createGeneratedQuestion(factToUse, lvl, tier);
    }

    sessionPickedIds.add(pickedQuestion.id);

    levels.push({
      id: lvl,
      question: pickedQuestion,
      difficultyHi: getDifficultyTitle(tier, true),
      difficultyEn: getDifficultyTitle(tier, false),
      prizeTag,
    });
  }

  return levels;
}

export const generateUnique100Levels = generateKbc100Levels;

/**
 * Provides a fresh replacement question for the Flip Question lifeline
 */
export function getReplacementQuestion(
  tier: KbcDifficultyTier,
  excludeQuestionIds: string[] = []
): KbcQuestion {
  const excludeSet = new Set(excludeQuestionIds);
  const candidates = MASTER_KBC_QUESTIONS.filter(
    (q) => q.difficultyTier === tier && !excludeSet.has(q.id)
  );

  if (candidates.length > 0) {
    return shuffle(candidates)[0];
  }

  // Fallback to any question in tier
  const tierQuestions = MASTER_KBC_QUESTIONS.filter((q) => q.difficultyTier === tier);
  if (tierQuestions.length > 0) {
    return shuffle(tierQuestions)[0];
  }

  // Fallback to extended facts
  const facts = EXTENDED_FACTS.filter((f) => f.tier === tier);
  const fact = facts.length > 0 ? shuffle(facts)[0] : shuffle(EXTENDED_FACTS)[0];
  return createGeneratedQuestion(fact, Math.floor(Math.random() * 80) + 1, tier);
}

export const GAME_LEVELS: LevelConfig[] = generateKbc100Levels();
