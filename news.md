---
  layout: news
---


{% for post in site.posts %}
## {{post.title}}
<p class="meta">geschrieben am {{post.date | date: " %d.%m.%Y"}} </p>
<div class="post">
{{post.content}}
</div>
{% endfor %}

