$(document).ready(function(){
    dataContainer=$('.container').children('.data-Container');
    $(document).on('click', $('#btn'), function(){
        searchMovies();
    });//fine del document.on

    function searchMovies(){
      var inputUtente=$('.container').children('.input').val();
      var arr=[];
      $.ajax({
          url:'https://api.themoviedb.org/3/search/movie?',
          method:'GET',
          data:{
              api_key:'936b60fb6691f67d5eda3a0a29507da1',
              query:inputUtente,
              language:'it-IT'
          },
          success: function(data){
              risultato=data.results;
              console.log(risultato);
              for(var i=0;i<risultato.length;i++){
              console.log('tittle', risultato[i]['original_title']);
              dataContainer.append('Risultato nr', (i+1));
              dataContainer.append('<p>'+'Titolo:-'+risultato[i]['title']+'</p>');
              dataContainer.append('<p>'+'Titolo originale:-'+risultato[i]['original_title']+'</p>');
              dataContainer.append('<p>'+'Lingua originale:-'+risultato[i]['original_language']+'</p>');
              dataContainer.append('<p>'+'Voto:='+risultato[i]['vote_average']+'<br>'+'<br>'+'</p>');

              }

          },
          error:function(){
              alert('errore');
          }
      });//fine ajax

    }

});//fine del doc ready
