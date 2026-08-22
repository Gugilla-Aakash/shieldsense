const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function scanUrl(url) {
  const response = await fetch(`${API_BASE_URL}/scan/url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to scan URL");
  }
  return response.json();
}

export async function scanText(content, sender = "", subject = "") {
  const response = await fetch(`${API_BASE_URL}/scan/text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      sender: sender || null,
      subject: subject || null,
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to scan text");
  }
  return response.json();
}

export async function scanFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/scan/file`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to scan file");
  }
  return response.json();
}

export async function getScanHistory(limit = 20) {
  const response = await fetch(`${API_BASE_URL}/history/?limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch scan history");
  return response.json();
}

export async function simulateAction(scanId, action, notes = "") {
  const response = await fetch(`${API_BASE_URL}/action/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scan_id: scanId, action, notes: notes || null }),
  });
  if (!response.ok) throw new Error("Failed to execute simulated action");
  return response.json();
}

export async function chatWithSecurityAgent(
  message,
  scanId = null,
  history = [],
) {
  const response = await fetch(`${API_BASE_URL}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      scan_id: scanId || null,
      history: history || [],
    }),
  });
  if (!response.ok) throw new Error("Failed to reach AI Advisor");
  return response.json();
}
