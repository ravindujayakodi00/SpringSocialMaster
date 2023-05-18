package com.paf.socialmediaapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("/notifications")
public class Notification {

    @Id
    private String notificationId = ObjectId.get().toString();

    @DBRef
    private User user;

    private String notificationText;

    private String notificationType;


}
