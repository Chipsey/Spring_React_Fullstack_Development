package com.user.security.auth;

import com.user.security.config.JwtService;
import com.user.security.user.Role;
import com.user.security.user.User;
import com.user.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public List<User> fetchUsers() {
        return repository.findAll();
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
//        return AuthenticationResponse.builder()
//                .token(jwtToken)
//                .build();
        AuthenticationResponse response = new AuthenticationResponse();
        response.setName(user.getFirstName() + " " + user.getLastName());
        response.setEmail(user.getEmail());
        response.setToken(jwtToken);
        response.setId(user.getId());
        response.setAddress(user.getAddress());
        response.setRole(String.valueOf(user.getRole()));

        return response;
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
//        return AuthenticationResponse.builder()
//                .token(jwtToken)
//                .build();
        AuthenticationResponse response = new AuthenticationResponse();
        response.setName(user.getFirstName() + " " + user.getLastName());
        response.setEmail(user.getEmail());
        response.setAddress(user.getAddress());
        response.setToken(jwtToken);
        response.setId(user.getId());
        response.setRole(String.valueOf(user.getRole()));

        return response;
    }


    public User updateUserProfile(Long userId, User updatedUser) {
        Optional<User> optionalUser = repository.findById(Math.toIntExact(userId));

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());

            repository.save(existingUser);

            return existingUser;
        }

        return null;
    }


    public void deleteUser(Long userId) {
        Boolean exist = repository.existsById(Math.toIntExact(userId));
        if (exist) {
            repository.deleteById(Math.toIntExact(userId));
        } else {
            throw new UserNotFoundException("User with ID " + userId + " not found");
        }
    }

}
