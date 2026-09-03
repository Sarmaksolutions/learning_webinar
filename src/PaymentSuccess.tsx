import Logo from "./components/Logo";
import { useSearchParams, Link } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1d1b] to-[#0d0e10] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-lg rounded-3xl bg-[#111314] border border-white/10 p-8 md:p-10 text-center shadow-2xl">

        {/* SARMAK LOGO */}
        <div className="flex justify-center mb-8">
          <Logo className="h-16 w-auto" />
        </div>

        {/* SUCCESS ICON */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/30">
          <span className="text-4xl text-emerald-400">✓</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Payment Successful!
        </h1>

        <p className="text-white/70 text-lg mb-6">
          Thank you for registering for the
          <br />
          <strong className="text-white">
            WORRIES to Hired Workshop
          </strong>
        </p>

        {orderId && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
            <p className="text-sm text-white/50 mb-1">
              Order ID
            </p>

            <p className="text-sm break-all text-emerald-400">
              {orderId}
            </p>
          </div>
        )}

        <p className="text-white/60 mb-8">
          Your registration has been successfully received.
          We will contact you with the next steps.
        </p>

        <Link
          to="/webinar"
          className="btn-primary w-full inline-flex justify-center items-center gap-2 text-lg"
        >
          Back to Webinar
        </Link>

      </div>
    </div>
  );
}