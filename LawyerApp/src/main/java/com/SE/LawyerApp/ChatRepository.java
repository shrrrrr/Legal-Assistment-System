package com.SE.LawyerApp;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.SE.LawyerApp.POJO.Chat;

import java.util.ArrayList;
import java.util.List;

interface ChatRepository extends MongoRepository<Chat,String>{
	Chat findBy_id(int id);
	List<Chat> findByusername(String userName);
}
