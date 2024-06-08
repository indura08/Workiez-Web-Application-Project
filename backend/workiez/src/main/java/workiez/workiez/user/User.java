package workiez.workiez.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@Data
@AllArgsConstructor
@Table(name = "_user")
public class User implements UserDetails {

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getPassword(){
        return password;
    }

    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
