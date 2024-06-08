package workiez.workiez.job;

import org.springframework.data.jpa.repository.JpaRepository;
import workiez.workiez.user.District;
import workiez.workiez.user.User;

import java.util.List;
import java.util.Objects;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findAllByUser(User user);
    List<Job> findAllByLocationDistrict(District district);
}
