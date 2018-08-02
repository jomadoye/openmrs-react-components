import HEADER_TYPES from "./types";

const getHeaderLogoLinks = () => ( {
  type: HEADER_TYPES.LOGO_LINKS.REQUESTED
} );

const getHeaderLogoLinksSucceeded = (links) => ( {
  type: HEADER_TYPES.LOGO_LINKS.SUCCEEDED,
  links
} );

const getHeaderLogoLinksFailed = (message) => ( {
  type: HEADER_TYPES.LOGO_LINKS.FAILED,
  error: {
    message: message
  }
} );

export default {
  getHeaderLogoLinks,
  getHeaderLogoLinksSucceeded,
  getHeaderLogoLinksFailed
};
