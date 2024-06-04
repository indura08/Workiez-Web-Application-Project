package workiez.workiez.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {
    @Autowired
    private ApplicationRepository applicationRepository;

    @PostMapping("/create")
    public ResponseEntity<Application> createApplication(@RequestBody Application application){
        Application application1 = applicationRepository.save(application);
        return new ResponseEntity<>(application1, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateApplication(@PathVariable Long id , @RequestBody Application application){
        Optional<Application> application1 = applicationRepository.findById(id);
        if(application1.isPresent()){
            Application existingApplication = application1.get();

            existingApplication.setApplicationName(application.getApplicationName());
            existingApplication.setApplicationStatus(application.getApplicationStatus());
            existingApplication.setApplicationDateAndTime(application.getApplicationDateAndTime());
            existingApplication.setJobId(application.getJobId());
            existingApplication.setWorkerId(application.getWorkerId());

            applicationRepository.save(existingApplication);

            return ResponseEntity.ok("Application updated :" + existingApplication);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found with id:  " + application.getApplicationId());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id){
        Optional<Application> application = applicationRepository.findById(id);
        if(application.isPresent()){
            applicationRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("application has been deleted successfully , deleted application :" + application);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application could not be found with id : " + id);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<String> getAllApplications(){
        List<Application> applications = applicationRepository.findAll();
        if(!applications.isEmpty()){
         return ResponseEntity.status(HttpStatus.FOUND).body("all applications : " + applications);
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body("There is no applications currently available on database.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getApplicationById(@PathVariable Long id){
        Optional<Application> foundApplication = applicationRepository.findById(id);
        if(foundApplication.isPresent()){
            return ResponseEntity.status(HttpStatus.FOUND).body("application: " + foundApplication.get());
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("application not found with id : " + id);
        }

        //me uda if else ekam mehm krnnath puluwan
        //return foundApplication.map(application -> ResponseEntity.status(HttpStatus.FOUND).body("application: " + application)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("application not found with id : " + id));

    }
}
