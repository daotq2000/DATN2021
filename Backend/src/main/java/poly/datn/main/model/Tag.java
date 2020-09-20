package poly.datn.main.model;
// Generated Sep 20, 2020 1:19:24 PM by Hibernate Tools 4.0.1.Final

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Tag generated by hbm2java
 */
@Entity
@Table(name = "tag", catalog = "graduate")
public class Tag implements java.io.Serializable {

	private Long id;
	private String name;
	private String description;
	private long view;
	private Date createAt;
	private Date updateAt;

	public Tag() {
	}

	public Tag(String name, String description, long view) {
		this.name = name;
		this.description = description;
		this.view = view;
	}

	public Tag(String name, String description, long view, Date createAt, Date updateAt) {
		this.name = name;
		this.description = description;
		this.view = view;
		this.createAt = createAt;
		this.updateAt = updateAt;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "name", nullable = false, length = 50)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "description", nullable = false, length = 65535)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "view", nullable = false)
	public long getView() {
		return this.view;
	}

	public void setView(long view) {
		this.view = view;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_at", length = 19)
	public Date getCreateAt() {
		return this.createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_at", length = 19)
	public Date getUpdateAt() {
		return this.updateAt;
	}

	public void setUpdateAt(Date updateAt) {
		this.updateAt = updateAt;
	}

}