$(document).ready(function(){
    var zoekwoord;
    $('#HaalOp').click(function(){
        zoekwoord = $('#zoekwoord').val();
        haalContainer();
    });
    $('#zoekwoord').keydown(function(e){
        if(e.keyCode == 13){
            zoekwoord = $(this).val();
            haalContainer();
        }
    });
    
    function haalContainer(){
        var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + zoekwoord + "&jsoncallback=?"
        $.ajax (
            {
                dataType: 'json',
                method: 'GET',
                url: flickrURL,
                success: verwerkContainer
            }
        )
    };
    
    function verwerkContainer(data){
        console.log(data);
        $('#Container').html("");
        for(var i=0; i<data.items.length; i++){
            var foto = data.items[i];
            var htmlCode = "<div class='houder'><div class='afbeelding'><a href='" + foto.link + "' target='_blank'><img src='" + foto.media.m + "' alt='" + foto.title + "' ></a></div><h4>" + foto.title + "</h4></div>";
            $('#Container').append(htmlCode);
        }
        $('#bron a').attr("href", data.link).text(data.title + " door Flickr.com");
        
    }
    
});