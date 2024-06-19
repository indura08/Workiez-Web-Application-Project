package workiez.workiez.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.admin.Admin;
import workiez.workiez.user.User;
import workiez.workiez.worker.Worker;
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final UserAuthenticationService userAuthenticationService;
    private final WorkerAuthenticationService workerAuthenticationService;
    private final AdminAuthenticationService adminAuthenticationService;

    //Dependancy injection
    public AuthenticationController(UserAuthenticationService userAuthenticationService, WorkerAuthenticationService workerAuthenticationService, AdminAuthenticationService adminAuthenticationService) {
        this.userAuthenticationService = userAuthenticationService;
        this.workerAuthenticationService = workerAuthenticationService;
        this.adminAuthenticationService = adminAuthenticationService;
    }

    //user

    @PostMapping("/register/user")
    public ResponseEntity<AuthenticationResponse> userRegistration (@RequestBody User user){
        AuthenticationResponse token = userAuthenticationService.userRegister(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
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
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    @PostMapping("/login/worker")
    public ResponseEntity<AuthenticationResponse> workerLogin(@RequestBody LoginRequest loginRequest){
        AuthenticationResponse token = workerAuthenticationService.workerAuthenticate(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    //admin
    @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> adminRegister(@RequestBody Admin admin){
        AuthenticationResponse token = adminAuthenticationService.adminRegister(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }
    @PostMapping("/login/admin")
    public ResponseEntity<AuthenticationResponse> adminLogin(@RequestBody LoginRequest loginRequest){
        AuthenticationResponse token = adminAuthenticationService.authenticateAdmin(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }


}
