package workiez.workiez.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Notification>> getAllNotifications(){
        List<Notification> notifications = notificationRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(notifications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getNotificationById(@PathVariable Long id){
        Optional<Notification> notification = notificationRepository.findById(id);
        if(notification.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(notification.get().getDescription() + notification.get().getDate());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification not found");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewNotification(@RequestBody Notification notification){
        Notification notification1 = notificationRepository.save(notification);
        return ResponseEntity.status(HttpStatus.OK).body("Notification saved");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateNotification(@RequestBody Notification notification, @PathVariable Long id){
        Optional<Notification> notification1 = notificationRepository.findById(id);
        if (notification1.isPresent()){
            Notification existingNotification = notification1.get();

            existingNotification.setDescription(notification.getDescription());
            existingNotification.setUser(notification.getUser());
            existingNotification.setDate(notification.getDate());
            existingNotification.setTime(notification.getTime());

            notificationRepository.save(existingNotification);
            return ResponseEntity.status(HttpStatus.OK).body("notification saved");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id){
        Optional<Notification> notification1 = notificationRepository.findById(id);
        if (notification1.isPresent()){
            notificationRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("notification deleted. deleted notification = " + notification1);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found with id : " + id);
        }
    }
}
