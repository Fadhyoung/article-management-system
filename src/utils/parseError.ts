export default async function parseError(response: Response): Promise<string> {
    let message = 'Unknown server error';
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        message = data.message || message;
      } else {
        const text = await response.text();
        message = text || message;
      }
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    return message;
  }
  