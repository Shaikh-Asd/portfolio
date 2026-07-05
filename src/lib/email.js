import { personalInfo } from "./data";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || personalInfo.email;

const budgetLabels = {
  "under-5k": "Under $5,000",
  "5k-10k": "$5,000 – $10,000",
  "10k-25k": "$10,000 – $25,000",
  "25k-plus": "$25,000+",
};

export function isEmailConfigured() {
  return Boolean(CONTACT_EMAIL);
}

export async function sendContactEmail(formData) {
  if (!isEmailConfigured()) {
    throw new Error("Add VITE_CONTACT_EMAIL to your .env file.");
  }

  const { name, email, company, budget, details } = formData;

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company: company || "Not provided",
        budget: budgetLabels[budget] || budget || "Not specified",
        message: details,
        _subject: `Portfolio inquiry from ${name}`,
        _replyto: email,
        _captcha: "false",
        _template: "table",
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to send message. Please try again.");
  }

  return result;
}
