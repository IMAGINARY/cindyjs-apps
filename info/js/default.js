$(function(){
  IMAGINARY.i18n.init({
    queryStringVariable: 'lang',
    translationsDirectory: 'tr',
    defaultLanguage: 'en'
  }).then(function(){
    $('[data-i18n-str]').each(function(){
      $(this).html(IMAGINARY.i18n.t($(this).attr('data-i18n-str')));
    });
    $('.credits').fadeIn();
  });
});