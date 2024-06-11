package workiez.workiez.notificationUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workiez.workiez.user.User;
import workiez.workiez.user.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notificationUser")
public class NotificationController {

    @Autowired
    private NotificationUserRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<NotificationUser>> getAllNotifications(){
        List<NotificationUser> notifications = notificationRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(notifications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getNotificationById(@PathVariable Long id){
        Optional<NotificationUser> notification = notificationRepository.findById(id);
        if(notification.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(notification.get().getDescription() + notification.get().getDate());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification not found");
        }
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<List<NotificationUser>> findNotificationByUser(@PathVariable Long id){
        Optional<User> user1 = userRepository.findById(id);
        if(user1.isPresent()){
            return ResponseEntity.status(HttpStatus.FOUND).body(notificationRepository.findAllByUser(user1.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/create")
    public ResponseEntity<NotificationUser> createNewNotification(@RequestBody NotificationUser notification){
        NotificationUser newNotification = notificationRepository.save(notification);

        Optional<User> user =  userRepository.findById(notification.getUser().getUserId());
        if(user.isPresent()){
            User newUser = user.get();
            newNotification.setUser(newUser);
            notificationRepository.save(newNotification);
        }
        return ResponseEntity.status(HttpStatus.OK).body(newNotification);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateNotification(@RequestBody NotificationUser notification, @PathVariable Long id){
        Optional<NotificationUser> notification1 = notificationRepository.findById(id);
        if (notification1.isPresent()){
            NotificationUser existingNotification = notification1.get();

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
        Optional<NotificationUser> notification1 = notificationRepository.findById(id);
        if (notification1.isPresent()){
            notificationRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("notification deleted. deleted notification = " + notification1);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found with id : " + id);
        }
    }
}
