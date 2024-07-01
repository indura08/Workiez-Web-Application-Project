package workiez.workiez.service;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.worker.Worker;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @Enumerated(EnumType.STRING)
    private ServiceName serviceName;

    private String description;

    private String priceRange;

    @ManyToMany(mappedBy = "services")
    @Column(nullable = true)
    //@JsonBackReference      //is used on the child side (in this case, the Service entity) to indicate that it is the back part of the reference. This prevents the back reference from being serialized.
    private List<Worker> workers;
}
