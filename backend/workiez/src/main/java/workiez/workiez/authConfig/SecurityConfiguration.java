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
                                .requestMatchers("/api/auth/**" , "/api/notificationUser/create", "/api/notificationWorker/create").permitAll()
                                .requestMatchers("/api/worker/**" , "/api/notificationWorker/**", "/api/application/create").hasRole("WORKER")
                                .requestMatchers("/api/users/**", "/api/notificationUser/user/{id}", "/api/notificationUser/{id}","/api/notificationUser/update/{id}", "/api/notificationUser/delete/{id}" ).hasRole("USER")
                                .requestMatchers("/api/service/**" , "/api/admin/**" ).hasRole("ADMIN")
                                .anyRequest().authenticated()
                        //Reminder - .requestMatchers(AntPathRequestMatcher.anyMatcher("/url/path")).hasRole("user") mehemath yanna puluwan , namuth ehma giyam role based uraccess kiyna concept eka hariyt unenha e ai kiyla project eka iwar wela blnna ethkot habai url godak eka paara denna bha eain eka denna one
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
