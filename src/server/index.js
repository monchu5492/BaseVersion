import React from 'react';
import ignoreStyles from 'ignore-styles';  // NEED THIS!!! hook to ignore style imports when running in Node
import app from './app';

global.React = React;

app.set('port', process.env.PORT || 3000)
  .listen(
    app.get('port'),
    () => console.log(`WildAlmonds running at 'http://localhost:${app.get('port')}'`),
  );

