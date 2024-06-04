package workiez.workiez.job;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.user.District;
import workiez.workiez.user.Province;
import workiez.workiez.user.User;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    private String JobName;

    private String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private District locationDistrict;

    @Enumerated(EnumType.STRING)
    private Province locationProvince;

    private String city;

    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;

    private LocalDateTime creationDateTime;

}
