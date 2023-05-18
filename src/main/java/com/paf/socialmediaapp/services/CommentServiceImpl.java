package com.paf.socialmediaapp.services;

import com.paf.socialmediaapp.models.Comment;
import com.paf.socialmediaapp.models.Post;
import com.paf.socialmediaapp.repositories.CommentRepository;
import com.paf.socialmediaapp.repositories.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment) {
        // Convert the ID from String to ObjectId
        ObjectId postId = new ObjectId(comment.getPost().getPostId());

        // Fetch the existing post from the database using the ID
        Post existingPost = postRepository.findById(postId).orElse(null);

        // Save the comment to the database
        Comment savedComment = commentRepository.save(comment);

        // Add the comment to the post
        if (existingPost != null) {
            existingPost.getCommentIds().add(savedComment);
            postRepository.save(existingPost);
        }

        return savedComment;
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment getCommentById(String commentId) {
        ObjectId objectId = new ObjectId(commentId);
        Optional<Comment> optionalComment = commentRepository.findById(objectId);

        return optionalComment.orElse(null);
    }

    @Override
    public Comment updateComment(String commentId, Comment updatedComment) {
        ObjectId objectId = new ObjectId(commentId);
        Optional<Comment> optionalComment = commentRepository.findById(objectId);

        if (optionalComment.isPresent()) {
            Comment existingComment = optionalComment.get();

            // Update the existing comment with the new values
            existingComment.setCommentText(updatedComment.getCommentText());
            existingComment.setCreatedDate(updatedComment.getCreatedDate());

            // Save the updated comment to the database
            Comment savedComment = commentRepository.save(existingComment);

            return savedComment;
        } else {
            return null;
        }
    }



    @Override
    public boolean deleteCommentById(String commentId) {
        ObjectId objectId = new ObjectId(commentId);
        Optional<Comment> optionalComment = commentRepository.findById(objectId);

        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            Post post = comment.getPost();

            // Remove the comment from the post's commentIds array
            post.getCommentIds().remove(comment);
            postRepository.save(post);

            // Delete the comment from the comment repository
            commentRepository.deleteById(objectId);

            return true;
        } else {
            return false;
        }
    }


    @Override
    public boolean deleteAllCommentsByPostId(String postId) {
        ObjectId objectId = new ObjectId(postId);
        Optional<Post> optionalPost = postRepository.findById(objectId);

        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();
            existingPost.getCommentIds().clear();
            postRepository.save(existingPost);
            return true;
        } else {
            return false;
        }
    }

}
