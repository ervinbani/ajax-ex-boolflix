$(document).ready(function(){
    var dataContainer=$('.container').children('.data-Container');
    var inputUtente=$('.container').children('.input').val();

    $(document).on('click', $('#btn'), function(){
        searchMovies();
    });//fine del document.on

    function searchMovies(){
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
              dataContainer.append('<p>'+'Voto:='+transformAverage(risultato[i]['vote_average'])+'<br>'+'<br>'+'</p>');

              }

          },
          error:function(){
              alert('errore');
          }
      });//fine ajax

    }
    function transformAverage(vote_average){
        starVote=Math.floor(vote_average/2);
        var arrStar=[];
        for(var i=0;i<starVote;i++){
            arrStar.push('<i class="fas fa-star"></i>');
        }
        return arrStar;
    }

});//fine del doc ready
