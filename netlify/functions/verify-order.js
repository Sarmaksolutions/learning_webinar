const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL;

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        error: "Order ID is missing.",
      }),
    };
  }

  try {
    // ==================================================
    // CASHFREE CONFIG
    // ==================================================

    const mode =
      process.env.CASHFREE_MODE || "sandbox";

    const clientId =
      process.env.CASHFREE_CLIENT_ID;

    const clientSecret =
      process.env.CASHFREE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: false,
          error: "Cashfree credentials are missing.",
        }),
      };
    }

    // ==================================================
    // CASHFREE API URL
    // ==================================================

    const baseUrl =
      mode === "production"
        ? "https://api.cashfree.com/pg"
        : "https://sandbox.cashfree.com/pg";

    // ==================================================
    // GET PAYMENTS FOR ORDER
    // ==================================================

    const response = await fetch(
      `${baseUrl}/orders/${encodeURIComponent(orderId)}/payments`,
      {
        method: "GET",

        headers: {
          Accept: "application/json",
          "x-api-version": "2025-01-01",
          "x-client-id": clientId,
          "x-client-secret": clientSecret,
        },
      }
    );

    const payments =
      await response.json().catch(() => []);

    // ==================================================
    // CASHFREE API ERROR
    // ==================================================

    if (!response.ok) {
      console.error(
        "Cashfree verification error:",
        payments
      );

      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: false,
          order_id: orderId,
          error:
            payments?.message ||
            "Unable to verify payment.",
        }),
      };
    }

    // ==================================================
    // PAYMENT LIST
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
        ? paymentList[paymentList.length - 1]
        : null;

    // ==================================================
    // PAYMENT STATUS
    // ==================================================

    const paymentStatus =
      String(
        latestPayment?.payment_status || ""
      ).toUpperCase();

    // ==================================================
    // ORDER STATUS
    // ==================================================

    const orderStatus =
      String(
        latestPayment?.order_status || ""
      ).toUpperCase();

    // ==================================================
    // DETERMINE FINAL STATUS
    // ==================================================

    let finalStatus =
      paymentStatus || orderStatus || "PENDING";

    // ==================================================
    // SUCCESS / PAID
    // ==================================================

    if (
      finalStatus === "SUCCESS" ||
      finalStatus === "PAID"
    ) {
      // ----------------------------------------------
      // UPDATE GOOGLE SHEET
      // ----------------------------------------------

      await updateGoogleSheetStatus(
        orderId,
        "PAID"
      );

      return {
        statusCode: 200,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          success: true,

          order_id: orderId,

          payment_status: "PAID",

          order_status: orderStatus,
        }),
      };
    }

    // ==================================================
    // PENDING
    // ==================================================

    if (
      finalStatus === "PENDING" ||
      finalStatus === "ACTIVE" ||
      finalStatus === "NOT_ATTEMPTED"
    ) {
      await updateGoogleSheetStatus(
        orderId,
        "PENDING"
      );

      return {
        statusCode: 200,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          success: true,

          order_id: orderId,

          payment_status: "PENDING",

          order_status: orderStatus,
        }),
      };
    }

    // ==================================================
    // USER DROPPED
    // ==================================================

    if (
      finalStatus === "USER_DROPPED"
    ) {
      await updateGoogleSheetStatus(
        orderId,
        "USER_DROPPED"
      );

      return {
        statusCode: 200,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          success: true,

          order_id: orderId,

          payment_status: "USER_DROPPED",

          order_status: orderStatus,
        }),
      };
    }

    // ==================================================
    // FAILED
    // ==================================================

    if (
      finalStatus === "FAILED" ||
      finalStatus === "FAILURE"
    ) {
      await updateGoogleSheetStatus(
        orderId,
        "FAILED"
      );

      return {
        statusCode: 200,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          success: true,

          order_id: orderId,

          payment_status: "FAILED",

          order_status: orderStatus,
        }),
      };
    }

    // ==================================================
    // UNKNOWN STATUS
    // ==================================================

    await updateGoogleSheetStatus(
      orderId,
      finalStatus
    );

    return {
      statusCode: 200,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        success: true,

        order_id: orderId,

        payment_status: finalStatus,

        order_status: orderStatus,
      }),
    };

  } catch (error) {
    console.error(
      "Cashfree verification error:",
      error
    );

    return {
      statusCode: 500,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        success: false,

        error:
          "Unable to verify payment.",
      }),
    };
  }
};


// ======================================================
// UPDATE GOOGLE SHEET PAYMENT STATUS
// ======================================================

async function updateGoogleSheetStatus(
  orderId,
  paymentStatus
) {
  // --------------------------------------------------
  // Check Google Sheet URL
  // --------------------------------------------------

  if (!GOOGLE_SHEET_WEBHOOK_URL) {
    console.warn(
      "GOOGLE_SHEET_WEBHOOK_URL is not configured."
    );

    return;
  }

  try {
    // ------------------------------------------------
    // Send request to Google Apps Script
    // ------------------------------------------------

    const response = await fetch(
      GOOGLE_SHEET_WEBHOOK_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          action: "updateStatus",

          orderId: orderId,

          paymentStatus: paymentStatus,
        }),
      }
    );

    const responseText =
      await response.text();

    console.log(
      "Google Sheet status update:",
      response.status,
      responseText
    );

  } catch (error) {
    // ----------------------------------------------
    // Do not break payment verification
    // ----------------------------------------------

    console.error(
      "Google Sheet status update error:",
      error
    );
  }
}