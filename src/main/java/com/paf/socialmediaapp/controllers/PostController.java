package com.paf.socialmediaapp.controllers;

import com.paf.socialmediaapp.models.Post;
import com.paf.socialmediaapp.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;


    @PostMapping
    public ResponseEntity<Post> createPost(Post post){
        return new ResponseEntity<Post>(postService.createPost(post), HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(){
        return new ResponseEntity<List<Post>>(postService.getAllPosts(), HttpStatus.OK);
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Post>> getAllPostsByUserId(@PathVariable("userId") String userId) {
//        // Call the getAllPostsByUserId() method in the service to get the posts
//        List<Post> posts = postService.getAllPostsByUserId(userId);userId
//
//        // Return the posts in the response
//        if (posts != null) {
//            return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
//        }
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") String id) {
        // Call the getPostById() method in the service to get the post
        Post post = postService.getPostById(id);

        // Return the post in the response
        if (post != null) {
            return new ResponseEntity<Post>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") String postId, @RequestBody Post post) {
        // Set the ID of the post to be updated
        post.setPostId(postId);

        // Call the updatePost() method in the service to update the post
        Post updatedPost = postService.updatePost(post);

        // Return the updated post in the response
        if (updatedPost != null) {
            return new ResponseEntity<Post>(updatedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") String id) {
        // Call the deletePost() method in the service to delete the post
        boolean isDeleted = postService.deletePostById(id);

        // Return a response message based on whether the post was deleted or not
        if (isDeleted) {
            return new ResponseEntity<String>("Post with ID " + id + " deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Post with ID " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }
}
