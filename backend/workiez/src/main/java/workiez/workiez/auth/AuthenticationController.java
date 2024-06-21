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
    public ResponseEntity<UserAuthenticationResponse> userRegistration (@RequestBody User user){
        UserAuthenticationResponse token = userAuthenticationService.userRegister(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    @PostMapping("/login/user")
    public ResponseEntity<UserAuthenticationResponse> userLogin(@RequestBody LoginRequest loginRequest){
        UserAuthenticationResponse token = userAuthenticationService.userAuthenticate(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    //worker
    @PostMapping("/register/worker")
    public ResponseEntity<UserAuthenticationResponse> workerRegister(@RequestBody Worker worker){
        UserAuthenticationResponse token = workerAuthenticationService.workerRegister(worker);
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    @PostMapping("/login/worker")
    public ResponseEntity<WorkerAuthenticationResponse> workerLogin(@RequestBody LoginRequest loginRequest){
        WorkerAuthenticationResponse token = workerAuthenticationService.workerAuthenticate(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    //admin
    @PostMapping("/register/admin")
    public ResponseEntity<UserAuthenticationResponse> adminRegister(@RequestBody Admin admin){
        UserAuthenticationResponse token = adminAuthenticationService.adminRegister(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }
    @PostMapping("/login/admin")
    public ResponseEntity<UserAuthenticationResponse> adminLogin(@RequestBody LoginRequest loginRequest){
        UserAuthenticationResponse token = adminAuthenticationService.authenticateAdmin(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }


}
