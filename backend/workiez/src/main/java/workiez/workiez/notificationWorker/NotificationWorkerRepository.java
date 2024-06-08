package workiez.workiez.notificationWorker;

import org.springframework.data.jpa.repository.JpaRepository;
import workiez.workiez.worker.Worker;

import java.util.List;

public interface NotificationWorkerRepository extends JpaRepository<NotificationWorker, Long> {
    List<NotificationWorker> findAllByWorker(Worker worker);
}
