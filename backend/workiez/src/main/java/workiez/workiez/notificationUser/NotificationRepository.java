package workiez.workiez.notificationUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import workiez.workiez.user.User;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationUser, Long> {
    List<NotificationUser>findAllByUser(User user);

}
