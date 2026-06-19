import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Camera,
  Bell,
  Shield,
  Users,
  BookOpen,
  Plane,
  Code2,
  PenLine,
  Lock,
  Zap,
  Image,
  Globe,
  Activity,
  Cpu,
  Briefcase,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | "welcome"
  | "create-account"
  | "verify-email"
  | "interests"
  | "privacy"
  | "profile"
  | "notifications"
  | "ready";

const SCREENS: Screen[] = [
  "welcome",
  "create-account",
  "verify-email",
  "interests",
  "privacy",
  "profile",
  "notifications",
  "ready",
];

// ─── Design System Components ─────────────────────────────────────────────────

function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[#2F5D50] text-white rounded-xl py-[15px] text-[15px] font-[500] tracking-[-0.01em] transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#274f44] ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white border border-[#E5E7EB] text-[#111111] rounded-xl py-[14px] text-[15px] font-[500] tracking-[-0.01em] transition-all duration-150 active:scale-[0.98] hover:bg-[#FAFAF8] flex items-center justify-center gap-2.5 ${className}`}
    >
      {children}
    </button>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightElement,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-[500] text-[#111111] tracking-[-0.005em]">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-[13px] text-[15px] text-[#111111] placeholder-[#9CA3AF] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/10 transition-all duration-150 pr-12"
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-[44px] h-[26px] rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-[#2F5D50]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[18px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left"
    >
      <span
        className={`mt-0.5 w-[18px] h-[18px] rounded-[5px] border flex-shrink-0 flex items-center justify-center transition-colors duration-150 ${
          checked
            ? "bg-[#2F5D50] border-[#2F5D50]"
            : "bg-white border-[#D1D5DB]"
        }`}
      >
        {checked && <Check size={11} strokeWidth={3} color="white" />}
      </span>
      <span className="text-[13px] text-[#6B7280] leading-relaxed">
        {children}
      </span>
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full h-[2px] bg-[#E5E7EB] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#2F5D50] rounded-full"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-full bg-[#F3F4F2] flex items-center justify-center transition-colors duration-150 hover:bg-[#E5E7EB] active:scale-95"
    >
      <ChevronLeft size={16} color="#6B7280" strokeWidth={2} />
    </button>
  );
}

// ─── Illustrations ────────────────────────────────────────────────────────────

function CoveWordmark() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <rect width="60" height="60" rx="16" fill="#2F5D50" />
      <path
        d="M30 14C21.163 14 14 21.163 14 30C14 38.837 21.163 46 30 46C35.2 46 39.8 43.4 42.7 39.4"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="30" r="6" fill="white" fillOpacity="0.25" />
      <circle cx="30" cy="30" r="2.5" fill="white" />
    </svg>
  );
}

function ShieldIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="38" fill="#F0F5F3" />
      <path
        d="M40 16L22 23V39C22 49.5 29.8 59.2 40 62C50.2 59.2 58 49.5 58 39V23L40 16Z"
        fill="#2F5D50"
        fillOpacity="0.12"
        stroke="#2F5D50"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M33 39.5L37.5 44L47 34"
        stroke="#2F5D50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaveIllustration() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
      <path
        d="M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50"
        stroke="#2F5D50"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M0 62 Q25 32 50 62 Q75 92 100 62 Q125 32 150 62 Q175 92 200 62"
        stroke="#2F5D50"
        strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
      />
      <circle cx="50" cy="50" r="4" fill="#2F5D50" fillOpacity="0.5" />
      <circle cx="100" cy="50" r="3" fill="#2F5D50" fillOpacity="0.3" />
      <circle cx="150" cy="50" r="4" fill="#2F5D50" fillOpacity="0.5" />
    </svg>
  );
}

