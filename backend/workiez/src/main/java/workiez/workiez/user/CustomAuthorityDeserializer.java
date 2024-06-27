package workiez.workiez.user;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomAuthorityDeserializer extends StdDeserializer<Collection<? extends GrantedAuthority>> {
    protected CustomAuthorityDeserializer(Class<?> vc) {
        super(vc);
    }

    public CustomAuthorityDeserializer(){
        this(null);
    }

    @Override
    public Collection<? extends GrantedAuthority> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        JsonNode node = p.getCodec().readTree(p);
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        //code assusmes that json structure represesnts authority as string value
        if(node.isArray()){
            for(JsonNode authorityNode : node){
                JsonNode authorityValueNode = authorityNode.get("authority");
                if(authorityValueNode != null){
                    String authority = authorityValueNode.asText();
                    authorities.add(new SimpleGrantedAuthority(authority));
                }
            }
        }else {
            throw new IOException("expected JSON array for authorities");
        }

        return authorities;
    }
}
