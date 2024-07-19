package workiez.workiez.application;

import org.springframework.data.jpa.repository.JpaRepository;
import workiez.workiez.job.Job;
import workiez.workiez.worker.Worker;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findAllByWorker(Worker worker);
    List<Application> findAllByJob_JobId(Long jobId);
    void deleteByJob(Job job);


}
