Teddymeksavanh - Wikipedia Plugin
===========================

Intro : 
-----------------
This plugin get elements from a wikipedia page.<br>
What you can extract from a page:<br>

- Id 
- Title
- Image (profil)
- The last time the page was modified
- Categories (you can choose the number of categories you want to show)
- Summary
- All the text inside a page 

My code works but i'm still a student (pretty sure there is a better way to use the wikipedia Api).

> Source : https://www.mediawiki.org/wiki/MediaWiki/en <br>
> Librairies : Jquery, Jquery-UI (not necessary, it's just for the function autocomplete())

Wikipedia Plugin : 
-----------------
####	Id, title, image, lastmodified, summary, content: 
- Langue ("fr", "en" or others), Text (the searched value), A callback to return the result.
	
<pre>WikiRequester.[id, search, title, image, lastmodified, summary, content]([langue], [text], [Callback]);</pre>
	
####	Categories : 
- Integer is the number of categories you want to extract<br>

<pre>WikiRequester.categories([langue], [text], [integer], [Callback]);</pre>
  
####  Exemples :

In your javascript, to get the title of a page :<br>
<pre>WikiRequester.title("fr", text, function(result){<br>
&nbsp;&nbsp;&nbsp;console.log(result);<br>
&nbsp;&nbsp;&nbsp;$(".MyClass").append(result);<br>
});</pre><br>
<br>
To add a search from wikipedia in your input :<br>
<pre>
$('.MyInputClass').autocomplete({
&nbsp;&nbsp;&nbsp;source: function (req, result) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WikiRequester.search("fr", req.term, function(field){
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result(field);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
&nbsp;&nbsp;&nbsp;}
});
</pre>

<img src="http://image.noelshack.com/fichiers/2016/08/1456319050-capture-d-ecran-2016-02-24-a-14-03-39.png">
  
####  Plus :
You can change $.get with $.getJSON or even $.ajax()<br>
I'll do some modification soon.

