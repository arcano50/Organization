package tec.diseno.communities.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tec.diseno.communities.model.Coordination;
import tec.diseno.communities.model.Grupo;
import tec.diseno.communities.model.Member;
import tec.diseno.communities.model.Rama;
import tec.diseno.communities.model.Zone;

@RestController
public class OrganizationController {

	@RequestMapping(value = "/getCoordination", method = RequestMethod.POST)
	public Coordination getUserInfo() {
		System.out.println("Calling the request");
		Member member0 = new Member();
		Member member1 = new Member();
		Member member2 = new Member();
		Member member3 = new Member();
		Member member4 = new Member();
		
		member0.setAddress("Adress member0");
		member0.setCardId(000000);
		member0.setCity("City 0");
		member0.setCountry("Country 0");
		member0.setId(0);
		member0.setLastName("Member 0 LastName");
		member0.setName("Member0");
		member0.setState("State 0");
		
		member1.setAddress("Adress member1");
		member1.setCardId(000001);
		member1.setCity("City 1");
		member1.setCountry("Country 1");
		member1.setId(1);
		member1.setLastName("Member 1 LastName");
		member1.setName("Member1");
		member1.setState("State 1");
		
		member2.setAddress("Adress member2");
		member2.setCardId(000002);
		member2.setCity("City 2");
		member2.setCountry("Country 2");
		member2.setId(2);
		member2.setLastName("Member 2 LastName");
		member2.setName("Member2");
		member2.setState("State 2");
		
		member3.setAddress("Adress member3");
		member3.setCardId(000003);
		member3.setCity("City 3");
		member3.setCountry("Country 3");
		member3.setId(3);
		member3.setLastName("Member 3 LastName");
		member3.setName("Member3");
		member3.setState("State 3");
		
		member4.setAddress("Adress member4");
		member4.setCardId(000004);
		member4.setCity("City 4");
		member4.setCountry("Country 4");
		member4.setId(4);
		member4.setLastName("Member 4 LastName");
		member4.setName("Member4");
		member4.setState("State 4");
		
		List<Member> members0 = new ArrayList<Member>();
		members0.add(member0);
		
		List<Member> members1 = new ArrayList<Member>();
		members1.add(member1);
		
		List<Member> members2 = new ArrayList<Member>();
		members2.add(member2);
		
		List<Member> members3 = new ArrayList<Member>();
		members3.add(member3);

		List<Member> members4 = new ArrayList<Member>();
		members4.add(member4);
		
		Grupo grupo0 = new Grupo();
		grupo0.setId(0);
		grupo0.setMemberCollection(members3);
		grupo0.setName("Grupo 0");
		
		Grupo grupo1 = new Grupo();
		grupo1.setId(1);
		grupo1.setMemberCollection(members3);
		grupo1.setName("Grupo 1");
		
		List<Grupo> grupos0 = new ArrayList<Grupo>();
		List<Grupo> grupos1 = new ArrayList<Grupo>();
		
		grupos0.add(grupo0);
		grupos1.add(grupo1);
		
		Rama rama0 = new Rama();
		rama0.setChildrenCollection(grupos0);
		rama0.setId(0);
		rama0.setMemberCollection(members4);
		rama0.setName("Rama 0");
		
		Rama rama1 = new Rama();
		rama0.setChildrenCollection(grupos1);
		rama0.setId(1);
		rama0.setMemberCollection(members4);
		rama0.setName("Rama 1");
		
		List<Rama> ramas0 = new ArrayList<Rama>();
		List<Rama> ramas1 = new ArrayList<Rama>();
		
		ramas0.add(rama0);
		ramas1.add(rama1);
		
		Zone zone0 = new Zone();
		Zone zone1 = new Zone();
		
		zone0.setId(0);
		zone1.setId(1);
		
		zone0.setMemberCollection(members0);
		zone1.setMemberCollection(members1);
		
		zone0.setName("Zone 0");
		zone1.setName("Zone 1");
		
		zone0.setChildrenCollection(ramas0);
		zone1.setChildrenCollection(ramas0);
		
		Coordination coordination = new Coordination();
		
		List<Integer> telefonos = new ArrayList<Integer>();
		List<Zone> zones = new ArrayList<Zone>();
		zones.add(zone1);
		zones.add(zone0);
		
		telefonos.add(10000000);
		telefonos.add(11111111);
		
		coordination.setAddress("Address Coordination");
		coordination.setCardId(000000);
		coordination.setCity("City");
		coordination.setCountry("Country");
		coordination.setId(0);
		coordination.setName("Coordination");
		coordination.setState("State Coordination");
		coordination.setTelefonos(telefonos);
		coordination.setchildrenCollection(zones);
		coordination.setMemberCollection(members2);
		
		return coordination;
	}
}