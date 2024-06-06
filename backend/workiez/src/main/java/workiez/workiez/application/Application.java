package workiez.workiez.application;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    @OneToOne
    @JoinColumn(name = "workerId")
    private Worker workerId;

    @OneToOne
    @JoinColumn(name = "jobId")
    private Job jobId;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    private LocalDateTime applicationDateAndTime;

}

//meke idla ptn gnna controllers tika hdgnna
