<div class="tags">
	<% _.each(items,function(a,i) { %>
	<% 
		if (a.type == 'person') a.icon = 'icon-user';
		if (a.type == 'date') a.icon = 'icon-calendar';
	%>
		<a href="#<%= a.id %>" class="tag"><span class="icon <%= a.icon %>"></span><%= a.tag %></a>
	<% }) %>
</div>