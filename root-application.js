/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import * as singleSpa from 'single-spa';
import 'zone.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

function showWhenAnyOf(routes) {
  return function (location) {
    return routes.some((route) => location.pathname === route);
  };
}

function showWhenPrefix(routes) {
  return function (location) {
    return routes.some((route) => location.pathname.startsWith(route));
  };
}

function showExcept(routes) {
  return function (location) {
    return routes.every((route) => location.pathname !== route);
  };
}

singleSpa.registerApplication(
  'login',
  () => import('single-spa-auth-app'),
  showWhenAnyOf(['/login']),
);

singleSpa.registerApplication(
  'layout',
  () => import('rh-uxd-layout'),
  showExcept(['/login']),
);

singleSpa.registerApplication(
  'react',
  () => import('rh-uxd-react-app'),
  showWhenPrefix(['/react']),
);

singleSpa.registerApplication(
  'react-two',
  () => import('rh-uxd-react-app-amq-example'),
  showWhenPrefix(['/react-two']),
);

// singleSpa.registerApplication(
//   'home',
//   () => import('single-spa-home-app'),
//   showWhenAnyOf(['/']),
// );

// singleSpa.registerApplication(
//   'angular',
//   () => import('single-spa-angular-app'),
//   showWhenPrefix(['/angular']),
// );

// singleSpa.registerApplication(
//   'vue',
//   () => import('single-spa-vue-app'),
//   showWhenPrefix(['/vue']),
// );


// singleSpa.registerApplication(
//   'integration',
//   () => import('rh-uxd-react-app'),
//   showWhenPrefix(['/integration']),
// );

// singleSpa.registerApplication(
//   'patternfly',
//   () => import('@patternfly/react-core'),
//   showWhenPrefix(['/patternfly']),
// );

singleSpa.start();
