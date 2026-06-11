const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';

export function isApiConfigured() {
  return Boolean(apiBaseUrl);
}

async function request(path, options = {}) {
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured.');
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return response.json();
}

export function fetchProducts() {
  return request('/api/products');
}

export function sendContactMessage(payload) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
