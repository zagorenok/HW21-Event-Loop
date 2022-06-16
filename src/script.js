class Posts {
  constructor(url) {
    this.url = url;
    this.postTitle = document.querySelector(".post-title");
    this.postBody = document.querySelector(".post-body");
    this.postComments = document.querySelector(".post-comments");
  }

  async getPosts() {
    const response = await fetch(this.url);

    if (response.ok) {
      return response.json();
    } else {
      console.warn(response.status);
    }
  }

  async getPostComments(postId) {
    const response = await fetch(this.url + `/${postId}/comments`);

    if (response.ok) {
      return response.json();
    } else {
      console.warn(response.status);
    }
  }

  async render() {
    try {
      const posts = await this.getPosts();
      const postComments = await this.getPostComments(posts[0].id);

      this.postTitle.innerHTML = posts[0].title;
      this.postBody.innerHTML = posts[0].body;

      let commentItems = "<h3>Comments</h3>";

      for (let comment of postComments) {
        commentItems += `<div class="comment-item">${comment.name}</div>`;
      }

      this.postComments.innerHTML = commentItems;
    } catch (err) {
      console.warn(err);
    }
  }
}

class Comments {
  constructor(url) {
    this.url = url;
    this.Button = document.querySelector("#button");
    this.commentField = document.querySelector("#add-comments");

    this.Button.addEventListener("click", (e) => {
      console.log(e.target);
    });
  }
}

const posts = new Posts("https://jsonplaceholder.typicode.com/posts");
const comments = new Comments("https://jsonplaceholder.typicode.com/comments");

posts.render();

// результат выводим в следующей последовательности 1 5 3 4 2.

console.log(1);

setTimeout(() => console.log(2), 100);

setTimeout(() => console.log(3), 0);

new Promise(resolve => {
  setTimeout(() => resolve(), 0);
}).then(() => console.log(4));

console.log(5);
