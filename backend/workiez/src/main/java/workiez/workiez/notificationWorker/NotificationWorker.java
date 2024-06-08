package workiez.workiez.notificationWorker;

import jakarta.persistence.*;
import lombok.*;
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

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)  //added this to avoid circular outputs on postman, test those things after the project
    @JoinColumn(name = "workerId" , nullable = false)
    @ToString.Exclude
    private Worker worker;

    private LocalDate date;

    private LocalTime time;
}
