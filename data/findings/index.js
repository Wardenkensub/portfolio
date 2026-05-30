import storedXssProfileBio from "./stored-xss-profile-bio";
import credentialedCorsAccountDataExposure from "./credentialed-cors-account-data-exposure";
import pendingInviteAccess from "./pending-invite-access";
import supportTicketAttachmentAccess from "./support-ticket-attachment-access";
import negativeCartQuantityPriceManipulation from "./negative-cart-quantity-price-manipulation";
import cloudinaryUnsignedUpload from "./cloudinary-unsigned-upload";
import googlePlacesProxyBillingAbuse from "./google-places-proxy-billing-abuse";
import parameterPollutionAndInformationDisclosure from "./parameter-pollution-and-information-disclosure";
import xForwardedForIpAllowlistBypass from "./x-forwarded-for-ip-allowlist-bypass";

export const findings = [
  storedXssProfileBio,
  credentialedCorsAccountDataExposure,
  supportTicketAttachmentAccess,
  pendingInviteAccess,
  negativeCartQuantityPriceManipulation,
  cloudinaryUnsignedUpload,
  googlePlacesProxyBillingAbuse,
  parameterPollutionAndInformationDisclosure,
  xForwardedForIpAllowlistBypass,
];

export function getFinding(slug) {
  return findings.find((finding) => finding.slug === slug);
}
