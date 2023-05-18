package com.paf.socialmediaapp.repositories;

import com.paf.socialmediaapp.models.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, ObjectId> {

}
