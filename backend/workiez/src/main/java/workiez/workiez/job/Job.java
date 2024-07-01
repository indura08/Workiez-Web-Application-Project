package workiez.workiez.job;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.Application;
import workiez.workiez.user.District;
import workiez.workiez.user.Province;
import workiez.workiez.user.User;

import java.time.LocalDateTime;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private District locationDistrict;

    @Enumerated(EnumType.STRING)
    private Province locationProvince;

    private String city;

    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;

    private String creationDateTime; //methna string kala dan dtabase ek del krla aaye run krla blnna

}
