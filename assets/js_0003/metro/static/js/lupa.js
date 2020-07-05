(function ($) {
	$.fn.epicZoom = function (m) {
		var n = $('body');
		var o = {
			isInBounds: function (a, b, c, d) {
				if (a.pageX < (b.left + d.left) || a.pageX > (b.left + c.width + d.left) || a.pageY < (b.top + d.top) || a.pageY > (b.top + c.height + d.top)) {
					return false
				} else {
					return true
				}
			},
			isDebug: function () {
				if (m.debug && typeof console !== 'undefined') {
					return true
				} else {
					return false
				}
			}
		};
		var p = {
			'size': 300,
			'border': '1px solid white',
			'largeImage': '',
			'magnification': 1.0,
			'hideCursor': true,
			'blankCursor': './js/blank.png',
			'debug': false
		};
		m = $.extend(p, m);
		m.debug = Boolean(m.debug);
		if (o.isDebug()) {
			console.warn('Epic Image Zoom debugging is enabled.')
		}
		m.size = parseInt(m.size, 10);
		m.magnification = parseFloat(m.magnification);
		m.hideCursor = Boolean(m.hideCursor);
		m.largeImage = $.trim(m.largeImage);
		m.blankCursor = $.trim(m.blankCursor);
		if (o.isDebug()) {
			console.log('EIZ; options: ', m)
		}
		return this.each(function () {
			var k = $(this);
			if (!k.is('img')) {
				if (o.isDebug()) {
					console.error('EIZ works only on img elements.')
				}
				return this
			}
			var l = $('<img />');
			if (m.largeImage) {
				l.attr('src', m.largeImage)
			} else {
				l.attr('src', k.attr('src'))
			}
			l.load(function () {
				if (l.hasInit) {
					return false
				}
				l.hasInit = true;
				if (typeof n.data('epicZoom-nb') === 'undefined') {
					n.data('epicZoom-nb', 0)
				}
				n.data('epicZoom-nb', n.data('epicZoom-nb') + 1);
				var b = n.data('epicZoom-nb');
				if (o.isDebug()) {
					console.log('EIZ; #', b)
				}
				k.wrap('<span id="eiz-' + b + '" class="eiz-container"></span>');
				var c = $('#eiz-' + b).css('margin', 0).css('padding', 0).css('border', 0);
				c.append('<span class="eiz-magnifier"></span>');
				var d = $('.eiz-magnifier', c).css('position', 'absolute').css('margin', 0).css('padding', 0).css('border', m.border).css('-moz-box-shadow', '0 0 5px #777, 0 0 10px #aaa inset').css('-webkit-box-shadow', '0 0 5px #777').css('box-shadow', '0 0 5px #777, 0 0 10px #aaa inset').css('overflow', 'hidden').css('z-index', 999999).css('width', m.size + 'px').css('height', m.size + 'px');
				d.append('<div><img alt="" title="" /></div>');
				var e = $('img', d).css('margin', 0).css('padding', 0).css('border', 0);
				if (m.largeImage) {
					e.attr('src', m.largeImage)
				} else {
					e.attr('src', k.attr('src'))
				}
				if (m.hideCursor) {
					e.css('cursor', 'none').css('cursor', 'url(' + m.blankCursor + '),none !important;')
				}
				var f = $('div', d).css('position', 'absolute').css('margin', 0).css('padding', 0).css('border', 0).css('z-index', 1).css('overflow', 'hidden');
				e.width(e.width() * m.magnification);
				var g = e.width() / k.width();
				var h = {
					left: k.offset().left,
					top: k.offset().top
				};
				var i = {
					width: k.width(),
					height: k.height()
				};
				var j = {
					top: parseInt(k.css('padding-top'), 10),
					right: parseInt(k.css('padding-right'), 10),
					bottom: parseInt(k.css('padding-bottom'), 10),
					left: parseInt(k.css('padding-left'), 10)
				};
				d.hide();
				$(window).resize(function () {
					h = {
						left: k.offset().left,
						top: k.offset().top
					};
					i = {
						width: k.width(),
						height: k.height()
					};
					if (o.isDebug()) {
						console.log('EIZ #' + b + ': window resized, vars recalculated')
					}
				});
				c.mousemove(function (a) {
					if (!o.isInBounds(a, h, i, j)) {
						if (!d.is(':animated')) {
							if (o.isDebug()) {
								console.log('EIZ #' + b + ': out of bounds')
							}
							c.trigger('mouseleave')
						}
						return false
					}
					if (d.is(':not(:animated):hidden')) {
						c.trigger('mouseenter')
					}
					d.css('left',a.pageX-m.size/2);
					d.css('top',a.pageY-m.size/2);
					f.css('left',-1*(a.pageX-h.left-j.left)*g+m.size/2);
					f.css('top',-1*(a.pageY-h.top-j.top)*g+m.size/2)
					
					/*d.css('left', a.pageX - k.offset().left - m.size / 2);
					d.css('top', a.pageY - k.offset().top - m.size / 2);
					f.css('left', -1 * (a.pageX - k.offset().left) * g + m.size / 2);
					f.css('top', -1 * (a.pageY - k.offset().top) * g + m.size / 2)*/
				}).mouseleave(function () {
					d.stop(true, true).hide()
				}).mouseenter(function (a) {
					if (o.isDebug()) {
						console.log('EIZ #' + b + ': mouse enter container')
					}
					if (!o.isInBounds(a, h, i, j)) {
						return false
					}
					d.stop(true, true).show()
				})
			});
			if (l.complete || l.naturalWidth > 0) {
				l.trigger('load')
			}
		})
	}
} (jQuery));