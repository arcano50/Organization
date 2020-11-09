package tec.diseno.communities.model;

public class Member {
	private int id;
	private String name;
	private String lastName;
	private int cardId;
	private String country;
	private String state;
	private String city;
	private String address;
	
	public Member(int id, String name, String lastName, int cardId, String country, String state, String city,
			String address) {
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.cardId = cardId;
		this.country = country;
		this.state = state;
		this.city = city;
		this.address = address;
	}

	public Member() {
		
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

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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
	
	
	
}
