exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, error: 'Method not allowed' }) };
  }

  try {
    const { name, email, phone, course } = JSON.parse(event.body || '{}');
    const courses = {
      college: { amount: 499, note: 'College Students Program' },
      advance: { amount: 1999, note: 'Advance Course: AI in IT Infrastructure' },
      webinar: { amount: 9, note: 'From Worried to Hired Workshop' },
    };
    const selectedCourse = courses[course];

    const normalizedPhone = String(phone || '').replace(/\D/g, '').replace(/^91(?=[6-9]\d{9}$)/, '');

    if (!name || !email || !/^[6-9]\d{9}$/.test(normalizedPhone) || !selectedCourse) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Name, email, phone and a valid course are required.' }) };
    }

    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
    const mode = process.env.CASHFREE_MODE || 'sandbox';
    if (!clientId || !clientSecret) {
      return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Cashfree credentials are missing.' }) };
    }

    const baseUrl = mode === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
    const orderId = `SARMAK_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const configuredSiteUrl = process.env.CASHFREE_RETURN_URL || process.env.URL || process.env.DEPLOY_PRIME_URL;
    const requestHost = event.headers?.host || 'localhost:8888';
    const requestProtocol = requestHost.startsWith('localhost') ? 'http' : 'https';
    const siteUrl = configuredSiteUrl || `${requestProtocol}://${requestHost}`;
    const callbackUrl = `${siteUrl.replace(/\/$/, '')}/payment-success`;
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-version': '2025-01-01',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: selectedCourse.amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: `CUST_${Date.now()}`,
          customer_name: name,
          customer_email: email,
          customer_phone: normalizedPhone,
        },
        order_meta: {
          return_url: `${callbackUrl}?order_id={order_id}&course=${encodeURIComponent(course)}`,
        },
        order_note: selectedCourse.note,
      }),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = [result.message, result.code, result.type].filter(Boolean).join(' - ');
      return { statusCode: response.status, body: JSON.stringify({ success: false, error: errorMessage || 'Unable to create payment order.' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, payment_session_id: result.payment_session_id, order_id: result.order_id, mode }),
    };
  } catch (error) {
    console.error('Cashfree order error:', error);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Server error while creating payment.' }) };
  }
};
