package tec.diseno.communities.model;

import java.util.List;

public class Rama {
	private int id;
	private String name;
	private List<Member> memberCollection;
	private List<Grupo> childrenCollection;

	public Rama(int id, String name, List<Member> memberCollection, List<Grupo> childrenCollection) {
		this.id = id;
		this.name = name;
		this.memberCollection = memberCollection;
		this.childrenCollection = childrenCollection;
	}
	
	public Rama() {
		
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

	public List<Grupo> getChildrenCollection() {
		return childrenCollection;
	}

	public void setChildrenCollection(List<Grupo> childrenCollection) {
		this.childrenCollection = childrenCollection;
	}
}
