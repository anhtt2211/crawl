import fetch from "node-fetch";
import axios from "axios";

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

const pages = [];

for (let i = 701; i <= 750; i++) {
  pages.push(i);
}

const buildArticle = (post) => {
  return {
    title: post.title,
    description: post.description,
    tagList: post.tags.map((tag) => tag.name),
    blocks: post.body.blocks?.map((block) => ({
      type: block.type,
      data: {
        alignment: block.data?.alignment,
        text: block.data?.text,
        caption: block.data?.caption,
        file: {
          url: block.data?.file?.url,
          info: {
            width: block.data?.file?.info?.width,
            height: block.data?.file?.info?.height,
          },
        },
      },
    })),
  };
};

const fetchPost = async (slug) => {
  return (await fetch(`https://spiderum.com/api/v1/post/${slug}`)).json();
};

const final = async () => {
  for (const number of pages) {
    const { posts } = await getPostsInFeed(number);
    const slugs = buildSlug(posts);

    const list = [];
    for (const slug of slugs) {
      const { post } = await fetchPost(slug);
      const article = buildArticle(post);
      list.push(article);
    }
    await axios.post(
      "http://localhost:8000/api/articles/seed",
      {
        articles: list,
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsInVzZXJuYW1lIjoiTmd1eWVuIFZhbiBBIDEiLCJlbWFpbCI6ImFiY2R5eHouMUB5b3BtYWlsLmNvbSIsImV4cCI6MTY3OTA4MDYwNC4zMTgsImlhdCI6MTY3Mzg5NjYwNH0.f-EJvwjGbvF-MMraP6kOa_JRU8sLH5Zn1bCwTvBU7Uw",
        },
      }
    );
  }
};

final();
