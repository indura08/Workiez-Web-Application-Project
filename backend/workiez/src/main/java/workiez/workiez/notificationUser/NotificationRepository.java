package workiez.workiez.notificationUser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationUser, Long> {
}
