import React, { useState } from 'react';
import { ShieldCheck, Phone, User, KeyRound, ArrowRight, ArrowLeft, CheckCircle, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { UserAccount, Language } from '../types';
import { sound } from '../utils/audio';

interface AuthScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
  registeredUsers: UserAccount[];
  onRegisterAccount: (user: UserAccount) => void;
  language: Language;
  onLanguageToggle: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  registeredUsers,
  onRegisterAccount,
  language,
  onLanguageToggle,
}) => {
  const isHi = language === 'hi';

  // Mode: 'register' or 'login'
  const [mode, setMode] = useState<'register' | 'login'>('register');

  // Registration form fields (2-step process as requested)
  // Step 1: Mobile & Name
  // Step 2: ID (Mobile) confirmation + 4-digit PIN creation
  const [regStep, setRegStep] = useState<1 | 2>(1);
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regConfirmPin, setRegConfirmPin] = useState('');

  // Login form fields
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPin, setLoginPin] = useState('');

  // Error state
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Step 1 of Registration
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanedName = regName.trim();
    const cleanedMobile = regMobile.trim();

    if (cleanedName.length < 2) {
      setErrorMsg(isHi ? 'कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)' : 'Please enter your full name (at least 2 characters)');
      return;
    }

    if (!/^\d{10}$/.test(cleanedMobile)) {
      setErrorMsg(isHi ? 'कृपया मान्य 10-अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    // Check if mobile is already registered
    const existing = registeredUsers.find((u) => u.mobile === cleanedMobile);
    if (existing) {
      setErrorMsg(
        isHi
          ? 'यह मोबाइल नंबर (आई.डी.) पहले से पंजीकृत है! कृपया लॉगिन करें।'
          : 'This mobile number is already registered! Please login.'
      );
      return;
    }

    sound.playClick();
    setRegStep(2);
  };

  // Complete Registration
  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!/^\d{4}$/.test(regPin)) {
      setErrorMsg(isHi ? 'पासवर्ड केवल 4 अंकों का नंबर होना चाहिए' : 'Password must be exactly 4 digits');
      return;
    }

    if (regPin !== regConfirmPin) {
      setErrorMsg(isHi ? 'दोनों पासवर्ड (पिन) एक समान नहीं हैं' : 'Password and Confirm Password do not match');
      return;
    }

    const newUser: UserAccount = {
      name: regName.trim(),
      mobile: regMobile.trim(),
      pin: regPin,
      registeredAt: Date.now(),
      walletBalance: 50, // Welcome bonus of ₹50
      highestUnlockedLevel: 0,
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        totalWon: 0,
        highestPayout: 0,
        bestTime: 0,
      },
    };

    sound.playWin10X();
    onRegisterAccount(newUser);
    onLoginSuccess(newUser);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanedMobile = loginMobile.trim();
    if (!/^\d{10}$/.test(cleanedMobile)) {
      setErrorMsg(isHi ? 'कृपया मान्य 10-अंकों की आई.डी. (मोबाइल नंबर) दर्ज करें' : 'Please enter a valid 10-digit Mobile ID');
      return;
    }

    if (!/^\d{4}$/.test(loginPin)) {
      setErrorMsg(isHi ? 'कृपया अपना 4-अंकों का पासवर्ड दर्ज करें' : 'Please enter your 4-digit password');
      return;
    }

    const user = registeredUsers.find((u) => u.mobile === cleanedMobile);
    if (!user) {
      setErrorMsg(
        isHi
          ? 'यह आई.डी. पंजीकृत नहीं है। कृपया पहले नया रजिस्ट्रेशन करें।'
          : 'This ID is not registered. Please register first.'
      );
      return;
    }

    if (user.pin !== loginPin) {
      setErrorMsg(isHi ? 'गलत पासवर्ड! कृपया सही 4-अंकों का पिन दर्ज करें।' : 'Incorrect password! Please enter correct 4-digit PIN.');
      return;
    }

    sound.playClick();
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-4 sm:p-6 text-slate-100">
      {/* Top Bar for Language Toggle */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-md text-slate-950 font-black text-xs">
            KBC
          </div>
          <span className="text-xs font-bold text-amber-400">
            {isHi ? 'कौन बनेगा करोड़पति 100X' : 'KBC 100X Quiz'}
          </span>
        </div>

        <button
          type="button"
          onClick={onLanguageToggle}
          className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
        >
          {isHi ? 'English' : 'हिन्दी'}
        </button>
      </div>

      {/* Main Registration Card */}
      <div className="max-w-md w-full mx-auto my-auto">
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isHi ? '30 सेकंड 10X गेमिंग पोर्टल' : '30s 10X Gaming Portal'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {mode === 'register'
                ? isHi
                  ? 'खिलाड़ी रजिस्ट्रेशन'
                  : 'Player Registration'
                : isHi
                ? 'आई.डी. लॉगिन करें'
                : 'Player Login'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'register'
                ? isHi
                  ? 'रजिस्ट्रेशन पूरा होते ही खिलाड़ी को गेम शुरू करने के लिए ₹50 का वेलकम बोनस प्राप्त होता है।'
                  : 'Register now and instantly get ₹50 Welcome Bonus to start the game.'
                : isHi
                ? 'अपनी आई.डी. (मोबाइल नंबर) और 4 अंकों का पासवर्ड डालकर प्रवेश करें।'
                : 'Enter your ID (Mobile Number) and 4-digit Password to continue.'}
            </p>
          </div>

          {/* Tab Switcher: Register / Login */}
          <div className="flex p-1 rounded-2xl bg-slate-800/80 border border-slate-700 mb-6">
            <button
              id="tab-register"
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                mode === 'register'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isHi ? 'नया रजिस्ट्रेशन' : 'New Registration'}</span>
            </button>
            <button
              id="tab-login"
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                mode === 'login'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isHi ? 'आई.डी. लॉगिन' : 'ID Login'}</span>
            </button>
          </div>

          {/* Error Message display */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs text-center font-medium animate-shake">
              {errorMsg}
            </div>
          )}

          {/* REGISTRATION FORM */}
          {mode === 'register' && (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-5 px-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      regStep === 1
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                        : 'bg-emerald-500 text-slate-950'
                    }`}
                  >
                    {regStep === 1 ? '1' : <CheckCircle className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-bold ${regStep === 1 ? 'text-amber-400' : 'text-slate-400'}`}>
                    {isHi ? 'नाम व मोबाइल' : 'Name & Mobile'}
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-slate-700" />

                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      regStep === 2
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    2
                  </div>
                  <span className={`text-xs font-bold ${regStep === 2 ? 'text-amber-400' : 'text-slate-500'}`}>
                    {isHi ? 'आई.डी. व 4-अंक पासवर्ड' : 'ID & 4-Digit PIN'}
                  </span>
                </div>
              </div>

              {/* STEP 1: Name and Mobile */}
              {regStep === 1 && (
                <form onSubmit={handleProceedToStep2} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHi ? 'आपका पूरा नाम (Full Name)' : 'Your Full Name'}</span>
                    </label>
                    <input
                      id="reg-name-input"
                      type="text"
                      required
                      placeholder={isHi ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHi ? 'मोबाइल नंबर (यही आपकी आई.डी. बनेगी)' : 'Mobile Number (Will be your ID)'}</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-sm text-slate-400 font-mono font-bold">
                        +91
                      </span>
                      <input
                        id="reg-mobile-input"
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="9876543210"
                        value={regMobile}
                        onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-14 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isHi
                        ? 'नोट: आपका मोबाइल नंबर ही इस गेम की लॉगिन आई.डी. होगा।'
                        : 'Note: Your mobile number will serve as your Login ID.'}
                    </p>
                  </div>

                  <button
                    id="btn-reg-next-step"
                    type="submit"
                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <span>{isHi ? 'आगे बढ़ें (आई.डी. व पासवर्ड बनाएं)' : 'Continue to Create ID & Password'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 2: ID & 4-Digit Password (PIN) creation */}
              {regStep === 2 && (
                <form onSubmit={handleCompleteRegistration} className="space-y-4 animate-in fade-in duration-200">
                  {/* Confirmed ID card */}
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-400">
                        {isHi ? 'आपकी आई.डी. (Login ID)' : 'Your Login ID'}
                      </div>
                      <div className="text-base font-black text-white font-mono tracking-wider">
                        +91 {regMobile}
                      </div>
                      <div className="text-[11px] text-slate-400">{regName}</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      {isHi ? 'मोबाइल = ID' : 'Mobile = ID'}
                    </div>
                  </div>

                  {/* 4-digit PIN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHi ? 'अपनी पसंद का 4-अंकों का पासवर्ड (PIN) बनाएं' : 'Create 4-Digit Password (PIN)'}</span>
                    </label>
                    <input
                      id="reg-pin-input"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      placeholder="• • • •"
                      value={regPin}
                      onChange={(e) => setRegPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-white font-mono text-xl tracking-[0.5em] focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                    />
                    <p className="text-[11px] text-slate-400 mt-1 text-center">
                      {isHi ? 'कोई भी 4 अंकों का नंबर (जैसे 1234, 4589)' : 'Any 4-digit number of your choice (e.g. 1234)'}
                    </p>
                  </div>

                  {/* Confirm PIN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {isHi ? '4-अंकों का पासवर्ड दोबारा दर्ज करें (Confirm PIN)' : 'Confirm 4-Digit Password'}
                    </label>
                    <input
                      id="reg-confirm-pin-input"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      placeholder="• • • •"
                      value={regConfirmPin}
                      onChange={(e) => setRegConfirmPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-white font-mono text-xl tracking-[0.5em] focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{isHi ? 'पीछे' : 'Back'}</span>
                    </button>

                    <button
                      id="btn-complete-reg"
                      type="submit"
                      className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isHi ? 'रजिस्ट्रेशन पूरा करें (₹50 बोनस)' : 'Complete & Get ₹50 Bonus'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? 'आई.डी. नंबर (आपका 10-अंकों का मोबाइल नंबर)' : 'Login ID (10-Digit Mobile Number)'}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm text-slate-400 font-mono font-bold">
                    +91
                  </span>
                  <input
                    id="login-mobile-input"
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="9876543210"
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-14 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? '4-अंकों का पासवर्ड (PIN)' : '4-Digit Password (PIN)'}</span>
                </label>
                <input
                  id="login-pin-input"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  placeholder="• • • •"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-white font-mono text-xl tracking-[0.5em] focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600"
                />
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{isHi ? 'आई.डी. से लॉगिन करें' : 'Login to Game'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] text-slate-500 pt-3">
        {isHi
          ? 'सुरक्षित इन-मेमोरी व लोकल स्टोरेज लॉगिन • 30 सेकंड चित्र पहेली 10X'
          : 'Secure Local Storage Authentication • Chitra Paheli 10X'}
      </div>
    </div>
  );
};
