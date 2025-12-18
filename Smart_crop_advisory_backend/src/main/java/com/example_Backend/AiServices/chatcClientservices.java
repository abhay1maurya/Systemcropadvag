package com.example_Backend.AiServices;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

@Service
public class chatcClientservices {
	
    private final  ChatClient chatclient;

	public chatcClientservices(ChatClient.Builder builder) {
		this.chatclient=builder.build();

	}
	
	public String ask(String message) {
		return this.chatclient.prompt()
				 .system("""
						    You are an Agriculture Assistant for Indian farming only.
						    You must answer only agriculture questions.
						    If the question is not related to agriculture, reply:
						    "I only answer agriculture-related questions."
						    """)
				.user(message)
				.call()
				.content();
	}
	
	
	public Flux<String> Streemchat(String mess){
		return this.chatclient.prompt().system("You are an agriculture expert. Answer using Indian farming conditions.").user(mess).stream().content();
	}
	
	

}
