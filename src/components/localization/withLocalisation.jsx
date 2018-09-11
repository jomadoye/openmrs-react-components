/* eslint-disable */
/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from "react-intl";
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...fr]);

let localeData = {};
export const setLocaleMessages = (args) => {
  localeData = args;
};

// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
if (!window.intl) {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/fr.js');
}

const withLocalisation = (WrappedComponent) => {
  class HOC extends React.PureComponent {
    render() {
      const language = this.props.locale;

      // Split locales with a region code ie en_GB becomes en
      const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

      // Try full locale, try locale without region code, fallback to 'en'
      const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;
      return (
        <IntlProvider
          locale={languageWithoutRegionCode}
          messages={messages}
        >
          <WrappedComponent {...this.props} />
        </IntlProvider>
      );
    }
  }

  HOC.propTypes = {
    locale: PropTypes.string.isRequired,
  };
  
  HOC.defaultProps = {
    locale: 'en_GB',
  };

  return HOC;
};

const mapStateToProps = (state) => {
  const { locale } = state.openmrs.session;
  return {
    locale,
  };
};

const composedHoc = compose(
  connect(mapStateToProps),
  withLocalisation
);

export default composedHoc;
