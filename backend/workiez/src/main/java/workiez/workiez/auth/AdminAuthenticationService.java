package workiez.workiez.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import workiez.workiez.admin.Admin;
import workiez.workiez.admin.AdminRepository;
import workiez.workiez.authConfig.JwtService;
import workiez.workiez.user.Role;

@Service
@RequiredArgsConstructor //mekn attatama wenne me dependancy inject wala wena one arguments haila automa constructor ekat pss wela eawa serma tika automatically wenwa , meka hind ahtmai apita dependancy injection cobnstructor eka hraha krnna one natte
public class AdminAuthenticationService {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse adminRegister(Admin admin){
        var newAdmin = Admin.builder()
                .name(admin.getName())
                .email(admin.getEmail())
                .password(passwordEncoder.encode(admin.getPassword()))
                .location(admin.getLocation())
                .phone(admin.getPhone())
                .role(Role.ROLE_ADMIN)
                .build();
        adminRepository.save(newAdmin);
        var jwtToken = jwtService.generateToken(newAdmin);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticateAdmin(LoginRequest loginRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        var authenticatedAdmin = adminRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(authenticatedAdmin);

        return AuthenticationResponse.builder().token(jwtToken).build();

    }
}
