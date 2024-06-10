package workiez.workiez.authConfig;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/users/**")).hasRole("USER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/job/**")).hasRole("USER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/notificationUser/**")).hasRole("USER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/worker/**")).hasRole("WORKER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/notificationWorker/**")).hasRole("WORKER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/application/**")).hasRole("WORKER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/job/**")).hasRole("WORKER")
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/service/**")).hasRole("ADMIN")
                                .anyRequest().authenticated()
                        //methna wena krla blnna learning coide eke widiyt
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