function SuccessIllustration() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
      <circle cx="44" cy="44" r="42" fill="#F0F5F3" />
      <circle cx="44" cy="44" r="30" fill="#2F5D50" fillOpacity="0.1" />
      <circle cx="44" cy="44" r="20" fill="#2F5D50" />
      <path
        d="M35 44L41 50L53 37"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Google / Apple logos ──────────────────────────────────────────────────

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
      <path
        d="M14.2 9.47c-.02-2.07 1.7-3.07 1.78-3.12-0.97-1.42-2.48-1.61-3.01-1.63-1.28-.13-2.5.76-3.15.76-.65 0-1.65-.74-2.71-.72C5.6 4.79 4.17 5.6 3.38 6.9c-1.6 2.76-.41 6.84 1.14 9.08.76 1.1 1.66 2.33 2.84 2.29 1.14-.05 1.57-.73 2.95-.73 1.37 0 1.77.73 2.96.71 1.23-.02 2.01-1.12 2.76-2.22.87-1.27 1.23-2.5 1.25-2.57-.03-.01-2.39-.92-2.42-3.63 0-.03.01-.06.01-.09zM11.23 2.61C11.85 1.84 12.26.77 12.12-.3c-.91.04-2.02.61-2.67 1.37C8.82 1.83 8.35 2.93 8.51 3.98c1.01.08 2.04-.52 2.72-1.37z"
        fill="#111111"
      />
    </svg>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────

function OTPInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="absolute inset-0 opacity-0 w-full h-full cursor-default"
        autoFocus
      />
      <div
        className="flex gap-2.5 justify-center"
        onClick={() => inputRef.current?.focus()}
      >
        {digits.map((d, i) => (
          <div
            key={i}
            className={`w-[46px] h-[56px] rounded-xl border flex items-center justify-center text-[22px] font-[600] tracking-tight text-[#111111] transition-all duration-150 ${
              value.length === i
                ? "border-[#2F5D50] ring-2 ring-[#2F5D50]/15 bg-white"
                : d
                ? "border-[#E5E7EB] bg-white"
                : "border-[#E5E7EB] bg-[#FAFAF8]"
            }`}
          >
            {d || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Interest Chip ────────────────────────────────────────────────────────────

const INTERESTS = [
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "design", label: "Design", icon: PenLine },
  { id: "photography", label: "Photography", icon: Image },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "startups", label: "Startups", icon: Briefcase },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "writing", label: "Writing", icon: PenLine },
  { id: "programming", label: "Programming", icon: Code2 },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "productivity", label: "Productivity", icon: Zap },
];

