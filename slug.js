import fetch from "node-fetch";

const getPostsInFeed = async (page) => {
  return (
    await fetch(
      `https://spiderum.com/api/v1/feed/getPostsInFeed?type=hot&page=${page}`
    )
  ).json();
};
const buildSlug = (post) => {
  const { items } = post;
  const slugList = [];

  items.forEach((item) => {
    slugList.push(item.slug);
  });

  return slugList;
};
const pages = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const final = async () => {
  let slugList = [];

  for (const number of pages) {
    const { posts } = await getPostsInFeed(number);
    const slugs = buildSlug(posts);
    slugList = slugList.concat(slugs);
  }

  return slugList;
};
final();
