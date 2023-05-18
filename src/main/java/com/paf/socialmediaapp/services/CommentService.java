package com.paf.socialmediaapp.services;

import com.paf.socialmediaapp.models.Comment;
import java.util.List;

public interface CommentService {

    Comment createComment(Comment comment);

    public List<Comment> getAllComments();

    Comment getCommentById(String commentId);

    Comment updateComment(String commentId, Comment updatedComment);

    boolean deleteCommentById(String commentId);

    //delete all comments associated with a post
    boolean deleteAllCommentsByPostId(String postId);

}
