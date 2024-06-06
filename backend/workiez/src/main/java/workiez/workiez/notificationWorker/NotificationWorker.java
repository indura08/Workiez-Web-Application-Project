package workiez.workiez.notificationWorker;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.worker.Worker;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationWorker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationWorkerId;

    private String desccription;

    @ManyToOne
    @JoinColumn(name = "workerId" , nullable = false)
    private Worker worker;

    private LocalDate date;

    private LocalTime time;
}
