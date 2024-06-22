package workiez.workiez.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import workiez.workiez.worker.Worker;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkerAuthenticationResponse {
    private String token;
    //private Worker worker;
}
