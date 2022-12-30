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
const pages = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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
