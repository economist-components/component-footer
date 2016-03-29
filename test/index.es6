import Footer from '../index.es6';
import React from 'react/addons';
import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();

describe(`A Footer`, () => {
  describe(`it's a React component`, () => {
    it('is compatible with React.Component', () => {
      Footer.should.be.a('function').and.respondTo('render');
    });
    it('renders a React element', () => {
      React.isValidElement(<Footer/>).should.equal(true);
    });
  });
  describe('Renders children as commanded', () => {
    const basicData = Object.freeze({
      customer: Object.freeze([]),
      economist: Object.freeze([]),
      social: Object.freeze([]),
      business: Object.freeze([]),
    });
    let footer = null;
    beforeEach(() => {
      footer = new Footer({ data: basicData });
    });
    it('Calls its renderListContent and renderSocialListContent with the correct parameters', () => {
      chai.spy.on(footer, 'renderListContent');
      chai.spy.on(footer, 'renderSocialListContent');

      footer.render();

      footer.renderListContent.should.have.been.called();
      footer.renderSocialListContent.should.have.been.called.exactly(1);

      footer.renderListContent.should.have.been.called.with(basicData.customer);
      footer.renderListContent.should.have.been.called.with(basicData.economist);
      footer.renderListContent.should.have.been.called.with(basicData.business);
      footer.renderSocialListContent.should.have.been.called.with(basicData.social);
    });
    describe('renderSocialListContent', () => {
      it('Removes any item with the mail attribute and calls renderListContent with useIcons:true', () => {
        chai.spy.on(footer, 'renderListContent');
        const socialLinks = footer.renderSocialListContent([
          {
            href: 'http://example.com/1',
            title: '1',
            meta: 'twitter',
          },
          {
            href: 'http://example.com/2',
            title: '2',
            meta: 'mail',
          },
          {
            href: 'http://example.com/3',
            title: 2,
            meta: 'close',
          },
        ]);
        footer.renderListContent.should.have.been.called.with({ useIcons: true });

        socialLinks.length.should.equal(2);
      });
    });

    describe('renderListContent', () => {
      const exampleLinks = [
        {
          href: 'http://example.com/6',
          title: '6',
          meta: 'facebook',
        },
      ];
      it('Returns an array of <a> tags', () => {
        const links = footer.renderListContent(exampleLinks);
        links.should.have.length(1);
        links[0].props.href.should.equal('http://example.com/6');
        links[0].props.children.should.equal('6');
      });

      it('When {useIcons: true}, render icons instead of just the title text.', () => {
        const links = footer.renderListContent(exampleLinks, { useIcons: true, iconColor: '#FF0000' });
        const icon = links[0].props.children;
        icon.props.should.have.property('icon').equal('facebook');
        icon.props.should.have.property('color').equal('#FF0000');
      });

      it('Adds target="_blank" to non-internal links', () => {
        const links = footer.renderListContent([
          {
            href: 'http://example.com/6',
            title: '6',
            meta: 'facebook',
            internal: false,
          }, {
            href: 'http://example.com/6',
            title: '6',
            meta: 'facebook',
            internal: true,
          },
        ]);
        links[0].props.target.should.equal('_blank');
        links[1].props.should.not.have.property('target');
      });
    });
  });
});
