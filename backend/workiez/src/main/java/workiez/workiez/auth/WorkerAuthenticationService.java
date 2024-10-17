package workiez.workiez.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import workiez.workiez.authConfig.JwtService;
import workiez.workiez.service.Service;
import workiez.workiez.service.ServiceRepository;
import workiez.workiez.user.Role;
import workiez.workiez.worker.Worker;
import workiez.workiez.worker.WorkerRepository;

import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class WorkerAuthenticationService {
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenitcationManager;

    public UserAuthenticationResponse workerRegister(Worker worker){
        var newWorker = Worker.builder()
                .firstname(worker.getFirstname())
                .lastname(worker.getLastname())
                .username(worker.getUsername())
                .email(worker.getEmail())
                .password(passwordEncoder.encode(worker.getPassword()))
                .role(Role.ROLE_WORKER)
                .baseDistrict(worker.getBaseDistrict())
                .baseProvince(worker.getBaseProvince())
                .baseCity(worker.getBaseCity())
                .phone(worker.getPhone())
                .gender(worker.getGender())
                .services(worker.getServices())
                .services(worker.getServices())
                .availability(true)
                .experienceDescription(worker.getExperienceDescription())
                .build();

        if(worker.getServices() != null){
            for(Service service: worker.getServices()){
                Optional<Service> existingService = serviceRepository.findById(service.getServiceId());
                if(existingService.isPresent()){
                    Service currentservice = existingService.get();
                    currentservice.getWorkers().add(newWorker);
                    serviceRepository.save(currentservice);
                }
            }
        }

        workerRepository.save(newWorker);

        var jwtToken = jwtService.generateToken(newWorker);
        return UserAuthenticationResponse.builder().token(jwtToken).build();
    }

    public WorkerAuthenticationResponse workerAuthenticate(LoginRequest loginRequest){
        try {
            authenitcationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            throw new RuntimeException("Authentication failed speaking the worker auth class");
        }
        var authenticatedWorker = workerRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(authenticatedWorker);
        return WorkerAuthenticationResponse.builder().token(jwtToken).worker(authenticatedWorker).build();
    }


}
