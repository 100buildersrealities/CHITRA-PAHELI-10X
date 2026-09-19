import React, { useState } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Smartphone,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  History,
  AlertCircle,
  Wallet,
  Zap,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Language, UserAccount, PayoutMethod, WithdrawalRecord } from '../types';
import { sound } from '../utils/audio';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  walletBalance: number;
  onWithdrawSuccess: (record: WithdrawalRecord) => void;
  language: Language;
}

const PRESET_WITHDRAW_AMOUNTS = [50, 100, 200, 500, 1000];

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  walletBalance,
  onWithdrawSuccess,
  language,
}) => {
  const isHi = language === 'hi';

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>('phonepe');
  const [inputMode, setInputMode] = useState<'mobile' | 'upi'>('mobile');
  const [mobileNumber, setMobileNumber] = useState<string>(currentUser?.mobile || '');
  const [upiId, setUpiId] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>(
    walletBalance >= 50 ? '50' : walletBalance > 0 ? walletBalance.toString() : '50'
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successRecord, setSuccessRecord] = useState<WithdrawalRecord | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleMethodSelect = (method: PayoutMethod) => {
    setSelectedMethod(method);
    setErrorMsg('');
    sound.playClick();
  };

  const handleSelectPreset = (amount: number) => {
    setWithdrawAmount(amount.toString());
    setErrorMsg('');
    sound.playClick();
  };

  const handleSelectAll = () => {
    setWithdrawAmount(walletBalance.toString());
    setErrorMsg('');
    sound.playClick();
  };

  // Generate official-looking UTR reference number
  const generateUTR = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100000 + Math.random() * 900000);
    return `UTR${timestamp}${random}`;
  };

  const handleSubmitWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg(isHi ? 'कृपया वैध निकासी राशि दर्ज करें।' : 'Please enter a valid withdrawal amount.');
      return;
    }

    if (amountNum < 20) {
      setErrorMsg(isHi ? 'न्यूनतम निकासी राशि ₹20 है।' : 'Minimum withdrawal amount is ₹20.');
      return;
    }

    if (amountNum > walletBalance) {
      setErrorMsg(
        isHi
          ? `आपके पास केवल ₹${walletBalance} बैलेंस है। इससे अधिक नहीं निकाला जा सकता।`
          : `Insufficient balance! You only have ₹${walletBalance}.`
      );
      return;
    }

    let destinationTarget = '';

    if (inputMode === 'mobile') {
      const cleanPhone = mobileNumber.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        setErrorMsg(isHi ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
        return;
      }
      destinationTarget = `+91 ${cleanPhone}`;
    } else {
      const cleanUpi = upiId.trim();
      if (!cleanUpi.includes('@') || cleanUpi.length < 5) {
        setErrorMsg(
          isHi
            ? 'कृपया वैध UPI ID दर्ज करें (जैसे: 9876543210@ybl या name@oksbi)'
            : 'Please enter a valid UPI ID (e.g. mobile@ybl or name@oksbi)'
        );
        return;
      }
      destinationTarget = cleanUpi;
    }

    // Process Withdrawal
    setIsProcessing(true);
    sound.playClick();

    setTimeout(() => {
      const newRecord: WithdrawalRecord = {
        id: `wd-${Date.now()}`,
        amount: amountNum,
        method: selectedMethod,
        accountTarget: destinationTarget,
        utr: generateUTR(),
        timestamp: Date.now(),
        status: 'SUCCESS',
      };

      setIsProcessing(false);
      setSuccessRecord(newRecord);
      sound.playWithdrawalSuccess();
      onWithdrawSuccess(newRecord);
    }, 1500);
  };

  const userWithdrawals = currentUser?.withdrawals || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="withdrawal-modal"
        className="relative max-w-lg w-full bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 text-white shadow-2xl shadow-emerald-950/40 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="btn-close-withdraw-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-600/30">
            <Zap className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {isHi ? 'पैसे निकालें (Instant Payout)' : 'Withdraw Winnings'}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {isHi ? 'तत्काल ट्रांसफर' : 'Instant 24x7'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'PhonePe और Google Pay (GPay) द्वारा जीते हुए पैसे सीधे अपने खाते में ट्रांसफर करें'
                : 'Direct payout to PhonePe, Google Pay (GPay) or UPI'}
            </p>
          </div>
        </div>

        {/* Balance Display Card */}
        <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-800/80 to-slate-900 border border-emerald-500/30 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block leading-none">
                {isHi ? 'उपलब्ध जीतने की राशि' : 'Withdrawable Balance'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono leading-tight">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {showHistory
                ? isHi
                  ? 'वापस जाएं'
                  : 'Back'
                : isHi
                ? `इतिहास (${userWithdrawals.length})`
                : `History (${userWithdrawals.length})`}
            </span>
          </button>
        </div>

        {/* Success View */}
        {successRecord ? (
          <div className="py-6 px-4 text-center bg-slate-950/80 border border-emerald-500/50 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-xl font-black text-white">
              {isHi ? 'निकासी सफल! (Transfer Successful)' : 'Withdrawal Successful!'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isHi
                ? `₹${successRecord.amount} की राशि आपके ${
                    successRecord.method === 'phonepe'
                      ? 'PhonePe'
                      : successRecord.method === 'gpay'
                      ? 'Google Pay (GPay)'
                      : 'UPI'
                  } खाते पर भेज दी गई है।`
                : `₹${successRecord.amount} has been instantly transferred to your ${successRecord.method.toUpperCase()} account.`}
            </p>

            <div className="my-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">{isHi ? 'ट्रांसफर राशि:' : 'Amount:'}</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  ₹{successRecord.amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isHi ? 'माध्यम (Method):' : 'Method:'}</span>
                <span className="font-bold text-slate-200 uppercase">
                  {successRecord.method === 'phonepe'
                    ? 'PhonePe (फ़ोनपे)'
                    : successRecord.method === 'gpay'
                    ? 'Google Pay (GPay)'
                    : 'UPI ID'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isHi ? 'खाता / VPA:' : 'Destination:'}</span>
                <span className="font-mono text-slate-200">{successRecord.accountTarget}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1.5">
                <span className="text-slate-400">UTR / Ref No:</span>
                <span className="font-mono text-amber-400 font-bold">{successRecord.utr}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSuccessRecord(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                {isHi ? 'अन्य निकासी करें' : 'Withdraw More'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors"
              >
                {isHi ? 'गेम खेलें (Done)' : 'Back to Game'}
              </button>
            </div>
          </div>
        ) : showHistory ? (
          /* Withdrawal History View */
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
              <History className="w-4 h-4 text-amber-400" />
              <span>{isHi ? 'आपकी पिछली निकासी' : 'Your Withdrawal History'}</span>
            </h4>

            {userWithdrawals.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">
                  {isHi ? 'अभी तक कोई निकासी नहीं की गई है।' : 'No withdrawals made yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {userWithdrawals.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black text-[11px] px-2 py-0.5 rounded-md ${
                            item.method === 'phonepe'
                              ? 'bg-[#5f259f]/30 text-purple-300 border border-purple-500/30'
                              : item.method === 'gpay'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {item.method.toUpperCase()}
                        </span>
                        <span className="font-bold text-white font-mono text-sm">
                          ₹{item.amount}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {item.accountTarget}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        UTR: {item.utr} • {new Date(item.timestamp).toLocaleDateString('en-IN')}
                      </p>
                    </div>

                    <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {isHi ? 'सफल' : 'Success'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Main Withdrawal Form */
          <form onSubmit={handleSubmitWithdrawal} className="space-y-4">
            {/* Step 1: Select Payment App / Method */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isHi ? '1. निकासी का माध्यम चुनें (PhonePe / Google Pay):' : '1. Select Payout Method:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* PhonePe Option */}
                <button
                  id="btn-method-phonepe"
                  type="button"
                  onClick={() => handleMethodSelect('phonepe')}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all text-left ${
                    selectedMethod === 'phonepe'
                      ? 'bg-[#5f259f]/30 border-purple-400 text-white shadow-lg shadow-purple-950/50 ring-1 ring-purple-400'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#5f259f] text-white font-black text-xs flex items-center justify-center shadow-md">
                    पे
                  </div>
                  <div>
                    <span className="block text-xs font-black text-white">PhonePe (फ़ोनपे)</span>
                    <span className="block text-[10px] text-purple-300">UPI / Mobile Payout</span>
                  </div>
                </button>

                {/* Google Pay Option */}
                <button
                  id="btn-method-gpay"
                  type="button"
                  onClick={() => handleMethodSelect('gpay')}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all text-left ${
                    selectedMethod === 'gpay'
                      ? 'bg-blue-950/40 border-blue-400 text-white shadow-lg shadow-blue-950/50 ring-1 ring-blue-400'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white text-blue-600 font-black text-xs flex items-center justify-center shadow-md border border-slate-200">
                    <span className="bg-gradient-to-r from-blue-600 via-red-500 to-green-600 bg-clip-text text-transparent font-black">
                      G
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-black text-white">Google Pay (GPay)</span>
                    <span className="block text-[10px] text-blue-300">गूगल पे डायरेक्ट</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Input Mode Toggle (Mobile Number vs UPI ID) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300">
                  {isHi ? '2. खाता विवरण दर्ज करें:' : '2. Enter Account Details:'}
                </label>
                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setInputMode('mobile')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                      inputMode === 'mobile'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isHi ? 'मोबाइल नंबर' : 'Mobile No'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('upi')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                      inputMode === 'upi'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    UPI ID
                  </button>
                </div>
              </div>

              {inputMode === 'mobile' ? (
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                      +91
                    </div>
                    <input
                      id="input-withdraw-mobile"
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder={isHi ? '10 अंकों का फोन नंबर (जैसे 9876543210)' : '10-digit mobile number'}
                      className="w-full pl-12 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white font-mono text-sm tracking-wider outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {isHi
                      ? `आपके इस नंबर से जुड़े ${selectedMethod === 'phonepe' ? 'PhonePe' : 'Google Pay'} पर राशि तुरंत भेज दी जाएगी।`
                      : `Amount will be credited to the ${selectedMethod.toUpperCase()} linked to this mobile.`}
                  </p>
                </div>
              ) : (
                <div>
                  <input
                    id="input-withdraw-upi"
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder={
                      selectedMethod === 'phonepe'
                        ? 'उदा. 9876543210@ybl या name@axl'
                        : 'उदा. name@oksbi या 9876543210@okaxis'
                    }
                    className="w-full px-3 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white font-mono text-sm outline-none"
                  />
                  {/* Quick UPI Suffix Chips */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-[10px] text-slate-400">{isHi ? 'त्वरित जोड़ें:' : 'Quick:'}</span>
                    {(selectedMethod === 'phonepe'
                      ? ['@ybl', '@ibl', '@axl']
                      : ['@oksbi', '@okaxis', '@okicici', '@okhdfcbank']
                    ).map((suffix) => (
                      <button
                        key={suffix}
                        type="button"
                        onClick={() => {
                          const base = upiId.split('@')[0] || (currentUser ? currentUser.mobile : '');
                          setUpiId(`${base}${suffix}`);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 border border-slate-700"
                      >
                        {suffix}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Amount Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {isHi ? '3. निकासी राशि चुनें (₹):' : '3. Withdrawal Amount (₹):'}
                </label>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[11px] font-bold text-emerald-400 hover:underline"
                >
                  {isHi ? 'पूरा बैलेंस निकालें' : 'Withdraw Max'}
                </button>
              </div>

              {/* Amount Presets */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                {PRESET_WITHDRAW_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectPreset(amt)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                      withdrawAmount === amt.toString()
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-bold text-slate-400">
                  ₹
                </span>
                <input
                  id="input-withdraw-amount"
                  type="number"
                  min="20"
                  max={walletBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="20"
                  className="w-full pl-8 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white font-mono text-base font-bold outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-xs text-red-200 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Security Guarantee Note */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                {isHi
                  ? '100% सुरक्षित भुगतान गेटवे। निकासी राशि 10 सेकंड के भीतर आपके खाते में क्रेडिट हो जाती है।'
                  : '100% Secure Gateway. Transfer initiated directly to your PhonePe/GPay UPI address.'}
              </span>
            </div>

            {/* Submit Withdrawal Button */}
            <button
              id="btn-submit-withdrawal"
              type="submit"
              disabled={isProcessing || walletBalance < 20}
              className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
                walletBalance < 20
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : isProcessing
                  ? 'bg-emerald-600 text-white opacity-80 cursor-wait'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-600/30 hover:shadow-emerald-600/50 active:scale-95'
              }`}
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>
                    {isHi
                      ? `${selectedMethod === 'phonepe' ? 'PhonePe' : 'GPay'} ट्रांसफर प्रक्रिया जारी है...`
                      : 'Processing instant transfer...'}
                  </span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>
                    {isHi
                      ? `₹${withdrawAmount || 0} तुरंत निकालें (${selectedMethod === 'phonepe' ? 'PhonePe' : 'GPay'})`
                      : `Transfer ₹${withdrawAmount || 0} via ${selectedMethod.toUpperCase()}`}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
