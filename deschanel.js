/*

  TheOtherDeschanel

  Replaces all text and images on a page that match Zooey Deschanel and replaces them with Emily Deschanel and vice versa.

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
      settings : {
				starred: '****** ******', 
				init : false, 
				finish : false 
    	},

      pluck : function(str) {
    		var ret = str;
    		for (var i = 0; i < $_.theotherdeschanel.settings.search.length; i++) {
    			ret = ret.replace($_.theotherdeschanel.settings.search[i], $_.theotherdeschanel.settings.replace[i]);
    		}
    		return ret;
    	},

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
          	for (var i = 0; i < $_.theotherdeschanel.settings.search.length; i++) {
              text = self.nodeValue.replace($_.theotherdeschanel.settings.search[i], $_.theotherdeschanel.settings.replace[i].replace(/\%C/mg) );
              $_(self).after(text);
              self.nodeValue = '';
          	}
          }
        } else if (self.nodeType == 1) {
          if ($_(self).children().length > 0) {
            $_.theotherdeschanel($_(self).contents());
          } else if ($_(self).children().length == 0) {
          	for (var i = 0; i < $_.theotherdeschanel.settings.search.length; i++) {
              text = $_(self).html().replace($_.theotherdeschanel.settings.search[i], $_.theotherdeschanel.settings.replace[i].replace(/\%C/mg) );
              $_(self).html(text);
          	}
          }
        }
      },

      init : function() {
        $_.theotherdeschanel.settings.init = true;
      },

      finish : function() {
        $_(document).each(function() {this.title = $_.theotherdeschanel.pluck(this.title);});

        var images = $_.theotherdeschanel.settings.images;

        // replace images
        $_('img, input[type=image]').each(function() {
        	for (var i = 0; i < $_.theotherdeschanel.settings.search.length; i++) {
            if (typeof $_(this).attr('src') != 'undefined' && ($_(this).attr('alt').match($_.theotherdeschanel.settings.search[i]) || $_(this).attr('title').match($_.theotherdeschanel.settings.search[i]) || $_(this).attr('src').match($_.theotherdeschanel.settings.search[i]))) {
              var r = $_(this), w = r.width(), h = r.height(), orientation, p, new_img;
              orientation = theotherdeschanel_getorientation(w, h);
              p = images[orientation].length;
              new_img = images[orientation][Math.round(Math.random()*(p-1))];
              r.css({width: r.width(), height: r.height()}).attr('src', new_img).width(w).height(h);
            }
        	}
        });

        $_.theotherdeschanel.settings.finish = true;
      }
    });

    var zooey2emily = {
        search: [/(zooey(\s|\-|\_)?)(claire(\s|\-\_))?(deschanel)/img, /(zooey)/img], 
        replace: ['Emily Deschanel', 'Emily'], 
        images : {
	        horizontal:['http://www.wallpaperbase.com/wallpapers/celebs/emilydeschanel/emily_deschanel_1.jpg', 'http://gearpatrol.com/blog/wp-content/uploads/2008/10/emily-deschanel1.jpg', 'http://gearpatrol.com/blog/wp-content/uploads/2008/10/emilydeschanelstatementzq7.jpg', 'http://jam.canoe.ca/Movies/Artists/D/Deschanel_Zooey/2009/01/28/sis.jpg', 'http://images4.fanpop.com/image/photos/16500000/Emily-emily-deschanel-16542203-500-313.jpg'],
	        square:['http://cdn.pastemagazine.com/www/articles/Emily-Deschanel-300x300.jpg?1272976109', 'http://1.bp.blogspot.com/_R6fjR09VKlw/S4sRZ32YrzI/AAAAAAAAAPU/2Wkc9slIjAU/s400/Emily%2BDeschanel.jpg', 'http://www.hairstylestalk.com/images/emily-deschanel1.jpg', 'http://img2.timeinc.net/instyle/images/2009/GalxMonth/08/081109-emily-deschanel-400.jpg', 'http://t1.gstatic.com/images?q=tbn:ANd9GcTpwFs5bv_pBK60T_aTX8_HJihOttRYYI9d1qgtddjdwUlXGN8B', 'http://4.bp.blogspot.com/_1Ssoxfl0MvQ/SSZrgMSbefI/AAAAAAAAHEU/1OBFHI5fDmk/s400/EmilyDeschanel.jpg', 'http://images.buddytv.com/articles/zooey.JPG'],
	        vertical:['http://bones.download-tvshows.com/wp-content/uploads/2009/12/Emily-Deschanel2.jpeg', 'http://www.buddytv.com/articles/Bones/Images/emily-deschanel-2.jpg', 'http://everyjoe.com/files/2008/05/emily-deschanel-uf08-02_nc.jpg', 'http://www.greenzer.com/blog/blog_image_store/2009/08/emily-deschanel.jpg']
				}
    };
    var emily2zooey = {
        search: [/(emily(\s|\-|\_)?)(erin(\s|\-\_))?(deschanel)/img, /(emily)/img], 
        replace: ['Zooey Deschanel', 'Zooey'], 
        images : {
	        horizontal:['http://www.filmschoolrejects.com/images/deschanel-zooey_584.jpg', 'http://images.fanpop.com/images/image_uploads/Zooey-Deschanel-zooey-deschanel-160428_1024_768.jpg', 'http://www.allnewmoviereviews.com/wp-content/uploads/2010/11/zooey_deschanel.jpg', 'http://www.ugo.com/images/galleries/zooeydeschanel_music/zooeydeschanel1.jpg', 'http://beatcrave.frsucrave.netdna-cdn.com/wp-content/uploads/2008/12/zooey.jpg'],
	        square:['http://pictures.directnews.co.uk/liveimages/Zooey+Deschanel_1988_19634690_0_0_7012467_300.jpg', 'http://www.parade.com/images/-v4/celebrity/2009/0719/default-zooey-deschanel.jpg', 'http://1.bp.blogspot.com/_Uaxrp_-Co5k/SpagFLz4YsI/AAAAAAAABGU/WYO7KB8eMkc/s400/Zooey+Deschanel.jpg', 'http://i2.listal.com/image/289604/300.jpg', 'http://www.zimbio.com/Zooey+Deschanel+Hair'],
	        vertical:['http://www.dailymakeover.com/appImages/galleryImages/all_womens_looks/Zooey_Deschanel+June_24_2009.jpg', 'http://cdn.uproxx.com/media/images/134/134_b5ef0a0fe177236bb8aa1e0bad99562e.jpg', 'http://www.picimages.net/photo/zooey-deschanel/zooey-deschanel_1301267067.jpg', 'http://violetboutique.ca/wp-content/uploads/2010/11/zooey_deschanel_mode_large_qualite_uk.jpg', 'http://files.myopera.com/celebfan/albums/713764/300px-zooey-deschanel-1.jpg']
				}
    };

    // determine replacement strategy base on number of matches
    var source = $('body').text();
    var zooey_regex = /zooey/ig;
    var emily_regex = /emily/ig;
		var zooey_matches = source.match(zooey_regex) || [];
		var emily_matches = source.match(emily_regex) || [];
    var strategy = {};
    if (zooey_matches.length > emily_matches.length) {
    	strategy = zooey2emily;
    } else if (zooey_matches.length < emily_matches.length) {
    	strategy = emily2zooey;
    } else {
    	// tie-breaker
    	source = $('title').text();
      zooey_matches = source.match(zooey_regex) || [];
      emily_matches = source.match(emily_regex) || [];
      if (zooey_matches.length > emily_matches.length) {
        strategy = zooey2emily;
      } else {
        strategy = emily2zooey;
      }
    }
	  $_.extend($_.theotherdeschanel, {
	  	settings: strategy
	  });
    
  })($_);

  $_.theotherdeschanel('html');
}

if (typeof($_scruff) == 'undefined' || !$_scruff) {theotherdeschanel_wait();}

