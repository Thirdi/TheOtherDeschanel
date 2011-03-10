/*

  TheOtherDeschanel

  Replaces all text and images on a page that match Zooey Deschanel and replaces them with Emily Deschanel.

  Adapted from SHAVED BIEBER
  by Greg Leuch <http://www.gleuch.com>

  MIT License - http://creativecommons.org/licenses/MIT

*/

Array.prototype.in_array = function(p_val, sensitive) {for(var i = 0, l = this.length; i < l; i++) {if ((sensitive && this[i] == p_val) || (!sensitive && this[i].toLowerCase() == p_val.toLowerCase())) {return true;}} return false;};

var $_ = false, $theotherdeschanel = document.createElement('script'), local = true;
$theotherdeschanel.src = 'http://code.jquery.com/jquery-1.3.min.js';
$theotherdeschanel.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild($theotherdeschanel);


function theotherdeschanel_wait() {
  if ((local && typeof(jQuery) == 'undefined') || (!local && typeof(unsafeWindow.jQuery) == 'undefined')) {
    window.setTimeout(theotherdeschanel_wait,100);
  } else {
    theotherdeschanel_start(local ? jQuery : unsafeWindow.jQuery);
  }
}

// determine if image is vertical, square, or horitontal
function theotherdeschanel_getorientation(w, h) {
  if (w + 40 < h) {
    return 'vertical';
  } else if (h + 40 < w) {
    return 'horizontal';
  } else {
    return 'square';
  }
}

function theotherdeschanel_start($_) {
  $_.fn.reverse = function(){return this.pushStack(this.get().reverse(), arguments);};

  (function($_) {
    $_.theotherdeschanel = function(data) {
      if (!$_.theotherdeschanel.settings.finish) $_.theotherdeschanel.init();
      $_(data).theotherdeschanel();
      if (!$_.theotherdeschanel.settings.finish) $_.theotherdeschanel.finish();
    };

    $_.fn.theotherdeschanel = function() {
      return this.filter(function() {return $_.theotherdeschanel.filter(this);}).each(function() {$_.theotherdeschanel.shave(this);});
    };

    $_.extend($_.theotherdeschanel, {
      settings : {search: /(zooey(\s|\-|\_)?)(claire(\s|\-\_))?(deschanel)/img, replace: 'Emily Deschanel', starred: '****** ******', init : false, finish : false},

      pluck : function(str) {return str.replace(/(zooey(\s|\-|\_)?)?(deschanel)/img, 'Emily Deschanel').replace(/(zooey)/img, 'Emily');},

      filter : function(self) {
        if (self.nodeType == 1) {
          var tag = self.tagName.toLowerCase();
          return !(tag == 'head' || tag == 'img' || tag == 'textarea' || tag == 'option' || tag == 'style' || tag == 'script');
        } else {
          return true;
        }
      },

      shave : function(self) {
        $_(self).css({'text-shadow' : 'none'});

        if (self.nodeType == 3) {
          if (self.nodeValue.replace(/\s/ig, '') != '') {
            text = self.nodeValue.replace($_.theotherdeschanel.settings.search, $_.theotherdeschanel.settings.replace.replace(/\%C/mg) );
            $_(self).after(text);
            self.nodeValue = '';
          }
        } else if (self.nodeType == 1) {
          if ($_(self).children().length > 0) {
            $_.theotherdeschanel($_(self).contents());
          } else if ($_(self).children().length == 0) {
            text = $_(self).html().replace($_.theotherdeschanel.settings.search, $_.theotherdeschanel.settings.replace.replace(/\%C/mg) );
            $_(self).html(text);
          }
        }
      },

      init : function() {
        $_.theotherdeschanel.settings.init = true;
      },

      finish : function() {
        $_(document).each(function() {this.title = $_.theotherdeschanel.pluck(this.title);});

        var images = {
          horizontal:['http://www.wallpaperbase.com/wallpapers/celebs/emilydeschanel/emily_deschanel_1.jpg', 'http://gearpatrol.com/blog/wp-content/uploads/2008/10/emily-deschanel1.jpg', 'http://gearpatrol.com/blog/wp-content/uploads/2008/10/emilydeschanelstatementzq7.jpg', 'http://jam.canoe.ca/Movies/Artists/D/Deschanel_Zooey/2009/01/28/sis.jpg', 'http://images4.fanpop.com/image/photos/16500000/Emily-emily-deschanel-16542203-500-313.jpg'],
          square:['http://cdn.pastemagazine.com/www/articles/Emily-Deschanel-300x300.jpg?1272976109', 'http://1.bp.blogspot.com/_R6fjR09VKlw/S4sRZ32YrzI/AAAAAAAAAPU/2Wkc9slIjAU/s400/Emily%2BDeschanel.jpg', 'http://www.hairstylestalk.com/images/emily-deschanel1.jpg', 'http://img2.timeinc.net/instyle/images/2009/GalxMonth/08/081109-emily-deschanel-400.jpg', 'http://t1.gstatic.com/images?q=tbn:ANd9GcTpwFs5bv_pBK60T_aTX8_HJihOttRYYI9d1qgtddjdwUlXGN8B', 'http://4.bp.blogspot.com/_1Ssoxfl0MvQ/SSZrgMSbefI/AAAAAAAAHEU/1OBFHI5fDmk/s400/EmilyDeschanel.jpg', 'http://images.buddytv.com/articles/zooey.JPG'],
          vertical:['http://bones.download-tvshows.com/wp-content/uploads/2009/12/Emily-Deschanel2.jpeg', 'http://www.buddytv.com/articles/Bones/Images/emily-deschanel-2.jpg', 'http://everyjoe.com/files/2008/05/emily-deschanel-uf08-02_nc.jpg', 'http://www.zap2it.com/media/photo/2008-07/41025849.jpg', 'http://ia.media-imdb.com/images/M/MV5BMTg2MDQxNDUyMl5BMl5BanBnXkFtZTcwMjM1MjMzMw@@._V1._SX278_SY400_.jpg']
        };

        // replace images
        $_('img, input[type=image]').each(function() {
          if (typeof $_(this).attr('src') != 'undefined' && ($_(this).attr('alt').match($_.theotherdeschanel.settings.search) || $_(this).attr('title').match($_.theotherdeschanel.settings.search) || $_(this).attr('src').match($_.theotherdeschanel.settings.search))) {
            var r = $_(this), w = r.width(), h = r.height(), orientation = theotherdeschanel_getorientation(w, h);
            var p = images[orientation].length;
            var new_img = images[orientation][Math.round(Math.random()*(p-1))];
            r.css({width: r.width(), height: r.height()}).attr('src', new_img).width(w).height(h);
          }
        });

        $_.theotherdeschanel.settings.finish = true;
      }
    });
  })($_);

  $_.theotherdeschanel('html');
}

if (typeof($_scruff) == 'undefined' || !$_scruff) {theotherdeschanel_wait();}

