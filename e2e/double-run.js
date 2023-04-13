export const viewports = {
  desktop: [1920, 1080],
  mobile: [360, 640],
};

export default (test) => {
  // ignoring react-measure observable error because not relevant https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
  Cypress.on('uncaught:exception', (error) => {
    if (error.message.includes('ResizeObserver loop limit exceeded')) {
      return false;
    }
  });

  const runViewPorts = {
    desktop: viewports.desktop,
    mobile: viewports.mobile,
  };

  _.each(runViewPorts, (value, key) => {
    test(value, key);
  });
};
