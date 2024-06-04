package workiez.workiez.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Service")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Service>> getAllServices(){
        List<Service> services = serviceRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getServiceById(@PathVariable Long id){
        Optional<Service> service = serviceRepository.findById(id);
        if(service.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(service.get().getDescription());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("service not found");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewService(@RequestBody Service service){
        Service service1 = serviceRepository.save(service);
        return ResponseEntity.status(HttpStatus.OK).body("service saved");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateService(@RequestBody Service service, @PathVariable Long id){
        Optional<Service> service1 = serviceRepository.findById(id);
        if (service1.isPresent()){
            Service existingService = service1.get();

            existingService.setDescription(service.getDescription());
            existingService.setServiceName(service.getServiceName());
            existingService.setPriceRange(service.getPriceRange());
            existingService.setWorkers(service.getWorkers());

            serviceRepository.save(existingService);
            return ResponseEntity.status(HttpStatus.OK).body("service saved");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("service not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id){
        Optional<Service> service = serviceRepository.findById(id);
        if (service.isPresent()){
            serviceRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("service deleted. deleted notification = " + service);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("service not found with id : " + id);
        }
    }
}
