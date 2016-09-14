# DraftJS Mention Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

This plugin allows you to add mentions to your editor!

Usage:

```js
import createMentionPlugin from 'draft-js-mention-plugin';

const mentionPlugin = createMentionPlugin({ mentions });
```

## Importing the default styles

The plugin ships with a default styling available at this location in the installed package:
`node_modules/draft-js-mention-plugin/lib/plugin.css`.

### Webpack Usage
Follow the steps below to import the css file by using Webpack's `style-loader` and `css-loader`.

1. Install Webpack loaders: `npm install style-loader css-loader --save-dev`
2. Add the below section to Webpack config (if your Webpack already has loaders array, simply add the below loader object(`{test:foo, loaders:bar[]}`) as an item in the array).

    ```js
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          'style', 'css'
        ]
      }]
    }
    ```

3. Add the below import line to your component to tell Webpack to inject style to your component.

    ```js
    import 'draft-js-mention-plugin/lib/plugin.css';
    ```
4. Restart Webpack.

### Browserify Usage

TODO: PR welcome


### Changes made on 09.14.2016

- Downgraded base version of `draft-js-mention-plugin` to `1.1.2` due to the buginess of beta versions `2.0.0` (currently they're on beta 4)
- Made change to mention plugin to fix selecting a mention from the `MentionSuggestions` list in iOS Safari:

```
  draft-js-mention-plugin/src/MentionSuggestions/Entry/index.js

  // Added getUserAgent context type to target mobile for event handlers when
  // selecting mention from list
  static contextTypes = {
    getUserAgent: PropTypes.func
  };

  // Created onTouchStart handler for mobile to trigger selecting mention from list
  // onMouseDown and onMouseUp not being triggered in mobile Safari
  onTouchStart = (event) => {
    // Without this, any links/buttons/actions/etc. that may be directly underneath the mention element
    // you are tapping on will trigger and execute.
    event.preventDefault();

    this.props.onMentionSelect(this.props.mention);
  };

  // If mobile device, use onTouchStart to trigger mention select
  // Otherwise, use original onMouseDown/onMouseUp/onMouseEnter
  let selectMentionHandlers;

  if (this.context.getUserAgent().isMobile) {
    selectMentionHandlers = {
      onTouchStart: this.onTouchStart
    };
  } else {
    selectMentionHandlers = {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseEnter: this.onMouseEnter
    };
  }

  return (
    <div
      className={className}
      {...selectMentionHandlers}
      role="option"
    >
      <Avatar mention={this.props.mention} theme={theme} />
      <span className={theme.mentionSuggestionsEntryText}>{this.props.mention.get('name')}</span>
    </div>
  );
```
