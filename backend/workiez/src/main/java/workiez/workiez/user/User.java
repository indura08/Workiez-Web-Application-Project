package workiez.workiez.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.notification.Notification;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@Data
@AllArgsConstructor
@Table(name = "_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String firstname;
    private String lastname;
    private String username;

    private String email;
    private String password;

    @Enumerated(EnumType.STRING) //note: The EnumType.STRING argument indicates that the enum value should be stored as a string in the database.
    private Role role;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String phone;

    @Enumerated(EnumType.STRING)
    private District district;

    @Enumerated(EnumType.STRING)
    private Province province;

    private String city;

    @OneToMany(mappedBy = "user") //because one user can have many notifications
    private List<Notification> notifications;

}
