package poly.datn.main.model;
// Generated Sep 20, 2020 1:19:24 PM by Hibernate Tools 4.0.1.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Post generated by hbm2java
 */
@Entity
@Table(name = "post", catalog = "graduate")
public class Post implements java.io.Serializable {

	private Long id;
	private User user;
	private String code;
	private String name;
	private String shortDescription;
	private String content;
	private Long view;
	private Long anwser;
	private Date createAt;
	private Date updateAt;
	private String tagId;
	private Set<Answer> answers = new HashSet<Answer>(0);
	private Set<EmotionPost> emotionPostsForPostId = new HashSet<EmotionPost>(0);
	private Set<EmotionPost> emotionPostsForUserId = new HashSet<EmotionPost>(0);

	public Post() {
	}

	public Post(User user, Date createAt, Date updateAt, String tagId) {
		this.user = user;
		this.createAt = createAt;
		this.updateAt = updateAt;
		this.tagId = tagId;
	}

	public Post(User user, String code, String name, String shortDescription, String content, Long view, Long anwser,
			Date createAt, Date updateAt, String tagId, Set<Answer> answers, Set<EmotionPost> emotionPostsForPostId,
			Set<EmotionPost> emotionPostsForUserId) {
		this.user = user;
		this.code = code;
		this.name = name;
		this.shortDescription = shortDescription;
		this.content = content;
		this.view = view;
		this.anwser = anwser;
		this.createAt = createAt;
		this.updateAt = updateAt;
		this.tagId = tagId;
		this.answers = answers;
		this.emotionPostsForPostId = emotionPostsForPostId;
		this.emotionPostsForUserId = emotionPostsForUserId;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Column(name = "code", length = 20)
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "name", length = 200)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "short_description", length = 1000)
	public String getShortDescription() {
		return this.shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	@Column(name = "content", length = 65535)
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "view")
	public Long getView() {
		return this.view;
	}

	public void setView(Long view) {
		this.view = view;
	}

	@Column(name = "anwser")
	public Long getAnwser() {
		return this.anwser;
	}

	public void setAnwser(Long anwser) {
		this.anwser = anwser;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_at", nullable = false, length = 19)
	public Date getCreateAt() {
		return this.createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_at", nullable = false, length = 19)
	public Date getUpdateAt() {
		return this.updateAt;
	}

	public void setUpdateAt(Date updateAt) {
		this.updateAt = updateAt;
	}

	@Column(name = "tag_id", nullable = false)
	public String getTagId() {
		return this.tagId;
	}

	public void setTagId(String tagId) {
		this.tagId = tagId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "post")
	public Set<Answer> getAnswers() {
		return this.answers;
	}

	public void setAnswers(Set<Answer> answers) {
		this.answers = answers;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "postByPostId")
	public Set<EmotionPost> getEmotionPostsForPostId() {
		return this.emotionPostsForPostId;
	}

	public void setEmotionPostsForPostId(Set<EmotionPost> emotionPostsForPostId) {
		this.emotionPostsForPostId = emotionPostsForPostId;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "postByUserId")
	public Set<EmotionPost> getEmotionPostsForUserId() {
		return this.emotionPostsForUserId;
	}

	public void setEmotionPostsForUserId(Set<EmotionPost> emotionPostsForUserId) {
		this.emotionPostsForUserId = emotionPostsForUserId;
	}

}