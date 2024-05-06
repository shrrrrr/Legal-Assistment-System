package com.SE.LawyerApp;

import java.util.List;
import com.SE.LawyerApp.Security.config.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import com.SE.LawyerApp.POJO.Chat;
import com.SE.LawyerApp.POJO.Query;

@RestController
public class ChatController {
	
	@Autowired
	private ChatRepository repo;
	
	@Autowired
	private ChatService chatService;
	private final JWTService jwtService = new JWTService();
	@GetMapping("/getChats")
	public List<Chat> getAllChats( @RequestHeader("Authourization") String authHeader){
		final String jwt;
		final String userEmail;
		jwt = authHeader.substring(7);
		userEmail = jwtService.extractUsername(jwt);
		return repo.findByusername(userEmail);
	}
	
	@PostMapping("/{chatId}/chat")
    public Chat processMessage(@PathVariable String chatId, @RequestBody String message) {
        // Process the message to generate a response
        String response = chatService.generateResponse(message);

        // Add the query (message and response) to the MongoDB for the specific chat ID
        return chatService.addQueryToChat(chatId, new Query(message, response));
    }
	
	@PostMapping("/createChat")
    public Chat createNewChat(@RequestBody Chat request, @RequestHeader("Authourization") String authHeader) {
		final String jwt;
		final String userEmail;
		jwt = authHeader.substring(7);
		userEmail = jwtService.extractUsername(jwt);
        return chatService.createNewChat(request.getTitle(), request.getQueries(),userEmail);
    }
	
//	@PostMapping("/{chatId}/queries")
//	public Chat addQueryToChat(@PathVariable String chatId, @RequestBody Query query) {
//	        return chatService.addQueryToChat(chatId, query);
//	}
}
