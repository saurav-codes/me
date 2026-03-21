let blogFetchStarted = false;

async function fetchBlogPosts() {
    if (blogFetchStarted) {
        return;
    }

    blogFetchStarted = true;

    const query = `
        query GetUserArticles {
            user(username: "selftaughtdev") {
                publications(first: 1) {
                    edges {
                        node {
                            posts(first: 6) {
                                edges {
                                    node {
                                        title
                                        brief
                                        publishedAt
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch("https://gql.hashnode.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const posts = data.data?.user?.publications?.edges?.[0]?.node?.posts?.edges?.map(
            (edge) => edge.node,
        );

        if (!posts || posts.length === 0) {
            displayErrorMessage();
            return;
        }

        displayBlogPosts(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        displayErrorMessage();
    }
}

function displayBlogPosts(posts) {
    const blogList = document.querySelector(".blog-list");
    if (!blogList) {
        return;
    }

    blogList.innerHTML = "";

    posts.forEach((post) => {
        const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        const row = document.createElement("a");
        row.className = "blog-entry";
        row.href = post.url;
        row.target = "_blank";
        row.rel = "noopener noreferrer";
        row.innerHTML = `
            <div class="blog-entry-copy">
                <h3 class="blog-entry-title">${post.title}</h3>
                <p>${post.brief || "Read the full article on my blog."}</p>
            </div>
            <span class="blog-entry-date">${date}</span>
            <span class="blog-entry-arrow" aria-hidden="true">↗</span>
        `;
        blogList.appendChild(row);
    });
}

function displayErrorMessage() {
    const blogList = document.querySelector(".blog-list");
    if (!blogList) {
        return;
    }

    blogList.innerHTML = `
        <a class="blog-error" href="https://blog.sorv.dev/" target="_blank" rel="noopener noreferrer">
            <div class="blog-entry-copy">
                <h3 class="blog-entry-title">Visit the blog directly</h3>
                <p>Unable to load posts right now, but the writing is still available on blog.sorv.dev.</p>
            </div>
            <span class="blog-entry-date">Open</span>
        </a>
    `;
}

function initBlogLoading() {
    const blogSection = document.getElementById("blog");
    const blogList = document.querySelector(".blog-list");
    const triggerNode = blogSection || blogList;

    if (!triggerNode) {
        return;
    }

    const startFetch = () => {
        fetchBlogPosts();
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    startFetch();
                }
            });
        }, {
            rootMargin: "280px 0px",
            threshold: 0.01,
        });

        observer.observe(triggerNode);
    }

    if ("requestIdleCallback" in window) {
        requestIdleCallback(startFetch, { timeout: 4000 });
    } else {
        window.setTimeout(startFetch, 4000);
    }
}

document.addEventListener("DOMContentLoaded", initBlogLoading);
