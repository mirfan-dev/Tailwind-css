
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  resendResetOtp,
  resetPassword,
} from "../services/user.service";

const OTP_EXPIRY = 5 * 60; // 5 minutes

const ResetPassword = ({ otpLength = 6 }) => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const [otpFields, setOtpFields] = useState(
    new Array(otpLength).fill("")
  );

  const [otp, setOtp] = useState("");

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [expiryTime, setExpiryTime] = useState(null);

  // OTP expiration timer
  useEffect(() => {
    if (!isEmailSent || !expiryTime) return;

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
  }, [isEmailSent, expiryTime]);

  // Auto focus first OTP input
  useEffect(() => {
    if (isEmailSent && !isOtpSubmitted && timeRemaining > 0) {
      inputRefs.current[0]?.focus();
    }
  }, [isEmailSent, isOtpSubmitted, timeRemaining > 0]);

  // Timer formatting
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Start OTP timer
  const startOtpTimer = () => {
    const expiry = Date.now() + OTP_EXPIRY * 1000;

    setExpiryTime(expiry);
    setTimeRemaining(OTP_EXPIRY);
  };

  // Clear OTP fields
  const clearOtp = () => {
    setOtpFields(new Array(otpLength).fill(""));
    setOtp("");
  };

  // OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    const updated = [...otpFields];

    updated[index] = value.slice(-1);

    setOtpFields(updated);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Keyboard handling
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

  // Paste complete OTP
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

  // STEP 1: Send OTP
  const onSubmitEmail = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await resendResetOtp(normalizedEmail);

      setEmail(normalizedEmail);
      setIsEmailSent(true);
      setIsOtpSubmitted(false);

      clearOtp();
      startOtpTimer();

      toast.success("Password reset OTP sent successfully.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Something went wrong while sending OTP.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP locally
  const handleVerify = () => {
    const enteredOtp = otpFields.join("");

    if (timeRemaining <= 0) {
      toast.error("OTP expired. Please resend a new OTP.");
      return;
    }

    if (enteredOtp.length !== otpLength) {
      toast.error(`Please enter all ${otpLength} digits of the OTP.`);
      return;
    }

    setOtp(enteredOtp);
    setIsOtpSubmitted(true);
  };

  // RESEND OTP
  const handleResend = async () => {
    if (!email || resending || timeRemaining > 0) return;

    try {
      setResending(true);

      await resendResetOtp(email);

      clearOtp();
      setIsOtpSubmitted(false);

      startOtpTimer();

      toast.success("A new OTP has been sent to your email.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Failed to resend OTP.";

      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  // STEP 3: Reset password
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    if (!newPassword.trim()) {
      toast.error("Please enter a new password.");
      return;
    }

    if (!otp) {
      toast.error("Please verify your OTP first.");
      setIsOtpSubmitted(false);
      return;
    }

    if (Date.now() >= expiryTime) {
      toast.error("OTP expired. Please request a new OTP.");

      clearOtp();
      setIsOtpSubmitted(false);
      setTimeRemaining(0);

      return;
    }

    try {
      setLoading(true);

      await resetPassword(email, otp, newPassword);

      toast.success("Password reset successfully.");

      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        "Password reset failed. Please check your OTP.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        {/* STEP 1: EMAIL */}

        {!isEmailSent && (
          <form onSubmit={onSubmitEmail}>

            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Reset Password
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-blue-800 rounded-md px-4 py-2 mb-4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 w-full hover:bg-blue-950 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}

        {isEmailSent && !isOtpSubmitted && (
          <div>

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
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={loading || timeRemaining <= 0}
                  className="w-10 h-12 sm:w-12 text-center text-lg border border-blue-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              ))}
            </div>

            {/* VERIFY BUTTON */}

            <button
              type="button"
              onClick={handleVerify}
              disabled={
                loading ||
                timeRemaining <= 0 ||
                otpFields.join("").length !== otpLength
              }
              className="bg-blue-600 w-full hover:bg-blue-950 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify
            </button>

            {/* RESEND OTP */}

            <div className="mt-4 text-center text-sm text-gray-500">

              Didn't receive the code?{" "}

              <button
                type="button"
                onClick={handleResend}
                disabled={resending || timeRemaining > 0}
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

            <div className="text-center mt-3">

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
                <p className="text-red-600 text-sm font-semibold mt-2">
                  OTP expired. Please resend OTP.
                </p>
              )}

            </div>

          </div>
        )}

        {/* STEP 3: NEW PASSWORD */}

        {isOtpSubmitted && (
          <form onSubmit={onSubmitNewPassword}>

            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Set New Password
            </h2>

            <p className="text-sm text-gray-500 text-center mb-4">
              OTP entered. Submit your password to complete the reset.
            </p>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-blue-800 rounded-md px-4 py-2 mb-4"
              required
            />

            <button
              type="submit"
              disabled={loading || timeRemaining <= 0}
              className="bg-blue-600 w-full hover:bg-blue-950 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
