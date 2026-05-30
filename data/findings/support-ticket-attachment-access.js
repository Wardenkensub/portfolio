const supportTicketAttachmentAccess = {
  slug: "support-ticket-attachment-access",
  title: "Unauthenticated Access to Support Ticket Attachments",
  summary:
    "Support ticket attachments uploaded by an authenticated user were retrievable through a direct file endpoint without an Authorization header.",
  status: "Accepted",
  severity: "Medium",
  type: "API Security",
  tag: "File Access",
  program: "chicksx.com",
  publicProgram: "chicksx Bug Bounty",
  target: "Support API",
  reported: "May 27, 2026",
  listDate: "May 27, 2026",
  cvss: "6.5 (Medium)",
  category: "Missing Authorization",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "The upload endpoint required authentication, but the resulting attachment could be fetched directly without any session or Authorization header.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "Support attachments may contain sensitive user-provided evidence, including account, payment, order, identity, or dispute information.",
      list: [
        "Public retrieval of support ticket attachments by file hash",
        "Sensitive support evidence exposure if URLs leak",
        "Authentication required for upload but not for retrieval",
        "Cross-account ticket access controls did not protect direct file access",
      ],
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "A researcher-owned support ticket attachment was uploaded successfully, then retrieved from the file-serving endpoint with no cookies and no Authorization header.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "The real host, ticket ID, and file hash are redacted. This example is not usable against the target.",
      code:
        "GET https://api.example.com/Image/support-ticket-attachments/<redacted-file-hash>/\nAuthorization: <none>",
      result:
        "The unauthenticated response returned an image content type and file bytes for the owned test attachment.",
    },
  ],
  timeline: [
    ["Discovered", "May 27, 2026"],
    ["Validated", "May 27, 2026"],
    ["Reported", "May 28, 2026"],
    ["Redacted", "May 28, 2026"],
  ],
};

export default supportTicketAttachmentAccess;
