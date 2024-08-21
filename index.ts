import axios from 'axios';
interface User {
    id: number;
    name: string;
}
interface Post {
    id: number;
    userId: number;
    title: string;
}
interface Comment {
    id: number;
    postId: number;
    body: string;
}
// Fetch user data
function fetchUser(userId: number): Promise<User> {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.data);
}
// console.log(fetchUser(1))
// Fetch posts of a user
function fetchPosts(userId: number): Promise<Post[]> {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.data);
}
// Fetch comments for a post
function fetchComments(postId: number): Promise<Comment[]> {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.data);
}
async function main(uid: number) {
    try {
        const user = await fetchUser(uid);
        console.log(`User: ${user.name}`);
        const posts = await fetchPosts(user.id);
        console.log(`Posts: ${posts.map(post => post.title.toUpperCase()).join(',\n \n ')}`);
        const commentsArray = await Promise.all(posts.map(post => fetchComments(post.id)));
        commentsArray.forEach((comments, index) => {
            console.log(`(**********Comments for post ${index + 1}***********\n \n \n): ${comments.map(comment => comment.body).join(', \n ')}`);
        });
    } catch (error:any) {
        console.error('An error occurred:', error);
    }
}
main(1);
// Chain the promises
// fetchUser(3)
//     .then(user => {
        // console.log(`***User****: ${user.name.toUpperCase()} \n`);
//         return fetchPosts(user.id);
//     })
//     .then(posts => {
        // console.log(`****Posts***: ${posts.map(post => post.title.toUpperCase()).join('\n ')}`);
//         return Promise.all(posts.map(post => fetchComments(post.id)));
//     })
//     .then(commentsArray => {
//         commentsArray.forEach((comments, index) => {
//             console.log(`*****Comments for post**** (${index + 1})****** \n: ${comments.map(comment => comment.body).join('**** \n ')}`);
//         });
//     })
//     .catch(error => {
//         console.error('An error occurred:', error);
//     });



// const commentsArray = await Promise.all(posts.map(async (post) => {
//     try {
//         return await fetchComments(post.id);
//     } catch (error) {
//         console.error(`Error fetching comments for post ${post.id}:`, error);
//         return [];
//     }
// }));