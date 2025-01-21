async function fetchBlogPosts() {
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
                                        coverImage {
                                            url
                                        }
                                        slug
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
        const response = await fetch('https://gql.hashnode.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.data?.user?.publications?.edges?.[0]?.node?.posts?.edges) {
            const posts = data.data.user.publications.edges[0].node.posts.edges
                .map(edge => ({
                    ...edge.node,
                    coverImage: edge.node.coverImage?.url,
                    dateAdded: edge.node.publishedAt
                }));
            console.log('Fetched blog posts:', posts);
            displayBlogPosts(posts);
        } else {
            console.error('No posts found in response:', data);
            displayErrorMessage();
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        displayErrorMessage();
    }
}

function displayBlogPosts(posts) {
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.innerHTML = ''; // Clear existing content
    
    if (!posts || posts.length === 0) {
        displayErrorMessage();
        return;
    }

    posts.forEach(post => {
        const date = new Date(post.dateAdded).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const postHTML = `
            <div class="blog-post">
                <img src="${post.coverImage || './assets/images/default-blog.jpg'}" 
                     alt="${post.title}" 
                     loading="lazy"
                     onerror="this.src='./assets/images/default-blog.jpg'">
                <h3>
                    <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                        ${post.title} <i class="ph ph-arrow-up-right"></i>
                    </a>
                </h3>
                <p>${post.brief || 'Click to read the full article...'}</p>
                <span class="date">${date}</span>
            </div>
        `;

        blogGrid.innerHTML += postHTML;
    });
}

function displayErrorMessage() {
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.innerHTML = `
        <div class="blog-error">
            <p>Unable to load blog posts at the moment. Please visit my blog directly:</p>
            <a href="https://selftaughtdev.hashnode.dev" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="cta-button">
                Visit Blog <i class="ph ph-arrow-right"></i>
            </a>
        </div>
    `;
}

// Load blog posts when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogPosts); 