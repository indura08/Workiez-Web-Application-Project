package workiez.workiez.authConfig;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import workiez.workiez.admin.AdminRepository;
import workiez.workiez.user.UserRepository;
import workiez.workiez.worker.WorkerRepository;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;
    private final WorkerRepository workerRepository;
    private final AdminRepository adminRepository;

    @Bean
    public UserDetailsService userDetailsService(){
        return username -> {
            var foundUser = userRepository.findByEmail(username);
            var foundWorker = workerRepository.findByEmail(username);
            var foundAdmin = adminRepository.findByEmail(username);
            if(foundUser.isPresent() && foundWorker.isEmpty() && foundAdmin.isEmpty()){
                return foundUser.get();
            }
            else if (foundWorker.isPresent() && foundUser.isEmpty() && foundAdmin.isEmpty()){
                return foundWorker.get();
            }
            else if(foundAdmin.isPresent() && foundUser.isEmpty() && foundWorker.isEmpty()) {
                return foundAdmin.get();
            }
            else {
                return null;
            }
//            if(foundUser.isPresent()){
//                return foundUser.get();
//            }
//            else {
//                var foundWorker = workerRepository.findByEmail(username);
//                if(foundWorker.isPresent()){
//                    return foundWorker.get();
//                }
//                return null;
//            }
        };
//        return username -> userRepository.findByEmail(username)
//                .orElseThrow(() -> new UsernameNotFoundException(("User not found please try again!")));
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
