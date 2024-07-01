package workiez.workiez.application;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import workiez.workiez.job.Job;
import workiez.workiez.worker.Worker;

import java.time.LocalDateTime;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    private String applicationName;

    @ManyToOne
    @JoinColumn(name = "workerId")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "jobId")
    //@Column(unique = false)
    @JsonBackReference
    private Job job;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    private LocalDateTime applicationDateAndTime;

}


