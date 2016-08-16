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

## props

* `width` - the width of the window in pixels. optional.
* `height` - the height of the window in pixels. optional.
* `onClose` - function to call when the user clicks the close button
* `foregroundColor`, `backgroundColor` - these should be the colors specified in the user's `.hyperterm.js`, used to make the window integrate well into the terminal. If you just pass all of `this.props` from a terminal decorator these will get set automatically (see example above).
