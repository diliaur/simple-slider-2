jQuery( document ).ready( function ( $ ) {
  var allSlideTitles = $( '.ss2-slide-list > li .ss2-title-and-date' );
  $( '.ss2-container-titles' ).append(allSlideTitles); // move allSlideTitles to target div
});
