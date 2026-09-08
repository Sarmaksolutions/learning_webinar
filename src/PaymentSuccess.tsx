import Logo from "./components/Logo";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type PaymentStatus =
  | "CHECKING"
  | "SUCCESS"
  | "PENDING"
  | "USER_DROPPED"
  | "FAILED";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Order ID is used only for Cashfree verification.
  // It is NOT displayed to the customer.
  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState<PaymentStatus>("CHECKING");

  useEffect(() => {
    if (!orderId) {
      navigate("/webinar", { replace: true });
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/verify-order?order_id=${encodeURIComponent(
            orderId
          )}`
        );

        const result = await response.json();

        console.log("Cashfree payment verification:", result);

        // ==========================================
        // SUCCESS
        // ==========================================
        if (result.payment_status === "PAID" || result.payment_status === "SUCCESS") {
          setStatus("SUCCESS");
          return;
        }

        // ==========================================
        // PENDING
        // ==========================================
        if (result.payment_status === "PENDING") {
          setStatus("PENDING");
          return;
        }

        // ==========================================
        // USER DROPPED
        // ==========================================
        if (result.payment_status === "USER_DROPPED") {
          setStatus("USER_DROPPED");
          return;
        }

        // ==========================================
        // FAILED
        // ==========================================
        if (result.payment_status === "FAILED") {
          setStatus("FAILED");
          return;
        }

        // Unknown status
        setStatus("FAILED");
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("FAILED");
      }
    };

    verifyPayment();
  }, [orderId, navigate]);

  // ==================================================
  // CHECKING PAYMENT
  // ==================================================

  if (status === "CHECKING") {
    return (
      <div className="min-h-screen bg-[#0d0e10] text-white flex items-center justify-center px-4">
        <div className="text-center">

          <div
            className="
              w-14
              h-14
              mx-auto
              mb-6
              border-4
              border-[#d4af37]/30
              border-t-[#d4af37]
              rounded-full
              animate-spin
            "
          />

          <h2 className="text-2xl font-bold">
            Checking payment status...
          </h2>

          <p className="text-white/60 mt-3">
            Please wait while we confirm your payment.
          </p>

        </div>
      </div>
    );
  }

  // ==================================================
  // SUCCESS PAGE
  // ==================================================

  if (status === "SUCCESS") {
    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-b
          from-[#1b1c1b]
          via-[#101112]
          to-[#08090a]
          text-white
          flex
          justify-center
          px-4
          py-8
          md:py-12
        "
      >

        <div
          className="
            w-full
            max-w-[720px]
            rounded-[26px]
            bg-[#101213]
            border
            border-[#c9a52e]
            shadow-[0_0_35px_rgba(212,175,55,0.08)]
            px-5
            py-8
            md:px-12
            md:py-10
          "
        >

          {/* LOGO */}
          <div className="flex justify-center mb-7">
            <Logo className="h-16 md:h-20 w-auto" />
          </div>

          {/* SUCCESS ICON */}
          <div className="flex justify-center mb-5">
            <div
              className="
                w-20
                h-20
                rounded-full
                border
                border-emerald-500/40
                bg-emerald-500/10
                flex
                items-center
                justify-center
              "
            >
              <span className="text-5xl text-emerald-400">
                ✓
              </span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-center text-3xl md:text-4xl font-black mb-3">
            Thank You!
          </h1>

          <h2
            className="
              text-center
              text-xl
              md:text-2xl
              font-bold
              text-emerald-400
              mb-7
            "
          >
            Payment Successful
          </h2>

          {/* MESSAGE */}
          <div className="text-center mb-7">
            <p className="text-white/70 text-base md:text-lg">
              Thank you for registering for the
            </p>

            <p className="text-white font-bold text-lg md:text-xl mt-1">
              From Worried to Hired Workshop
            </p>
          </div>

          {/* AMOUNT */}
          <div
            className="
              bg-[#17191a]
              border
              border-white/10
              rounded-2xl
              p-5
              text-center
              mb-8
            "
          >
            <p className="text-white/50 text-sm mb-1">
              Amount Paid
            </p>

            <p className="text-[#d4af37] text-3xl font-black">
              ₹9
            </p>
          </div>

          {/* TECHNOLOGY JOURNEY */}
          <div
            className="
              border
              border-[#c9a52e]
              rounded-xl
              px-5
              py-6
              mb-7
              text-center
            "
          >
            <h3
              className="
                text-[#e0b83f]
                font-bold
                text-base
                md:text-lg
                leading-7
              "
            >
              AI → Cloud &amp; DevOps → Databases →
              Operating Systems → Networking
            </h3>

            <p className="text-white/80 text-sm md:text-base leading-6 mt-2">
              You won't just learn individual technologies —
              you'll understand how they connect and work together
              in the real world.
            </p>
          </div>

          {/* WHAT YOU'LL GAIN */}
          <section className="mb-8">

            <h2 className="text-center text-xl md:text-2xl font-bold mb-5">
              What You'll Gain
            </h2>

            <div className="space-y-3 max-w-[600px] mx-auto">

              <p className="text-white/85 text-sm md:text-base">
                ✓ Understand the bigger picture of modern technology
              </p>

              <p className="text-white/85 text-sm md:text-base">
                ✓ Learn how AI, Cloud and Data work together
              </p>

              <p className="text-white/85 text-sm md:text-base">
                ✓ Build strong technology fundamentals
              </p>

              <p className="text-white/85 text-sm md:text-base">
                ✓ Connect systems, databases and networking concepts
              </p>

              <p className="text-white/85 text-sm md:text-base">
                ✓ Develop practical, industry-oriented knowledge
              </p>

            </div>

          </section>

          {/* LEARNING JOURNEY */}
          <div className="text-center mb-7">

            <h2
              className="
                text-[#e0b83f]
                text-lg
                md:text-xl
                font-bold
                mb-3
              "
            >
              🚀 Your learning journey starts here.
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-6">
              Registration confirmed. More details and joining
              instructions will be shared with you shortly.
            </p>

          </div>

          {/* FOOTER */}
          <div className="border-t border-white/15 pt-5 text-center">

            <p className="text-white/50 text-xs md:text-sm">
              🔒 Secure Payment
              <span className="mx-2">|</span>

              <span className="text-[#d4af37] font-semibold">
                SARMAK Learning Portal
              </span>
            </p>

            <p className="text-white/40 text-xs mt-1">
              5 in 1 Workshop
            </p>

          </div>

        </div>
      </div>
    );
  }

  // ==================================================
  // PAYMENT NOT SUCCESSFUL PAGE
  // PENDING / USER DROPPED / FAILED
  // ==================================================

  const isPending = status === "PENDING";
  const isUserDropped = status === "USER_DROPPED";

  const pageTitle = isPending
    ? "Payment Pending"
    : isUserDropped
    ? "Payment Cancelled"
    : "Payment Failed";

  const pageMessage = isPending
    ? "Your payment is still being processed."
    : isUserDropped
    ? "You cancelled or left the payment process."
    : "We couldn't process your payment.";

  const subMessage = isPending
    ? "Please wait for a few moments and check your payment status again."
    : isUserDropped
    ? "No payment was completed. You can try again."
    : "Please try again.";

  return (
    <div
      className="
        min-h-screen
        bg-white
        text-[#171b23]
        flex
        items-center
        justify-center
        px-5
        py-10
      "
    >

      <div
        className="
          w-full
          max-w-[850px]
          text-center
        "
      >

        {/* ======================================
            EXISTING SARMAK LOGO
        ====================================== */}

        <div className="flex justify-center mb-10">
          <Logo className="h-16 md:h-20 w-auto" />
        </div>


        {/* ======================================
            RED ERROR / STATUS ICON
        ====================================== */}

        <div className="flex justify-center mb-8">

          <div
            className="
              w-[170px]
              h-[170px]
              md:w-[210px]
              md:h-[210px]
              rounded-full
              bg-red-500
              flex
              items-center
              justify-center
              shadow-[0_15px_40px_rgba(239,68,68,0.25)]
              relative
            "
          >

            <div
              className="
                absolute
                inset-[10px]
                rounded-full
                border-[7px]
                border-red-700/50
              "
            />

            {isPending ? (
              <span
                className="
                  text-white
                  text-[85px]
                  md:text-[110px]
                  font-bold
                  leading-none
                "
              >
                ?
              </span>
            ) : (
              <span
                className="
                  text-white
                  text-[90px]
                  md:text-[115px]
                  font-light
                  leading-none
                "
              >
                ×
              </span>
            )}

          </div>

        </div>


        {/* ======================================
            TITLE
        ====================================== */}

        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            tracking-tight
            mb-6
          "
        >
          {pageTitle}
        </h1>


        {/* ======================================
            MESSAGE
        ====================================== */}

        <p
          className="
            text-2xl
            md:text-4xl
            text-[#555d6d]
            leading-tight
            max-w-[850px]
            mx-auto
            mb-2
          "
        >
          {pageMessage}
        </p>

        <p
          className="
            text-2xl
            md:text-4xl
            text-[#555d6d]
            leading-tight
            mb-10
          "
        >
          {subMessage}
        </p>


        {/* ======================================
            TRY AGAIN BUTTON
        ====================================== */}

        <button
          onClick={() => navigate("/webinar")}
          className="
            mx-auto
            w-full
            max-w-[560px]
            min-h-[105px]
            md:min-h-[125px]
            rounded-[28px]
            bg-gradient-to-r
            from-[#ff2b32]
            to-[#e91b23]
            hover:from-[#e91b23]
            hover:to-[#c9141b]
            text-white
            text-3xl
            md:text-5xl
            font-bold
            flex
            items-center
            justify-center
            gap-5
            shadow-[0_15px_35px_rgba(239,68,68,0.25)]
            transition
            duration-200
          "
        >

          <span className="text-5xl md:text-6xl">
            ↻
          </span>

          <span>
            Try Again
          </span>

        </button>


        {/* ======================================
            BACK TO HOME
        ====================================== */}

        <button
          onClick={() => navigate("/webinar")}
          className="
            mt-10
            text-[#e53239]
            hover:text-[#c9141b]
            text-2xl
            md:text-4xl
            font-semibold
            inline-flex
            items-center
            gap-4
            transition
            duration-200
          "
        >

          <span className="text-5xl">
            ←
          </span>

          <span>
            Back to Home
          </span>

        </button>

      </div>

    </div>
  );
}