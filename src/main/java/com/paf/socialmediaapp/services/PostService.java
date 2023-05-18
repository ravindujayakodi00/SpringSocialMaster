package com.paf.socialmediaapp.services;

import com.paf.socialmediaapp.models.Post;
import java.util.List;

public interface PostService {

    Post createPost(Post post);

    public List<Post> getAllPosts();

    public Post getPostById(String postId);

    public Post updatePost(Post post);
    
    public boolean deletePostById(String postId);

    //    public List<Post> getAllPostsByUserId(String userId);


}