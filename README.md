# hyperterm-window
Window component for hyperterm

![hyperwindow](https://cloud.githubusercontent.com/assets/1074773/17676278/cb48b1da-62fb-11e6-9eba-16c87db8995c.gif)


## Example usage:

```js

const HyperWindow = require('hyperterm-window');

exports.decorateTerm = (Term, { React, notify }) => {

  return class extends React.Component {
    render () {
      const children = [React.createElement(Term, Object.assign({}, this.props, { key: 'term' }))];

      // Add a custom component to be displayed in the window
      const myComponent = ...;
        
      const windowProps = Object.assign({}, this.props, {key: 'window', onClose: this.props.clearChart});
      const hyperwindow = React.createElement(HyperWindow, windowProps, myComponent);
      children.push(hyperwindow);
      return React.createElement('div', {style: {width: '100%', height: '100%', position: 'relative'}}, children);
    }
  }
};

```
