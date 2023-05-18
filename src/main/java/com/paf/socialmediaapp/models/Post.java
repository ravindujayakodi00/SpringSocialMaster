package com.paf.socialmediaapp.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String postId = ObjectId.get().toString();

    private String postCaption;

    private String postImageUrl;

    private LocalDateTime createdDate = LocalDateTime.now();

    @JsonManagedReference
    @DBRef(lazy = true)
    private List<Comment> commentIds = new ArrayList<>();

    @DBRef
    private List<User> userIds = new ArrayList<>();

}