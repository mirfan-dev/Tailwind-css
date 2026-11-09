
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  verifyOtp,
  resendCustomerOtp,
} from "../services/user.service";

const OTP_LENGTH = 6;
const OTP_EXPIRY = 300; // 5 minutes

const Otp = ({ otpLength = OTP_LENGTH }) => {
  const [otpFields, setOtpFields] = useState(
    new Array(otpLength).fill("")
  );

  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [expiryTime, setExpiryTime] = useState(null);

  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      toast.error("Please sign up first");
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  // Start OTP timer
  const startOtpTimer = () => {
    const expiry = Date.now() + OTP_EXPIRY * 1000;

    setExpiryTime(expiry);
    setTimeRemaining(OTP_EXPIRY);
  };

  // Start timer automatically when OTP page opens
  useEffect(() => {
    if (email) {
      startOtpTimer();
    }
  }, [email]);

  // OTP expiration timer
  useEffect(() => {
    if (!email || !expiryTime) return;

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil((expiryTime - Date.now()) / 1000)
      );

      setTimeRemaining(remaining);
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [email, expiryTime]);

  // Timer formatting
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Clear OTP fields
  const clearOtp = () => {
    setOtpFields(new Array(otpLength).fill(""));
  };

  // Auto focus first input
  useEffect(() => {
    if (timeRemaining > 0) {
      inputRefs.current[0]?.focus();
    }
  }, [timeRemaining > 0]);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    const updated = [...otpFields];

    updated[index] = value.slice(-1);

    setOtpFields(updated);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otpFields[index]) {
        const updated = [...otpFields];
        updated[index] = "";
        setOtpFields(updated);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Paste OTP
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpLength);

    if (!pasted) return;

    const updated = new Array(otpLength).fill("");

    pasted.split("").forEach((digit, index) => {
      updated[index] = digit;
    });

    setOtpFields(updated);

    inputRefs.current[
      Math.min(pasted.length, otpLength - 1)
    ]?.focus();
  };

  // Verify OTP
  const submitOtp = async () => {
    if (!email || verifying || resending) return;

    const enteredOtp = otpFields.join("");

    if (!expiryTime || Date.now() >= expiryTime) {
      setTimeRemaining(0);
      toast.error("OTP has expired. Please resend a new OTP.");
      return;
    }

    if (enteredOtp.length !== otpLength) {
      toast.error(`Enter all ${otpLength} digits of the OTP.`);
      return;
    }

    try {
      setVerifying(true);

      await verifyOtp(email, enteredOtp);

      toast.success("Email verified successfully!");

      navigate("/login", { replace: true });

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Invalid or expired OTP";

      toast.error(msg);

      clearOtp();
      inputRefs.current[0]?.focus();

    } finally {
      setVerifying(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (
      !email ||
      resending ||
      verifying ||
      timeRemaining > 0
    ) {
      return;
    }

    try {
      setResending(true);

      await resendCustomerOtp(email);

      clearOtp();

      startOtpTimer();

      toast.success("A new OTP has been sent to your email.");

      inputRefs.current[0]?.focus();

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Could not resend OTP.";

      toast.error(msg);

    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the {otpLength}-digit code sent to{" "}
          <span className="font-semibold text-gray-700">
            {email}
          </span>
        </p>

        {/* OTP INPUTS */}
        <div
          className="flex justify-center gap-2 mb-6"
          onPaste={handlePaste}
        >
          {otpFields.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={
                verifying ||
                resending ||
                timeRemaining <= 0
              }
              className="w-10 h-12 sm:w-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          type="button"
          onClick={submitOtp}
          disabled={
            verifying ||
            resending ||
            timeRemaining <= 0 ||
            otpFields.join("").length !== otpLength
          }
          className="bg-blue-600 w-full hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>

        {/* RESEND OTP */}
        <div className="mt-5 text-center text-sm text-gray-500">
          Didn't receive the code?{" "}

          <button
            type="button"
            onClick={handleResend}
            disabled={
              resending ||
              verifying ||
              timeRemaining > 0
            }
            className="text-blue-600 font-semibold hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
          >
            {resending
              ? "Sending..."
              : timeRemaining > 0
                ? `Resend in ${minutes}:${String(seconds).padStart(2, "0")}`
                : "Resend OTP"}
          </button>
        </div>

        {/* EXPIRATION TIMER */}
        <div className="text-center mt-5">

          <p className="text-gray-600 font-bold text-xl">
            Time Remaining:

            <span
              className={`font-bold ml-2 ${
                timeRemaining <= 30
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </p>

          {timeRemaining === 0 && (
            <p className="text-red-600 text-sm font-semibold mt-3">
              OTP expired. Please resend OTP.
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default Otp;
