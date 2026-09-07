exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed',
      }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const {
      name,
      email,
      phone,
      course,
      country,
      countryCode,
      dialCode,
    } = body;


    // ==================================================
    // COURSES
    // ==================================================

    const courses = {
      college: {
        amount: 499,
        note: 'College Students Program',
      },

      advance: {
        amount: 1999,
        note: 'Advance Course: AI in IT Infrastructure',
      },

      webinar: {
        amount: 9,
        note: 'From Worried to Hired Workshop',
      },
    };


    const selectedCourse = courses[course];


    // ==================================================
    // BASIC VALIDATION
    // ==================================================

    if (!name || !email || !phone || !selectedCourse) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error:
            'Name, email, phone and a valid course are required.',
        }),
      };
    }


    // ==================================================
    // NORMALIZE PHONE
    // ==================================================

    const normalizedPhone = String(phone)
      .replace(/\D/g, '');


    // International phone should contain
    // country code + subscriber number.
    //
    // Example:
    // India       +919876543210
    // UAE         +971501234567
    // USA         +11234567890

    if (
      normalizedPhone.length < 8 ||
      normalizedPhone.length > 15
    ) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error:
            'Please provide a valid international phone number.',
        }),
      };
    }


    // ==================================================
    // CASHFREE CREDENTIALS
    // ==================================================

    const clientId =
      process.env.CASHFREE_CLIENT_ID;

    const clientSecret =
      process.env.CASHFREE_CLIENT_SECRET;

    const mode =
      process.env.CASHFREE_MODE || 'sandbox';


    if (!clientId || !clientSecret) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error:
            'Cashfree credentials are missing.',
        }),
      };
    }


    // ==================================================
    // CASHFREE API
    // ==================================================

    const baseUrl =
      mode === 'production'
        ? 'https://api.cashfree.com/pg'
        : 'https://sandbox.cashfree.com/pg';


    // ==================================================
    // ORDER ID
    // ==================================================

    const orderId =
      `SARMAK_${Date.now()}_${Math.floor(
        Math.random() * 100000
      )}`;


    // ==================================================
    // WEBSITE URL
    // ==================================================

    const configuredSiteUrl =
      process.env.CASHFREE_RETURN_URL ||
      process.env.URL ||
      process.env.DEPLOY_PRIME_URL;


    const requestHost =
      event.headers?.host ||
      'localhost:8888';


    const requestProtocol =
      requestHost.startsWith('localhost')
        ? 'http'
        : 'https';


    const siteUrl =
      configuredSiteUrl ||
      `${requestProtocol}://${requestHost}`;


    // ==================================================
    // RETURN URL
    // ==================================================

    const callbackUrl =
      `${siteUrl.replace(/\/$/, '')}/payment-success`;


    // ==================================================
    // CREATE CASHFREE ORDER
    // ==================================================

    const response = await fetch(
      `${baseUrl}/orders`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Accept:
            'application/json',

          'x-api-version':
            '2025-01-01',

          'x-client-id':
            clientId,

          'x-client-secret':
            clientSecret,
        },

        body: JSON.stringify({

          order_id:
            orderId,

          order_amount:
            selectedCourse.amount,

          order_currency:
            'INR',


          // ============================================
          // CUSTOMER
          // ============================================

          customer_details: {

            customer_id:
              `CUST_${Date.now()}`,

            customer_name:
              name,

            customer_email:
              email,

            customer_phone:
              normalizedPhone,

          },


          // ============================================
          // RETURN URL
          // ============================================

          order_meta: {

            return_url:
              `${callbackUrl}?order_id={order_id}&course=${encodeURIComponent(
                course
              )}`,

          },


          // ============================================
          // ORDER NOTE
          // ============================================

          order_note:
            selectedCourse.note,

        }),
      }
    );


    // ==================================================
    // CASHFREE RESPONSE
    // ==================================================

    const result =
      await response
        .json()
        .catch(() => ({}));


    if (!response.ok) {

      const errorMessage =
        [
          result.message,
          result.code,
          result.type,
        ]
          .filter(Boolean)
          .join(' - ');


      return {
        statusCode: response.status,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          success: false,

          error:
            errorMessage ||
            'Unable to create payment order.',
        }),
      };
    }


    // ==================================================
    // SUCCESS
    // ==================================================

    return {

      statusCode: 200,

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({

        success: true,

        payment_session_id:
          result.payment_session_id,

        order_id:
          result.order_id,

        mode,

        country:
          country || '',

        countryCode:
          countryCode || '',

        dialCode:
          dialCode || '',

      }),

    };


  } catch (error) {

    console.error(
      'Cashfree order error:',
      error
    );


    return {

      statusCode: 500,

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({

        success: false,

        error:
          'Server error while creating payment.',

      }),

    };
  }
};