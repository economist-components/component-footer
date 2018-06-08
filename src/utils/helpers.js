/* eslint-disable id-match, camelcase */

import React from 'react';
import Icon from '@economist/component-icon';
import slugger from 'slugger';

const iconSize = '48px';
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

export function createI13nProps(link, i13n, options) {
  return i13n ?
    { i13nModel: createI13nModel(link, i13n, options) } :
    {};
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
  return (
    Array.isArray(listOfLinks) &&
    listOfLinks.map((link, index) => {
      let LinkRenderingComponent = LinkComponent;
      if (Array.isArray(link)) {
        // Overide a specific LinkComponent.
        LinkRenderingComponent = link[1];
        // Use the first argument as original link information
        link = link[0];
      }
      let linkContents = link.title;
      if (useIcons) {
        linkContents = <Icon icon={link.meta} color={iconColor} size={iconSize} />;
      }
      const Link = createLinkTag(LinkRenderingComponent, i13n);
      const i13nProps = createI13nProps(link, i13n, { position: `${ i13nPosition }.${ index + 1 }` });
      if (link.internal === false) {
        return (
          <li className="list__item" key={index}>
            <Link
              className="ec-footer__link ec-footer__link--external"
              href={link.href}
              target="_blank"
              {...i13nProps}
            >
              {linkContents}
            </Link>
          </li>
        );
      }
      return (
        <li className="list__item" key={index}>
          <Link
            className="ec-footer__link ec-footer--external"
            href={link.href}
            key={index}
            {...i13nProps}
          >
            {linkContents}
          </Link>
        </li>
      );
    })
  );
}

export function targetIfNeeded({ internal }) {
  if (internal === false) {
    return { target: '_blank' };
  }
  return {};
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
  const i13nProps = createI13nProps(newsletter, i13n, { position: i13nPosition });
  return (
    <Link
      className="ec-footer__link ec-footer__subscribe-newsletter-link"
      href={newsletter.href} {...targetIfNeeded(newsletter)}
      {...i13nProps}
    >
      <Icon icon="mail"
        className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"
        size={iconSize}
      />
      {newsletter.title}
    </Link>
  );
}
