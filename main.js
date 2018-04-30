var dataContainer=$('.container').children('.data-Container');
var inputUtente=$('.container').children('.input').val();
var arrFlags=['en', 'it', 'es', 'de'];


$(document).ready(function(){



    $('#btn').click(function(){
        initialState();
        searchMovies();
        searchSeries();

    });//fine del document.on

    function searchMovies(){

      $.ajax({
          url:'https://api.themoviedb.org/3/search/movie?',
          method:'GET',
          data:{
              api_key:'936b60fb6691f67d5eda3a0a29507da1',
              query:inputUtente,
              language:'it_IT',

          },
          success: function(data){
              var risultato=data.results;
                if(inputUtente==''){
                  alert('inserisci il nome di un film');

                }
                else{

                  for(var i=0;i<risultato.length;i++){
                      var leng=risultato[i]['original_language'];
                      var poster=risultato[i]['poster_path'];
                      console.log('tittle', risultato[i]['original_title']);
                      dataContainer.append('Risultato nr', (i+1));
                      dataContainer.append('<div>'+'Titolo:-'+risultato[i]['title']+'</div>');
                      dataContainer.append('<div>'+'Titolo originale:-'+risultato[i]['original_title']+'</div>');
                      dataContainer.append('<div class="leng">'+'Lingua originale:-'+leng+generateFlag(leng)+'</div>');
                      dataContainer.append('<div>'+'Voto:'+transformAverage(risultato[i]['vote_average'])+'</div>');
                      dataContainer.append('<div>'+'Type:'+'Film'+'</div>');
                      dataContainer.append('<div>'+addPoster(poster)+'<br><br>'+'</div>');



                  }

                }

            },
          error:function(){
              alert('errore');
          }
      });//fine ajax

    }
    function searchSeries(){

      $.ajax({
          url:'https://api.themoviedb.org/3/search/tv?',
          method:'GET',
          data:{
              api_key:'936b60fb6691f67d5eda3a0a29507da1',
              query:inputUtente,
              language:'it_IT',

          },
          success: function(data){
              var seriesResult=data.results;
              console.log('nome serie', seriesResult)
                if(inputUtente==''){
                  alert('inserisci il nome di un film');

                }
                else{

                  for(var i=0;i<seriesResult.length;i++){
                      var leng=seriesResult[i]['original_language'];
                      var poster=seriesResult[i]['poster_path'];
                      console.log('tittle', seriesResult[i]['original_title'], seriesResult[i]['poster_path']);
                      dataContainer.append('Risultato nr', (i+1));
                      dataContainer.append('<div>'+'Titolo:-'+seriesResult[i]['name']+'</div>');
                      dataContainer.append('<div>'+'Titolo originale:-'+seriesResult[i]['original_name']+'</div>');
                      dataContainer.append('<div class="leng">'+'Lingua originale:-'+leng+generateFlag(leng)+'</div>');
                      dataContainer.append('<div>'+'Voto:'+transformAverage(seriesResult[i]['vote_average'])+'</div>');
                      dataContainer.append('<div>'+addPoster(poster)+'<br><br>'+'</div>');



                  }

                }

            },
          error:function(){
              alert('errore');
          }
      });//fine ajax

    }
    //funzione che transforma la media in un numero x da 1 a 5 e stampa x star invece del num x
    function transformAverage(vote_average){
        var starVote=Math.floor(vote_average/2);
        var arrStar=[];
        for(var i=0;i<5;i++){
            if(i<starVote){
                arrStar.push('<i class="fas fa-star" style="color:yellow"></i>');
            }
            else{
              arrStar.push('<i class="star fas fa-star" ></i>');
            }


        }
        return arrStar.join("");;
    }

    function generateFlag(leng){
        var newElement='';
        if(arrFlags.includes(leng)){
            newElement+='<img src=flags/'+leng+'.svg width=20px>';
        }
        return newElement;
    }
    function initialState(){
        var dataCont = $('.dataContainer');
        var inputUtente=$('.container').children('.input').val();
        dataCont.children('div').remove();
    }
    function addPoster(poster){
        var newElement='';
        var urlCopy='https://image.tmdb.org/t/p/w185/'
        if(poster!=''){
            newElement+='<img src='+urlCopy + poster + '>';
        }
        return newElement;

    }


});//fine del doc ready
