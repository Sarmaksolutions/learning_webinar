import {
  FormEvent,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';

import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import SEO from './components/SEO';


// ======================================================
// WORKSHOP DETAILS
// ======================================================

const WORKSHOP_DATE = '27 September 2026';
const WORKSHOP_TIME = '11:00 AM IST.';
const WORKSHOP_MODE = 'Online';


// ======================================================
// COUNTRY TYPE
// ======================================================

type Country = {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  minDigits: number;
  maxDigits: number;
};


// ======================================================
// COUNTRY LIST
// ======================================================

const countries: Country[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    dialCode: '+61',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    dialCode: '+971',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    dialCode: '+966',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'QA',
    name: 'Qatar',
    flag: '🇶🇦',
    dialCode: '+974',
    minDigits: 8,
    maxDigits: 8,
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    dialCode: '+65',
    minDigits: 8,
    maxDigits: 8,
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    dialCode: '+60',
    minDigits: 9,
    maxDigits: 10,
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
    minDigits: 10,
    maxDigits: 11,
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    dialCode: '+33',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    dialCode: '+39',
    minDigits: 9,
    maxDigits: 10,
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    dialCode: '+31',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    dialCode: '+64',
    minDigits: 9,
    maxDigits: 10,
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    dialCode: '+81',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    dialCode: '+86',
    minDigits: 11,
    maxDigits: 11,
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    dialCode: '+27',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    dialCode: '+55',
    minDigits: 10,
    maxDigits: 11,
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    dialCode: '+52',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    dialCode: '+63',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    dialCode: '+66',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    dialCode: '+62',
    minDigits: 9,
    maxDigits: 12,
  },
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    dialCode: '+92',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    flag: '🇧🇩',
    dialCode: '+880',
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    dialCode: '+94',
    minDigits: 9,
    maxDigits: 9,
  },
  {
    code: 'NP',
    name: 'Nepal',
    flag: '🇳🇵',
    dialCode: '+977',
    minDigits: 10,
    maxDigits: 10,
  },
];


// ======================================================
// WEBINAR COMPONENT
// ======================================================

