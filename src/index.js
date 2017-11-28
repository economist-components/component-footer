/* eslint-disable id-match */
/* eslint-disable camelcase */
import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@economist/component-icon';
import slugger from 'slugger';
import NewsletterSubscription from './signup-letter-form';
const iconSize = '48px';
export function targetIfNeeded({ internal }) {
  if (internal === false) {
    return { target: '_blank' };
  }
  return {};
}

function createI13nModel({ title, href }, i13n, { position }) {
  return ({
    tedl: {
      id: `${ slugger(title) }_footer-link`,
      module_id: i13n ? i13n.module.id : null,
      position,
      type: 'link',
      attributes: {
        name: title,
        destination: href,
      },
    },
  });
}

function createLinkTag(LinkComponent, i13n) {
  let Link = LinkComponent ? LinkComponent : 'a';
  if (i13n) {
    Link = i13n.I13nLink;
  }
  return Link;
}

let i13nIndex = 1;
function * getPosition() {
  while (i13nIndex) {
    yield i13nIndex++;
  }
}

const position = getPosition();
export function renderListOfLinks(listOfLinks, {
  useIcons = false,
  iconColor = '#B6B6B6',
} = {}, LinkComponent, i13n) {
  const i13nPosition = i13n ? position.next().value : null;
  return listOfLinks.map((link, index) => {
    let linkContents = link.title;
    if (useIcons) {
      linkContents = <Icon icon={link.meta} color={iconColor} size={iconSize} />;
    }
    const Link = createLinkTag(LinkComponent, i13n);
    if (link.internal === false) {
      return (
        <li className="list__item" key={index}>
          <Link
            className="ec-footer__link ec-footer__link--external"
            href={link.href}
            target="_blank"
            i13nModel={i13n ? createI13nModel(link, i13n, { position: `${ i13nPosition }.${ index + 1 }` }) : null}
          >
            {linkContents}
          </Link>
        </li>
      );
    }
    return (
      <li className="list__item" key={index}>
        <Link
          className="ec-footer__link"
          href={link.href}
          key={index}
          i13nModel={i13n ? createI13nModel(link, i13n, { position: `${ i13nPosition }.${ index + 1 }` }) : null}
        >
          {linkContents}
        </Link>
      </li>
    );
  });
}

export function renderSocialListContent(listOfLinks, LinkComponent, i13n) {
  const allExceptMail = listOfLinks.filter(({ meta }) => meta !== 'mail');
  return renderListOfLinks(allExceptMail, { useIcons: true }, LinkComponent, i13n);
}

export function renderNewsletterLink(social, LinkComponent, i13n) {
  const newsletter = social.filter(({ meta }) => meta === 'mail')[0] || null;
  if (!newsletter) {
    return [];
  }
  const Link = createLinkTag(LinkComponent, i13n);
  const i13nPosition = position.next().value;
  return (
    <Link
      className="ec-footer__link ec-footer__subscribe-newsletter-link"
      href={newsletter.href} {...targetIfNeeded(newsletter)}
      i13nModel={i13n ? createI13nModel(newsletter, i13n, { position: i13nPosition }) : null}
    >
      <Icon icon="mail"
        className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"
        size={iconSize}
      />
      {newsletter.title}
    </Link>
  );
}

export default function Footer({
  data = null, // eslint-disable-line
  quote = null,
  quoteNoMobile = false,
  LinkComponent,
  i13n,
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
        <p
          className="ec-footer__quote-paragraph"
          dangerouslySetInnerHTML={quoteParagraph()}
        />
      </div>
    );
    /* eslint-enable react/no-danger */
  }
  // controlling variable for showing content
  const enableSignup = true;

  const listsOfLinks = data; // eslint-disable-line
  const currentYear = new Date().getFullYear();
  const content = (
    <div className="ec-footer__wrapper">
      <div className="ec-footer__menu">
        <div className="ec-footer__list ec-footer__list--subs">
          <ul className="list">
            {renderListOfLinks(listsOfLinks.customer, {}, LinkComponent, i13n)}
          </ul>
        </div>
        <div className="ec-footer__list ec-footer__list--social">
          <h4 className="ec-footer__header">Keep updated</h4>
          <ul className="list">
            {renderSocialListContent(listsOfLinks.social, LinkComponent, i13n)}
          </ul>
          {renderNewsletterLink(listsOfLinks.social, LinkComponent, i13n)}
        </div>
        {
          enableSignup && <NewsletterSubscription />
        }
        <div className="ec-footer__list ec-footer__list--economist">
          <ul className="list">
            {renderListOfLinks(listsOfLinks.economist, {}, LinkComponent, i13n)}
          </ul>
        </div>
      </div>
      {quote}
      <div className="ec-footer__footnote">
        <div className="ec-footer__list ec-footer__list--footnote">
          <ul className="list">
            {renderListOfLinks(listsOfLinks.business, {}, LinkComponent, i13n)}
          </ul>
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
      business: PropTypes.arrayOf(PropTypes.object),
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
  };
}
