package workiez.workiez.worker;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.service.Service;
import workiez.workiez.user.District;
import workiez.workiez.user.Gender;
import workiez.workiez.user.Province;
import workiez.workiez.user.Role;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workerId;

    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private District baseDistrict;

    @Enumerated(EnumType.STRING)
    private Province baseProvince;

    private String baseCity;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String phone;

    @ManyToMany    //this is the owner side , which means many to many relationship between worker and service is own by worker
    @JoinTable(
            name = "worker_service",
            joinColumns = @JoinColumn(name = "workerId"),
            inverseJoinColumns = @JoinColumn(name = "serviceId")
    )
    private List<Service> services;

    private Boolean availability;

    private String experienceDescription;

    @Enumerated(EnumType.STRING)
    private Role role;

}
