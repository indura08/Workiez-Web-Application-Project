package workiez.workiez.notificationUser;

import org.springframework.data.jpa.repository.JpaRepository;
import workiez.workiez.user.User;

import java.util.List;

public interface NotificationUserRepository extends JpaRepository<NotificationUser, Long> {
    List<NotificationUser>findAllByUser(User user);

}
