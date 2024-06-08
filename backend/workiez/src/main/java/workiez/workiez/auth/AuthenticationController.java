package workiez.workiez.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import workiez.workiez.user.User;
import workiez.workiez.worker.Worker;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final UserAuthenticationService userAuthenticationService;
    private final WorkerAuthenticationService workerAuthenticationService;

    //Dependancy injection
    public AuthenticationController(UserAuthenticationService userAuthenticationService, WorkerAuthenticationService workerAuthenticationService) {
        this.userAuthenticationService = userAuthenticationService;
        this.workerAuthenticationService = workerAuthenticationService;
    }

    //user
    @PostMapping("/register/user")
    public ResponseEntity<AuthenticationResponse> userRegistration (@RequestBody User user){
        AuthenticationResponse token = userAuthenticationService.userRegister(user);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping("/login/user")
    public ResponseEntity<AuthenticationResponse> userLogin(@RequestBody LoginRequest loginRequest){
        AuthenticationResponse token = userAuthenticationService.userAuthenticate(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    //worker
    @PostMapping("/register/worker")
    public ResponseEntity<AuthenticationResponse> workerRegister(@RequestBody Worker worker){
        AuthenticationResponse token = workerAuthenticationService.workerRegister(worker);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping("/login/worker")
    public ResponseEntity<AuthenticationResponse> workerLogin(@RequestBody LoginRequest loginRequest){
        AuthenticationResponse token = workerAuthenticationService.wokerAuthenticate(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

}
