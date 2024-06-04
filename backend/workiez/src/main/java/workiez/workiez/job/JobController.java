package workiez.workiez.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

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
        Job job1 = jobRepository.save(job);
        return ResponseEntity.status(HttpStatus.OK).body("Job saved succesfully : " + job1);
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

