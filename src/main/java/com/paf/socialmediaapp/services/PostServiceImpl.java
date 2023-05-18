package com.paf.socialmediaapp.services;

import com.paf.socialmediaapp.models.Post;
import com.paf.socialmediaapp.repositories.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentService commentService;

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(String postId) {
        ObjectId objectId = new ObjectId(postId);
        Optional<Post> optionalPost = postRepository.findById(objectId);

        return optionalPost.orElse(null);
    }

    @Override
    public Post updatePost(Post post) {
        // Convert the ID from String to ObjectId
        ObjectId postId = new ObjectId(post.getPostId());

        // Fetch the existing post from the database using the ID
        Post existingPost = postRepository.findById(postId).orElse(null);

        // Update the fields of the existing post with the new values
        if (existingPost != null) {
            existingPost.setPostCaption(post.getPostCaption());
            existingPost.setPostImageUrl(post.getPostImageUrl());
            existingPost.setCommentIds(post.getCommentIds());
            existingPost.setUserIds(post.getUserIds());

            // Save the updated post to the database
            return postRepository.save(existingPost);
        } else {
            return null; // Handle the case where the post doesn't exist
        }
    }


    @Override
    public boolean deletePostById(String postId) {
        ObjectId objectId = new ObjectId(postId);
        Optional<Post> optionalPost = postRepository.findById(objectId);

        if (optionalPost.isPresent()) {
            postRepository.deleteById(objectId);

            // Delete all comments associated with the post
            commentService.deleteAllCommentsByPostId(postId);

            return true;
        } else {
            return false;
        }
    }
}