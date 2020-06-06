exports.createPages = ({ page, actions }) => {
  const { createPage } = actions;

  // Use an API here to get pages
  // TODO: Or, can I look up the API when we don't know the page?

  //   const groups = ["mayronui-gen6"];

  //   groups.forEach((group) => {

  //   });

  //   createPage({
  //     matchPath: /^\/g/,
  //     component: require.resolve(`./src/templates/group.tsx`),

  //     // Data passed to context is available as a component property called "pageContext".
  //     context: {
  //       title: pag,
  //     },
  //   });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages only on the client.
  if (page.path.match(/^\/g/)) {
    page.matchPath = "/g/*";

    // Update the page.
    createPage(page);
  }
};
