package workiez.workiez.notification;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.user.User;
import workiez.workiez.worker.Worker;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private String description;

    @ManyToOne//becaue me class eke thiyna object ekak user class eke ekaktai thiynna puluwan eki manay to one daanne , sralwa kiwwoth eka user knkta notification godak tiynna puluwanm
    @JoinColumn(name = "userId" , nullable = true)
    private User user;

//    @ManyToOne
//    @JoinColumn(name = "workerId" , nullable = true)
//    private Worker worker;

    private LocalDate date;

    private LocalTime time;

}
