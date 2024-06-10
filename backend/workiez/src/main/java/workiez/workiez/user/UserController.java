package workiez.workiez.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> getUserById(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body("user is :" + user.get());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }

//    @PostMapping("/create")
//    public ResponseEntity<String> createNewuser(@RequestBody User user){
//        User user1 = userRepository.save(user);
//        return ResponseEntity.status(HttpStatus.OK).body("user saved");
//    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@RequestBody User user, @PathVariable Long id){
        Optional<User> user1 = userRepository.findById(id);
        if (user1.isPresent()){
            User existingUser = user1.get();

            existingUser.setFirstname(user.getFirstname());
            existingUser.setLastname(user.getLastname());
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());
            existingUser.setGender(user.getGender());
            existingUser.setPhone(user.getPhone());
            existingUser.setDistrict(user.getDistrict());
            existingUser.setProvince(user.getProvince());

            userRepository.save(existingUser);
            return ResponseEntity.status(HttpStatus.OK).body("user saved");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()){
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("user deleted. deleted notification = " + user);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found with id : " + id);
        }
    }
}
