package workiez.workiez.job;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.user.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllJobs(){
        List<Job> jobs = jobRepository.findAll();
        if(!jobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(jobs);
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getJobById(@PathVariable Long id){
        Optional<Job> job = jobRepository.findById(id);
        if(job.isPresent()){
            return ResponseEntity.status(HttpStatus.FOUND).body("job found: " + job);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("job not found please try agian!");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewJob(@RequestBody Job job){
        Optional<User> jobUser = userRepository.findById(job.getUser().getUserId());
        if(jobUser.isPresent()){
            job.setUser(jobUser.get());
            jobRepository.save(job);
            return ResponseEntity.status(HttpStatus.OK).body("Job saved succesfully : " + job.toString());
        }

        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ërror occured creating job");
        }

    }

//    @GetMapping("/user/{id}")
//    public ResponseEntity<List<Job>> getJobsByUser(@PathVariable Long id){
//        Optional<User> existingUser = userRepository.findById(id);
//        if(existingUser.isPresent()){
//            List<Job> userJobs = jobRepository.findAllByUser(existingUser.get());
//            return ResponseEntity.status(HttpStatus.FOUND).body(userJobs);
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }

    @GetMapping("/location/{district}")
    public ResponseEntity<List<Job>> findAllByDistrict(@PathVariable District district){
        List<Job> jobsBydistrict = jobRepository.findAllByLocationDistrict(district);
        if(!jobsBydistrict.isEmpty()){
            return ResponseEntity.status(HttpStatus.FOUND).body(jobsBydistrict);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updaetJob(@RequestBody Job job , @PathVariable Long id){
        Optional<Job> foundJob = jobRepository.findById(id);
        if(foundJob.isPresent()){
            Job newJob = foundJob.get();

            newJob.setJobName(job.getJobName());
            newJob.setDescription(job.getDescription());
            newJob.setUser(job.getUser());
            newJob.setLocationDistrict(job.getLocationDistrict());
            newJob.setLocationProvince(job.getLocationProvince());
            newJob.setCity(job.getCity());
            newJob.setJobStatus(job.getJobStatus());
            newJob.setCreationDateTime(job.getCreationDateTime());

            jobRepository.save(newJob);
            return ResponseEntity.status(HttpStatus.OK).body("Job has been updated . Updated job: " + newJob);

        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found with id : " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id){
        Optional<Job> job = jobRepository.findById(id);
        if(job.isPresent()){
            jobRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Job deleted successfully");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("job not found with id :" + id);
        }
    }
}

