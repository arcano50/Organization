package tec.diseno.communities;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    	
    	// access point http://localhost:8080/greeting?name=User
    	System.out.println("Success!");
    }
}
