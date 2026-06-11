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
    const fallbackMessage = `API request failed with status ${response.status}.`;
    const contentType = response.headers.get('content-type') || '';
    const errorBody = contentType.includes('application/json')
      ? await response.json()
      : {};
    const detail = errorBody.detail || fallbackMessage;

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
