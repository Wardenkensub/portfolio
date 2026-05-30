const cloudinaryUnsignedUpload = {
  slug: "cloudinary-unsigned-upload",
  title: "Unauthenticated Uploads via Public Unsigned Cloudinary Presets",
  summary:
    "Public JavaScript exposed Cloudinary configuration and unsigned upload presets, allowing unauthenticated image uploads into the application's Cloudinary account.",
  status: "Accepted",
  severity: "Medium",
  type: "Cloud Security",
  tag: "Unsigned Upload",
  program: "plisio.net",
  publicProgram: "Plisio Bug Bounty",
  target: "Cloudinary Uploads",
  reported: "May 13, 2026",
  listDate: "May 24, 2026",
  cvss: "6.8 (Medium)",
  category: "Insecure Cloud Storage Configuration",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "The application exposed valid unsigned upload presets. An unauthenticated requester could upload allowed image files and receive public asset URLs.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "The issue enables storage and bandwidth abuse, asset folder pollution, and potential misuse if uploaded assets can be referenced in user-facing flows.",
      list: [
        "Unauthenticated image upload",
        "Public asset URL generation",
        "Storage and bandwidth consumption",
        "Potential abuse of brand-controlled asset hosting",
      ],
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "Multiple exposed unsigned presets accepted a tiny benign PNG without a session or API key. SVG upload was rejected, reducing script execution risk.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "The real cloud name, presets, and returned public IDs are redacted. This example is intentionally generic.",
      code:
        "POST https://api.cloudinary.com/v1_1/<redacted_cloud>/image/upload\nFormData:\n  upload_preset=<redacted_unsigned_preset>\n  file=@poc-1x1.png",
      result:
        "The upload returned a public asset URL for a benign 1x1 PNG.",
    },
  ],
  timeline: [
    ["Discovered", "May 13, 2026"],
    ["Validated", "May 16, 2026"],
    ["Reported", "May 19, 2026"],
    ["Redacted", "May 22, 2026"],
  ],
};

export default cloudinaryUnsignedUpload;
