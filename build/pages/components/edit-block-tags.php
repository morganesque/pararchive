<div class="tags">
	<% _.each(items,function(a,i) { %>
	<% 
		if (a.type == 'person') a.icon = 'user';
		if (a.type == 'date') a.icon = 'calendar';
		if (a.type == 'place') a.icon = 'map';
	%>
		<a href="#<%= a.id %>" class="tag"><span class="icon icon-<%= a.icon %>"></span> <%= a.tag %></a>
	<% }) %>
</div>