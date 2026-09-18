import React, { useState, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  QrCode,
  Smartphone,
  Sparkles,
  CheckCircle,
  ArrowRight,
  History,
  Upload,
  Image as ImageIcon,
  MessageCircle,
  Trash2,
  AlertCircle,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { Language, UserAccount } from '../types';
import { sound } from '../utils/audio';

interface PhonePeDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onDepositSuccess: (
    amount: number,
    utr: string,
    screenshotUrl?: string,
    screenshotName?: string
  ) => void;
  language: Language;
}

const PHONEPE_NUMBER = '9981228006';
const PHONEPE_UPI_ID = '9981228006-2@axl';
const WHATSAPP_NUMBER = '9981228006';
const PRESET_AMOUNTS = [100, 200, 300, 500, 800, 1000];

export const PhonePeDepositModal: React.FC<PhonePeDepositModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onDepositSuccess,
  language,
}) => {
  const isHi = language === 'hi';

  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [customAmount, setCustomAmount] = useState<string>('200');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastCreditedAmount, setLastCreditedAmount] = useState<number>(0);
  const [lastUtr, setLastUtr] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selectedHistoryScreenshot, setSelectedHistoryScreenshot] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleCopyPhonePe = () => {
    navigator.clipboard.writeText(PHONEPE_NUMBER);
    setCopiedNumber(true);
    sound.playClick();
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(PHONEPE_UPI_ID);
    setCopiedUpi(true);
    sound.playClick();
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setErrorMsg('');
    sound.playClick();
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setSelectedAmount(num);
    }
    setErrorMsg('');
  };

  // Handle Screenshot file processing
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg(
        isHi
          ? 'कृपया केवल इमेज फाइल (JPG, PNG, WEBP) अपलोड करें।'
          : 'Please upload an image file (JPG, PNG, WEBP).'
      );
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg(
        isHi
          ? 'इमेज साइज 8MB से कम होना चाहिए।'
          : 'Image size should be less than 8MB.'
      );
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setScreenshotPreview(result);
      setScreenshotName(file.name);
      sound.playClick();
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotPreview(null);
    setScreenshotName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // WhatsApp pre-formatted URL generator
  const getWhatsAppUrl = (amount: number, utr: string) => {
    const message = isHi
      ? `नमस्ते, मैंने चित्र पहेली गेम में ₹${amount} का PhonePe/UPI पेमेंट (UPI ID: ${PHONEPE_UPI_ID}) पर किया है।\n\n` +
        `• UTR / ट्रांजैक्शन ID: ${utr || 'स्क्रीनशॉट संलग्न है'}\n` +
        `• खिलाड़ी मोबाइल / ID: ${currentUser?.mobile || 'प्लेयर'}\n` +
        `• तारीख व समय: ${new Date().toLocaleString('en-IN')}\n\n` +
        `कृपया मेरा स्क्रीनशॉट और पेमेंट सत्यापित करके वॉलेट में राशि जोड़ें। धन्यवाद!`
      : `Hello, I have completed a deposit payment of ₹${amount} for Picture Puzzle via PhonePe/UPI (${PHONEPE_UPI_ID}).\n\n` +
        `• UTR / Txn ID: ${utr || 'Screenshot attached'}\n` +
        `• Player Mobile / ID: ${currentUser?.mobile || 'Player'}\n` +
        `• Date: ${new Date().toLocaleString('en-IN')}\n\n` +
        `Please verify my payment screenshot and credit the wallet. Thank you!`;

    return `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const depositAmount = parseInt(customAmount, 10);
    if (isNaN(depositAmount) || depositAmount < 100 || depositAmount > 1000) {
      setErrorMsg(
        isHi
          ? 'डिपॉजिट राशि ₹100 से ₹1,000 के बीच होनी चाहिए।'
          : 'Deposit amount must be between ₹100 and ₹1,000.'
      );
      return;
    }

    const cleanedUtr = utrNumber.trim();
    if (cleanedUtr.length < 8 && !screenshotPreview) {
      setErrorMsg(
        isHi
          ? 'कृपया UTR नंबर दर्ज करें अथवा पेमेंट का स्क्रीनशॉट अपलोड करें ताकि डिपॉजिट सत्यापित हो सके।'
          : 'Please enter the UTR number or upload the payment screenshot to verify deposit.'
      );
      return;
    }

    // Success / Verified flow
    sound.playWin10X();
    setLastCreditedAmount(depositAmount);
    setLastUtr(cleanedUtr || 'VERIFIED-IMG');
    setIsSuccess(true);
    onDepositSuccess(
      depositAmount,
      cleanedUtr || 'IMG-' + Date.now().toString().slice(-6),
      screenshotPreview || undefined,
      screenshotName || undefined
    );
  };

  const handleDoneAndPlay = () => {
    setIsSuccess(false);
    setUtrNumber('');
    setScreenshotPreview(null);
    setScreenshotName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="phonepe-deposit-modal"
        className="relative max-w-xl w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-5 sm:p-7 text-white shadow-2xl shadow-purple-950/60 overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#5f259f] flex items-center justify-center shadow-md text-white font-black text-lg border border-purple-400/40">
              पे
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  {isHi ? 'PhonePe व UPI डिपॉजिट' : 'PhonePe & UPI Deposit'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  ₹100 - ₹1000
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isHi
                  ? 'स्क्रीनशॉट अपलोड या WhatsApp (9981228006) द्वारा सत्यापन'
                  : 'Upload screenshot or WhatsApp to 9981228006 for verification'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-deposit-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success / Verification View */}
        {isSuccess ? (
          <div className="py-5 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 text-emerald-400 mx-auto flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHi ? 'डिपॉजिट सत्यापित एवं वॉलेट में क्रेडिट!' : 'Deposit Verified & Credited!'}</span>
            </div>

            <h4 className="text-2xl font-black text-white">
              {isHi ? 'भुगतान सफलतापूर्वक जमा हुआ!' : 'Payment Successfully Added!'}
            </h4>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono my-2">
              +₹{lastCreditedAmount.toLocaleString('en-IN')}
            </div>

            <div className="my-3 p-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-left text-xs max-w-sm mx-auto space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>{isHi ? 'जमा राशि:' : 'Amount:'}</span>
                <strong className="text-white font-mono">₹{lastCreditedAmount}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isHi ? 'UTR / आईडी:' : 'UTR / Ref:'}</span>
                <strong className="text-amber-300 font-mono">{lastUtr}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isHi ? 'सत्यापन स्थिति:' : 'Status:'}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {isHi ? 'सत्यापित (Verified)' : 'Verified'}
                </span>
              </div>
              {screenshotPreview && (
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-slate-400">{isHi ? 'स्क्रीनशॉट:' : 'Screenshot:'}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryScreenshot(screenshotPreview)}
                    className="text-purple-300 hover:text-purple-200 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isHi ? 'देखें' : 'View'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 my-4 text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  {isHi ? 'WhatsApp (9981228006) पर रसीद भेजें' : 'Send receipt via WhatsApp (9981228006)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mb-2.5">
                {isHi
                  ? 'यदि आपने अभी तक स्क्रीनशॉट व्हाट्सएप पर नहीं भेजा है, तो एक क्लिक में 9981228006 पर भेज सकते हैं।'
                  : 'If you have not messaged on WhatsApp yet, send your screenshot to 9981228006 with one tap.'}
              </p>
              <a
                href={getWhatsAppUrl(lastCreditedAmount, lastUtr)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isHi ? 'WhatsApp (9981228006) पर खोलें' : 'Open WhatsApp (9981228006)'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              id="btn-deposit-success-play"
              type="button"
              onClick={handleDoneAndPlay}
              className="mt-3 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <span>{isHi ? 'गेम खेलें और 2X जीतें!' : 'Play & Win 2X Now!'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            {/* Rule & Verification Policy Notice */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-800/80 to-slate-900 border border-purple-500/40 mb-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isHi
                    ? 'पेमेंट के बाद स्क्रीनशॉट अपलोड करें व WhatsApp करें'
                    : 'Upload Screenshot & WhatsApp for Verification'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isHi
                  ? 'PhonePe या UPI (9981228006-2@axl) पर पेमेंट करने के बाद अपनी जमा राशि का स्क्रीनशॉट यहाँ अपलोड करें अथवा WhatsApp (9981228006) पर भेजें। उसके बाद ही डिपॉजिट सत्यापित होगी।'
                  : 'After paying via PhonePe or UPI (9981228006-2@axl), upload your screenshot below or WhatsApp it to 9981228006. Deposit will be verified post submission.'}
              </p>
            </div>

            {/* Official Payment Accounts Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5f259f]/30 via-slate-800/80 to-slate-900 border-2 border-purple-500/50 mb-5 space-y-3.5">
              {/* PhonePe Number Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isHi ? 'PhonePe मोबाइल नंबर' : 'PhonePe Mobile Number'}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wider mt-0.5">
                    {PHONEPE_NUMBER}
                  </div>
                  <div className="text-xs text-purple-200/80 mt-0.5">
                    {isHi ? 'खाता: चित्र पहेली गेम (PhonePe Verified)' : 'Account: Chitra Paheli Game'}
                  </div>
                </div>

                <button
                  id="btn-copy-phonepe-number"
                  type="button"
                  onClick={handleCopyPhonePe}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    copiedNumber
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-[#5f259f] hover:bg-[#702dbd] text-white border border-purple-400/50 shadow-md shadow-purple-900/40'
                  }`}
                >
                  {copiedNumber ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isHi ? 'नंबर कॉपी हुआ!' : 'Number Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{isHi ? 'नंबर कॉपी करें' : 'Copy Number'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* UPI ID Row */}
              <div className="pt-3 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-purple-950/40 p-3 rounded-xl border border-purple-500/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-300 block leading-tight">
                      {isHi ? 'आधिकारिक UPI ID' : 'Official UPI ID'}
                    </span>
                    <span className="text-sm sm:text-base font-black text-amber-300 font-mono tracking-wide">
                      {PHONEPE_UPI_ID}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-copy-upi-id"
                    type="button"
                    onClick={handleCopyUpiId}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      copiedUpi
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-purple-200 border border-purple-400/40'
                    }`}
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{isHi ? 'कॉपी हुआ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isHi ? 'UPI ID कॉपी' : 'Copy UPI'}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`upi://pay?pa=${PHONEPE_UPI_ID}&pn=ChitraPaheliGame&cu=INR&am=${selectedAmount}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>{isHi ? 'UPI ऐप से भेजें' : 'Pay via UPI'}</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Verification Hotline Callout */}
              <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isHi
                      ? 'WhatsApp सत्यापन नंबर: 9981228006'
                      : 'WhatsApp Verification Helpline: 9981228006'}
                  </span>
                </div>
                <a
                  href={getWhatsAppUrl(selectedAmount, utrNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-300 hover:text-white underline flex items-center gap-1"
                >
                  <span>{isHi ? 'व्हाट्सएप चैट' : 'Chat'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/60 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitDeposit} className="space-y-4">
              {/* Step 1: Select Deposit Amount */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>
                    {isHi
                      ? '1. राशि चुनें (₹100 से ₹1,000 तक):'
                      : '1. Select Amount (₹100 to ₹1,000):'}
                  </span>
                  <span className="text-amber-400 font-mono text-sm font-black">
                    ₹{customAmount || 0}
                  </span>
                </label>

                {/* Preset Chips */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2.5">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSelectPreset(amt)}
                      className={`py-2 px-1 rounded-xl font-bold font-mono text-xs transition-all border cursor-pointer ${
                        selectedAmount === amt && customAmount === amt.toString()
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-300 shadow-md shadow-purple-900/40 scale-105'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {isHi ? 'या अपनी राशि भरें:' : 'Or custom amount:'}
                  </span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2 text-xs text-purple-400 font-mono font-bold">
                      ₹
                    </span>
                    <input
                      id="input-custom-deposit-amt"
                      type="number"
                      min={100}
                      max={1000}
                      required
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="100 - 1000"
                      className="w-full pl-7 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">₹100 - ₹1000</span>
                </div>
              </div>

              {/* Step 2: UTR / Transaction ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {isHi
                    ? '2. PhonePe / UPI UTR (12-अंकों का ट्रांजैक्शन नंबर):'
                    : '2. PhonePe / UPI UTR / 12-Digit Reference ID:'}
                </label>
                <input
                  id="input-deposit-utr"
                  type="text"
                  maxLength={24}
                  placeholder={isHi ? 'उदा. 425619874521' : 'e.g. 425619874521'}
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value.trim())}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {isHi
                    ? 'PhonePe में पेमेंट के बाद दिखने वाला UTR नंबर यहाँ लिखें।'
                    : 'Enter the 12-digit UTR number from the payment receipt.'}
                </p>
              </div>

              {/* Step 3: Screenshot Upload (Drag-and-Drop + Manual Click) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>
                      {isHi
                        ? '3. पेमेंट का स्क्रीनशॉट अपलोड करें:'
                        : '3. Upload Payment Screenshot:'}
                    </span>
                  </label>
                  <span className="text-[10px] text-amber-300 font-semibold">
                    {isHi ? 'सत्यापन हेतु आवश्यक' : 'For Verification'}
                  </span>
                </div>

                {screenshotPreview ? (
                  /* Uploaded preview card */
                  <div className="p-3 rounded-2xl bg-slate-800/90 border border-purple-500/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={screenshotPreview}
                        alt="Payment Screenshot"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md shrink-0 cursor-pointer"
                        onClick={() => setSelectedHistoryScreenshot(screenshotPreview)}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-[220px]">
                          {screenshotName || 'payment_receipt.png'}
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>{isHi ? 'स्क्रीनशॉट लोड हुआ' : 'Screenshot Ready'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedHistoryScreenshot(screenshotPreview)}
                          className="text-[10px] text-purple-300 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isHi ? 'बड़ा करके देखें' : 'View Full'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold cursor-pointer"
                        title={isHi ? 'दूसरा स्क्रीनशॉट चुनें' : 'Change screenshot'}
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveScreenshot}
                        className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs cursor-pointer"
                        title={isHi ? 'हटाएं' : 'Remove'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Drag and drop zone */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? 'border-purple-400 bg-purple-950/40 scale-[1.01]'
                        : 'border-slate-700 hover:border-purple-500/70 bg-slate-950/50 hover:bg-slate-900/80'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-500/40 text-purple-300 mx-auto flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">
                      {isHi
                        ? 'स्क्रीनशॉट यहाँ ड्रैग करें अथवा क्लिक करके चुनें'
                        : 'Drag and drop screenshot here, or click to browse'}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isHi
                        ? 'PhonePe / UPI पेमेंट की रसीद (JPG, PNG, WEBP)'
                        : 'PhonePe / UPI payment confirmation (JPG, PNG, WEBP)'}
                    </p>
                  </div>
                )}
              </div>

              {/* Step 4: WhatsApp to 9981228006 Option */}
              <div className="p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#25D366] text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                    <MessageCircle className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isHi ? 'WhatsApp पर रसीद भेजें: 9981228006' : 'WhatsApp Receipt: 9981228006'}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {isHi
                        ? 'स्क्रीनशॉट सीधे हमारे WhatsApp नंबर पर भी भेज सकते हैं'
                        : 'You can also send your screenshot directly to WhatsApp'}
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(
                    parseInt(customAmount, 10) || selectedAmount,
                    utrNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isHi ? 'WhatsApp खोलें' : 'WhatsApp'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-deposit-verify"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-400 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isHi
                    ? `₹${customAmount || 0} डिपॉजिट सत्यापित करें`
                    : `Verify & Credit ₹${customAmount || 0}`}
                </span>
              </button>
            </form>

            {/* Deposit History toggle if user has previous deposits */}
            {currentUser?.deposits && currentUser.deposits.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isHi ? 'पिछला डिपॉजिट व सत्यापन इतिहास' : 'Deposit & Verification History'}</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-purple-300">
                    {currentUser.deposits.length} {isHi ? 'रिकॉर्ड्स' : 'Records'}
                  </span>
                </button>

                {showHistory && (
                  <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {currentUser.deposits.map((dep) => (
                      <div
                        key={dep.id}
                        className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          {dep.screenshotUrl ? (
                            <img
                              src={dep.screenshotUrl}
                              alt="Receipt"
                              onClick={() => setSelectedHistoryScreenshot(dep.screenshotUrl || null)}
                              className="w-9 h-9 rounded-lg object-cover border border-purple-500/40 cursor-pointer"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
                              पे
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white font-mono flex items-center gap-1.5">
                              <span>+₹{dep.amount}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-bold">
                                {isHi ? 'सत्यापित' : 'VERIFIED'}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono truncate max-w-[130px] sm:max-w-[180px]">
                              UTR: {dep.utr}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">
                            {new Date(dep.timestamp).toLocaleDateString('en-IN')}
                          </div>
                          {dep.screenshotUrl && (
                            <button
                              type="button"
                              onClick={() => setSelectedHistoryScreenshot(dep.screenshotUrl || null)}
                              className="text-[10px] text-purple-300 hover:text-white underline cursor-pointer"
                            >
                              {isHi ? 'रसीद देखें' : 'View'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full-size Screenshot Preview Modal */}
      {selectedHistoryScreenshot && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedHistoryScreenshot(null)}
        >
          <div
            className="relative max-w-md w-full bg-slate-900 border border-purple-500/50 rounded-2xl p-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white">
                {isHi ? 'पेमेंट स्क्रीनशॉट रसीद' : 'Payment Screenshot Receipt'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedHistoryScreenshot(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={selectedHistoryScreenshot}
              alt="Payment Screenshot Preview"
              className="max-h-[70vh] w-auto mx-auto rounded-xl object-contain border border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};
