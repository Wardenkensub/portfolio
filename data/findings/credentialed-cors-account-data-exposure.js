const credentialedCorsAccountDataExposure = {
  slug: "credentialed-cors-account-data-exposure",
  title: "Account Data Exposure via Public Storybook and Credentialed CORS",
  summary:
    "A trusted public design origin could run attacker-influenced JavaScript through Storybook message handling and read authenticated account API responses because the API allowed credentialed CORS from that origin.",
  status: "Accepted",
  severity: "High",
  type: "Web Application",
  tag: "CORS",
  program: "vidio.com",
  publicProgram: "Vidio Bug Bounty",
  target: "Account API",
  reported: "May 22, 2026",
  listDate: "May 22, 2026",
  cvss: "8.1 (High)",
  category: "DOM XSS + Credentialed CORS",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "The application trusted a public design/storybook origin for credentialed CORS. That same origin accepted cross-origin Storybook messages that could change rendered component arguments. If user interaction caused JavaScript to run on the trusted origin, authenticated account-scoped API responses became readable.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "A successful exploit could read profile and account metadata from a logged-in user's browser session without needing to read HttpOnly cookies directly.",
      list: [
        "Authenticated profile data exposure",
        "Account metadata exposure",
        "Credentialed cross-origin API reads",
        "Potential access to authenticated state-changing API routes from a trusted origin",
      ],
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "The API returned credentialed CORS headers for a design origin, while the public Storybook could be influenced through postMessage argument updates. The chain made a public UI preview origin part of the account security boundary.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "The PoC below is intentionally generic and does not point to the real target. Cookies, API keys, account IDs, and domains are redacted.",
      code:
        "fetch('https://api.example.com/api/profile', {\n  credentials: 'include',\n  headers: { 'X-API-Key': '<redacted>' }\n}).then(r => r.json())",
      result:
        "Owned test accounts returned different account-scoped profile objects, confirming authenticated data exposure. Real account identifiers are not shown.",
    },
  ],
  timeline: [
    ["Discovered", "May 22, 2026"],
    ["Validated", "May 25, 2026"],
    ["Reported", "May 25, 2026"],
    ["Redacted", "May 25, 2026"],
  ],
};

export default credentialedCorsAccountDataExposure;
