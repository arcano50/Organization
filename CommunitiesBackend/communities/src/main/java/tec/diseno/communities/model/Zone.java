package tec.diseno.communities.model;

import java.util.List;

public class Zone {
	private int id;
	private String name;
	private List<Member> memberCollection;
	private List<Rama> childrenCollection;

	public Zone(int id, String name, List<Member> memberCollection, List<Rama> childrenCollection) {
		super();
		this.id = id;
		this.name = name;
		this.memberCollection = memberCollection;
		this.childrenCollection = childrenCollection;
	}

	public Zone() {
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

	public List<Rama> getChildrenCollection() {
		return childrenCollection;
	}

	public void setChildrenCollection(List<Rama> childrenCollection) {
		this.childrenCollection = childrenCollection;
	}
	
	
}
