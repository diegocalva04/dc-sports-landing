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
    let detail = `API request failed with status ${response.status}.`;

    try {
      const errorBody = await response.json();
      detail = errorBody.detail || detail;
    } catch {
      // Keep the generic message when the response is not JSON.
    }

    const error = new Error(Array.isArray(detail) ? 'Invalid form data.' : detail);
    error.status = response.status;
    throw error;
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
