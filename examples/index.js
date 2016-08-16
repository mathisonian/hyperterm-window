
exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WINDOW':
      return state.set('showWindow', !state.showWindow);
  }
  return state;
};

exports.mapTermsState = (state, map) => {
  return Object.assign(map, {
    showWindow: state.ui.showWindow
  });
};

exports.getTermProps = (uid, parentProps, props) => {
  return Object.assign(props, {
    showWindow: parentProps.showWindow
  });
};

exports.middleware = (store) => (next) => (action) => {
  if (!action) {
    return;
  }
  if (action.type === 'SESSION_ADD_DATA') {
    const { data } = action;
    if (/(toggle-window: command not found)|(command not found: toggle-window)/.test(data)) {
      store.dispatch({
        type: 'TOGGLE_WINDOW'
      });
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};

exports.decorateTerm = (Term, { React, notify }) => {

  // Hack to fix the react import
  try {
    require('react');
  } catch(e) {
    var Module = require('module');
    var originalRequire = Module.prototype.require;
    Module.prototype.require = function (path) {
      if (path === 'react') {
        return React;
      }
      return originalRequire.apply(this, arguments);
    };
  }

  const Chart = require('./components/chart')(React);
  const Window = require('hyperterm-window');

  return class extends React.Component {
    render () {
      const children = [React.createElement(Term, Object.assign({}, this.props, { key: 'term' }))];

      if (this.props.showWindow) {
        // Add a custom component to be displayed in the window
        const myComponent = ...;

        const windowProps = Object.assign({}, this.props, {key: 'window', onClose: this.props.clearChart});
        const hyperwindow = React.createElement(HyperWindow, windowProps, myComponent);
        children.push(hyperwindow);
      }

      return React.createElement('div', {style: {width: '100%', height: '100%', position: 'relative'}}, children);
    }
  }
};
