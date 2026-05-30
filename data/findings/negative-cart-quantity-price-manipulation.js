const negativeCartQuantityPriceManipulation = {
  slug: "negative-cart-quantity-price-manipulation",
  title: "Negative Cart Quantity Price Manipulation",
  summary:
    "The cart API accepted negative product quantities, persisted invalid line items server-side, and calculated a negative checkout total before order placement.",
  status: "Accepted",
  severity: "Medium",
  type: "Business Logic",
  tag: "Price Manipulation",
  program: "ikea.co.id",
  publicProgram: "Ikea Indonesia Bug Bounty",
  target: "Shopping Cart",
  reported: "May 25, 2026",
  listDate: "May 25, 2026",
  cvss: "6.8 (Medium)",
  category: "Business Logic Error",
  sections: [
    {
      title: "Summary",
      icon: "summary",
      body:
        "A normal authenticated user could bypass frontend quantity controls by sending direct cart API requests with negative quantities.",
    },
    {
      title: "Impact",
      icon: "shield",
      body:
        "A negative line item could offset legitimate positive cart items and produce an invalid negative checkout state.",
      list: [
        "Server-side persistence of negative quantities",
        "Unauthorized discount-like cart offset",
        "Negative checkout total before order placement",
        "Potential downstream order, inventory, or accounting inconsistencies",
      ],
      calloutTitle: "Testing boundary",
      callout:
        "No order was placed, payment was submitted, or external payment provider was contacted.",
    },
    {
      title: "What I Found",
      icon: "search",
      body:
        "The server accepted a cart with one legitimate positive item and one separate negative item. The payment step state preserved both line items and calculated a negative total.",
    },
    {
      title: "Proof of Concept (Redacted)",
      icon: "code",
      body:
        "The real store domain, product IDs, product names, and session cookies are redacted. The structure below demonstrates the validation issue without targeting the real system.",
      code:
        "POST https://shop.example.com/cart/add\nCookie: <owned-test-account-cookie>\nContent-Type: application/json\n\n[{\"id\":\"<positive_item>\",\"quantity\":1},{\"id\":\"<negative_item>\",\"quantity\":-1}]",
      result:
        "The server-side cart persisted both items and calculated a negative total in the checkout state.",
    },
  ],
  timeline: [
    ["Discovered", "May 25, 2026"],
    ["Validated", "May 25, 2026"],
    ["Reported", "May 25, 2026"],
    ["Redacted", "May 30, 2026"],
  ],
};

export default negativeCartQuantityPriceManipulation;
