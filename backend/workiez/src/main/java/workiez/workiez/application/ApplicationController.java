package workiez.workiez.application;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.job.Job;
import workiez.workiez.job.JobRepository;
import workiez.workiez.worker.Worker;
import workiez.workiez.worker.WorkerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/create")
    public ResponseEntity<Application> createApplication(@RequestBody Application application){
        Application newApplication = applicationRepository.save(application);

        Optional<Worker> worker = workerRepository.findById(application.getWorker().getWorkerId());
        if(worker.isPresent()){
            Worker newWorker = worker.get();
            newApplication.setWorker(newWorker);
        }

        Optional<Job> job = jobRepository.findById(application.getJob().getJobId());
        if(job.isPresent()){
            Job newJob = job.get();
            newApplication.setJob(newJob);
        }

        applicationRepository.save(newApplication);

        return new ResponseEntity<>(newApplication, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateApplication(@PathVariable Long id , @RequestBody Application application){
        Optional<Application> application1 = applicationRepository.findById(id);
        if(application1.isPresent()){
            Application existingApplication = application1.get();

            existingApplication.setApplicationName(application.getApplicationName());
            existingApplication.setApplicationStatus(application.getApplicationStatus());
            existingApplication.setApplicationDateAndTime(application.getApplicationDateAndTime());
            existingApplication.setJob(application.getJob());
            existingApplication.setWorker(application.getWorker());

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

//    @GetMapping("/all")
//    public ResponseEntity<String> getAllApplications(){
//        List<Application> applications = applicationRepository.findAll();
//        if(!applications.isEmpty()){
//         return ResponseEntity.status(HttpStatus.FOUND).body("all applications : " + applications);
//        }
//        else {
//            return ResponseEntity.status(HttpStatus.OK).body("There is no applications currently available on database.");
//        }
//    }

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

    @GetMapping("/worker/{id}")
    public ResponseEntity<List<Application>> getApplicationByWorker(@PathVariable Long id){
        Optional<Worker> existingWorker = workerRepository.findById(id);
        if(existingWorker.isPresent()){
            Worker worker = existingWorker.get();
            List<Application> workerApplications = applicationRepository.findAllByWorker(worker);
            return ResponseEntity.status(HttpStatus.FOUND).body(workerApplications);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    @GetMapping("/job/{id}")
    public ResponseEntity<List<Application>> getApplicationBYJobId(@PathVariable Long id){
        Optional<Job> currentJob = jobRepository.findById(id);
        if(currentJob.isPresent()){
            List<Application> applications = applicationRepository.findAllByJob_JobId(id);
            return ResponseEntity.status(HttpStatus.OK).body(applications);
        }

        List<Application> notfoundlist = new ArrayList<>();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notfoundlist);
    }
}
