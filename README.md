# jQuery.yycountdown
#### A simple jQuery plugin for countdown

Refer to the [jQuery yycountdown website](http://yyengine.jp/jquery-yycountdown/) for examples.

## Usage
``` html
<link rel="stylesheet" href="css/jquery.yycountdown.css">
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.yycountdown.min.js"></script>
```

``` javascript
  $('#timer').yycountdown({
    endDateTime   : '2020/07/24 00:00:00'
  });
  
  $('#timer2').yycountdown({
    startDateTime : '2020/07/23 23:59:55',
    endDateTime   : '2020/07/24 00:00:00',
    unit          : {d: '日', h: '時間', m: '分', s: '秒'},
    complete      : function(_this){
                     _this.find('.yycountdown-box').fadeOut();
                     }
  });
```

``` html
<div id="timer"></div>
<div id="timer2"></div>
```

## Tests
Open `sample.html`

## Download
https://github.com/yyengine/jquery-yycountdown/
