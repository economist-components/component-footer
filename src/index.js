/* eslint-disable id-match, camelcase */
import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import { renderListOfLinks } from './utils/helpers';
import EconomistLinks from './parts/economist-links';
import SocialLinks from './parts/social-links';
import CustomerLinks from './parts/customer-links';

export default function Footer({
  data = null, // eslint-disable-line
  quote = null,
  quoteNoMobile = false,
  LinkComponent,
  i13n,
  children,
}) {
  if (quote) {
    const quoteParagraph = () => ({
      __html: quote, // eslint-disable-line
    });
    let quoteClassNames = [ 'ec-footer__quote' ];
    if (quoteNoMobile) {
      quoteClassNames = quoteClassNames.concat([ 'ec-footer__quote--no-mobile' ]);
    }
    /* eslint-disable react/no-danger */
    quote = (
      <div className={quoteClassNames.join(' ')}>
        <p className="ec-footer__quote-paragraph" dangerouslySetInnerHTML={quoteParagraph()} />
      </div>
    );
    /* eslint-enable react/no-danger */
  }

  const listsOfLinks = data || {}; // eslint-disable-line
  const currentYear = new Date().getFullYear();
  // TopPart will be rendered only if some links or children are provided.
  const topPartLinks = [
    CustomerLinks(listsOfLinks.customer, {}, LinkComponent, i13n),
    SocialLinks(listsOfLinks.social, LinkComponent, i13n),
    children && <div className="ec-footer__children" key={'Children'}>{children}</div>,
    EconomistLinks(listsOfLinks.economist, {}, LinkComponent, i13n),
  ].filter((part) => part);
  const topPartHtml = topPartLinks.length > 0 ? <div className="ec-footer__menu">{topPartLinks}</div> : null;

  const content = (
    <div className="ec-footer__wrapper">
      {topPartHtml}
      {quote}
      <div className="ec-footer__footnote">
        <div className="ec-footer__list ec-footer__list--footnote">
          <ul className="list">{renderListOfLinks(listsOfLinks.business, {}, LinkComponent, i13n)}</ul>
        </div>
        <p className="ec-footer__copyright">
          Copyright © The Economist Newspaper Limited {currentYear}. All rights reserved.
        </p>
      </div>
    </div>
  );
  if (i13n) {
    const { I13nFooter } = i13n;
    return (
      <I13nFooter className="ec-footer" i13nModel={i13n}>{content}</I13nFooter>
    );
  }
  return (
    <footer className="ec-footer">{content}</footer>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Footer.propTypes = {
    data: PropTypes.shape({ // eslint-disable-line
      customer: PropTypes.arrayOf(PropTypes.object),
      economist: PropTypes.arrayOf(PropTypes.object),
      social: PropTypes.arrayOf(PropTypes.object),
      business: PropTypes.array,
    }),
    quote: PropTypes.string,
    quoteNoMobile: PropTypes.bool,
    i13n: PropTypes.shape({
      module: PropTypes.shape({
        id: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.object),
        name: PropTypes.string,
        placement: PropTypes.string,
        sub_type: PropTypes.string,
        type: PropTypes.string,
      }),
    }),
    LinkComponent: PropTypes.func,
    children: PropTypes.node,

  };
}
