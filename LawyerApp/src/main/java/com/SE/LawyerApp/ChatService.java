package com.SE.LawyerApp;

import java.util.ArrayList;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SE.LawyerApp.POJO.Chat;
import com.SE.LawyerApp.POJO.Query;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;
    
    public String generateResponse(String message) {
        // Your logic to generate a response based on the user's message
        // This could be a simple if-else logic or a more sophisticated NLP-based approach
        return "This is a response generated by the backend for the message: " + message;
    }

    public Chat addQueryToChat(String chatId, Query query) {
  
        Chat chat = chatRepository.findBy_id(Integer.parseInt(chatId));
        chat.getQueries().add(query);
        return chatRepository.save(chat);
    }
    
    public Chat createNewChat(String title, ArrayList<Query> queries, String username) {
        //String userEmail = jwtService.extractUsername(jwt);
        Chat chat = new Chat();
        chat.set_id(generateRandomId()); // Set random ID
        chat.setTitle(title);
        chat.setQueries(queries);
        chat.setUsername(username);
        return chatRepository.save(chat);
    }

    // Method to generate a random integer ID
    private int generateRandomId() {
        Random random = new Random();
        return random.nextInt(1000000); // Adjust the upper limit as needed
    }
}