exports.handler = async (event) => {

  // ==================================================
  // GET ORDER ID
  // ==================================================

  const orderId =
    event.queryStringParameters?.order_id;


  if (!orderId) {

    return {

      statusCode: 400,

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({

        success: false,

        error:
          'Order ID is missing.',

      }),

    };
  }


  try {

    // ==================================================
    // CASHFREE CONFIG
    // ==================================================

    const mode =
      process.env.CASHFREE_MODE ||
      'sandbox';


    const clientId =
      process.env.CASHFREE_CLIENT_ID;


    const clientSecret =
      process.env.CASHFREE_CLIENT_SECRET;


    if (!clientId || !clientSecret) {

      return {

        statusCode: 500,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          success: false,

          error:
            'Cashfree credentials are missing.',

        }),

      };
    }


    // ==================================================
    // BASE URL
    // ==================================================

    const baseUrl =
      mode === 'production'
        ? 'https://api.cashfree.com/pg'
        : 'https://sandbox.cashfree.com/pg';


    // ==================================================
    // GET PAYMENTS FOR ORDER
    // ==================================================

    const response =
      await fetch(
        `${baseUrl}/orders/${encodeURIComponent(
          orderId
        )}/payments`,
        {

          method: 'GET',

          headers: {

            Accept:
              'application/json',

            'x-api-version':
              '2025-01-01',

            'x-client-id':
              clientId,

            'x-client-secret':
              clientSecret,

          },

        }
      );


    const payments =
      await response
        .json()
        .catch(() => []);


    if (!response.ok) {

      return {

        statusCode:
          response.status,

        headers: {

          'Content-Type':
            'application/json',

        },

        body: JSON.stringify({

          success: false,

          order_id:
            orderId,

          error:
            payments?.message ||
            'Unable to verify payment.',

        }),

      };

    }


    // ==================================================
    // PAYMENTS ARRAY
    // ==================================================

    const paymentList =
      Array.isArray(payments)
        ? payments
        : [];


    // ==================================================
    // FIND LATEST PAYMENT
    // ==================================================

    const latestPayment =
      paymentList.length > 0
        ? paymentList[
            paymentList.length - 1
          ]
        : null;


    // ==================================================
    // PAYMENT STATUS
    // ==================================================

    const paymentStatus =
      String(
        latestPayment?.payment_status ||
        ''
      ).toUpperCase();


    // ==================================================
    // ORDER STATUS
    // ==================================================

    const orderStatus =
      String(
        latestPayment?.order_status ||
        ''
      ).toUpperCase();


    // ==================================================
    // NORMALIZE STATUS
    // ==================================================

    let finalStatus =
      paymentStatus;


    // Some Cashfree responses may expose
    // the order state instead of payment state.

    if (!finalStatus) {
      finalStatus =
        orderStatus;
    }


    // ==================================================
    // SUCCESS
    // ==================================================

    if (
      finalStatus === 'SUCCESS' ||
      finalStatus === 'PAID'
    ) {

      return {

        statusCode: 200,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          success: true,

          order_id:
            orderId,

          payment_status:
            'SUCCESS',

          order_status:
            orderStatus,

        }),

      };
    }


    // ==================================================
    // PENDING
    // ==================================================

    if (
      finalStatus === 'PENDING' ||
      finalStatus === 'ACTIVE'
    ) {

      return {

        statusCode: 200,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          success: true,

          order_id:
            orderId,

          payment_status:
            'PENDING',

          order_status:
            orderStatus,

        }),

      };
    }


    // ==================================================
    // USER DROPPED
    // ==================================================

    if (
      finalStatus === 'USER_DROPPED'
    ) {

      return {

        statusCode: 200,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          success: true,

          order_id:
            orderId,

          payment_status:
            'USER_DROPPED',

          order_status:
            orderStatus,

        }),

      };
    }


    // ==================================================
    // FAILED
    // ==================================================

    if (
      finalStatus === 'FAILED' ||
      finalStatus === 'FAILURE'
    ) {

      return {

        statusCode: 200,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          success: true,

          order_id:
            orderId,

          payment_status:
            'FAILED',

          order_status:
            orderStatus,

        }),

      };
    }


    // ==================================================
    // UNKNOWN / NOT COMPLETED
    // ==================================================

    return {

      statusCode: 200,

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({

        success: true,

        order_id:
          orderId,

        payment_status:
          finalStatus ||
          'PENDING',

        order_status:
          orderStatus,

      }),

    };


  } catch (error) {

    console.error(
      'Cashfree verification error:',
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
          'Unable to verify payment.',

      }),

    };

  }
};