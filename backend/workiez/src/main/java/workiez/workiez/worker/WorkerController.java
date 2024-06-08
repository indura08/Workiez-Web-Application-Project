package workiez.workiez.worker;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.service.Service;
import workiez.workiez.service.ServiceRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {

    @Autowired
    private WorkerRepository workerRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Worker>> getAllWokers(){
        List<Worker> workers = workerRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(workers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getWorkerById(@PathVariable Long id){
        Optional<Worker> worker = workerRepository.findById(id);
        if(worker.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body("worker is :" + worker.get());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("worker not found");
        }
    }

//    @PostMapping("/create")
//    public ResponseEntity<Worker> createNewWorker(@RequestBody Worker worker){
//        Worker savedworker = workerRepository.save(worker);
//
//        if(worker.getServices() != null){
//            for(Service service : worker.getServices()){
//                Optional<Service> currentService = serviceRepository.findById(service.getServiceId());
//                if(currentService.isPresent()){
//                    Service exisitingService = currentService.get();
//                    exisitingService.getWorkers().add(savedworker);
//                    serviceRepository.save(exisitingService);
//                }
//            }
//        }
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedworker);
//    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateWorker(@RequestBody Worker worker, @PathVariable Long id){
        Optional<Worker> worker1 = workerRepository.findById(id);
        if (worker1.isPresent()){
            Worker existingWorker = worker1.get();

            existingWorker.setFirstname(worker.getFirstname());
            existingWorker.setLastname(worker.getLastname());
            existingWorker.setUsername(worker.getUsername());
            existingWorker.setEmail(worker.getEmail());
            existingWorker.setPassword(worker.getPassword());
            existingWorker.setBaseDistrict(worker.getBaseDistrict());
            existingWorker.setGender(worker.getGender());
            existingWorker.setPhone(worker.getPhone());
            existingWorker.setBaseProvince(worker.getBaseProvince());
            existingWorker.setBaseCity(worker.getBaseCity());
            existingWorker.setServices(worker.getServices());
            existingWorker.setAvailability(worker.getAvailability());
            existingWorker.setExperienceDescription(worker.getExperienceDescription());

            workerRepository.save(existingWorker);
            return ResponseEntity.status(HttpStatus.OK).body("worker saved");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("worker not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWorker(@PathVariable Long id){
        Optional<Worker> worker = workerRepository.findById(id);
        if (worker.isPresent()){
            workerRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("worker deleted. deleted notification = " + worker);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("worker not found with id : " + id);
        }
    }
}
