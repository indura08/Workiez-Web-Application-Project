package workiez.workiez.worker;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import workiez.workiez.Application;
import workiez.workiez.service.Service;
import workiez.workiez.user.*;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Worker implements UserDetails {

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
    //@JsonIgnore //@JsonManagedReference   //is used on the parent side (in this case, the Worker entity) of the relationship to indicate that it is the forward part of the reference.
    private List<Service> services;

    private Boolean availability;

    private String experienceDescription;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    @JsonDeserialize(using = CustomAuthorityDeserializer.class)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword(){
        return password;
    }

    @Override
    public String getUsername(){
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
