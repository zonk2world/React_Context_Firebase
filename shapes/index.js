import PropTypes from "prop-types";

const Translation = PropTypes.objectOf(PropTypes.string);
const Translations = PropTypes.objectOf(Translation);

const Tag = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  translations: Translations,
});

const Taxonomy = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  tags: PropTypes.arrayOf(Tag),
  translations: Translations
});

const MasterData = PropTypes.shape({
  productTypes: Taxonomy,
  industries: Taxonomy,
});

const Flags = PropTypes.objectOf(PropTypes.bool);

// collection
const VendorDataShape = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  logoUrl: PropTypes.string,
  domain: PropTypes.string,
  website: PropTypes.string,
  country: PropTypes.string,
  translations: Translations,
});

const ScreenshotShape = PropTypes.shape({
  imageUrl: PropTypes.string,
  thumbUrl: PropTypes.string,
  caption: PropTypes.string,
  translations: Translations,
});

// collection
const ServiceDataShape = PropTypes.shape({
  name: PropTypes.string,
  vendorRef: {
    id: PropTypes.string,
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  },
  productRef: {
    id: PropTypes.string,
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  },
  summary: PropTypes.string,
  website: PropTypes.string,
  industries: Flags,
  translations: Translations,
});

// collection
const ProductDataShape = PropTypes.shape({
  name: PropTypes.string,
  logoUrl: PropTypes.string,
  vendorRef: {
    id: PropTypes.string,
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  },
  summary: PropTypes.string,
  productTypes: Flags,
  industries: Flags,
  website: PropTypes.string,
  screenshots: PropTypes.arrayOf(ScreenshotShape)
});

// collection
const IntegrationDataShape = PropTypes.shape({
  productRefA: {
    id: PropTypes.string,
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  },
  productRefB: {
    id: PropTypes.string,
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  },
  name: PropTypes.string,
  summary: PropTypes.string,
});
