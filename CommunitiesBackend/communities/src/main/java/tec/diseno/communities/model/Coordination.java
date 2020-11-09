package tec.diseno.communities.model;

import java.util.List;

public class Coordination {
	private int id;
	private String name;
	private int cardId;
	private String country;
	private String state;
	private String city;
	private String address;
	private List<Integer> telefonos;
	private List<Zone> childrenCollection;
	private List<Member> memberCollection;

	public Coordination(int id, String name, int cardId, String country, String state, String city, String address,
			List<Integer> telefonos, List<Zone> childrenCollection, List<Member> memberCollection) {
		this.id = id;
		this.name = name;
		this.cardId = cardId;
		this.country = country;
		this.state = state;
		this.city = city;
		this.address = address;
		this.telefonos = telefonos;
		this.childrenCollection = childrenCollection;
		this.memberCollection = memberCollection;
	}

	public Coordination() {
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

	public int getCardId() {
		return cardId;
	}

	public void setCardId(int cardId) {
		this.cardId = cardId;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Integer> getTelefonos() {
		return telefonos;
	}

	public void setTelefonos(List<Integer> telefonos) {
		this.telefonos = telefonos;
	}

	public List<Zone> getchildrenCollection() {
		return childrenCollection;
	}

	public void setchildrenCollection(List<Zone> zones) {
		this.childrenCollection = zones;
	}

	public List<Member> getMemberCollection() {
		return memberCollection;
	}

	public void setMemberCollection(List<Member> memberCollection) {
		this.memberCollection = memberCollection;
	}
	
	
}
