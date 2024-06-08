package workiez.workiez.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import workiez.workiez.authConfig.JwtService;
import workiez.workiez.user.Role;
import workiez.workiez.user.User;
import workiez.workiez.user.UserRepository;

@Service
@RequiredArgsConstructor
public class UserAuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse userRegister(User user){
        var newUser = User.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(user.getPassword())
                .username(passwordEncoder.encode(user.getUsername()))
                .role(Role.USER)
                .gender(user.getGender())
                .phone(user.getPhone())
                .district(user.getDistrict())
                .province(user.getProvince())
                .city(user.getCity())
                .build();
        userRepository.save(newUser);

        var jwtToken = jwtService.generateToken(newUser);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse userAuthenticate(LoginRequest loginRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        var authenticatedUser = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(authenticatedUser);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
