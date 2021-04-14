const Posts = require('../models/posts');
const Users = require('../models/users');
class PostsController{
        async getAllPosts(){
           return    Posts.find().populate('author');
        }
        async add(data){
            const user = await Users.findById('607448a68819323df008cbad');
            console.log(user)
            if(!user){
                //error user not found
            }
            const post = await new Posts({
                title: data.title,
                description: data.description,
                author: user._id
            }).save();
        }
}
module.exports = new PostsController();
