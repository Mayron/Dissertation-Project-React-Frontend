exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages only on the client.
  if (page.path.match(/^\/g/)) {
    page.matchPath = "/g/*";
    createPage(page);
  }

  if (page.path.match(/^\/p/)) {
    page.matchPath = "/p/*";
    createPage(page);
  }

  if (page.path.match(/^\/u/)) {
    page.matchPath = "/u/*";
    createPage(page);
  }
};
