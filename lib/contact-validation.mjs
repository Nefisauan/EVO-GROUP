export function validateInquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please provide a valid inquiry." };
  if (input.fax) return { error: "Unable to submit this inquiry." };
  if (
    typeof input.startedAt !== "number" ||
    Date.now() - input.startedAt < 2500
  )
    return {
      error: "Please take a moment to complete the form and try again.",
    };
  const fields = {
    name: 120,
    email: 254,
    company: 160,
    website: 500,
    industry: 120,
    interest: 160,
    challenge: 5000,
    budget: 120,
  };
  const data = {};
  for (const [key, max] of Object.entries(fields)) {
    const value = input[key] ?? "";
    if (typeof value !== "string" || value.length > max)
      return { error: "One or more fields exceed the allowed length." };
    data[key] = value.trim();
  }
  if (
    !data.name ||
    !data.company ||
    !data.interest ||
    data.challenge.length < 20
  )
    return {
      error:
        "Please complete the required fields and describe your challenge in at least 20 characters.",
    };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { error: "Please enter a valid business email." };
  if (data.website) {
    try {
      const url = new URL(data.website);
      if (!["https:", "http:"].includes(url.protocol)) throw Error();
    } catch {
      return {
        error:
          "Please enter a valid website URL beginning with https:// or http://.",
      };
    }
  }
  if (input.consent !== "yes")
    return { error: "Please agree to the privacy notice before sending." };
  return { data };
}
