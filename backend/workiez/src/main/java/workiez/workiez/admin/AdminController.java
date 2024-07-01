package workiez.workiez.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.application.Application;
import workiez.workiez.application.ApplicationRepository;
import workiez.workiez.job.JobRepository;
import workiez.workiez.notificationUser.NotificationUser;
import workiez.workiez.notificationUser.NotificationUserRepository;
import workiez.workiez.notificationWorker.NotificationWorker;
import workiez.workiez.notificationWorker.NotificationWorkerRepository;
import workiez.workiez.user.UserRepository;
import workiez.workiez.worker.Worker;
import workiez.workiez.worker.WorkerRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminRepository adminRepository;
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final NotificationWorkerRepository notificationWorkerRepository;
    private final NotificationUserRepository notificationUserRepository;

    //admin controllers
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id){
        Optional<Admin> foundAdmin = adminRepository.findById(id);
        if(foundAdmin.isPresent()){
            adminRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Admin deleted. Deleted admin is : " + foundAdmin);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find admin with id : " + id);
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateAdmin(@RequestBody Admin admin ,@PathVariable Long id){
        Optional<Admin> foundAdmin = adminRepository.findById(id);
        if(foundAdmin.isPresent()){
            foundAdmin.get().setName(admin.getName());
            foundAdmin.get().setEmail(admin.getEmail());
            foundAdmin.get().setPassword(admin.getPassword());
            foundAdmin.get().setLocation(admin.getLocation());
            foundAdmin.get().setPhone(admin.getPhone());
            foundAdmin.get().setRole(admin.getRole());

            adminRepository.save(foundAdmin.get());

            return ResponseEntity.status(HttpStatus.OK).body("admin updated. Updated admin = " + foundAdmin.get());
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find admin with id : " + id);
        }
    }

    //application
    @GetMapping("/application/all")
    public ResponseEntity<String> getAllApplications(){
        List<Application> applications = applicationRepository.findAll();
        if(!applications.isEmpty()){
            return ResponseEntity.status(HttpStatus.FOUND).body("all applications : " + applications);
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body("There is no applications currently available on database.");
        }
    }

    @GetMapping("/application/{id}")
    public ResponseEntity<String> getApplicationById(@PathVariable Long id){
        Optional<Application> foundApplication = applicationRepository.findById(id);
        if(foundApplication.isPresent()){
            return ResponseEntity.status(HttpStatus.FOUND).body("application: " + foundApplication.get());
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("application not found with id : " + id);
        }
    }

    @DeleteMapping("/application/delete/{id}")
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

    @PutMapping("/application/update/{id}")
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

    //job
    //job danna one nha mokda jobs wala thiynna hama endpoint ekkma hamotama yanna puluwan wenna one dnat thiyan business logic eka anuwa

    //notificationUser
    @GetMapping("/userNotification/all")
    public ResponseEntity<List<NotificationUser>> getAllUserNotifications(){
        List<NotificationUser> notifications = notificationUserRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(notifications);
    }

    @PutMapping("/userNotification/update/{id}")
    public ResponseEntity<String> updateNotification(@RequestBody NotificationUser notification, @PathVariable Long id){
        Optional<NotificationUser> notification1 = notificationUserRepository.findById(id);
        if (notification1.isPresent()){
            NotificationUser existingNotification = notification1.get();

            existingNotification.setDescription(notification.getDescription());
            existingNotification.setUser(notification.getUser());
            existingNotification.setDate(notification.getDate());

            notificationUserRepository.save(existingNotification);
            return ResponseEntity.status(HttpStatus.OK).body("notification saved");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification not found");
        }
    }

    //notificationWorker
    @GetMapping("/workerNotification/all")
    public ResponseEntity<List<NotificationWorker>> getAllWorkerNotifications(){
        List<NotificationWorker> notifications = notificationWorkerRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(notifications);
    }

    @PutMapping("/workerNotification/update/{id}")
    public ResponseEntity<String> updateNotification(@RequestBody NotificationWorker notification, @PathVariable Long id){
        Optional<NotificationWorker> exsistingNotification = notificationWorkerRepository.findById(id);
        if(exsistingNotification.isPresent()){
            NotificationWorker updatedNotification = exsistingNotification.get();

            updatedNotification.setDescription(notification.getDescription());
            updatedNotification.setDate(notification.getDate());
            updatedNotification.setTime(notification.getTime());

            Optional<Worker> worker = workerRepository.findById(notification.getWorker().getWorkerId());
            if(worker.isPresent()){
                Worker newWorker = worker.get();
                updatedNotification.setWorker(newWorker);
            }
            notificationWorkerRepository.save(updatedNotification);
            return ResponseEntity.status(HttpStatus.OK).body("Notification updated : " + updatedNotification);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("couldnt found notification with id : " + id);
        }
    }

}
