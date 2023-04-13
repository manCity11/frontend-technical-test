module.exports = (content) => `if (module.hot) {module.hot.accept();module.hot.dispose(() => location.reload());} \n${content}`;
