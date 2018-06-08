import 'babel-polyfill';
import React from 'react';
import Footer from './';

export function overridingComponent(props) {
  function alertMe() {
    document.write('Test');
  }
  return (
    <button onClick={alertMe} {...props}>
      Overriden Link
    </button>
  );
}

const links = {
  customer: [
    {
      title: 'Subscribe',
      href: 'http://www.economistgroupmedia.com',
    },
    {
      title: 'Contact us',
      href: 'http://www.economist.com/rights/',
    },
    {
      title: 'Help',
      href: 'http://www.economist.com/rights/',
    },
    {
      title: 'Open Future',
      href: 'http://www.economist.com/openfuture/',
    },
  ],
  economist: [
    {
      title: 'Advertise',
      href: 'products/subscribe',
    },
    {
      title: 'Editorial Staff',
      href: 'node/21013093',
    },
    {
      title: 'Reprints',
      href: 'node/21017280',
    },
    {
      title: 'Site Map',
      href: 'node/21554326',
    },
    {
      title: 'Careers',
      href: 'node/21013080',
    },
  ],
  social: [
    {
      title: 'Facebook',
      meta: 'facebook',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'Twitter',
      meta: 'twitter',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'Google',
      meta: 'googleplus',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'Linkedin',
      meta: 'linkedin',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'Tumblr',
      meta: 'tumblr',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'Instagram',
      meta: 'instagram',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'Youtube',
      meta: 'youtube',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'rss',
      meta: 'rss',
      href: 'https://www.economist.com',
      internal: false,
    },
    {
      title: 'mail',
      meta: 'mail',
      href: 'https://www.economist.com',
      internal: true,
    },
  ],
  business: [
    {
      title: 'Terms of Use',
      href: 'node/21013093',
    },
    [
      {
        title: 'Privacy',
        href: 'node/21554326',
      },
      overridingComponent,
    ],
    {
      title: 'Cookies',
      href: 'http://www.economistgroup.com/results_and_governance/governance/privacy',
    },
    {
      title: 'Accessibility',
      href: 'http://www.economistgroup.com/results_and_governance/governance/privacy',
    },
  ],
};
const quote = 'Published since September 1843 to take part in <br/><em>“a severe ' +
  'contest between intelligence, which presses forward,<br/>and an unworthy, timid ' +
  'ignorance obstructing our progress.”</em>';
export default (
  <Footer data={links} quote={quote} />
);
