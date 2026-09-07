exports.handler = async (event) => {
  const orderId = event.queryStringParameters?.order_id;
  if (!orderId) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Order ID is missing.' }) };
  }

  try {
    const mode = process.env.CASHFREE_MODE || 'sandbox';
    const baseUrl = mode === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
    const response = await fetch(`${baseUrl}/orders/${encodeURIComponent(orderId)}`, {
      headers: {
        Accept: 'application/json',
        'x-api-version': '2025-01-01',
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
      },
    });
    const result = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: response.ok,
        order_id: result.order_id,
        order_status: result.order_status,
        error: response.ok ? undefined : result.message || 'Unable to verify payment.',
      }),
    };
  } catch (error) {
    console.error('Cashfree verification error:', error);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Unable to verify payment.' }) };
  }
};