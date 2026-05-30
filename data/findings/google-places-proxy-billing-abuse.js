const googlePlacesProxyBillingAbuse = {
  slug: "google-places-proxy-billing-abuse",
  title: "Unauthenticated Google Places Proxy Billing Abuse",
  summary:
    "Google Places proxy endpoints were reachable without user authentication and relied on a spoofable Referer header as the apparent gate.",
  status: "Accepted",
  severity: "Low",
  type: "API Abuse",
  tag: "Billing Abuse",
  program: "chicksx.com",
  publicProgram: "chicksx Bug Bounty",
  target: "Places Proxy API",
  reported: "May 29, 2026",
  listDate: "May 29, 2026",
  cvss: "4.7 (Low)",
  category: "Improper Authorization",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "The backend exposed Google Places autocomplete and details proxy endpoints without requiring a user session or bearer token.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "An unauthenticated non-browser client could spoof the expected Referer and consume the company's Google Places quota through the backend proxy.",
      list: [
        "Unauthenticated quota consumption",
        "Potential billing abuse",
        "Potential degradation of legitimate autocomplete/place lookup flows",
        "Reliance on a client-controlled header as an authorization gate",
      ],
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "Requests with the expected Referer returned real Places data without authentication. Requests with a different Referer were blocked, confirming the apparent control was a spoofable header.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "The real backend host and referer are redacted. The request shape below is generic and not directed at the target.",
      code:
        "POST https://api.example.com/GooglePlaces/Autocomplete\nContent-Type: application/json\nReferer: https://www.example.com/\n\n{\"input\":\"1600 Amphitheatre Parkway\"}",
      result:
        "The backend returned autocomplete-style place predictions without a bearer token.",
    },
  ],
  timeline: [
    ["Discovered", "May 29, 2026"],
    ["Retested", "May 29, 2026"],
    ["Reported", "May 29, 2026"],
    ["Redacted", "May 30, 2026"],
  ],
};

export default googlePlacesProxyBillingAbuse;
