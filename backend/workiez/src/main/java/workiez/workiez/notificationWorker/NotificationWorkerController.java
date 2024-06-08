package workiez.workiez.notificationWorker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.worker.Worker;
import workiez.workiez.worker.WorkerRepository;

import javax.management.Notification;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notificationWorker")
public class NotificationWorkerController {

    @Autowired
    private NotificationWorkerRepository notificationWorkerRepository;
    @Autowired
    private WorkerRepository workerRepository;

    @GetMapping("/all")
    public ResponseEntity<List<NotificationWorker>> getAllNotifications(){
        List<NotificationWorker> notifications = notificationWorkerRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(notifications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationWorker> getNotificationById(@PathVariable Long id){
        Optional<NotificationWorker> notification = notificationWorkerRepository.findById(id);
        if(notification.isPresent()){
            return ResponseEntity.status(HttpStatus.FOUND).body(notification.get());
        }
        else {
            return null;
        }

    }

    @GetMapping("/worker/{id}")
    public ResponseEntity<List<NotificationWorker>> getNotificationsByWorker(@PathVariable Long id){
        Optional<Worker> worker = workerRepository.findById(id);
        if(worker.isPresent()){
            List<NotificationWorker> workerNotification = notificationWorkerRepository.findAllByWorker(worker.get());
            return ResponseEntity.status(HttpStatus.FOUND).body(workerNotification);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewNotification(@RequestBody NotificationWorker notificationWorker){
        NotificationWorker newNotification = notificationWorkerRepository.save(notificationWorker);
        Optional<Worker> worker = workerRepository.findById(notificationWorker.getWorker().getWorkerId());
        if(worker.isPresent()){
            Worker newWorker = worker.get();
            newNotification.setWorker(newWorker);
            notificationWorkerRepository.save(newNotification);
            return ResponseEntity.status(HttpStatus.CREATED).body("new notification created : " + newNotification);
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }

    }

    @PutMapping("/update/{id}")
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id){
        Optional<NotificationWorker> notification = notificationWorkerRepository.findById(id);
        if(notification.isPresent()){
            notificationWorkerRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("notification deleted : " + notification.get());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find notification with id : " + id);
        }
    }
}
