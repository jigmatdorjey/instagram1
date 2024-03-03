document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.instagram.com/jigm__dor___/?__a=1')
        .then(response => response.json())
        .then(data => {
            const posts = data.graphql.user.edge_owner_to_timeline_media.edges;
            const instagramPosts = document.getElementById('instagram-posts');

            posts.forEach(post => {
                const postNode = document.createElement('div');
                postNode.classList.add('instagram-post');

                if (post.node.__typename === 'GraphVideo') {
                    const videoNode = document.createElement('video');
                    videoNode.src = post.node.video_url;
                    videoNode.controls = true;
                    postNode.appendChild(videoNode);
                } else if (post.node.__typename === 'GraphImage') {
                    const imageNode = document.createElement('img');
                    imageNode.src = post.node.display_url;
                    postNode.appendChild(imageNode);
                }

                instagramPosts.appendChild(postNode);
            });
        })
        .catch(error => {
            console.error('Error fetching Instagram posts:', error);
        });
});
