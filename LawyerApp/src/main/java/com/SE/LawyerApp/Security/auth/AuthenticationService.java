package com.SE.LawyerApp.Security.auth;

import com.SE.LawyerApp.Security.config.JWTService;
import com.SE.LawyerApp.Security.user.Role;
import com.SE.LawyerApp.Security.user.UserRepository;
import com.SE.LawyerApp.Security.user.User;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.PasswordAuthentication;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	@Autowired
    private UserRepository repository;
	@Autowired
    private PasswordEncoder passwordEncoder;
	@Autowired
    private JWTService jwtService;
	@Autowired
    private AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.User)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
         return AuthenticationResponse.builder()
                         .token(jwtToken)
        .build();
    	//return null;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    	//return null;
    }
}

