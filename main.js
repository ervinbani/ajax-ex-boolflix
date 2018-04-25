var dataContainer=$('.container').children('.data-Container');
var inputUtente=$('.container').children('.input').val();
var arrFlags=['flags/it.svg', 'flags/en.svg', 'flags/es.svg'];



$(document).ready(function(){


    var arr=0;


    $(document).on('click', $('#btn'), function(){
        searchMovies();


    });//fine del document.on

    function searchMovies(){
      $.ajax({
          url:'https://api.themoviedb.org/3/search/movie?',
          method:'GET',
          data:{
              api_key:'936b60fb6691f67d5eda3a0a29507da1',
              query:inputUtente,
              language:'it-IT'
          },
          success: function(data){
              var risultato=data.results;
              for(var i=0;i<risultato.length;i++){
                  console.log('tittle', risultato[i]['original_title']);
                  dataContainer.append('Risultato nr', (i+1));
                  dataContainer.append('<p>'+'Titolo:-'+risultato[i]['title']+'</p>');
                  dataContainer.append('<p>'+'Titolo originale:-'+risultato[i]['original_title']+'</p>');
                  dataContainer.append('<p class="leng">'+'Lingua originale:-'+risultato[i]['original_language']+'<img id='+i+' src=fonte style="height:20px">'+'</p>');
                  dataContainer.append('<p>'+'Voto:='+transformAverage(risultato[i]['vote_average'])+'<br><br>'+'</p>');
                  for(var j=0;j<arrFlags.length;j++){
                      if(arrFlags[j]==('flags/'+(risultato[i]['original_language'])+'.'+'svg')){
                            var fonte=arrFlags[j];
                            dataContainer.children('.leng').children('img').attr('src', fonte);

                      }


                  }
              }
              //generateFlag();
              console.log('risultato essatto', fonte);
            },
          error:function(){
              alert('errore');
          }
      });//fine ajax


    }
    //funzione che transforma la media in un numero x da 1 a 5 e stampa x star invece del num x
    function transformAverage(vote_average){
        starVote=Math.floor(vote_average/2);
        var arrStar=[];
        for(var i=0;i<starVote;i++){
            arrStar.push('<i class="fas fa-star" style="color:yellow"></i>');
        }
        return arrStar;
    }


});//fine del doc ready
