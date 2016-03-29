import React from 'react';
import List from '@economist/component-list';
import Icon from '@economist/component-icon';
const iconSize = '38px';

export default class Footer extends React.Component {
  static get propTypes() {
    return {
      data: React.PropTypes.object,
      quote: React.PropTypes.string,
      quoteNoMobile: React.PropTypes.bool
    };
  }
  targetIfNeeded({ internal }) {
    if (internal === false) {
      return { target: '_blank' };
    }
    return {};
  }
  renderListContent(array, { useIcons = false, iconColor = '#B6B6B6' } = {}) {
    return array.map((item, index) => {
      let linkContents = item.title;
      if (useIcons) {
        linkContents = <Icon icon={item.meta} color={iconColor} size={iconSize} />;
      }
      const commonProps = {
        href: item.href,
        key: index,
      };
      if (item.internal === false) {
        return (
          <a
            className="ec-footer__link ec-footer__link--external"
            {...commonProps}
            target="_blank"
          >
            {linkContents}
          </a>
        );
      }
      return <a className="ec-footer__link" {...commonProps}>{linkContents}</a>;
    });
  }
  renderSocialListContent(array) {
    const allExceptMail = array.filter(({ meta }) => meta !== 'mail');
    return this.renderListContent(allExceptMail, { useIcons: true });
  }
  renderNewsletterLink(social) {
    const newsletter = social.filter(({ meta }) => meta === 'mail')[0] || null;
    if (!newsletter) {
      return [];
    }
    return (
      <a className="ec-footer__link ec-footer__subscribe-newsletter-link"
        href={newsletter.href} {...this.targetIfNeeded(newsletter)}
      >
        <Icon icon="mail"
          className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"
          size={iconSize}
        />
        {newsletter.title}
      </a>
    );
  }
  render() {
    let quote = null;
    if (this.props.quote) {
      const quoteParagraph = () => ({
        __html: this.props.quote, // eslint-disable-line
      });
      let quoteClassNames = [ 'ec-footer__quote' ];
      if (this.props.quoteNoMobile) {
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

    const context = this.props.data;
    const currentYear = new Date().getFullYear();
    return (
      <footer className="ec-footer">
        <div className="ec-footer__wrapper">
          <div className="ec-footer__menu">
            <div className="ec-footer__list ec-footer__list--subs">
              <List>
                {this.renderListContent(context.customer)}
              </List>
            </div>
            <div className="ec-footer__list ec-footer__list--social">
              <h4 className="ec-footer__header">Keep updated</h4>
              <List>
                {this.renderSocialListContent(context.social)}
              </List>
              {this.renderNewsletterLink(context.social)}
            </div>
            <div className="ec-footer__list ec-footer__list--economist">
              <List>
                {this.renderListContent(context.economist)}
              </List>
            </div>
          </div>
          {quote}
          <div className="ec-footer__footnote">
            <div className="ec-footer__list ec-footer__list--footnote">
              <List>
                {this.renderListContent(context.business)}
              </List>
            </div>
            <p className="ec-footer__copyright">
              Copyright © The Economist Newspaper Limited {currentYear}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
