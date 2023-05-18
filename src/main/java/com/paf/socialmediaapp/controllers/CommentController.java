package com.paf.socialmediaapp.controllers;

import com.paf.socialmediaapp.models.Comment;
import com.paf.socialmediaapp.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment){
        return new ResponseEntity<Comment>(commentService.createComment(comment), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments(){
        return new ResponseEntity<List<Comment>>(commentService.getAllComments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable("id") String id) {
        // Call the getCommentById() method in the service to get the comment
        Comment comment = commentService.getCommentById(id);

        // Return the comment in the response
        if (comment != null) {
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable("id") String id, @RequestBody Comment updatedComment) {
        // Call the updateComment() method in the service to update the comment
        Comment comment = commentService.updateComment(id, updatedComment);

        // Return the updated comment in the response
        if (comment != null) {
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCommentById(@PathVariable("id") String id) {
        // Call the deleteCommentById() method in the service to delete the comment
        boolean isDeleted = commentService.deleteCommentById(id);

        // Return the results in the response
        if (isDeleted) {
            return new ResponseEntity<String>("Comment with ID " + id + " Deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Comment with ID " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

}
