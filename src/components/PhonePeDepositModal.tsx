import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, QrCode, Smartphone, Sparkles, CheckCircle, ArrowRight, History } from 'lucide-react';
import { Language, UserAccount } from '../types';
import { sound } from '../utils/audio';

interface PhonePeDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onDepositSuccess: (amount: number, utr: string) => void;
  language: Language;
}

const PHONEPE_NUMBER = '9981228006';
const PHONEPE_UPI_ID = '9981228006-2@axl';
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
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastCreditedAmount, setLastCreditedAmount] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);

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

  const handleFillDemoUtr = () => {
    // Generate a realistic 12-digit UPI reference number
    const randomDigits = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setUtrNumber(randomDigits);
    setErrorMsg('');
    sound.playClick();
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
    if (cleanedUtr.length < 8) {
      setErrorMsg(
        isHi
          ? 'कृपया मान्य 12-अंकों का PhonePe UTR / ट्रांजैक्शन आई.डी. दर्ज करें।'
          : 'Please enter a valid 12-digit PhonePe UTR / Transaction ID.'
      );
      return;
    }

    // Success flow
    sound.playWin10X();
    setLastCreditedAmount(depositAmount);
    setIsSuccess(true);
    onDepositSuccess(depositAmount, cleanedUtr);
  };

  const handleDoneAndPlay = () => {
    setIsSuccess(false);
    setUtrNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="phonepe-deposit-modal"
        className="relative max-w-lg w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-5 sm:p-7 text-white shadow-2xl shadow-purple-950/60 overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#5f259f] flex items-center justify-center shadow-md text-white font-black text-lg border border-purple-400/40">
              पे
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  {isHi ? 'PhonePe डिपॉजिट पोर्टल' : 'PhonePe Deposit Portal'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  ₹100 - ₹1000
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isHi
                  ? 'रियल गेम में बने रहने के लिए अपने वॉलेट में पैसे जोड़ें'
                  : 'Add funds via PhonePe to continue playing 10X game'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-deposit-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="py-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-9 h-9 stroke-[2.5]" />
            </div>

            <h4 className="text-2xl font-black text-white">
              {isHi ? 'डिपॉजिट सफल!' : 'Deposit Successful!'}
            </h4>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono my-2">
              +₹{lastCreditedAmount.toLocaleString('en-IN')}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
              {isHi
                ? 'राशि आपके गेम वॉलेट में तुरंत जमा कर दी गई है। अब आप अपनी पसंद की शर्त लगाकर 10 गुना जीत सकते हैं!'
                : 'Coins have been credited to your game wallet. Place your bet now to win 10X payout!'}
            </p>

            <button
              id="btn-deposit-success-play"
              type="button"
              onClick={handleDoneAndPlay}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <span>{isHi ? 'गेम खेलें और 10X जीतें!' : 'Play & Win 10X Now!'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            {/* Alert banner about Welcome Bonus & Real Game */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-800/60 border border-purple-500/30 mb-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-amber-300">
                  {isHi ? 'वेलकम बोनस समाप्त होने पर:' : 'After Welcome Bonus:'}
                </span>{' '}
                {isHi
                  ? 'खिलाड़ी ₹100 से ₹1,000 तक PhonePe द्वारा जमा करके खेल जारी रख सकते हैं।'
                  : 'Deposit between ₹100 and ₹1,000 using PhonePe to continue the 10X challenge.'}
              </div>
            </div>

            {/* Official PhonePe Deposit Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5f259f]/30 via-slate-800/80 to-slate-900 border-2 border-purple-500/50 mb-5 relative space-y-3.5">
              {/* PhonePe Mobile Number Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isHi ? 'आधिकारिक PhonePe नंबर' : 'Official PhonePe Number'}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wider mt-0.5">
                    {PHONEPE_NUMBER}
                  </div>
                  <div className="text-xs text-purple-200/80 mt-0.5">
                    {isHi ? 'खाता धारक: चित्र पहेली 10X' : 'Account: Chitra Paheli 10X'}
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

              {/* UPI ID Row - 9981228006-2@axl */}
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
                        <span>{isHi ? 'UPI ID कॉपी हुई!' : 'UPI Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isHi ? 'UPI ID कॉपी करें' : 'Copy UPI ID'}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`upi://pay?pa=${PHONEPE_UPI_ID}&pn=ChitraPaheli10X&cu=INR&am=${selectedAmount}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>{isHi ? 'UPI से भेजें' : 'Pay via UPI'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitDeposit} className="space-y-4">
              {/* Step 1: Select Deposit Amount (₹100 to ₹1000) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>{isHi ? '1. राशि चुनें (₹100 से ₹1,000 तक):' : '1. Select Amount (₹100 to ₹1,000):'}</span>
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
                      className={`py-2 px-1 rounded-xl font-bold font-mono text-xs transition-all border ${
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
                    {isHi ? 'या अपनी राशि भरें:' : 'Or enter custom amount:'}
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
                  <span className="text-[11px] text-slate-500">(₹100 - ₹1000)</span>
                </div>
              </div>

              {/* Step 2: Enter UTR / Transaction ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>{isHi ? '2. PhonePe UTR / ट्रांजैक्शन आई.डी.:' : '2. PhonePe UTR / Reference ID:'}</span>
                  <button
                    type="button"
                    onClick={handleFillDemoUtr}
                    className="text-[11px] text-amber-400 hover:text-amber-300 underline font-normal lowercase"
                  >
                    {isHi ? '⚡ डेमो UTR भरें' : '⚡ Auto-fill demo UTR'}
                  </button>
                </label>
                <input
                  id="input-deposit-utr"
                  type="text"
                  maxLength={16}
                  required
                  placeholder={isHi ? 'उदा. 425619874521' : 'e.g. 425619874521'}
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value.trim())}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-widest focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {isHi
                    ? 'PhonePe में पेमेंट सफल होने के बाद स्क्रीन पर दिखने वाला 12-अंकों का UTR नंबर यहाँ दर्ज करें।'
                    : 'Enter the 12-digit UTR number shown in PhonePe payment receipt.'}
                </p>
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
                    : `Verify & Add ₹${customAmount || 0}`}
                </span>
              </button>
            </form>

            {/* Deposit History toggle if user has previous deposits */}
            {currentUser?.deposits && currentUser.deposits.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isHi ? 'पिछला डिपॉजिट इतिहास' : 'Previous Deposits History'}</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-purple-300">
                    {currentUser.deposits.length} {isHi ? 'जमा' : 'Deposits'}
                  </span>
                </button>

                {showHistory && (
                  <div className="mt-2 space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {currentUser.deposits.map((dep) => (
                      <div
                        key={dep.id}
                        className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-white font-mono">+₹{dep.amount}</div>
                          <div className="text-[10px] text-slate-400 font-mono">UTR: {dep.utr}</div>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {new Date(dep.timestamp).toLocaleDateString()}
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
    </div>
  );
};
