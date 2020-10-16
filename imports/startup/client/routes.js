// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    FlowRouter.go("/home");
    /* BlazeLayout.render('App_body', {main: 'App_home'}); */
  },
});

FlowRouter.route('/:endpoint', {
  action() {
    BlazeLayout.render('App_body', {main: 'App_home'});
  },
});



FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', {main: 'App_notFound'});
  },
};
