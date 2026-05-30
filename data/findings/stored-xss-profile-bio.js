const storedXssProfileBio = {
  slug: "applepay-session-non-blind-ssrf",
  title: "Unauthenticated ApplePaySession Non-Blind SSRF",
  summary:
    "A payment-related Apple Pay merchant validation endpoint accepted a caller-supplied URL and caused the backend to make a server-side POST request to that URL. The response was parsed and relayed back to the unauthenticated client.",
  status: "Accepted",
  severity: "High",
  type: "API Security",
  tag: "SSRF",
  program: "chicksx.com",
  publicProgram: "chicksx Bug Bounty",
  target: "Payment API",
  reported: "May 29, 2026",
  listDate: "May 29, 2026",
  cvss: "8.1 (High)",
  category: "Server-Side Request Forgery",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "The backend accepted an arbitrary merchant validation URL from an unauthenticated request. Instead of restricting validation to trusted Apple endpoints, the server issued a POST request to the supplied destination and returned attacker-controlled JSON values to the caller.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "The issue creates a non-blind SSRF primitive in a payment-adjacent flow. A remote unauthenticated attacker can force backend infrastructure to contact attacker-controlled hosts and observe the response relay behavior.",
      list: [
        "Unauthenticated server-side HTTP requests to arbitrary destinations",
        "Response relay from attacker-controlled server to client",
        "Exposure of merchant validation metadata to untrusted infrastructure",
        "Potential access to internal services if egress controls are weak",
      ],
      calloutTitle: "Privacy note",
      callout:
        "Internal IPs, localhost, cloud metadata endpoints, and private hostnames were not tested.",
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "The endpoint accepted non-Apple hosts, plain HTTP, raw IP-style destinations, and custom ports. The backend sent payment validation metadata and tracing headers to the provided URL.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "Safe demonstration only. The real target URL, IP address, merchant identifiers, and tracing values are intentionally redacted.",
      code:
        "POST https://api.example.com/User/ApplePaySession\nContent-Type: application/json\n\n\"https://researcher-controlled.example/ssrf-proof\"",
      result:
        "The researcher-controlled listener received a backend POST request and returned marker JSON that was relayed by the API. No private network probing was performed.",
    },
  ],
  timeline: [
    ["Discovered", "May 29, 2026"],
    ["Validated", "May 29, 2026"],
    ["Reported", "May 29, 2026"],
    ["Redacted", "May 29, 2026"],
  ],
};

export default storedXssProfileBio;
