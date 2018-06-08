import 'babel-polyfill';
import Footer from '../src';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { overridingComponent } from '../src/example';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme()).should();

const links = {
  customer: [
    {
      title: 'Subscribe',
      href: 'http://www.economistgroupmedia.com',
    },
  ],
  economist: [
    {
      title: 'Advertise',
      href: 'products/subscribe',
    },
  ],
  social: [
    {
      title: 'Facebook',
      meta: 'facebook',
      href: 'https://www.economist.com',
      internal: false,
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
  ],
};

const quote = 'foo bar baz';
function renderFooter(renderData, renderQuote, renderChildren) {
  return shallow(
    <Footer
      data={renderData}
      quote={renderQuote}
      children={renderChildren}
    />
  );
}

describe('Footer', () => {
  it('renders a React element', () => {
    React.isValidElement(<Footer />).should.equal(true);
  });

  describe('Rendering:', () => {
    let rendered = null;
    let footer = null;
    beforeEach(() => {
      rendered = renderFooter(links, quote);
      footer = rendered.find('.ec-footer');
    });

    it('renders a top level footer.ec-footer', () => {
      footer.should.have.tagName('footer');
      footer.should.have.className('ec-footer');
    });

    it('renders with the supplied "customer" content', () => {
      footer.find('.ec-footer__list--subs .list').should.have.exactly(1).descendants('.list__item');
      footer.find('.ec-footer__list--subs .ec-footer__link').should.have.text('Subscribe');
    });

    it('renders with the supplied "economist" content', () => {
      footer.find('.ec-footer__list--economist .list').should.have.exactly(1).descendants('.list__item');
      footer.find('.ec-footer__list--economist .ec-footer__link').should.have.text('Advertise');
    });

    it('renders <Icon /> with the supplied "social" content', () => {
      footer.find('.ec-footer__list--social .ec-footer__link').should.have.html(
        /* eslint-disable max-len */
        '<a class="ec-footer__link ec-footer__link--external" href="https://www.economist.com" target="_blank"><svg role="img" class="Icon Icon-facebook" fill="#B6B6B6" width="48px" height="48px"><title>facebook icon</title><use xlink:href="/assets/icons.svg#facebook"></use></svg></a>'
        /* eslint-enable max-len */
      );
    });

    it('renders with the supplied "business" content', () => {
      footer.find('.ec-footer__list--footnote .list').should.have.exactly(2).descendants('.list__item');
      // console.log('HERE', footer.find('.ec-footer__list--footnote .ec-footer__link')[0]);
      footer.find('.ec-footer_list--footnote .ec-footer__link')
      .containsMatchingElement(
      <a className="ec-footer__link ec-footer--external" href="node/21013093">
        Terms of Use
      </a>);
      footer.find('.ec-footer__list--footnote .ec-footer__link')
      .containsMatchingElement(
      <button className="ec-footer__link ec-footer--external" href="node/21554326">
        Overriden Link
      </button>);
    });


    it('should render with i13n props if provided', () => {
      /* eslint-disable camelcase */
      /* eslint-disable id-match */
      const footerProps = shallow(
        <Footer
          data={links}
          quote={quote}
          i13n={{
            module: {
              id: 'economist-footer',
              type: 'footer',
              sub_type: 'external-links',
              placement: 'footer',
              name: 'mainsite-footer',
              items: [],
            },
            I13nLink: 'a',
            I13nFooter: 'footer',
          }}
        />
      ).getElement().props;
      const i13nModel = footerProps.i13nModel;
      i13nModel.should.contain.key('module');
      i13nModel.module.should.have.keys([ 'id', 'type', 'sub_type', 'placement', 'name', 'items' ]);
    });

    describe('Rendering without attributes:', () => {
      it('renders a top level footer.ec-footer', () => {
        rendered = renderFooter();
        rendered.should.have.tagName('footer');
        rendered.should.have.className('ec-footer');
        rendered.find('.ec-footer__menu').should.not.be.present();
      });

      it('does not render the menu without data', () => {
        rendered = renderFooter();
        rendered.find('.ec-footer__menu').should.not.be.present();
      });
    });

    describe('Rendering children:', () => {
      it('renders the children if there are any', () => {
        const children = <p className="children">children</p>;
        rendered = renderFooter(links, quote, children);
        rendered.find('.children').should.have.text('children');
      });

      it('doesnt render the container if it doesnt have children', () => {
        rendered = renderFooter();
        rendered.find('.ec-footer__children').should.not.be.present();
      });
    });

    // describe('Rendering with override link', () => {
    //   it('renders with external link if provided', () => {
    //     rendered = renderFooter();
    //     rendered.find();
    //   });
    // });
  });
});
