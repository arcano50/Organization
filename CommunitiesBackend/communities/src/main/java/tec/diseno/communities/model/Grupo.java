package tec.diseno.communities.model;

import java.util.List;

public class Grupo {
	private int id;
	private String name;
	private List<Member> memberCollection;
	
	public Grupo(int id, String name, List<Member> memberCollection) {
		this.id = id;
		this.name = name;
		this.memberCollection = memberCollection;
	}

	public Grupo() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Member> getMemberCollection() {
		return memberCollection;
	}

	public void setMemberCollection(List<Member> memberCollection) {
		this.memberCollection = memberCollection;
	}
	
}
