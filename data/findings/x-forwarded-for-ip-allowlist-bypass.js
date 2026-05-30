const xForwardedForIpAllowlistBypass = {
  slug: "x-forwarded-for-ip-allowlist-bypass",
  title: "IP Allowlist Bypass via Spoofed X-Forwarded-For Header",
  summary:
    "The API v3 endpoints relied on a client-controlled X-Forwarded-For header for IP-based access control, allowing remote unauthenticated attackers to bypass the restriction by spoofing a localhost address.",
  status: "Reported",
  severity: "Medium",
  type: "API Security",
  tag: "Access Control",
  program: "baliprov.dev",
  publicProgram: "Baliprov Bug Bounty",
  target: "API v3",
  reported: "May 15, 2026",
  listDate: "May 15, 2026",
  cvss: "5.3 (Medium)",
  category: "IP Allowlist Bypass",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "The API v3 endpoints appeared to be protected by an IP allowlist. Requests sent directly from an external IP address were rejected with an Unauthorized IP response. However, when a client supplied the X-Forwarded-For header with the value 127.0.0.1, the same restricted endpoint returned a successful response. This indicates that the application trusted a user-controlled proxy header when enforcing IP-based access restrictions.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "A remote attacker may spoof an internal or allowlisted source IP address and bypass the API's network-level access restriction without being connected to the trusted network.",
      list: [
        "Bypass of IP-based access controls on restricted API v3 endpoints",
        "Unauthorized requests can reach application-level processing logic",
        "Potential exposure of additional restricted endpoints or functionality",
        "Increased risk of API abuse if sensitive v3 endpoints are accessible behind the same control",
      ],
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "A request to a restricted API v3 endpoint was rejected when sent normally from an external address. Adding the client-controlled header X-Forwarded-For: 127.0.0.1 changed the response from HTTP 403 to HTTP 200, demonstrating that the IP restriction could be bypassed remotely.",
    },
    {
      title: "Proof of Concept: Request Without Bypass Header",
      icon: "code",
      body:
        "The public version uses a redacted hostname. Without the spoofed forwarding header, the server rejected the external request based on its source IP address.",
      code: `GET https://api.example.com/api/v3/app_setting
Accept: application/json`,
      result: `HTTP/2 403
Content-Type: application/json

{
  "status": "error",
  "errors": "Unauthorized IP <external-ip>"
}`,
    },
    {
      title: "Proof of Concept: Request With Spoofed Header",
      icon: "code",
      body:
        "By supplying a localhost value through the X-Forwarded-For header, the same request passed the IP restriction and returned a successful application response.",
      code: `GET https://api.example.com/api/v3/app_setting
Accept: application/json
X-Forwarded-For: 127.0.0.1`,
      result: `HTTP/2 200
Content-Type: application/json

{
  "code": 200,
  "status": "publish",
  "message": "Publish"
}`,
    },
    {
      title: "Additional Validation",
      icon: "search",
      body:
        "Additional non-destructive testing confirmed that other API v3 routes also passed the IP restriction when the spoofed forwarding header was provided. Instead of returning Unauthorized IP, the requests reached application-level validation logic.",
      code: `POST https://api.example.com/api/v3/app/login-email
Accept: application/json
Content-Type: application/json
X-Forwarded-For: 127.0.0.1

{
  "email": "not-an-email"
}`,
      result: `{
  "code": 400,
  "status": "FAILED",
  "message": "Validation Error",
  "errors": {
    "email": [
      "The email must be a valid email address."
    ]
  }
}`,
    },
    {
      title: "Security Significance",
      icon: "shield",
      body:
        "The behavior proves that the bypass is not limited to modifying an error message. The spoofed header causes requests to pass the IP-based access control layer and reach the application's normal endpoint handling logic.",
      list: [
        "Normal external request: rejected by IP control",
        "Same request with spoofed X-Forwarded-For: accepted",
        "Restricted endpoint behavior becomes reachable remotely",
        "Multiple API v3 routes appear affected by the same trust issue",
      ],
    },
  ],
  timeline: [
    ["Discovered", "May 15, 2026"],
    ["Validated", "May 25, 2026"],
    ["Reported", "May 25, 2026"],
    ["Redacted", "May 25, 2026"],
  ],
};

export default xForwardedForIpAllowlistBypass;