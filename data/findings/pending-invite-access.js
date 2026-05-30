const pendingInviteAccess = {
  slug: "pending-invite-access",
  title: "Pending Invited Members Receive App Access Before Accepting",
  summary:
    "An invited user received access to organization app metadata while the invitation was still pending and before they accepted the invite.",
  status: "Accepted",
  severity: "Medium",
  type: "Authorization",
  tag: "Access Control",
  program: "pubnub.com",
  publicProgram: "pubnub Bug Bounty",
  target: "Team Invitation Flow",
  reported: "May 15, 2026",
  listDate: "May 15, 2026",
  cvss: "5.4 (Medium)",
  category: "Improper Authorization",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "When one controlled account invited another controlled account as a viewer, the role remained pending but the invited account immediately gained API access to the shared app.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "A mistyped or unintended invite could grant app metadata access to an existing account before the recipient accepts the invitation.",
      list: [
        "Premature role-derived access",
        "App metadata exposure",
        "Nested keyset metadata exposure",
        "Access removed only after the still-pending role was revoked",
      ],
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "Before the invite, the invited account was denied access. After the pending invite was created, the same account could retrieve app data. After revocation, access returned to denied.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "The PoC uses generic IDs and redacted account names. It does not expose the real target app or keyset values.",
      code:
        "GET /api/apps/<redacted_app_id>  -> 403 before invite\nPOST /api/invitations        -> pending role created\nGET /api/apps/<redacted_app_id>  -> 200 before acceptance\nDELETE /api/roles/<redacted>     -> revoke pending role\nGET /api/apps/<redacted_app_id>  -> 403 after revoke",
      result:
        "Access was created by the pending invitation state itself, not by a prior relationship between the accounts.",
    },
  ],
  timeline: [
    ["Discovered", "May 15, 2026"],
    ["Validated", "May 18, 2026"],
    ["Reported", "Ongoing"],
    ["Redacted", "Ongoing"],
  ],
};

export default pendingInviteAccess;