const Webinar = () => {

  const [selectedCountry, setSelectedCountry] =
    useState<Country>(countries[0]);

  const [phone, setPhone] = useState('');

  const [phoneError, setPhoneError] =
    useState('');

  const [isProcessing, setIsProcessing] =
    useState(false);


  // ====================================================
  // LOAD CASHFREE SDK
  // ====================================================

  useEffect(() => {

    if (
      document.querySelector(
        'script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]'
      )
    ) {
      return;
    }

    const script =
      document.createElement('script');

    script.src =
      'https://sdk.cashfree.com/js/v3/cashfree.js';

    script.async = true;

    document.body.appendChild(script);

  }, []);


  // ====================================================
  // VALIDATE PHONE
  // ====================================================

  const validatePhone = (value: string) => {

    const digits =
      value.replace(/\D/g, '');


    if (!digits) {
      return 'Please enter your WhatsApp number.';
    }


    if (
      digits.length <
      selectedCountry.minDigits
    ) {
      return `${selectedCountry.name} requires ${selectedCountry.minDigits} digits.`;
    }


    if (
      digits.length >
      selectedCountry.maxDigits
    ) {
      return `${selectedCountry.name} allows maximum ${selectedCountry.maxDigits} digits.`;
    }


    // India mobile number check

    if (
      selectedCountry.code === 'IN' &&
      !/^[6-9]/.test(digits)
    ) {
      return 'Indian mobile numbers must start with 6, 7, 8 or 9.';
    }


    return '';
  };


  // ====================================================
  // COUNTRY CHANGE
  // ====================================================

  const handleCountryChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {

    const country =
      countries.find(
        (item) =>
          item.code === event.target.value
      );


    if (!country) {
      return;
    }


    setSelectedCountry(country);

    setPhone('');

    setPhoneError('');
  };


  // ====================================================
  // PHONE CHANGE
  // ====================================================

  const handlePhoneChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const digitsOnly =
      event.target.value.replace(/\D/g, '');


    const limitedValue =
      digitsOnly.slice(
        0,
        selectedCountry.maxDigits
      );


    setPhone(limitedValue);


    if (limitedValue.length > 0) {

      setPhoneError(
        validatePhone(limitedValue)
      );

    } else {

      setPhoneError('');

    }
  };


  // ====================================================
  // FORM SUBMIT
  // ====================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    const form =
      new FormData(event.currentTarget);


    const name =
      String(
        form.get('name') || ''
      ).trim();


    const email =
      String(
        form.get('email') || ''
      ).trim();


    const cleanPhone =
      String(
        form.get('phone') || ''
      )
        .replace(/\D/g, '');


    // Validate phone

    const validationError =
      validatePhone(cleanPhone);


    if (validationError) {

      setPhoneError(
        validationError
      );

      return;
    }


    // Full international phone number

    const fullPhoneNumber =
      `${selectedCountry.dialCode}${cleanPhone}`;


    setPhoneError('');

    setIsProcessing(true);


    // ==================================================
    // SAVE REGISTRATION
    // ==================================================

    sessionStorage.setItem(
      'webinar_registration',
      JSON.stringify({
        name,
        email,
        phone: cleanPhone,
        country: selectedCountry.name,
        countryCode: selectedCountry.code,
        dialCode: selectedCountry.dialCode,
        fullPhoneNumber,
      })
    );


    try {

      // ================================================
      // CREATE CASHFREE ORDER
      // ================================================

      const response =
        await fetch(
          '/.netlify/functions/create-order',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              name,
              email,
              phone: fullPhoneNumber,
              country:
                selectedCountry.name,
              countryCode:
                selectedCountry.code,
              dialCode:
                selectedCountry.dialCode,
              course: 'webinar',
            }),
          }
        );


      const responseText =
        await response.text();


      let result: {
        payment_session_id?: string;
        mode?: string;
        error?: string;
      };


      try {

        result =
          JSON.parse(
            responseText
          );

      } catch {

        throw new Error(
          `Payment service returned an invalid response (${response.status}). Start the app with Netlify Dev.`
        );

      }


      if (
        !response.ok ||
        !result.payment_session_id
      ) {

        throw new Error(
          result.error ||
          'Unable to create Cashfree payment.'
        );

      }


      // ================================================
      // CASHFREE CHECKOUT
      // ================================================

      const cashfree = (

        window as typeof window & {

          Cashfree?: (
            options: {
              mode:
                | 'sandbox'
                | 'production';
            }
          ) => {

            checkout: (
              options: {
                paymentSessionId:
                  string;

                redirectTarget:
                  '_self';
              }
            ) => Promise<void>;

          };

        }

      ).Cashfree?.({

        mode:
          result.mode === 'production'
            ? 'production'
            : 'sandbox',

      });


      if (!cashfree) {

        throw new Error(
          'Cashfree checkout is still loading. Please try again.'
        );

      }


      await cashfree.checkout({

        paymentSessionId:
          result.payment_session_id,

        redirectTarget:
          '_self',

      });


    } catch (error) {

      setPhoneError(

        error instanceof Error
          ? error.message
          : 'Unable to start payment.'

      );


      setIsProcessing(false);

    }

  };


  // ======================================================
  // PAGE
  // ======================================================

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#1c1d1b] to-[#0d0e10] text-white overflow-hidden">

      <SEO
        title="SARMAK Webinar Workshop"
        description="Register for the SARMAK From Worried to Hired online workshop."
        keywords="SARMAK webinar, online workshop, career workshop"
      />


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1d1b]/95 backdrop-blur-xl border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <Logo
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />

            <div className="hidden sm:block">

              <span className="text-xl font-bold tracking-wider">

                SARMAK{' '}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500">

                  Learning Portal

                </span>

              </span>


              <span className="block text-xs text-gold font-mono tracking-widest">

                INNOVATE. TRANSFORM. EXCEL.

              </span>

            </div>

          </Link>


          <Link
            to="/login"
            className="btn-outline text-sm inline-flex items-center gap-2"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="webinar-page pt-28 pb-20">

        <div className="webinar-shell">

          <div className="webinar-content webinar-reveal">


            {/* ==================================================
                LEFT
            ================================================== */}

            <section className="webinar-copy">

              <p className="webinar-eyebrow">
                From Worried to Hired
              </p>


              <h2>
                WORKSHOP
              </h2>


              <p className="webinar-description">
                Build 5 in 1 Smart Journey. Save Time. Scale Business.
              </p>


              <div className="webinar-gold-line" />


              <h3>
                REGISTER NOW
              </h3>


              <p className="webinar-limited">
                Limited Seats Available!
              </p>


              {/* ==================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="webinar-form"
              >


                {/* NAME */}

                <label htmlFor="webinar-name">

                  Name <span>*</span>

                </label>


                <input
                  id="webinar-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />


                {/* EMAIL */}

                <label htmlFor="webinar-email">

                  Email <span>*</span>

                </label>


                <input
                  id="webinar-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />


                {/* WHATSAPP */}

                <label htmlFor="webinar-phone">

                  WhatsApp Number <span>*</span>

                </label>


                {/* ==================================================
                    COUNTRY + PHONE SAME BOX
                ================================================== */}

                <div
                  className="flex w-full h-[62px] rounded-lg border border-[#8a651d] bg-[#111] overflow-hidden focus-within:border-[#f0b82e] focus-within:shadow-[0_0_15px_rgba(240,184,46,0.12)]"
                >


                  {/* COUNTRY SELECT */}

                  <div className="relative flex items-center shrink-0">

                    <select
                      id="webinar-country"
                      name="country"
                      value={selectedCountry.code}
                      onChange={handleCountryChange}
                      aria-label="Country"
                      className="appearance-none h-full w-[125px] bg-transparent pl-4 pr-8 text-white outline-none cursor-pointer text-base"
                    >

                      {countries.map(
                        (country) => (

                          <option
                            key={country.code}
                            value={country.code}
                            className="bg-[#111] text-white"
                          >

                            {country.flag}{' '}
                            {country.dialCode}

                          </option>

                        )
                      )}

                    </select>


                    {/* DROPDOWN ARROW */}

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs">

                      ▼

                    </span>

                  </div>


                  {/* VERTICAL DIVIDER */}

                  <div className="w-px h-8 self-center bg-white/10" />


                  {/* PHONE NUMBER */}

                  <input
                    id="webinar-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={
                      selectedCountry.maxDigits
                    }
                    placeholder="Enter your WhatsApp number"
                    required
                    className="flex-1 min-w-0 h-full bg-transparent border-0 outline-none px-4 text-white text-base placeholder:text-white/40"
                  />

                </div>


                {/* PHONE LIMIT */}

                <p className="text-xs text-white/40 mt-1">

                  {selectedCountry.name}:{' '}

                  {selectedCountry.minDigits ===
                  selectedCountry.maxDigits

                    ? `${selectedCountry.maxDigits} digits required`

                    : `${selectedCountry.minDigits}-${selectedCountry.maxDigits} digits allowed`

                  }

                </p>


                {/* ERROR */}

                {phoneError && (

                  <p className="webinar-phone-error">

                    {phoneError}

                  </p>

                )}


                {/* PAYMENT BUTTON */}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="webinar-pay-button disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {isProcessing
                    ? 'OPENING CASHFREE...'
                    : 'REGISTER NOW — ₹9'
                  }

                </button>

              </form>


              {/* ==================================================
                  SECURE PAYMENT
              ================================================== */}

              <p className="webinar-secure">

                🔒 Secure Payment
                &nbsp; | &nbsp;
                Instant Confirmation

              </p>


              {/* ==================================================
                  DATE + TIME + MODE
                  SAME LINE
              ================================================== */}

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">


                {/* DATE */}

                <div className="rounded-xl border border-[#8a651d] bg-[#111] px-4 py-4 flex items-center gap-3">

                  <span className="text-2xl shrink-0">
                    📅
                  </span>


                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-[#f0b82e]">

                      Date

                    </p>


                    <p className="text-sm sm:text-base text-white leading-tight">

                      {WORKSHOP_DATE}

                    </p>

                  </div>

                </div>


                {/* TIME */}

                <div className="rounded-xl border border-[#8a651d] bg-[#111] px-4 py-4 flex items-center gap-3">

                  <span className="text-2xl shrink-0">
                    ⏰
                  </span>


                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-[#f0b82e]">

                      Time

                    </p>


                    <p className="text-sm sm:text-base text-white leading-tight">

                      {WORKSHOP_TIME}

                    </p>

                  </div>

                </div>


                {/* MODE */}

                <div className="rounded-xl border border-[#8a651d] bg-[#111] px-4 py-4 flex items-center gap-3">

                  <span className="text-2xl shrink-0">
                    💻
                  </span>


                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-[#f0b82e]">

                      Mode

                    </p>


                    <p className="text-sm sm:text-base text-white leading-tight">

                      {WORKSHOP_MODE}

                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================================
                RIGHT POSTER
            ================================================== */}

            <section className="webinar-poster-section webinar-float">

              <div className="webinar-poster-card webinar-shimmer">

                <img
                  src="/webinar/poster.jpg"
                  alt="SARMAK workshop poster"
                />

              </div>

            </section>

          </div>

        </div>

      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="bg-black/50 border-t border-white/5">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">


            {/* COMPANY */}

            <div className="lg:col-span-2">

              <a
                href="https://learn.sarmak.in"
                className="flex items-center gap-3 mb-6 inline-flex"
              >

                <Logo className="h-14 w-auto" />


                <div>

                  <span className="text-2xl font-bold text-white tracking-wider block">

                    SARMAK Learning Portal

                  </span>


                  <span className="text-xs text-gold font-mono tracking-widest">

                    INNOVATE. TRANSFORM. EXCEL.

                  </span>

                </div>

              </a>


              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">

                SARMAK is a group of technology enthusiasts driven by passion and commitment to revolutionize businesses through innovative IT solutions and AI-powered services.

              </p>


              <div className="space-y-3 text-sm text-white/60">

                <a
                  href="mailto:info@sarmak.in"
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >

                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">

                    @

                  </span>

                  info@sarmak.in

                </a>


                <a
                  href="tel:+919764000745"
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >

                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">

                    📞

                  </span>

                  +91 97640 00745

                </a>


                <div className="flex items-start gap-3 text-white/60">

                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">

                    📍

                  </span>

                  Joyville, Meridian-1302, Hinjewadi, Pune MH 411057, India

                </div>

              </div>

            </div>


            {/* QUICK LINKS */}

            <div>

              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">

                Quick Links

              </h4>


              <ul className="space-y-3 text-sm">

                <li>
                  <a
                    href="https://sarmak.in"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/about"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/services/learning-with-sarmak"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Learning with SARMAK
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/contact"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Contact
                  </a>
                </li>

              </ul>

            </div>


            {/* SERVICES */}

            <div>

              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">

                Services

              </h4>


              <ul className="space-y-3 text-sm">

                <li>
                  <a
                    href="https://sarmak.in/services/ai"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    AI Solutions
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/services/cloud"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Cloud Services
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/services/database"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Database Services
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/services/devops"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    DevOps
                  </a>
                </li>

              </ul>

            </div>


            {/* RESOURCES */}

            <div>

              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">

                Resources

              </h4>


              <ul className="space-y-3 text-sm">

                <li>
                  <a
                    href="https://sarmak.in/blog"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Blog
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/resources"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Resources
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/faq"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    FAQ
                  </a>
                </li>

                <li>
                  <a
                    href="https://sarmak.in/service-plans"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Service Plans
                  </a>
                </li>

              </ul>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="border-t border-white/5 pt-6 mt-12">

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">

              <p>
                © {new Date().getFullYear()} SARMAK. All rights reserved.
              </p>


              <div className="flex flex-wrap items-center gap-6">

                <a
                  href="https://sarmak.in/privacy-policy"
                  className="hover:text-gold transition-colors"
                >
                  Privacy Policy
                </a>


                <a
                  href="https://sarmak.in/terms-of-service"
                  className="hover:text-gold transition-colors"
                >
                  Terms of Service
                </a>

              </div>


              <div className="flex items-center gap-3">

                <a
                  href="https://www.linkedin.com/company/sarmak-solutions"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300"
                >
                  in
                </a>


                <a
                  href="https://x.com/SarmakSolutions"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300"
                >
                  x
                </a>


                <a
                  href="https://www.instagram.com/sarmaksolutions/"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-[#1c1d1b] transition-all duration-300"
                >
                  ig
                </a>

              </div>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};


export default Webinar;