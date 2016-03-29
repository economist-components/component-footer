import React from 'react';
import context from './context';
import Footer from './index';

const quote = `Published since September 1843 to take part in <br/><em>“a severe contest between intelligence, which presses forward,<br/>and an unworthy, timid ignorance obstructing our progress.”</em>`;

export default (
  <Footer data={context} quote={quote} />
);