function InterestChip({
  label,
  icon: Icon,
  selected,
  onToggle,
}: {
  label: string;
  icon: React.ElementType;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[14px] font-[500] transition-all duration-150 ${
        selected
          ? "bg-[#2F5D50] border-[#2F5D50] text-white"
          : "bg-white border-[#E5E7EB] text-[#374151] hover:border-[#2F5D50]/30"
      }`}
    >
      <Icon size={14} strokeWidth={2} />
      {label}
    </motion.button>
  );
}

// ─── Privacy Row ──────────────────────────────────────────────────────────────

function PrivacyRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3.5 py-4 border-b border-[#F3F4F2] last:border-0">
      <div className="w-9 h-9 rounded-xl bg-[#F0F5F3] flex items-center justify-center flex-shrink-0">
        <Icon size={16} color="#2F5D50" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-[500] text-[#111111] tracking-[-0.005em]">
          {label}
        </p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Notification Row ─────────────────────────────────────────────────────────

function NotifRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3.5 py-4 border-b border-[#F3F4F2] last:border-0">
      <div className="w-9 h-9 rounded-xl bg-[#F0F5F3] flex items-center justify-center flex-shrink-0">
        <Icon size={16} color="#2F5D50" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-[500] text-[#111111] tracking-[-0.005em]">
          {label}
        </p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Screen Slide Wrapper ─────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
  }),
};

// ─── Screens ──────────────────────────────────────────────────────────────────

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Status bar spacer */}
      <div className="h-14" />

      <div className="flex-1 flex flex-col px-7 pt-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-auto">
          <CoveWordmark />
          <span className="text-[20px] font-[650] tracking-[-0.03em] text-[#111111]">
            Cove
          </span>
        </div>

        {/* Illustration area */}
        <div className="flex flex-col items-center py-10">
          <div className="relative w-full flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <WaveIllustration />
            </div>
            <div className="relative z-10">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="58" fill="#F0F5F3" />
                <circle
                  cx="60"
                  cy="60"
                  r="38"
                  fill="#2F5D50"
                  fillOpacity="0.08"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="22"
                  fill="#2F5D50"
                  fillOpacity="0.15"
                />
                <circle cx="60" cy="60" r="10" fill="#2F5D50" />
                {/* Connection lines */}
                <line
                  x1="60"
                  y1="38"
                  x2="82"
                  y2="52"
                  stroke="#2F5D50"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <line
                  x1="60"
                  y1="38"
                  x2="38"
                  y2="52"
                  stroke="#2F5D50"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <circle cx="82" cy="52" r="5" fill="#2F5D50" fillOpacity="0.4" />
                <circle cx="38" cy="52" r="5" fill="#2F5D50" fillOpacity="0.4" />
                <circle cx="60" cy="38" r="5" fill="#2F5D50" fillOpacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-10">
          <h1 className="text-[32px] font-[700] tracking-[-0.04em] text-[#111111] leading-[1.15] mb-3">
            Privacy should
            <br />
            feel simple.
          </h1>
          <p className="text-[16px] text-[#6B7280] leading-[1.6] tracking-[-0.01em]">
            Join a calmer space where you decide
            <br />
            what to share.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 mb-8">
          <PrimaryButton onClick={onNext}>Create Account</PrimaryButton>
          <button className="text-[15px] font-[500] text-[#6B7280] tracking-[-0.01em] py-2 transition-colors hover:text-[#111111]">
            Sign In
          </button>
        </div>

        {/* Bottom caption */}
        <p className="text-[11px] text-[#9CA3AF] text-center pb-4 tracking-[-0.005em]">
          By continuing, you agree to our{" "}
          <span className="text-[#6B7280] underline underline-offset-2">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-[#6B7280] underline underline-offset-2">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}

function CreateAccountScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const valid = name && email && password.length >= 8 && confirm === password && agreed;

  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-6 overflow-y-auto">
        <div className="flex items-center gap-3 mt-2 mb-7">
          <BackButton onClick={onBack} />
          <span className="text-[12px] font-[500] text-[#9CA3AF] tracking-wider uppercase">
            Step 1 of 7
          </span>
        </div>

        <ProgressBar current={1} total={7} />

        <div className="mt-7 mb-8">
          <h1 className="text-[26px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight mb-2">
            Create your account
          </h1>
          <p className="text-[14px] text-[#6B7280] tracking-[-0.005em]">
            It only takes a minute.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-5">
          <InputField
            label="Full Name"
            placeholder="Jordan Rivera"
            value={name}
            onChange={setName}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="jordan@example.com"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={setPassword}
            rightElement={
              <button
                onClick={() => setShowPass(!showPass)}
                className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <InputField
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            placeholder="Repeat your password"
            value={confirm}
            onChange={setConfirm}
            rightElement={
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>

        <Checkbox checked={agreed} onChange={setAgreed}>
          I agree to Cove&apos;s{" "}
          <span className="text-[#2F5D50] underline underline-offset-2">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-[#2F5D50] underline underline-offset-2">
            Privacy Policy
          </span>
        </Checkbox>

        <div className="mt-6 flex flex-col gap-3">
          <PrimaryButton onClick={onNext} disabled={!valid}>
            Create Account
          </PrimaryButton>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[12px] text-[#9CA3AF] font-[500]">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          <SecondaryButton>
            <GoogleLogo />
            Continue with Google
          </SecondaryButton>
          <SecondaryButton>
            <AppleLogo />
            Continue with Apple
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function VerifyEmailScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-8">
        <div className="flex items-center gap-3 mt-2 mb-7">
          <BackButton onClick={onBack} />
          <span className="text-[12px] font-[500] text-[#9CA3AF] tracking-wider uppercase">
            Step 2 of 7
          </span>
        </div>

        <ProgressBar current={2} total={7} />

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-center mb-7">
            <ShieldIllustration />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[26px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight mb-2.5">
              Verify your email
            </h1>
            <p className="text-[14px] text-[#6B7280] leading-[1.6]">
              We sent a 6-digit code to{" "}
              <span className="text-[#111111] font-[500]">
                jordan@example.com
              </span>
            </p>
          </div>

          <OTPInput value={code} onChange={setCode} />

          <div className="flex justify-center mt-5">
            <button
              onClick={handleResend}
              className="text-[13px] font-[500] text-[#6B7280] hover:text-[#2F5D50] transition-colors"
            >
              {resent ? (
                <span className="text-[#2F5D50]">Code sent ✓</span>
              ) : (
                "Resend code"
              )}
            </button>
          </div>
        </div>

        <PrimaryButton onClick={onNext} disabled={code.length < 6}>
          Verify Email
        </PrimaryButton>
      </div>
    </div>
  );
}

function InterestsScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set(["privacy", "design"]));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex items-center gap-3 mt-2 mb-7">
          <BackButton onClick={onBack} />
          <span className="text-[12px] font-[500] text-[#9CA3AF] tracking-wider uppercase">
            Step 3 of 7
          </span>
        </div>

        <ProgressBar current={3} total={7} />

        <div className="mt-7 mb-7">
          <h1 className="text-[26px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight mb-2">
            Choose what interests you
          </h1>
          <p className="text-[14px] text-[#6B7280]">
            Select at least one to personalize your experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-8">
          {INTERESTS.map(({ id, label, icon }) => (
            <InterestChip
              key={id}
              label={label}
              icon={icon}
              selected={selected.has(id)}
              onToggle={() => toggle(id)}
            />
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] text-[#9CA3AF] font-[500]">
              {selected.size} selected
            </span>
            <button
              onClick={() => setSelected(new Set())}
              className="text-[12px] text-[#6B7280] hover:text-[#111111] transition-colors"
            >
              Clear all
            </button>
          </div>
          <PrimaryButton onClick={onNext} disabled={selected.size === 0}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function PrivacyScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [settings, setSettings] = useState({
    showEmail: false,
    showPhoto: true,
    searchDiscovery: true,
    activityStatus: false,
    recommendations: true,
  });

  const set = (key: keyof typeof settings) => (v: boolean) =>
    setSettings((p) => ({ ...p, [key]: v }));

  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex items-center gap-3 mt-2 mb-7">
          <BackButton onClick={onBack} />
          <span className="text-[12px] font-[500] text-[#9CA3AF] tracking-wider uppercase">
            Step 4 of 7
          </span>
        </div>

        <ProgressBar current={4} total={7} />

        <div className="mt-7 mb-2">
          <h1 className="text-[26px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight mb-2">
            Control your visibility
          </h1>
          <p className="text-[14px] text-[#6B7280] leading-[1.6]">
            Choose how others see you. You can change these anytime in settings.
          </p>
        </div>

        <div className="mt-5 bg-white rounded-2xl border border-[#E5E7EB] px-4">
          <PrivacyRow
            icon={Globe}
            label="Show Email Address"
            description="Others can see your email on your profile"
            checked={settings.showEmail}
            onChange={set("showEmail")}
          />
          <PrivacyRow
            icon={Image}
            label="Show Profile Photo"
            description="Display your photo publicly"
            checked={settings.showPhoto}
            onChange={set("showPhoto")}
          />
          <PrivacyRow
            icon={Users}
            label="Allow Search Discovery"
            description="Others can find you by name or username"
            checked={settings.searchDiscovery}
            onChange={set("searchDiscovery")}
          />
          <PrivacyRow
            icon={Activity}
            label="Show Activity Status"
            description="Let others know when you were last active"
            checked={settings.activityStatus}
            onChange={set("activityStatus")}
          />
          <PrivacyRow
            icon={Cpu}
            label="Personalized Suggestions"
            description="Recommendations based on your interests"
            checked={settings.recommendations}
            onChange={set("recommendations")}
          />
        </div>

        <div className="mt-5 bg-[#F0F5F3] rounded-xl p-4 flex gap-3">
          <Lock size={15} color="#2F5D50" strokeWidth={2} className="mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-[#4B7A6E] leading-[1.6]">
            Your data is never sold or shared with advertisers. Cove earns
            revenue through subscriptions only.
          </p>
        </div>

        <div className="mt-6">
          <PrimaryButton onClick={onNext}>Save & Continue</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [username, setUsername] = useState("jordanrivera");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex items-center gap-3 mt-2 mb-7">
          <BackButton onClick={onBack} />
          <span className="text-[12px] font-[500] text-[#9CA3AF] tracking-wider uppercase">
            Step 5 of 7
          </span>
        </div>

        <ProgressBar current={5} total={7} />

        <div className="mt-7 mb-6">
          <h1 className="text-[26px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight mb-2">
            Create your profile
          </h1>
          <p className="text-[14px] text-[#6B7280]">
            Add a few details so others can find you.
          </p>
        </div>

        {/* Avatar upload */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setHasPhoto(!hasPhoto)}
            className="relative w-[72px] h-[72px] rounded-full bg-[#F0F5F3] border-2 border-dashed border-[#B8CFC9] flex items-center justify-center group hover:border-[#2F5D50] transition-colors overflow-hidden"
          >
            {hasPhoto ? (
              <div className="w-full h-full bg-[#2F5D50] flex items-center justify-center">
                <span className="text-white text-[24px] font-[600]">J</span>
              </div>
            ) : (
              <Camera size={20} color="#9CA3AF" strokeWidth={1.5} className="group-hover:text-[#2F5D50]" />
            )}
          </button>
          <div>
            <button
              onClick={() => setHasPhoto(!hasPhoto)}
              className="text-[14px] font-[500] text-[#2F5D50] hover:underline"
            >
              {hasPhoto ? "Change photo" : "Upload photo"}
            </button>
            <p className="text-[12px] text-[#9CA3AF] mt-0.5">
              JPG, PNG or WebP · Max 5MB
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-[500] text-[#111111] tracking-[-0.005em]">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#9CA3AF]">
                @
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-4 py-[13px] text-[15px] text-[#111111] placeholder-[#9CA3AF] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/10 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-[500] text-[#111111] tracking-[-0.005em]">
              Short Bio
            </label>
            <textarea
              placeholder="A sentence or two about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={140}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-[13px] text-[15px] text-[#111111] placeholder-[#9CA3AF] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/10 transition-all resize-none"
            />
            <span className="text-[11px] text-[#9CA3AF] self-end">
              {bio.length}/140
            </span>
          </div>

          <InputField
            label="Location"
            placeholder="San Francisco, CA"
            value={location}
            onChange={setLocation}
          />
        </div>

        {/* Live preview card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#2F5D50] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[18px] font-[600]">
              {username ? username[0]?.toUpperCase() : "?"}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-[600] text-[#111111] tracking-[-0.02em] truncate">
                {username ? `@${username}` : "@username"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D50] flex-shrink-0" />
            </div>
            <p className="text-[12px] text-[#9CA3AF] mt-0.5 truncate">
              {bio || "Your bio will appear here"}
            </p>
            {location && (
              <p className="text-[11px] text-[#B4BAC3] mt-0.5">{location}</p>
            )}
          </div>
          <ChevronRight size={14} color="#D1D5DB" />
        </div>

        <div className="mt-6">
          <PrimaryButton onClick={onNext} disabled={!username}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function NotificationsScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [notifs, setNotifs] = useState({
    updates: true,
    followers: true,
    messages: true,
    digest: false,
  });

  const set = (key: keyof typeof notifs) => (v: boolean) =>
    setNotifs((p) => ({ ...p, [key]: v }));

  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex items-center gap-3 mt-2 mb-7">
          <BackButton onClick={onBack} />
          <span className="text-[12px] font-[500] text-[#9CA3AF] tracking-wider uppercase">
            Step 6 of 7
          </span>
        </div>

        <ProgressBar current={6} total={7} />

        <div className="mt-7 mb-6">
          <h1 className="text-[26px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight mb-2">
            Stay informed
          </h1>
          <p className="text-[14px] text-[#6B7280] leading-[1.6]">
            Choose what you want to be notified about. No spam, ever.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] px-4">
          <NotifRow
            icon={Bell}
            label="Important updates"
            description="Security alerts and account notices"
            checked={notifs.updates}
            onChange={set("updates")}
          />
          <NotifRow
            icon={Users}
            label="New followers"
            description="When someone starts following you"
            checked={notifs.followers}
            onChange={set("followers")}
          />
          <NotifRow
            icon={PenLine}
            label="Messages"
            description="Direct messages and replies"
            checked={notifs.messages}
            onChange={set("messages")}
          />
          <NotifRow
            icon={BookOpen}
            label="Weekly digest"
            description="A summary of what you missed"
            checked={notifs.digest}
            onChange={set("digest")}
          />
        </div>

        <p className="text-[12px] text-[#9CA3AF] text-center mt-4 leading-relaxed">
          You can adjust notification preferences at any time
          <br />
          in your account settings.
        </p>

        <div className="mt-auto pt-6">
          <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
          <button
            onClick={onNext}
            className="w-full text-[14px] text-[#9CA3AF] mt-3 py-2 hover:text-[#6B7280] transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadyScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-14" />
      <div className="flex flex-col flex-1 px-6 pb-10 items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
        >
          <SuccessIllustration />
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
          className="mt-8"
        >
          <h1 className="text-[32px] font-[700] tracking-[-0.04em] text-[#111111] leading-tight mb-3">
            You&apos;re all set
          </h1>
          <p className="text-[16px] text-[#6B7280] leading-[1.6]">
            Welcome to Cove. A quieter place
            <br />
            on the internet is waiting for you.
          </p>
        </motion.div>

        {/* Summary chips */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
          className="flex gap-2 mt-8 flex-wrap justify-center"
        >
          {["Privacy configured", "Interests set", "Profile ready"].map(
            (tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F5F3] rounded-full text-[12px] font-[500] text-[#2F5D50]"
              >
                <Check size={11} strokeWidth={3} />
                {tag}
              </span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.65 }}
          className="w-full mt-10"
        >
          <PrimaryButton onClick={onNext}>Enter Cove</PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative bg-white shadow-2xl overflow-hidden"
      style={{
        width: 390,
        height: 844,
        borderRadius: 50,
        boxShadow:
          "0 0 0 1px #D1D5DB, 0 30px 80px rgba(0,0,0,0.22), 0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      {/* Dynamic island */}
      <div
        className="absolute top-[14px] left-1/2 -translate-x-1/2 z-50 bg-black"
        style={{ width: 120, height: 34, borderRadius: 20 }}
      />
      {/* Screen content */}
      <div
        className="absolute inset-0 bg-[#FAFAF8] overflow-hidden"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {children}
      </div>
      {/* Home indicator */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#9CA3AF] opacity-50"
        style={{ width: 130, height: 5, borderRadius: 3 }}
      />
    </div>
  );
}

// ─── Navigation dot indicator ────────────────────────────────────────────────

function ScreenPicker({
  screens,
  current,
  onSelect,
}: {
  screens: Screen[];
  current: Screen;
  onSelect: (s: Screen) => void;
}) {
  const labels: Record<Screen, string> = {
    welcome: "Welcome",
    "create-account": "Sign Up",
    "verify-email": "Verify",
    interests: "Interests",
    privacy: "Privacy",
    profile: "Profile",
    notifications: "Notifications",
    ready: "Ready",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {screens.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            title={labels[s]}
            className={`rounded-full transition-all duration-200 ${
              s === current
                ? "w-5 h-2 bg-[#2F5D50]"
                : "w-2 h-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
            }`}
          />
        ))}
      </div>
      <span className="text-[12px] text-[#9CA3AF] font-[500]">
        {labels[current]}
      </span>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentScreen = SCREENS[currentIdx];

  const goTo = (idx: number) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(Math.max(0, Math.min(SCREENS.length - 1, idx)));
  };

  const next = () => goTo(currentIdx + 1);
  const back = () => goTo(currentIdx - 1);

  const screenProps = { onNext: next, onBack: back };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNext={next} />;
      case "create-account":
        return <CreateAccountScreen {...screenProps} />;
      case "verify-email":
        return <VerifyEmailScreen {...screenProps} />;
      case "interests":
        return <InterestsScreen {...screenProps} />;
      case "privacy":
        return <PrivacyScreen {...screenProps} />;
      case "profile":
        return <ProfileScreen {...screenProps} />;
      case "notifications":
        return <NotificationsScreen {...screenProps} />;
      case "ready":
        return <ReadyScreen onNext={() => setCurrentIdx(0)} />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-12"
      style={{ background: "#F1F0EC", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <CoveWordmark />
        <div>
          <h1
            className="text-[22px] font-[700] tracking-[-0.035em] text-[#111111] leading-tight"
          >
            Cove
          </h1>
          <p className="text-[12px] text-[#9CA3AF] font-[400] tracking-[-0.005em]">
            Onboarding Flow · 8 Screens
          </p>
        </div>
      </div>

      {/* Phone */}
      <PhoneFrame>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </PhoneFrame>

      {/* Navigation */}
      <ScreenPicker
        screens={SCREENS}
        current={currentScreen}
        onSelect={(s) => goTo(SCREENS.indexOf(s))}
      />

      {/* Keyboard hint */}
      <p className="text-[11px] text-[#9CA3AF] text-center">
        Click the dots to jump between screens · Use the buttons inside to navigate
      </p>
    </div>
  );
}
